import {
  put, takeEvery, call, select, fork, cancel, take, delay,
} from 'redux-saga/effects';
import * as ACTIONS from '../actions/chat';
import { paginationLimit } from '../reducers/chat';
import { isError } from '../actions/errors';
import {
  getProfile, getChatInfo, getChatMessages, getChatLimit,
} from './storeHelpers';
import { chatData } from '../helpers/chat';
import { sendNotificationsAttempt } from '../actions/notifications';
import { NOTIFICATIONS_TYPES } from '../constants/apiConstants';

import { getItem } from '../helpers/authorization';

import {
  createChat, getChatByProfiles, firebaseUpdate, sendMessage, getChatByKey,
} from '../api/apiRequests';

function* createOrGetChatSaga({ data: { profile } }) {
  try {
    let currentProfile = yield select(getProfile);
    if (currentProfile === null) {
      const userData = yield getItem('@user');
      currentProfile = userData.profile;
    }
    const practitioner = profile.role === 'practitioner' ? profile : currentProfile;
    const user = profile.role === 'practitioner' ? currentProfile : profile;

    let chat = yield call(getChatByProfiles, { practitioner, user });
    if (!chat) {
      const data = yield call(createChat, { practitioner, user });
      if (data.key) {
        const updates = {};
        updates[`/chats/${data.key}/uid`] = data.key;
        yield call(firebaseUpdate, updates);
      }
    }
    chat = yield call(getChatByProfiles, { practitioner, user });
    yield put(ACTIONS.createOrGetChatSuccess(chatData(chat)));
    yield put(ACTIONS.updateChatAttempt());
  } catch (error) {
    yield put(isError(error.message, 'CreateOrGetChat'));
  }
}

function* getChatDataSaga() {
  try {
    while (true) {
      const chatInfo = yield select(getChatInfo);
      const chat = yield call(getChatByKey, chatInfo.uid);
      yield put(ACTIONS.updateChatSuccess(chatData(chat, true)));
      // Update chat data every 3 seconds
      yield delay(3000);
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* updateChatSaga() {
  while (true) {
    const task = yield fork(getChatDataSaga);
    yield take(ACTIONS.CLEAR_CHAT_DATA);
    yield cancel(task);
  }
}

function* sendMessageSaga(props) {
  try {
    const chatInfo = yield select(getChatInfo);
    const currentProfile = yield select(getProfile);
    const offset = new Date().getTimezoneOffset();
    const timestamp = new Date(new Date().getTime() + offset);
    const messageObj = {
      senderId: currentProfile.uid,
      username: currentProfile.username,
      message: props.data,
      timestamp: timestamp.getTime(),
    };
    yield call(sendMessage, { uid: chatInfo.uid, messageObj });
    yield put(ACTIONS.updateChatAttempt());
    yield put(ACTIONS.sendMessageSuccess());
    yield put(sendNotificationsAttempt({
      notificationData: {
        ...chatInfo,
        message: messageObj,
      },
      notificationType: NOTIFICATIONS_TYPES.new_message,
    }));
  } catch (error) {
    yield put(isError(error.message, 'SendMessage'));
  }
}

function* loadMoreChatDataSaga() {
  try {
    const chatMessages = yield select(getChatMessages);
    const chatLimit = yield select(getChatLimit);
    yield put(ACTIONS.loadMoreChatDataSuccess({
      limit: chatLimit + paginationLimit,
      hasPreviousPage: chatLimit < chatMessages,
    }));
  } catch (error) {
    yield put(isError(error.message, 'LoadMoreChatData'));
  }
}

export default function* mySagas() {
  yield takeEvery(ACTIONS.CREATE_OR_GET_CHAT_ATTEMPT, createOrGetChatSaga);
  yield takeEvery(ACTIONS.SEND_MESSAGE_ATTEMPT, sendMessageSaga);
  yield takeEvery(ACTIONS.UPDATE_CHAT_ATTEMPT, updateChatSaga);
  yield takeEvery(ACTIONS.LOAD_MORE_CHAT_DATA_ATTEMPT, loadMoreChatDataSaga);
}
