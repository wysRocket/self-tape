import * as ACTIONS from '../actions/sessions';

const initialState = {
  sessions: null,
  isLoading: false,
  isReady: false,
  isRefreshing: false,
  lastSession: null,
  currentHourSession: null,
  bookData: null,
  msg: '',
  countNewSessions: 0,
  countNotAccepted: 0,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTIONS.CREATE_SESSIONS_ATTEMPT:
    case ACTIONS.GET_SESSIONS_ATTEMPT:
    case ACTIONS.SESSIONS_UPDATE_ATTEMPT:
    case ACTIONS.UPLOAD_FILES_ATTEMPT:
    case ACTIONS.GET_SESSION_ATTEMPT:
    case ACTIONS.GET_BOOK_DATA_ATTEMPT:
    case ACTIONS.DOWNLOAD_FILE_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        isReady: false,
        isRefreshing: false,
        msg: '',
      };
    case ACTIONS.REFRESH_SESSION_ATTEMPT:
    case ACTIONS.REFRESH_SESSIONS_ATTEMPT:
      return {
        ...state,
        isLoading: false,
        isReady: false,
        isRefreshing: true,
        msg: '',
      };
    case ACTIONS.DOWNLOAD_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: false,
        isRefreshing: false,
        msg: '',
      };
    case ACTIONS.GET_SESSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        sessions: action.data,
        msg: '',
      };
    case ACTIONS.GET_BOOK_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        bookData: action.data,
        msg: '',
      };
    case ACTIONS.CREATE_SESSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        lastSession: action.data,
        msg: '',
      };
    case ACTIONS.GET_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        isReady: true,
        currentHourSession: action.data,
        msg: '',
      };
    case ACTIONS.UPLOAD_FILES_SUCCESS:
    case ACTIONS.SESSIONS_UPDATE:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        msg: '',
      };
    case ACTIONS.GET_NOT_VIEWED_SESSIONS_SUCCESS:
      return {
        ...state,
        countNewSessions: action.data.newSessions,
        countNotAccepted: action.data.notAccepted,
      };
    case ACTIONS.CREATE_SESSIONS_FAILURE:
    case ACTIONS.GET_SESSION_FAILURE:
    case ACTIONS.GET_SESSIONS_FAILURE:
    case ACTIONS.GET_BOOK_DATA_FAILURE:
      return {
        ...state,
        sessions: [],
        isLoading: false,
        isRefreshing: false,
        isReady: true,
        msg: action.message,
      };
    case ACTIONS.UPLOAD_FILES_FAILURE:
    case ACTIONS.DOWNLOAD_FILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        msg: action.message,
      };
    default:
      return state;
  }
};
