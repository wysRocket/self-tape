export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const showNotification = data => ({ type: SHOW_NOTIFICATION, data });

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const hideNotification = () => ({ type: HIDE_NOTIFICATION });

export const SEND_NOTIFICATIONS_ATTEMPT = 'SEND_NOTIFICATIONS_ATTEMPT';
export const sendNotificationsAttempt = data => ({ type: SEND_NOTIFICATIONS_ATTEMPT, data });

export const SEND_NOTIFICATIONS_SUCCESS = 'SEND_NOTIFICATIONS_SUCCESS';
export const sendNotificationsSuccess = data => ({ type: SEND_NOTIFICATIONS_SUCCESS, data });

export const SEND_NOTIFICATIONS_FAILURE = 'SEND_NOTIFICATIONS_FAILURE';
export const sendNotificationsFailure = () => ({ type: SEND_NOTIFICATIONS_FAILURE });

// engine
export const MOVE_TO_SCHEDULE = 'MOVE_TO_SCHEDULE';
export const moveToSchedule = data => ({ type: MOVE_TO_SCHEDULE, data });

export const MOVE_TO_CHECK_IN_OUT = 'MOVE_TO_CHECK_IN_OUT';
export const moveToCheckInOut = data => ({ type: MOVE_TO_CHECK_IN_OUT, data });

export const MOVE_TO_SESSION_INFO_ATTEMPT = 'MOVE_TO_SESSION_INFO_ATTEMPT';
export const moveToSessionInfoAttempt = data => ({ type: MOVE_TO_SESSION_INFO_ATTEMPT, data });

export const MOVE_TO_SESSION_INFO_SUCCESS = 'MOVE_TO_SESSION_INFO_SUCCESS';
export const moveToSessionInfoSuccess = data => ({ type: MOVE_TO_SESSION_INFO_SUCCESS, data });

export const MOVE_TO_CHAT_ATTEMPT = 'MOVE_TO_CHAT_ATTEMPT';
export const moveToChatAttempt = data => ({ type: MOVE_TO_CHAT_ATTEMPT, data });

export const MOVE_TO_CHAT_SUCCESS = 'MOVE_TO_CHAT_SUCCESS';
export const moveToChatSuccess = data => ({ type: MOVE_TO_CHAT_SUCCESS, data });

export const SEND_SMS = 'SEND_SMS';
export const sendSMS = data => ({ type: SEND_SMS, data });
