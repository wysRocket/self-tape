import {
  put, takeEvery, call, select,
} from 'redux-saga/effects';

import {
  RATE_PERSON_ATTEMPT,
  ratePersonSuccess,
  UPDATE_PERSON_RATE_ATTEMPT,
  updatePersonRateSuccess,
  updatePersonRateAttempt,
  GET_PERSON_REVIEWS_ATTEMPT,
  REFRESH_PERSON_REVIEWS_ATTEMPT,
  getPersonReviewsSuccess,
  getPersonReviewsFailure,
} from '../actions/reviews';

import { sendNotificationsAttempt } from '../actions/notifications';
import { isError } from '../actions/errors';
import * as API from '../api/apiRequests';
import { NOTIFICATIONS_TYPES } from '../constants/apiConstants';
import { compareTime } from '../helpers/time';
import { locale } from '../constants/textConstants';
import { getProfile, getCurrentHourSession } from './storeHelpers';

function* ratePersonSaga({
  data: {
    review, reviewRating, answers,
  },
}) {
  try {
    const person = yield select(getProfile);
    const {
      practitionerProfile,
      userProfile, sessionInfo: { uid: sessionUid },
    } = yield select(getCurrentHourSession);

    const offset = new Date().getTimezoneOffset();
    const timestamp = new Date(new Date().getTime() + offset);

    const ratedPerson = person.role === 'user' ? practitionerProfile : userProfile;
    const reviewObject = {
      personName: person.username,
      personUid: person.uid,
      personImage: person.image,
      ratedPersonUid: `${ratedPerson.uid}_&_${ratedPerson.role}`,
      review,
      reviewRating,
      filterRatedPersonSession: `${ratedPerson.uid}_&_${sessionUid}`,
      timestamp: timestamp.getTime(),
    };

    yield call(API.saveAnswers, {
      answers,
      ratedPerson: { uid: ratedPerson.uid, role: ratedPerson.role },
      person: { uid: person.uid, role: person.role },
    });
    yield call(API.ratePerson, reviewObject);
    yield call(API.updateWhoRated, { sessionUid, role: person.role });
    yield put(updatePersonRateAttempt({ ratedPerson, reviewRating }));
    yield put(ratePersonSuccess());
  } catch (error) {
    yield put(isError(error.message, 'RatePerson'));
  }
}

function* updatePersonRateSaga(props) {
  try {
    const { ratedPerson, reviewRating } = props.data;
    const updates = {};
    const ratingSum = ratedPerson.ratingSum + reviewRating;
    const totalReviews = ratedPerson.totalReviews + 1;
    const rating = parseFloat((ratingSum / totalReviews).toFixed(1), 10);

    updates[`/profiles/${ratedPerson.uid}/${ratedPerson.role}/rating`] = rating;
    updates[`/profiles/${ratedPerson.uid}/${ratedPerson.role}/ratingSum`] = ratingSum;
    updates[`/profiles/${ratedPerson.uid}/${ratedPerson.role}/totalReviews`] = totalReviews;
    yield API.firebaseUpdate(updates);
    yield put(sendNotificationsAttempt({
      notificationData: props.data,
      notificationType: NOTIFICATIONS_TYPES.reviewed_person,
    }));
    yield put(updatePersonRateSuccess());
  } catch (error) {
    yield put(isError(error.message, 'RatePerson'));
  }
}

function* getPersonReviewsSaga(props) {
  try {
    const data = yield call(API.getPersonReviews, props.data);
    const reviews = data
      ? Object.values(data).sort((a, b) => compareTime(a.timestamp, b.timestamp, true)).reverse()
      : [];
    if (data !== null) {
      yield put(getPersonReviewsSuccess(reviews));
    } else {
      yield put(getPersonReviewsFailure(locale.notReviewsYet));
    }
  } catch (error) {
    yield put(isError(error.message, 'getPersonReviews'));
  }
}

export default function* mySagas() {
  yield takeEvery(RATE_PERSON_ATTEMPT, ratePersonSaga);
  yield takeEvery(UPDATE_PERSON_RATE_ATTEMPT, updatePersonRateSaga);
  yield takeEvery(GET_PERSON_REVIEWS_ATTEMPT, getPersonReviewsSaga);
  yield takeEvery(REFRESH_PERSON_REVIEWS_ATTEMPT, getPersonReviewsSaga);
}
