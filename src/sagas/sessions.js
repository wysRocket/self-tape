import {
  put, takeLatest, takeEvery, call, select, all, take,
} from 'redux-saga/effects';
import decodeUriComponent from 'decode-uri-component';
import * as ACTIONS from '../actions/sessions';
import { isError } from '../actions/errors';
import { sendNotificationsAttempt } from '../actions/notifications';
import {
  firebaseUpdate, createSession, getSessions, uploadFile,
  getTodaySession, getBookData, downloadFile, getSessionFiles,
} from '../api/apiRequests';
import { getProfile, getSessions as getStoreSessions, getBookData as getBookDataStore } from './storeHelpers';
import { SESSIONS_STATUSES, NOTIFICATIONS_TYPES } from '../constants/apiConstants';
import { generateSessionObject, resizeImage, countNewSessions } from '../helpers/sessions';

import { prepareBookPayAttempt, bookPayAttempt } from '../actions/payment';
import { openFile } from '../helpers/files';
import { locale } from '../constants/textConstants';

function* createSessionsSaga() {
  try {
    const bookData = yield select(getBookDataStore);
    const clientProfile = yield select(getProfile);
    const sessionObject = generateSessionObject({ bookData, clientProfile });
    const data = yield createSession(sessionObject);
    if (data.key) {
      const updates = {};
      updates[`/sessions/${data.key}/uid`] = data.key;
      yield firebaseUpdate(updates);
      yield put(ACTIONS.createSessionsSuccess(data.key));
    }
    yield put(prepareBookPayAttempt({ sessionId: data.key }));
    yield put(sendNotificationsAttempt({
      notificationData: sessionObject,
      notificationType: NOTIFICATIONS_TYPES.create_session,
    }));
  } catch (error) {
    yield put(isError(error.message, 'HomeLocationsComponent'));
  }
}

function* getSessionSaga() {
  try {
    const { role, uid } = yield select(getProfile);
    const data = yield call(getTodaySession, { role, uid });
    yield put(ACTIONS.getSessionSuccess(data));
  } catch (error) {
    yield put(isError(error.message, 'CheckInOut'));
  }
}

function* getSessionsSaga(props) {
  try {
    const data = yield getSessions(props.data);
    yield put(ACTIONS.getSessionsSuccess(data));
  } catch (error) {
    yield put(isError(error.message, 'Sessions'));
  }
}

function* updateSessionsSaga(props) {
  try {
    const updates = {};
    const { role, uid } = yield select(getProfile);
    const sessions = yield select(getStoreSessions);
    let notificationType = '';
    switch (props.sessionInfo.newStatus) {
      case SESSIONS_STATUSES.accepted:
        notificationType = NOTIFICATIONS_TYPES.updated_status_practitioner; break;
      case SESSIONS_STATUSES.declined:
        notificationType = NOTIFICATIONS_TYPES.updated_status_practitioner; break;
      case SESSIONS_STATUSES.started:
      case SESSIONS_STATUSES.finished:
        notificationType = NOTIFICATIONS_TYPES.session_started_finished; break;
      default: break;
    }

    updates[`/sessions/${props.sessionInfo.uid}/status`] = props.sessionInfo.newStatus;
    updates[`/sessions/${props.sessionInfo.uid}/lastEditedBy`] = role;
    updates[`/sessions/${props.sessionInfo.uid}/startedTime`] = props.sessionInfo.startedTime ? props.sessionInfo.startedTime : '';
    updates[`/sessions/${props.sessionInfo.uid}/finishedTime`] = props.sessionInfo.finishedTime ? props.sessionInfo.finishedTime : '';
    if (props.sessionInfo.newStatus === SESSIONS_STATUSES.accepted) {
      yield put(bookPayAttempt(props.sessionInfo));
    }
    yield put(ACTIONS.sessionsUpdate());

    if (props.sessionInfo.status === SESSIONS_STATUSES.created) {
      yield take('IS_COMPLETE_PAY');
    }
    yield firebaseUpdate(updates);
    if (sessions) {
      sessions[props.sessionInfo.uid].status = props.sessionInfo.newStatus;
    }
    yield put(ACTIONS.sessionsUpdate());

    yield put(ACTIONS.getSessionAttempt({ uid }));
    yield put(sendNotificationsAttempt({ notificationData: props.sessionInfo, notificationType }));
  } catch (error) {
    yield put(isError(error.message, 'UpdateSession'));
  }
}

