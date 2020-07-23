import {
  takeEvery, put, call, select,
} from 'redux-saga/effects';
import _ from 'lodash';
import * as ACTIONS from '../actions/payment';
import * as API from '../api/apiRequests';
import { isError } from '../actions/errors';
import {
  getMemberData, getBookData, getProfile, getSessionInfo,
} from './storeHelpers';
import Calculation from '../helpers/calculation';
import { messageAlert } from '../helpers/sessions';
import { getRefundAmount } from '../helpers/payments';
import { membershipId } from '../helpers/membership';


const defaultPayObject = { currency: 'usd' };
const transAmount = amount => amount * 100;

function* membershipPaySaga({ data: { card } }) {
  try {
    const memberData = yield select(getMemberData);
    const payObject = {
      ...defaultPayObject,
      amount: `${transAmount(10)}`,
      description: 'Member sign up',
      customer: memberData.id,
      card: card.id,
    };
    const pay = yield call(API.pay, payObject);
    if (pay && pay.status === 'succeeded') {
      yield put({ type: 'IS_COMPLETE_MEMBER_PAY' });
      messageAlert({ title: 'Selftape', text: 'Thank you for subscribing to Selftape!' });
    } else {
      messageAlert({ title: 'Payment failed' });
    }
    yield put(ACTIONS.membershipPaySuccess());
  } catch (error) {
    yield put(isError(error.message, 'MembershipPay'));
  }
}

function* prepareBookPaySaga(props) {
  try {
    const { data: { sessionId } } = props;
    const bookData = yield select(getBookData);
    const profile = yield select(getProfile);
    const memberData = yield select(getMemberData);
    const calc = new Calculation({
      buyerProfile: profile,
      sellerProfile: bookData.practitioner,
    });
    calc.setPrice(bookData.selectedTime.selectedPrice);
    const payObject = {
      ...defaultPayObject,
      amount: `${transAmount(calc.getTotalPrice())}`,
      application_fee: `${transAmount(calc.getApplicationFee())}`,
      description: 'Book payment',
      destination: membershipId(bookData.practitioner.membership),
    };
    payObject.customer = memberData.id;
    payObject.card = memberData.default_source;
    payObject.paid = calc.getTotalPrice();
    const updates = {};
    updates[`/sessions/${sessionId}/payObject`] = payObject;
    yield API.firebaseUpdate(updates);
    yield put(ACTIONS.prepareBookPaySuccess());
  } catch (error) {
    yield put(isError(error.message, 'BookPay'));
  }
}

function* bookPaySaga({ data }) {
  try {
    const payObject = { ...data.payObject };
    // payObject.amount = '30';
    // payObject.application_fee = '0';
    const updates = {};
    const payment = yield call(API.pay, _.omit(payObject, ['paid', 'chargeId']));
    if (payment && payment.status === 'succeeded') {
      payObject.chargeId = payment.id;
      payObject.paid = data.payObject.paid;
      updates[`/sessions/${data.uid}/payObject`] = payObject;
      yield API.firebaseUpdate(updates);
      yield put({ type: 'IS_COMPLETE_PAY' });
    } else {
      messageAlert({
        title: payment.error && payment.error.message ? payment.error.message : 'Payment failed',
      });
    }
  } catch (error) {
    yield put(isError(error.message, 'ConfirmedBookPay'));
  }
}

function* refundSaga(props) {
  try {
    const { practitionerProfile: { practitioner } } = yield select(getSessionInfo);
    const {
      data: {
        payObject: { chargeId, paid },
      },
    } = props;
    const amount = transAmount(getRefundAmount(practitioner, paid));
    const refund = yield call(API.refunds, {
      charge: chargeId,
      amount,
    });
    if (refund.error) yield put(isError(refund.error.message, 'Refund'));
    yield put(ACTIONS.refundSuccess());
  } catch (error) {
    yield put(isError(error.message, 'Refund'));
  }
}

export default function* mySagas() {
  yield takeEvery(ACTIONS.MEMBERSHIP_PAY_ATTEMPT, membershipPaySaga);
  yield takeEvery(ACTIONS.PREPARE_BOOK_PAY_ATTEMPT, prepareBookPaySaga);
  yield takeEvery(ACTIONS.BOOK_PAY_ATTEMPT, bookPaySaga);
  yield takeEvery(ACTIONS.REFUND_ATTEMPT, refundSaga);
}
