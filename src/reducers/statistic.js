import {
  GET_SESSIONS_STATS_ATTEMPT, REFRESH_SESSIONS_STATS_ATTEMPT,
  GET_SESSIONS_STATS_FAILURE, GET_SESSIONS_STATS_SUCCESS,
} from '../actions/statistic';

const initialState = {
  sessionStats: {},
  isLoading: false,
  isRefreshing: false,
  msg: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_SESSIONS_STATS_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        msg: '',
      };
    case REFRESH_SESSIONS_STATS_ATTEMPT:
      return {
        ...state,
        isRefreshing: true,
        msg: '',
      };
    case GET_SESSIONS_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        sessionsStats: action.data,
        msg: '',
      };
    case GET_SESSIONS_STATS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        msg: action.message,
      };
    default:
      return state;
  }
};

