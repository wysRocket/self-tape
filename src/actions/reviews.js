// reviews actions
export const RATE_PERSON_ATTEMPT = 'RATE_PERSON_ATTEMPT';
export const ratePersonAttempt = data => ({ type: RATE_PERSON_ATTEMPT, data });

export const RATE_PERSON_SUCCESS = 'RATE_PERSON_SUCCESS';
export const ratePersonSuccess = data => ({ type: RATE_PERSON_SUCCESS, data });

export const RATE_PERSON_FAILURE = 'RATE_PERSON_FAILURE';
export const ratePersonFailure = () => ({ type: RATE_PERSON_FAILURE });

export const UPDATE_PERSON_RATE_ATTEMPT = 'UPDATE_PERSON_RATE_ATTEMPT';
export const updatePersonRateAttempt = data => ({ type: UPDATE_PERSON_RATE_ATTEMPT, data });

export const UPDATE_PERSON_RATE_SUCCESS = 'UPDATE_PERSON_RATE_SUCCESS';
export const updatePersonRateSuccess = data => ({ type: UPDATE_PERSON_RATE_SUCCESS, data });

export const UPDATE_PERSON_RATE_FAILURE = 'UPDATE_PERSON_RATE_FAILURE';
export const updatePersonRateFailure = () => ({ type: UPDATE_PERSON_RATE_FAILURE });

export const GET_PERSON_REVIEWS_ATTEMPT = 'GET_PERSON_REVIEWS_ATTEMPT';
export const getPersonReviewsAttempt = data => ({ type: GET_PERSON_REVIEWS_ATTEMPT, data });

export const REFRESH_PERSON_REVIEWS_ATTEMPT = 'REFRESH_PERSON_REVIEWS_ATTEMPT';
export const refreshPersonReviewsAttempt = data => ({ type: REFRESH_PERSON_REVIEWS_ATTEMPT, data });

export const GET_PERSON_REVIEWS_SUCCESS = 'GET_PERSON_REVIEWS_SUCCESS';
export const getPersonReviewsSuccess = data => ({ type: GET_PERSON_REVIEWS_SUCCESS, data });

export const GET_PERSON_REVIEWS_FAILURE = 'GET_PERSON_REVIEWS_FAILURE';
export const getPersonReviewsFailure = message => ({ type: GET_PERSON_REVIEWS_FAILURE, message });
