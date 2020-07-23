import * as ACTIONS from '../actions/authorization';
import { SET_MEMBERSHIP_SUCCESS } from '../actions/userDetails';

const initialState = {
  user: null,
  profile: null,
  profilesByLocation: [],
  isLoading: false,
  isReady: false,
  isRefreshing: false,
  msg: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTIONS.LOGIN_ATTEMPT:
    case ACTIONS.SIGNUP_ATTEMPT:
    case ACTIONS.PROFILES_BY_LOCATIONS_ATTEMPT:
    case ACTIONS.PROFILE_UPDATE_ATTEMPT:
    case ACTIONS.GET_PROFILE_ATTEMPT:
    case ACTIONS.SET_CONFIGURED_ATTEMPT:
    case ACTIONS.RESET_PASSWORD_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        isReady: false,
        isRefreshing: false,
        msg: '',
      };
    case ACTIONS.REFRESH_PROFILE_ATTEMPT:
    case ACTIONS.REFRESH_PROFILES_BY_LOCATIONS_ATTEMPT:
      return {
        ...state,
        isLoading: false,
        isReady: false,
        isRefreshing: true,
        msg: '',
      };
    case ACTIONS.LOGIN_SUCCESS:
    case ACTIONS.GET_PROFILE_SUCCESS:
    case ACTIONS.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        user: action.data.user,
        profile: action.data.profile,
        msg: '',
      };
    case ACTIONS.PROFILE_UPDATE_SUCCESS:
    case ACTIONS.SET_CONFIGURED_SUCCESS:
    case ACTIONS.SET_CONFIGURED_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        profile: action.data,
        msg: '',
      };
    case ACTIONS.PROFILE_UPDATE_FAILURE:
    case ACTIONS.SET_CONFIGURED_FAILURE:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        msg: '',
      };
    case ACTIONS.LOGIN_FAILURE:
    case ACTIONS.SIGNUP_FAILURE:
      return {
        ...state,
        user: null,
        profile: null,
        isLoading: false,
        isReady: true,
        msg: action.message,
      };
    case ACTIONS.CHECK_AGAIN:
      return {
        ...state,
        profile: null,
        isLoading: false,
        msg: '',
      };
    case ACTIONS.GET_PROFILE_FAILURE:
    case ACTIONS.RESET_PASSWORD_FAILURE:
      return {
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        msg: action.message,
      };
    case ACTIONS.USER_EXIST:
      return {
        ...state,
        isReady: false,
      };
    case ACTIONS.USER_NOT_EXIST:
      return {
        ...state,
        isReady: true,
      };
    case ACTIONS.SIGN_OUT_ATTEMPT:
      return {
        ...state,
        isLoading: true,
      };
    case ACTIONS.SIGN_OUT_SUCCESS:
    case ACTIONS.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
      };
    case ACTIONS.PROFILES_BY_LOCATIONS_SUCCESS:
      return {
        ...state,
        profilesByLocation: action.data,
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        msg: '',
      };
    case ACTIONS.PROFILES_BY_LOCATIONS_FAILURE:
      return {
        ...state,
        profilesByLocation: [],
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        msg: '',
      };
    case SET_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          membership: action.membership,
        },
      };
    default:
      return state;
  }
};
