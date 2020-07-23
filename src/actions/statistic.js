export const GET_SESSIONS_STATS_ATTEMPT = 'GET_SESSIONS_STATS_ATTEMPT';
export const getSessionsStats = () => ({ type: GET_SESSIONS_STATS_ATTEMPT });

export const REFRESH_SESSIONS_STATS_ATTEMPT = 'REFRESH_SESSIONS_STATS_ATTEMPT';
export const refreshSessionsStats = () => ({ type: REFRESH_SESSIONS_STATS_ATTEMPT });

export const GET_SESSIONS_STATS_SUCCESS = 'GET_SESSIONS_STATS_SUCCESS';
export const getSessionsStatsSuccess = data => ({ type: GET_SESSIONS_STATS_SUCCESS, data });

export const GET_SESSIONS_STATS_FAILURE = 'GET_SESSIONS_STATS_FAILURE';
export const getSessionsStatsFailure = error => ({ type: GET_SESSIONS_STATS_FAILURE, error });
