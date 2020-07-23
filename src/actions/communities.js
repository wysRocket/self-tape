/** communities */

export const GET_COMMUNITIES_ATTEMPT = 'GET_COMMUNITIES_ATTEMPT';
export const getCommunitiesAttempt = () => ({ type: GET_COMMUNITIES_ATTEMPT });

export const GET_COMMUNITIES_SUCCESS = 'GET_COMMUNITIES_SUCCESS';
export const getCommunitiesSuccess = data => ({ type: GET_COMMUNITIES_SUCCESS, data });

export const GET_COMMUNITIES_FAILURE = 'GET_COMMUNITIES_FAILURE';
export const getCommunitiesFailure = () => ({ type: GET_COMMUNITIES_FAILURE });
