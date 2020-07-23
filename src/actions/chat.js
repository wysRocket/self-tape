export const CREATE_OR_GET_CHAT_ATTEMPT = 'CREATE_OR_GET_CHAT_ATTEMPT';
export const createOrGetChatAttempt = data => ({ type: CREATE_OR_GET_CHAT_ATTEMPT, data });

export const CREATE_OR_GET_CHAT_SUCCESS = 'CREATE_OR_GET_CHAT_SUCCESS';
export const createOrGetChatSuccess = data => ({ type: CREATE_OR_GET_CHAT_SUCCESS, data });

export const CREATE_OR_GET_CHAT_FAILURE = 'CREATE_OR_GET_CHAT_FAILURE';
export const createOrGetChatFailure = message => ({ type: CREATE_OR_GET_CHAT_FAILURE, message });

export const UPDATE_CHAT_ATTEMPT = 'UPDATE_CHAT_ATTEMPT';
export const updateChatAttempt = data => ({ type: UPDATE_CHAT_ATTEMPT, data });

export const UPDATE_CHAT_SUCCESS = 'UPDATE_CHAT_SUCCESS';
export const updateChatSuccess = data => ({ type: UPDATE_CHAT_SUCCESS, data });

export const UPDATE_CHAT_FAILURE = 'UPDATE_CHAT_FAILURE';
export const updateChatFailure = message => ({ type: UPDATE_CHAT_FAILURE, message });

export const SEND_MESSAGE_ATTEMPT = 'SEND_MESSAGE_ATTEMPT';
export const sendMessageAttempt = data => ({ type: SEND_MESSAGE_ATTEMPT, data });

export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const sendMessageSuccess = data => ({ type: SEND_MESSAGE_SUCCESS, data });

export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
export const sendMessageFailure = message => ({ type: SEND_MESSAGE_FAILURE, message });

export const LOAD_MORE_CHAT_DATA_ATTEMPT = 'LOAD_MORE_CHAT_DATA_ATTEMPT';
export const loadMoreChatDataAttempt = data => ({ type: LOAD_MORE_CHAT_DATA_ATTEMPT, data });

export const LOAD_MORE_CHAT_DATA_SUCCESS = 'LOAD_MORE_CHAT_DATA_SUCCESS';
export const loadMoreChatDataSuccess = data => ({ type: LOAD_MORE_CHAT_DATA_SUCCESS, data });

export const LOAD_MORE_CHAT_DATA_FAILURE = 'LOAD_MORE_CHAT_DATA_FAILURE';
export const loadMoreChatDataFailure = message => ({ type: LOAD_MORE_CHAT_DATA_FAILURE, message });

export const CLEAR_CHAT_DATA = 'CLEAR_CHAT_DATA';
export const clearChatData = () => ({ type: CLEAR_CHAT_DATA });
