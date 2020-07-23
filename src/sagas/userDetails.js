import {
  put, takeEvery, call, select, take,
} from 'redux-saga/effects';
import * as ACTIONS from '../actions/userDetails';
import { profileUpdateSuccess } from '../actions/authorization';
import { membershipPayAttempt } from '../actions/payment';
import { isError } from '../actions/errors';
import * as API from '../api/apiRequests';
import { getStateSelfTapePro, getProfile, getMemberData } from './storeHelpers';
import { getRandomDigit, membershipId } from '../helpers/membership';
import { PRODUCTION } from '../constants/apiConstants';

function* getUserDetailsSaga() {
  try {
    const isExist = yield select(getStateSelfTapePro);
    let data = {};
    if (!isExist) {
      try {
        data = { selftapePro: yield call(API.getSelfTapePro) };
      } catch (e) {
        if (!data.selftapePro) {
          yield call(API.setSelfTapePro);
          data = { selftapePro: yield call(API.getSelfTapePro) };
        }
      }
      // end
    }
    yield put(ACTIONS.getDetailsSuccess(data));
  } catch (error) {
    yield put(ACTIONS.getDetailsFailure());
    yield put(isError(error.message, 'Pricing'));
  }
}

function* setMembershipSaga({ data: { plan, card } }) {
  try {
    const updatedProfile = yield select(getProfile);
    yield put(membershipPayAttempt({ card }));
    yield put(ACTIONS.setMembershipSuccess(updatedProfile.membership));
    yield take('IS_COMPLETE_MEMBER_PAY');
    const dateEnd = new Date();
    dateEnd.setMonth(dateEnd.getMonth() + plan.countOfMonth);
    updatedProfile.membership.active = true;
    updatedProfile.membership.isMember = true;
    updatedProfile.membership.key = plan.uid;
    updatedProfile.membership.dateEnd = dateEnd.getTime();
    updatedProfile.membership.memberType = plan.title;
    yield call(API.updateMember, updatedProfile.uid, updatedProfile.membership);
    yield put(profileUpdateSuccess(updatedProfile));
    yield put(ACTIONS.setMembershipSuccess(updatedProfile.membership));
  } catch (error) {
    yield put(ACTIONS.setMembershipFailure());
    yield put(isError(error.message, 'setMembership'));
  }
}

function* saveMemberSaga({ data }) {
  try {
    const updatedProfile = yield select(getProfile);
    if (!PRODUCTION) updatedProfile.membership.id = data.id;
    else if (PRODUCTION) updatedProfile.membership.idProduction = data.id;
    updatedProfile.membership.memberNumber = updatedProfile.membership.memberNumber === ''
      ? getRandomDigit(16) : updatedProfile.membership.memberNumber;
    updatedProfile.membership.isMember = data.isMember ? data.isMember : false;
    yield call(API.updateMember, updatedProfile.uid, updatedProfile.membership);
    yield put(profileUpdateSuccess(updatedProfile));
    yield put(ACTIONS.saveMemberSuccess());
  } catch (error) {
    yield put(ACTIONS.saveMemberFailure());
    yield put(isError(error.message, 'saveMember'));
  }
}

function* becomeMemberSaga({ data: { card, plan, isMember } }) {
  try {
    const profile = yield select(getProfile);
    let customer = yield select(getMemberData);
    const cardToken = yield call(API.createCardToken, card);
    if (!cardToken.error) {
      if (customer && !customer.isMember) {
        const newCardObj = { source: cardToken.id };
        const addData = yield call(API.memberRequest, membershipId(customer), '/sources', newCardObj);
        customer.sources.data.push(addData);
        customer = {
          ...customer,
          isMember,
        };
      } else {
        customer = yield call(API.createCustomer, { profile, cardToken });
        customer = {
          ...customer,
          isMember,
        };
      }
      if (!customer.error) {
        yield put(ACTIONS.becomeMemberSuccess(customer));
        yield put(ACTIONS.saveMemberAttempt(customer));
        if (plan && plan !== null && customer.sources.data.length > 0) {
          yield put(ACTIONS.setMembershipAttempt({ plan, card: customer.sources.data[0] }));
        }
      } else {
        yield put(isError(customer.error.message, 'BecomeMember'));
      }
    } else {
      yield put(isError(cardToken.error.message, 'BecomeMember'));
    }
  } catch (error) {
    yield put(isError(error.message, 'BecomeMember'));
  }
}

function* getMemberSaga({ data: { membership } }) {
  try {
    const member = yield call(API.memberRequest, membershipId(membership));
    if (!member.error) {
      yield put(ACTIONS.getMemberSuccess(member));
    } else yield put(ACTIONS.getMemberFailure());
  } catch (error) {
    yield put(isError(error.message, 'GetMember'));
  }
}

function* addCardSaga(props) {
  try {
    const customer = yield select(getMemberData);
    const card = yield call(API.createCardToken, props.data);
    const newCardObj = { source: card.id };
    const addData = yield call(API.memberRequest, membershipId(customer), '/sources', newCardObj);
    if (addData && !addData.error) {
      customer.sources.data.push(addData);
      yield put(ACTIONS.addCardSuccess(customer));
    } else {
      yield put(isError(addData.error.message, 'AddCard'));
    }
  } catch (error) {
    yield put(isError(error.message, 'AddCard'));
  }
}

