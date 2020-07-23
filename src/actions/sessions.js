/** Sessions */
export const CREATE_SESSIONS_ATTEMPT = 'CREATE_SESSIONS_ATTEMPT';
export const createSessionsAttempt = () => ({ type: CREATE_SESSIONS_ATTEMPT });

export const REFRESH_SESSIONS_ATTEMPT = 'REFRESH_SESSIONS_ATTEMPT';
export const refreshSessionsAttempt = data => ({ type: REFRESH_SESSIONS_ATTEMPT, data });

export const CREATE_SESSIONS_SUCCESS = 'CREATE_SESSIONS_SUCCESS';
export const createSessionsSuccess = data => ({ type: CREATE_SESSIONS_SUCCESS, data });

export const CREATE_SESSIONS_FAILURE = 'CREATE_SESSIONS_FAILURE';
export const createSessionsFailure = message => ({ type: CREATE_SESSIONS_FAILURE, message });

export const GET_SESSION_ATTEMPT = 'GET_SESSION_ATTEMPT';
export const getSessionAttempt = data => ({ type: GET_SESSION_ATTEMPT, data });

export const REFRESH_SESSION_ATTEMPT = 'REFRESH_SESSION_ATTEMPT';
export const refreshSessionAttempt = data => ({ type: REFRESH_SESSION_ATTEMPT, data });

export const GET_SESSION_SUCCESS = 'GET_SESSION_SUCCESS';
export const getSessionSuccess = data => ({ type: GET_SESSION_SUCCESS, data });

export const GET_SESSION_FAILURE = 'GET_SESSION_FAILURE';
export const getSessionFailure = () => ({ type: GET_SESSION_FAILURE });

export const GET_SESSIONS_ATTEMPT = 'GET_SESSIONS_ATTEMPT';
export const getSessionsAttempt = data => ({ type: GET_SESSIONS_ATTEMPT, data });

export const GET_SESSIONS_SUCCESS = 'GET_SESSIONS_SUCCESS';
export const getSessionsSuccess = data => ({ type: GET_SESSIONS_SUCCESS, data });

export const GET_SESSIONS_FAILURE = 'GET_SESSIONS_FAILURE';
export const getSessionsFailure = () => ({ type: GET_SESSIONS_FAILURE });

export const SESSIONS_UPDATE_ATTEMPT = 'SESSIONS_UPDATE_ATTEMPT';
export const sessionsUpdateAttempt = sessionInfo => ({
  type: SESSIONS_UPDATE_ATTEMPT, sessionInfo,
});

export const SESSIONS_UPDATE = 'SESSIONS_UPDATE';
export const sessionsUpdate = data => ({ type: SESSIONS_UPDATE, data });

export const UPLOAD_FILES_ATTEMPT = 'UPLOAD_FILES_ATTEMPT';
export const uploadFilesAttempt = (data, cb = () => {}) => ({
  type: UPLOAD_FILES_ATTEMPT, data, cb,
});

export const UPLOAD_FILES_SUCCESS = 'UPLOAD_FILES_SUCCESS';
export const uploadFilesSuccess = data => ({ type: UPLOAD_FILES_SUCCESS, data });

export const UPLOAD_FILES_FAILURE = 'UPLOAD_FILES_FAILURE';
export const uploadFilesFailure = message => ({ type: UPLOAD_FILES_FAILURE, message });

export const GET_BOOK_DATA_ATTEMPT = 'GET_BOOK_DATA_ATTEMPT';
export const getBookDataAttempt = data => ({ type: GET_BOOK_DATA_ATTEMPT, data });

export const GET_BOOK_DATA_SUCCESS = 'GET_BOOK_DATA_SUCCESS';
export const getBookDataSuccess = data => ({ type: GET_BOOK_DATA_SUCCESS, data });

export const GET_BOOK_DATA_FAILURE = 'GET_BOOK_DATA_FAILURE';
export const getBookDataFailure = message => ({ type: GET_BOOK_DATA_FAILURE, message });

// Download file

export const DOWNLOAD_FILE_ATTEMPT = 'DOWNLOAD_FILE_ATTEMPT';
export const downloadFileAttempt = data => ({ type: DOWNLOAD_FILE_ATTEMPT, data });

export const DOWNLOAD_FILE_SUCCESS = 'DOWNLOAD_FILE_SUCCESS';
export const downloadFileSuccess = data => ({ type: DOWNLOAD_FILE_SUCCESS, data });

export const DOWNLOAD_FILE_FAILURE = 'DOWNLOAD_FILE_FAILURE';
export const downloadFileFailure = message => ({ type: DOWNLOAD_FILE_FAILURE, message });

export const GET_NOT_VIEWED_SESSIONS_ATTEMPT = 'GET_NOT_VIEWED_SESSIONS_ATTEMPT';
export const getNotViewedSessionsAttempt = data => ({
  type: GET_NOT_VIEWED_SESSIONS_ATTEMPT, data,
});

export const GET_NOT_VIEWED_SESSIONS_SUCCESS = 'GET_NOT_VIEWED_SESSIONS_SUCCESS';
export const getNotViewedSessionsSuccess = data => ({
  type: GET_NOT_VIEWED_SESSIONS_SUCCESS, data,
});

export const GET_NOT_VIEWED_SESSIONS_FAILURE = 'GET_NOT_VIEWED_SESSIONS_FAILURE';
export const notViewedSessionsFailure = message => ({
  type: GET_NOT_VIEWED_SESSIONS_FAILURE, message,
});
