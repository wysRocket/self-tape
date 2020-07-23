import { takeEvery, put, call, select } from 'redux-saga/effects';
import { GET_SESSIONS_STATS_ATTEMPT, REFRESH_SESSIONS_STATS_ATTEMPT, getSessionsStatsSuccess } from '../actions/statistic';
import { isError } from '../actions/errors';
import { getSessionStats } from '../api/apiRequests';
import { getProfile } from './storeHelpers';

function* getSessionsStatsSaga() {
  try {
    const { role, uid } = yield select(getProfile);
    const data = yield call(getSessionStats, { role, uid });
    yield put(getSessionsStatsSuccess(data));
  } catch (error) {
    yield put(isError(error.message, 'SessionsStats'));
  }
}

export default function* mySagas() {
  yield takeEvery(GET_SESSIONS_STATS_ATTEMPT, getSessionsStatsSaga);
  yield takeEvery(REFRESH_SESSIONS_STATS_ATTEMPT, getSessionsStatsSaga);
}
