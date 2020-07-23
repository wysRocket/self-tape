import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  CREATE_TIPS_ATTEMPT, REFRESH_TIPS_ATTEMPT,
  getTipsSuccess, GET_TIPS_ATTEMPT,
} from '../actions/tips';
import { isError } from '../actions/errors';
import { createTip, getTips } from '../api/apiRequests';

import toolsAndTips from '../mockup/toolsAndTips';

function* createTipsSaga() {
  try {
    yield toolsAndTips[0].articles.forEach((tip) => {
      createTip(tip);
    });
  } catch (error) {
    yield put(isError(error.message, 'CreateTips'));
  }
}

function* getTipsSaga() {
  try {
    const data = yield getTips();
    if (data === null) {
      yield createTipsSaga();
      yield getTipsSaga();
    } else {
      yield put(getTipsSuccess(Object.values(data)));
    }
  } catch (error) {
    yield put(isError(error.message, 'GetTips'));
  }
}

export default function* mySagas() {
  yield takeEvery(CREATE_TIPS_ATTEMPT, createTipsSaga);
  yield takeLatest(GET_TIPS_ATTEMPT, getTipsSaga);
  yield takeLatest(REFRESH_TIPS_ATTEMPT, getTipsSaga);
}
