import {
  CREATE_AUDITIONS_ATTEMPT,
  CREATE_AUDITIONS_SUCCESS,
  CREATE_AUDITIONS_FAILURE,
  GET_AUDITIONS_ATTEMPT,
  GET_AUDITIONS_SUCCESS,
  GET_AUDITIONS_FAILURE,
  REFRESH_AUDITIONS_ATTEMPT,
} from '../actions/auditions';

const initialState = {
  auditions: null,
  isLoading: false,
  isReady: false,
  isRefreshing: false,
  msg: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_AUDITIONS_ATTEMPT:
    case GET_AUDITIONS_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        isReady: false,
        isRefreshing: false,
        msg: '',
      };
    case REFRESH_AUDITIONS_ATTEMPT:
      return {
        ...state,
        isLoading: false,
        isReady: false,
        isRefreshing: true,
        msg: '',
      };
    case CREATE_AUDITIONS_SUCCESS:
    case GET_AUDITIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        auditions: action.data,
        msg: '',
      };
    case CREATE_AUDITIONS_FAILURE:
    case GET_AUDITIONS_FAILURE:
      return {
        ...state,
        auditions: [],
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        msg: action.message,
      };
    default:
      return state;
  }
};