function* uploadFilesSaga({ data, cb }) {
  try {
    const existFiles = yield call(getSessionFiles, data[data.length - 1].sessionUid);
    const files = !existFiles ? [] : existFiles;
    let fileSources = data;
    if (data[data.length - 1].fileType === 'image/png') {
      fileSources = yield all(data.map(async (item) => {
        const resized = await resizeImage(item.file);
        return {
          ...item,
          file: resized,
        };
      }));
    }

    yield all(fileSources.map(async (item, index) => {
      let decodedUrl = decodeUriComponent(item.file.uri);
      const rawIndex = decodedUrl.indexOf('raw:');
      if (rawIndex !== -1) {
        decodedUrl = decodedUrl.replace(decodedUrl.substring(0, rawIndex + 5), '');
      }
      const fileURL = await uploadFile(decodedUrl, item.file.fileType, `${item.fileName}_${index}`, 'sessions');
      const fileObject = {
        fileURL,
        fileName: item.file.fileName ? item.file.fileName : item.fileName,
        fileType: item.fileType,
      };
      files.unshift(fileObject);
      return fileObject;
    }));

    const updates = {};

    updates[`/sessions/${data[data.length - 1].sessionUid}/files`] = files;
    yield firebaseUpdate(updates);
    if (cb) { cb(); }
    yield put(ACTIONS.uploadFilesSuccess());
  } catch (error) {
    yield put(isError(error.message, 'UploadSessionFile'));
  }
}

function* getBookDataSaga(props) {
  try {
    const data = yield call(getBookData, props.data);
    yield put(ACTIONS.getBookDataSuccess(data));
  } catch (error) {
    yield put(isError(error.message, 'GetBookData'));
  }
}

function* downloadFileAttempt(props) {
  try {
    const res = yield call(downloadFile, props.data.file);
    if (res.status === 200) {
      yield put(ACTIONS.downloadFileSuccess());
      openFile({ file: res, fileInfo: props.data.file });
    } else if (res.data && res.data.message && res.data.message !== 'The operation was cancelled.') {
      yield put(isError(res.data.message, 'DownloadFile'));
    } else {
      yield put(ACTIONS.downloadFileFailure(props.msg));
    }
  } catch (error) {
    console.log('error', error)
    yield put(isError(locale.somethingWrong, 'DownloadFile'));
  }
}

function* getNotViewedSessions() {
  try {
    const { uid, role } = yield select(getProfile);
    const findData = {
      itemId: uid,
      role,
      locationId: null,
      startDate: null,
      endDate: null,
    };
    let data = yield getSessions(findData);
    data = Object.values(data) || [];
    yield put(ACTIONS.getNotViewedSessionsSuccess(countNewSessions(data)));
  } catch (error) {
    console.log('error', error)
  }
}

export default function* mySagas() {
  yield takeEvery(ACTIONS.CREATE_SESSIONS_ATTEMPT, createSessionsSaga);
  yield takeLatest(ACTIONS.GET_SESSION_ATTEMPT, getSessionSaga);
  yield takeLatest(ACTIONS.REFRESH_SESSION_ATTEMPT, getSessionSaga);
  yield takeLatest(ACTIONS.GET_SESSIONS_ATTEMPT, getSessionsSaga);
  yield takeLatest(ACTIONS.REFRESH_SESSIONS_ATTEMPT, getSessionsSaga);
  yield takeLatest(ACTIONS.SESSIONS_UPDATE_ATTEMPT, updateSessionsSaga);
  yield takeLatest(ACTIONS.UPLOAD_FILES_ATTEMPT, uploadFilesSaga);
  yield takeLatest(ACTIONS.GET_BOOK_DATA_ATTEMPT, getBookDataSaga);
  yield takeLatest(ACTIONS.DOWNLOAD_FILE_ATTEMPT, downloadFileAttempt);
  yield takeLatest(ACTIONS.GET_NOT_VIEWED_SESSIONS_ATTEMPT, getNotViewedSessions);
}
