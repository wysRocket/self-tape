/* tips */

export const CREATE_TIPS_ATTEMPT = 'CREATE_TIPS_ATTEMPT';
export const createTipsAttempt = data => ({ type: CREATE_TIPS_ATTEMPT, data });

export const CREATE_TIPS_SUCCESS = 'CREATE_TIPS_SUCCESS';
export const createTipsSuccess = data => ({ type: CREATE_TIPS_SUCCESS, data });

export const CREATE_TIPS_FAILURE = 'CREATE_TIPS_FAILURE';
export const createTipsFailure = message => ({ type: CREATE_TIPS_FAILURE, message });

export const GET_TIPS_ATTEMPT = 'GET_TIPS_ATTEMPT';
export const getTipsAttempt = data => ({ type: GET_TIPS_ATTEMPT, data });

export const REFRESH_TIPS_ATTEMPT = 'REFRESH_TIPS_ATTEMPT';
export const refreshTipsAttempt = data => ({ type: REFRESH_TIPS_ATTEMPT, data });

export const GET_TIPS_SUCCESS = 'GET_TIPS_SUCCESS';
export const getTipsSuccess = data => ({ type: GET_TIPS_SUCCESS, data });

export const GET_TIPS_FAILURE = 'GET_TIPS_FAILURE';
export const getTipsFailure = () => ({ type: GET_TIPS_FAILURE });
