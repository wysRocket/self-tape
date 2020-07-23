/* AUDITIONS */

export const CREATE_AUDITIONS_ATTEMPT = 'CREATE_AUDITIONS_ATTEMPT';
export const createAuditionsAttempt = data => ({ type: CREATE_AUDITIONS_ATTEMPT, data });

export const CREATE_AUDITIONS_SUCCESS = 'CREATE_AUDITIONS_SUCCESS';
export const createAuditionsSuccess = data => ({ type: CREATE_AUDITIONS_SUCCESS, data });

export const CREATE_AUDITIONS_FAILURE = 'CREATE_AUDITIONS_FAILURE';
export const createAuditionsFailure = message => ({ type: CREATE_AUDITIONS_FAILURE, message });

export const GET_AUDITIONS_ATTEMPT = 'GET_AUDITIONS_ATTEMPT';
export const getAuditionsAttempt = data => ({ type: GET_AUDITIONS_ATTEMPT, data });

export const REFRESH_AUDITIONS_ATTEMPT = 'REFRESH_AUDITIONS_ATTEMPT';
export const refreshAuditionsAttempt = data => ({ type: REFRESH_AUDITIONS_ATTEMPT, data });

export const GET_AUDITIONS_SUCCESS = 'GET_AUDITIONS_SUCCESS';
export const getAuditionsSuccess = data => ({ type: GET_AUDITIONS_SUCCESS, data });

export const GET_AUDITIONS_FAILURE = 'GET_AUDITIONS_FAILURE';
export const getAuditionsFailure = () => ({ type: GET_AUDITIONS_FAILURE });
