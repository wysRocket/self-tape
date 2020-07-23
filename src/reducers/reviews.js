import {
  GET_PERSON_REVIEWS_ATTEMPT,
  GET_PERSON_REVIEWS_SUCCESS,
  GET_PERSON_REVIEWS_FAILURE,
  REFRESH_PERSON_REVIEWS_ATTEMPT,
} from '../actions/reviews';

const initialState = {
  personReviews: [],
  isLoading: false,
  isRefreshing: false,
  isReady: false,
  msg: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_PERSON_REVIEWS_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        isReady: false,
        isRefreshing: false,
        msg: '',
      };
    case GET_PERSON_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        personReviews: action.data,
        msg: '',
      };
    case GET_PERSON_REVIEWS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        msg: action.message,
      };
    case REFRESH_PERSON_REVIEWS_ATTEMPT:
      return {
        ...state,
        isRefreshing: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