function* changeDefaultCardSaga(props) {
  try {
    const customer = yield select(getMemberData);
    const defSource = { default_source: props.data.id };
    const updatedCustomer = yield call(API.memberRequest, membershipId(customer), '', defSource);
    yield put(ACTIONS.changeDefaultCardSuccess(updatedCustomer));
  } catch (error) {
    yield put(isError(error.message, 'ChangeDefaultCard'));
  }
}

function* deleteCardSaga(props) {
  try {
    const member = yield select(getMemberData);
    const sourcesType = member.object === 'account' ? 'external_accounts' : 'sources';
    yield call(API.removeCard, membershipId(member), `/${props.data.id}`);

    const cards = member[sourcesType].data.filter(card => card.id !== props.data.id);
    member[sourcesType].data = cards;
    yield put(ACTIONS.deleteCardSuccess(member));
  } catch (error) {
    yield put(isError(error.message, 'DeleteCard'));
  }
}

function* changeCardSaga(props) {
  try {
    const customer = yield select(getMemberData);
    const card = yield call(API.createCardToken, props.data);
    const newCardObj = { source: card.id };
    const changedCustomer = yield call(API.memberRequest, '', membershipId(customer), newCardObj);
    yield put(ACTIONS.changeCardSuccess(changedCustomer));
  } catch (error) {
    yield put(isError(error.message, 'AddCard'));
  }
}

// Strype account

function* createStripeAccountSaga({ data }) {
  try {
    const account = yield call(API.createStripeAccount, { profile: data });
    yield put(ACTIONS.createStripeAccountSuccess(account));
    yield put(ACTIONS.saveMemberAttempt(account));
  } catch (error) {
    yield put(isError(error.message, 'BecomeMember'));
  }
}

function* addExsternalAccountSaga({ data: { obj, type }, cb }) {
  try {
    const member = yield select(getMemberData);
    const profile = yield select(getProfile);
    let token = null;
    switch (type) {
      case 'bank_account':
        token = yield call(API.stripeRequest, 'tokens', obj); break;
      default:
        token = yield call(API.createCardToken, obj); break;
    }
    if (!token.error) {
      const newExtAccountObj = {
        external_account: token.id,
        default_for_currency: true,
      };
      const addData = yield call(API.memberRequest, member.id, '/external_accounts', newExtAccountObj);
      if (!addData.error) {
        member.external_accounts.data.push(addData);
        if (profile.role === 'practitioner') {
          const updates = {};
          updates[`/profiles/${profile.uid}/${profile.role}/membership/${PRODUCTION ? 'addedCardProduction' : 'addedCard'}`] = true;
          yield API.firebaseUpdate(updates);
        }
        yield put(ACTIONS.addExternalAccountSuccess(member));
        if (cb) {
          yield cb();
        }
      } else {
        yield put(isError(addData.error.message, 'addExsternalAccount'));
      }
    } else {
      yield put(isError(token.error.message, 'addExsternalAccount'));
    }
  } catch (error) {
    console.log('error', error)
    yield put(isError(error.message, 'addExsternalAccount'));
  }
}

function* updateBankAccountSaga({ data }) {
  try {
    const profile = yield select(getProfile);
    const member = yield select(getMemberData);
    const updateObject = {
      default_for_currency: true,
    };
    yield call(API.memberRequest, membershipId(member), `/external_accounts/${data.id}`, updateObject);
    yield put(ACTIONS.getMemberAttempt(profile));
    yield put(ACTIONS.updateBankAccountSuccess(member));
  } catch (error) {
    yield put(isError(error.message, 'AddCard'));
  }
}

export default function* mySagas() {
  yield takeEvery(ACTIONS.GET_DETAILS_ATTEMPT, getUserDetailsSaga);
  yield takeEvery(ACTIONS.SET_MEMBERSHIP_ATTEMPT, setMembershipSaga);
  yield takeEvery(ACTIONS.SAVE_MEMBER_ATTEMPT, saveMemberSaga);
  yield takeEvery(ACTIONS.BECOME_MEMBER_ATTEMPT, becomeMemberSaga);
  yield takeEvery(ACTIONS.GET_MEMBER_ATTEMPT, getMemberSaga);
  yield takeEvery(ACTIONS.ADD_CARD_ATTEMPT, addCardSaga);
  yield takeEvery(ACTIONS.CHANGE_DEFAULT_CARD_ATTEMPT, changeDefaultCardSaga);
  yield takeEvery(ACTIONS.DELETE_CARD_ATTEMPT, deleteCardSaga);
  yield takeEvery(ACTIONS.CHANGE_CARD_ATTEMPT, changeCardSaga);
  yield takeEvery(ACTIONS.CREATE_STRIPE_ACCOUNT_ATTEMPT, createStripeAccountSaga);
  yield takeEvery(ACTIONS.ADD_EXTERNAL_ACCOUNT_ATTEMPT, addExsternalAccountSaga);
  yield takeEvery(ACTIONS.UPDATE_BANK_ACCOUNT_ATTEMPT, updateBankAccountSaga);
}
