export const IS_ERROR = 'IS_ERROR';
export const isError = (msg, screen) => ({ type: IS_ERROR, msg, screen });

export const SHOW_ALERT = 'SHOW_ALERT';
export const showAlert = data => ({ type: SHOW_ALERT, data });

export const CLEAR_ALERT = 'CLEAR_ALERT';
export const clearAlert = () => ({ type: CLEAR_ALERT });
