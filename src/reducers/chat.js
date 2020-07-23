import * as ACTIONS from '../actions/chat';
import { locale } from '../constants/textConstants';

export const paginationLimit = 15;

const initialState = {
  isLoading: false,
  isSending: false,
  isLoadingMore: false,
  messages: [],
  chat: null,
  hasPreviousPage: true,
  limit: paginationLimit,
  msg: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTIONS.CREATE_OR_GET_CHAT_ATTEMPT:
      return {
        ...state,
        isLoading: true,
      };
    case ACTIONS.CREATE_OR_GET_CHAT_SUCCESS:
    case ACTIONS.UPDATE_CHAT_SUCCESS:
      return {
        ...state,
        messages: action.data.messages,
        chat: action.data.chat,
        msg: action.data.messages.length === 0 ? locale.writeYourFirstMessage : '',
        isLoading: false,
      };
    case ACTIONS.CREATE_OR_GET_CHAT_FAILURE:
    case ACTIONS.UPDATE_CHAT_FAILURE:
      return {
        ...state,
        msg: action.message,
        isLoading: false,
      };
    case ACTIONS.SEND_MESSAGE_ATTEMPT:
      return {
        ...state,
        isSending: true,
      };
    case ACTIONS.SEND_MESSAGE_SUCCESS:
    case ACTIONS.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        isSending: false,
      };
    case ACTIONS.LOAD_MORE_CHAT_DATA_ATTEMPT:
      return {
        ...state,
        isLoadingMore: true,
      };
    case ACTIONS.LOAD_MORE_CHAT_DATA_SUCCESS:
      return {
        ...state,
        limit: action.data.limit,
        hasPreviousPage: action.data.hasPreviousPage,
        isLoadingMore: false,
      };
    case ACTIONS.CLEAR_CHAT_DATA:
      return {
        ...state,
        isLoading: false,
        isSending: false,
        isLoadingMore: false,
        messages: [],
        chat: null,
        hasPreviousPage: true,
        limit: paginationLimit,
        msg: '',
      };
    default:
      return state;
  }
};
