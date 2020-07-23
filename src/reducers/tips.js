import {
  CREATE_TIPS_ATTEMPT,
  REFRESH_TIPS_ATTEMPT,
  CREATE_TIPS_SUCCESS,
  CREATE_TIPS_FAILURE,
  GET_TIPS_ATTEMPT,
  GET_TIPS_SUCCESS,
  GET_TIPS_FAILURE,
} from '../actions/tips';

const initialState = {
  tips: null,
  isLoading: false,
  isReady: false,
  isRefreshing: false,
  msg: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_TIPS_ATTEMPT:
    case GET_TIPS_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        isReady: false,
        isRefreshing: false,
        msg: '',
      };
    case REFRESH_TIPS_ATTEMPT:
      return {
        ...state,
        isLoading: false,
        isReady: false,
        isRefreshing: true,
        msg: '',
      };
    case CREATE_TIPS_SUCCESS:
    case GET_TIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        tips: action.data,
        msg: '',
      };
    case CREATE_TIPS_FAILURE:
    case GET_TIPS_FAILURE:
      return {
        ...state,
        tips: [],
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        msg: action.message,
      };
    default:
      return state;
  }
};
