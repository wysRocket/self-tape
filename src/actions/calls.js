export const MAKE_CALL_ATTEMPT = 'MAKE_CALL_ATTEMPT';
export const makeCallAttempt = data => ({ type: MAKE_CALL_ATTEMPT, data });

export const MAKE_CALL_SUCCESS = 'MAKE_CALL_SUCCESS';
export const makeCallSuccess = () => ({ type: MAKE_CALL_SUCCESS });

export const MAKE_CALL_FAILURE = 'MAKE_CALL_FAILURE';
export const makeCallFailure = message => ({ type: MAKE_CALL_FAILURE, message });
