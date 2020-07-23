import { put, takeEvery, call } from 'redux-saga/effects';

import {
  getCommunitiesSuccess,
  GET_COMMUNITIES_ATTEMPT,
  getCommunitiesFailure,
} from '../actions/communities';
import { isError } from '../actions/errors';
import {
  getCommunities,
  createCommunityDev,
} from '../api/apiRequests';

function* getCommunitiesSaga() {
  try {
    const data = yield call(getCommunities);
    // delete this dev method:
    if (data === null) {
      yield call(createCommunityDev);
    }
    // end
    yield put(getCommunitiesSuccess(Object.values(data)));
  } catch (error) {
    yield put(getCommunitiesFailure());
    yield put(isError(error.message, 'HomeLocationsComponent'));
  }
}

export default function* mySagas() {
  yield takeEvery(GET_COMMUNITIES_ATTEMPT, getCommunitiesSaga);
}
