import {
  put, takeLatest, select, call,
} from 'redux-saga/effects';
import { getProfile } from './storeHelpers';
import * as ACTIONS from '../actions/notifications';
import * as SESSIONS_ACTIONS from '../actions/sessions';
import { createOrGetChatAttempt } from '../actions/chat';
import { isError } from '../actions/errors';
import { prepareNotification, prepareSMS } from '../helpers/notifications';
import { NOTIFICATIONS_TYPES, TWILIO_TEST_NUMBER } from '../constants/apiConstants';
import {
  getProfileData, sendNotification, twilioRequest, makeViewed,
} from '../api/apiRequests';
import { formatPhoneNumber } from '../helpers/textHelpers';


function* notificationsSaga() {
  try {
    yield put(ACTIONS.hideNotification());
  } catch (error) {
    yield put(ACTIONS.hideNotification());
  }
}

function* sendNotificationSaga(props) {
  try {
    let toProfile = null;
    const fromProfile = yield select(getProfile);
    switch (props.data.notificationType) {
      case NOTIFICATIONS_TYPES.create_session:
        toProfile = yield call(getProfileData, props.data.notificationData.profileUid); break;
      case NOTIFICATIONS_TYPES.updated_status_practitioner:
        toProfile = yield call(
          getProfileData,
          props.data.notificationData.details.profileClient.uid,
        ); break;
      case NOTIFICATIONS_TYPES.session_started_finished:
        toProfile = yield call(
          getProfileData,
          fromProfile.role === 'practitioner' ? props.data.notificationData.details.profileClient.uid : props.data.notificationData.profileUid,
        ); break;
      case NOTIFICATIONS_TYPES.reviewed_person:
        toProfile = yield call(
          getProfileData,
          props.data.notificationData.ratedPerson.uid,
        ); break;
      case NOTIFICATIONS_TYPES.new_message:
        toProfile = yield call(
          getProfileData,
          fromProfile.role === 'practitioner' ? props.data.notificationData.userUid : props.data.notificationData.practitionerUid,
        ); break;
      default: break;
    }
    if (toProfile) {
      toProfile = fromProfile.role === 'user' ? toProfile.practitioner : toProfile.user;
      const notification = yield prepareNotification(props.data, fromProfile, toProfile);
      // Send push notification
      yield call(sendNotification, toProfile.fcmTokens, notification);
      // Send sms notification
      yield put(ACTIONS.sendSMS({ session: props.data, fromProfile, toProfile }));
    }
  } catch (error) {
    yield console.log('error', error);
  }
}

function* sendSMSSaga(props) {
  try {
    const data = yield call(prepareSMS, props.data);
    const formData = [
      { name: 'From', data: TWILIO_TEST_NUMBER },
      // { name: 'To', data: '+380935794456' },
      { name: 'To', data: formatPhoneNumber(data.phone) },
      { name: 'Body', data: data.message },
    ];
    yield call(twilioRequest, { resource: 'Messages', formData });
  } catch (error) {
    console.log('error', error);
  }
}

function* moveToSessionInfoSaga(props) {
  try {
    const {
      notificationData,
      notificationData: { locationUid, profileUid, uid },
      backScreen,
    } = JSON.parse(props.data);
    yield call(makeViewed, { sessionUid: uid });
    yield put(SESSIONS_ACTIONS.getBookDataAttempt({ locationUid, profileUid, sessionUid: uid }));
    yield put(ACTIONS.moveToSessionInfoSuccess({ notificationData, backScreen }));
  } catch (error) {
    yield put(isError(error.message, 'SessionConfirmed'));
  }
}

function sleep(sec) { 
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

function* moveToChatSaga(props) {
  try {
    const {
      notificationData,
      notificationData: { message: { senderId }, practitionerUid, userUid },
    } = JSON.parse(props.data);
    const profileUid = senderId === practitionerUid ? practitionerUid : userUid;
    const role = senderId === practitionerUid ? 'practitioner' : 'user';
    const profile = yield call(getProfileData, profileUid);
    yield sleep(2);
    yield put(createOrGetChatAttempt({ profile: profile[`${role}`] }));
    yield put(ACTIONS.moveToChatSuccess({ notificationData }));
  } catch (error) {
    yield put(isError(error.message, 'MoveToChat'));
  }
}

function* moveToCheckInOutSaga() {
  try {
    yield put(SESSIONS_ACTIONS.getSessionAttempt());
  } catch (error) {
    yield put(isError(error.message, 'MoveToCheckInOut'));
  }
}

export default function* mySagas() {
  yield takeLatest(ACTIONS.SHOW_NOTIFICATION, notificationsSaga);
  yield takeLatest(ACTIONS.SEND_NOTIFICATIONS_ATTEMPT, sendNotificationSaga);
  yield takeLatest(ACTIONS.MOVE_TO_SESSION_INFO_ATTEMPT, moveToSessionInfoSaga);
  yield takeLatest(ACTIONS.MOVE_TO_CHECK_IN_OUT, moveToCheckInOutSaga);
  yield takeLatest(ACTIONS.MOVE_TO_CHAT_ATTEMPT, moveToChatSaga);
  yield takeLatest(ACTIONS.SEND_SMS, sendSMSSaga);
}
