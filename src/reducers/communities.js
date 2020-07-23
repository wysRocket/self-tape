import {
  GET_COMMUNITIES_ATTEMPT,
  GET_COMMUNITIES_SUCCESS,
  GET_COMMUNITIES_FAILURE,
} from '../actions/communities';

const initialState = {
  communities: [],
  isLoading: false,
  isReady: false,
  msg: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_COMMUNITIES_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        isReady: false,
        msg: '',
      };
    case GET_COMMUNITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        communities: action.data,
        msg: '',
      };
    case GET_COMMUNITIES_FAILURE:
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
