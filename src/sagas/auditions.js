import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';
import {
  CREATE_AUDITIONS_ATTEMPT,
  getAuditionsSuccess, GET_AUDITIONS_ATTEMPT, REFRESH_AUDITIONS_ATTEMPT,
} from '../actions/auditions';
import { isError } from '../actions/errors';
import { createAuditions, getAuditions } from '../api/apiRequests';

import auditions from '../mockup/auditions';

function* createAuditionsSaga() {
  try {
    yield auditions[0].articles.forEach((audition) => {
      createAuditions(audition);
    });
  } catch (error) {
    yield put(isError(error.message, 'CreateAuditions'));
  }
}

function* getAuditionsSaga() {
  try {
    const data = yield call(getAuditions);
    if (data === null) {
      yield createAuditionsSaga();
      yield getAuditionsSaga();
    } else {
      yield put(getAuditionsSuccess(Object.values(data)));
    }
  } catch (error) {
    yield put(isError(error.message, 'GetAuditions'));
  }
}

export default function* mySagas() {
  yield takeEvery(CREATE_AUDITIONS_ATTEMPT, createAuditionsSaga);
  yield takeLatest(GET_AUDITIONS_ATTEMPT, getAuditionsSaga);
  yield takeLatest(REFRESH_AUDITIONS_ATTEMPT, getAuditionsSaga);
}
