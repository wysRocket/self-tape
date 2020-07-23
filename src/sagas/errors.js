import { put, takeLatest } from 'redux-saga/effects';

import { IS_ERROR, showAlert } from '../actions/errors';
import {
  loginFailure, signUpFailure, getProfileFailure, profilesByLocationsFailure,
  setConfigurerdFailure, setAboutYouInfoFailure, resetPasswordFailure,
} from '../actions/authorization';
import { getSessionsStatsFailure } from '../actions/statistic';
import { getSessionFailure, getSessionsFailure, uploadFilesFailure, downloadFileFailure } from '../actions/sessions';
import { createTipsFailure, getTipsFailure } from '../actions/tips';
import {
  getMemberFailure, addExternalAccountFailure, becomeMemberFailure, addCardFailure,
} from '../actions/userDetails';
import { createOrGetChatFailure } from '../actions/chat';
import { membershipPayFailure } from '../actions/payment';

function* errorsSaga(props) {
  try {
    switch (props.screen) {
      case 'login':
        yield put(loginFailure(props.msg)); break;
      case 'signUp':
        yield put(signUpFailure(props.msg)); break;
      case 'SessionsStats':
        yield put(getSessionsStatsFailure(props.msg)); break;
      case 'CheckInOut':
        yield put(getSessionFailure(props.msg)); break;
      case 'Sessions':
        yield put(getSessionsFailure(props.msg)); break;
      case 'getProfile':
        yield put(getProfileFailure(props.msg)); break;
      case 'GetTips':
        yield put(getTipsFailure(props.msg)); break;
      case 'CreateTips':
        yield put(createTipsFailure(props.msg)); break;
      case 'getProfilesByLocation':
        yield put(profilesByLocationsFailure(props.msg)); break;
      case 'GetMember':
        yield put(getMemberFailure(props.msg)); break;
      case 'addExsternalAccount':
        yield put(addExternalAccountFailure(props.msg)); break;
      case 'MembershipPay':
        yield put(membershipPayFailure(props.msg)); break;
      case 'SetConfugured':
        yield put(setConfigurerdFailure(props.msg)); break;
      case 'setAboutYouInfo':
        yield put(setAboutYouInfoFailure(props.msg)); break;
      case 'BecomeMember':
        yield put(becomeMemberFailure(props.msg)); break;
      case 'ResetPassword':
        yield put(resetPasswordFailure(props.msg)); break;
      case 'AddCard':
        yield put(addCardFailure(props.msg)); break;
      case 'CreateOrGetChat':
        yield put(createOrGetChatFailure(props.msg)); break;
      case 'UploadSessionFile':
        yield put(uploadFilesFailure(props.msg)); break;
      case 'DownloadFile':
        yield put(downloadFileFailure(props.msg)); break;
      default:
        break;
    }
    yield put(showAlert(props.msg));
  } catch (error) {
    yield put(showAlert('Undefined Error'));
  }
}

export default function* mySagas() {
  yield takeLatest(IS_ERROR, errorsSaga);
}
