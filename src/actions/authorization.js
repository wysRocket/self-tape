/** Login */
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const loginAttempt = (
  email,
  password,
  role,
) => ({
  type: LOGIN_ATTEMPT, email, password, role,
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = data => ({ type: LOGIN_SUCCESS, data });

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = message => ({ type: LOGIN_FAILURE, message });

export const CHECK_AGAIN = 'CHECK_AGAIN';
export const checkAgain = () => ({ type: CHECK_AGAIN });


/** SignUp */
export const SIGNUP_ATTEMPT = 'SIGNUP_ATTEMPT';
export const signUpAttempt = (
  username,
  email,
  password,
  role,
  passwordConfirmation,
) => ({
  type: SIGNUP_ATTEMPT, username, email, password, role, passwordConfirmation,
});

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signUpSuccess = data => ({ type: SIGNUP_SUCCESS, data });

export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const signUpFailure = message => ({ type: SIGNUP_FAILURE, message });

export const USER_EXIST = 'USER_EXIST';
export const userExist = (data, cb = () => {}) => ({ type: USER_EXIST, data, cb });

export const USER_NOT_EXIST = 'USER_NOT_EXIST';
export const userNotExist = () => ({ type: USER_NOT_EXIST });

export const SIGN_OUT_ATTEMPT = 'SIGN_OUT_ATTEMPT';
export const signOutAttempt = () => ({ type: SIGN_OUT_ATTEMPT });

export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const signOutSuccess = () => ({ type: SIGN_OUT_SUCCESS });

export const PROFILES_BY_LOCATIONS_ATTEMPT = 'PROFILES_BY_LOCATIONS_ATTEMPT';
export const profilesByLocationsAttempt = locationUid => ({
  type: PROFILES_BY_LOCATIONS_ATTEMPT,
  locationUid,
});

export const REFRESH_PROFILES_BY_LOCATIONS_ATTEMPT = 'REFRESH_PROFILES_BY_LOCATIONS_ATTEMPT';
export const refreshProfilesByLocationsAttempt = locationUid => ({
  type: REFRESH_PROFILES_BY_LOCATIONS_ATTEMPT,
  locationUid,
});

export const PROFILES_BY_LOCATIONS_SUCCESS = 'PROFILES_BY_LOCATIONS_SUCCESS';
export const profilesByLocationsSuccess = data => ({ type: PROFILES_BY_LOCATIONS_SUCCESS, data });

export const PROFILES_BY_LOCATIONS_FAILURE = 'PROFILES_BY_LOCATIONS_FAILURE';
export const profilesByLocationsFailure = data => ({ type: PROFILES_BY_LOCATIONS_FAILURE, data });

export const PROFILE_UPDATE_ATTEMPT = 'PROFILE_UPDATE_ATTEMPT';
export const profileUpdateAttempt = data => ({ type: PROFILE_UPDATE_ATTEMPT, data });

export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const profileUpdateSuccess = data => ({ type: PROFILE_UPDATE_SUCCESS, data });

export const PROFILE_UPDATE_FAILURE = 'PROFILE_UPDATE_FAILURE';
export const profileUpdateFailure = message => ({ type: PROFILE_UPDATE_FAILURE, message });

export const GET_PROFILE_ATTEMPT = 'GET_PROFILE_ATTEMPT';
export const getProfileAttempt = data => ({ type: GET_PROFILE_ATTEMPT, data });

export const REFRESH_PROFILE_ATTEMPT = 'REFRESH_PROFILE_ATTEMPT';
export const refreshProfileAttempt = data => ({ type: REFRESH_PROFILE_ATTEMPT, data });

export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const getProfileSuccess = data => ({ type: GET_PROFILE_SUCCESS, data });

export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
export const getProfileFailure = message => ({ type: GET_PROFILE_FAILURE, message });

export const SET_CONFIGURED_ATTEMPT = 'SET_CONFIGURED_ATTEMPT';
export const setConfiguredAttempt = data => ({ type: SET_CONFIGURED_ATTEMPT, data });

export const SET_CONFIGURED_SUCCESS = 'SET_CONFIGURED_SUCCESS';
export const setConfigurerdSuccess = data => ({ type: SET_CONFIGURED_SUCCESS, data });

export const SET_CONFIGURED_USER_SUCCESS = 'SET_CONFIGURED_USER_SUCCESS';
export const setConfiguredUserSuccess = data => ({ type: SET_CONFIGURED_USER_SUCCESS, data });

export const SET_CONFIGURED_FAILURE = 'SET_CONFIGURED_FAILURE';
export const setConfigurerdFailure = message => ({ type: SET_CONFIGURED_FAILURE, message });

export const SET_ABOUT_YOU_INFO_ATTEMPT = 'SET_ABOUT_YOU_INFO_ATTEMPT';
export const setAboutYouInfoAttempt = data => ({ type: SET_ABOUT_YOU_INFO_ATTEMPT, data });

export const SET_ABOUT_YOU_INFO_SUCCESS = 'SET_ABOUT_YOU_INFO_SUCCESS';
export const setAboutYouInfoSuccess = data => ({ type: SET_ABOUT_YOU_INFO_SUCCESS, data });

export const SET_ABOUT_YOU_INFO_FAILURE = 'SET_ABOUT_YOU_INFO_FAILURE';
export const setAboutYouInfoFailure = message => ({ type: SET_ABOUT_YOU_INFO_FAILURE, message });

export const RESET_PASSWORD_ATTEMPT = 'RESET_PASSWORD_ATTEMPT';
export const resetPasswordAttempt = data => ({ type: RESET_PASSWORD_ATTEMPT, data });

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const resetPasswordSuccess = data => ({ type: RESET_PASSWORD_SUCCESS, data });

export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const resetPasswordFailure = message => ({ type: RESET_PASSWORD_FAILURE, message });

export const SAVE_FCM_ATTEMPT = 'SAVE_FCM_ATTEMPT';
export const saveFcmAttempt = data => ({ type: SAVE_FCM_ATTEMPT, data });

export const SAVE_FCM_SUCCESS = 'SAVE_FCM_SUCCESS';
export const saveFcmSuccess = data => ({ type: SAVE_FCM_SUCCESS, data });

export const SAVE_FCM_FAILURE = 'SAVE_FCM_FAILURE';
export const saveFcmFaulire = message => ({ type: SAVE_FCM_FAILURE, message });