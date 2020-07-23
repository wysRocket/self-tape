import {
  put, takeEvery, call, select,
} from 'redux-saga/effects';
import { getProfile } from './storeHelpers';
import { formatPhoneNumber } from '../helpers/textHelpers';
import * as ACTIONS from '../actions/calls';
import * as API from '../constants/apiConstants';
import { isError } from '../actions/errors';
import { twilioRequest } from '../api/apiRequests';
import { showOverlay } from '../helpers/index';
import { locale } from '../constants/textConstants';
import COLORS from '../constants/colorsConstants';


function* makeCallSaga({ data: { phone } }) {
  try {
    const profile = yield select(getProfile);
    const formData = [
      { name: 'From', data: API.TWILIO_TEST_NUMBER },
      { name: 'To', data: formatPhoneNumber(profile.phone) }, // Number who wants to call
      { name: 'Url', data: `https://handler.twilio.com/twiml/EH45b452c466be3a225214c5547de10492?Number=${formatPhoneNumber(phone)}` }, // The number you want to call
      // { name: 'To', data: '+13233368399' },
      // { name: 'Url', data: `https://handler.twilio.com/twiml/EH45b452c466be3a225214c5547de10492?Number=${'+13236010051'}` },
    ];
    const result = yield call(twilioRequest, { resource: 'Calls', formData });
    if (result.respInfo.status === 201) showOverlay({ message: locale.creatingACall });
    else showOverlay({ message: locale.somethingWrong, overlayBackgroundColor: COLORS.MAIN_RED });
    yield put(ACTIONS.makeCallSuccess());
  } catch (error) {
    showOverlay({ message: locale.somethingWrong, overlayBackgroundColor: COLORS.MAIN_RED });
    yield put(isError(error.message, 'MakeCall'));
  }
}

export default function* mySagas() {
  yield takeEvery(ACTIONS.MAKE_CALL_ATTEMPT, makeCallSaga);
}
