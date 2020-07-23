import {
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  MOVE_TO_SESSION_INFO_SUCCESS,
  MOVE_TO_SESSION_INFO_ATTEMPT,
} from '../actions/notifications';

const initialState = {
  showNotification: false,
  notification: null,
  notificationData: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        showNotification: true,
        notification: action.data,
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        showNotification: false,
      };
    case MOVE_TO_SESSION_INFO_ATTEMPT:
      return {
        ...state,
        notificationData: null,
      };
    case MOVE_TO_SESSION_INFO_SUCCESS:
      return {
        ...state,
        notificationData: action.data.notificationData,
      };
    default:
      return state;
  }
};
