import * as ACTIONS from '../actions/userDetails';

const initialState = {
  selftapePro: null,
  isLoading: false,
  member: null,
  msg: '',
  membershipUpdate: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTIONS.GET_DETAILS_ATTEMPT:
    case ACTIONS.BECOME_MEMBER_ATTEMPT:
    case ACTIONS.GET_MEMBER_ATTEMPT:
    case ACTIONS.ADD_CARD_ATTEMPT:
    case ACTIONS.CHANGE_DEFAULT_CARD_ATTEMPT:
    case ACTIONS.DELETE_CARD_ATTEMPT:
    case ACTIONS.CHANGE_CARD_ATTEMPT:
    case ACTIONS.ADD_EXTERNAL_ACCOUNT_ATTEMPT:
    case ACTIONS.UPDATE_BANK_ACCOUNT_ATTEMPT:
      return {
        ...state,
        isLoading: true,
      };
    case ACTIONS.GET_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.data,
      };
    case ACTIONS.GET_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        selftapePro: null,
      };
    case ACTIONS.SET_MEMBERSHIP_ATTEMPT:
    case ACTIONS.SAVE_MEMBER_ATTEMPT:
      return {
        ...state,
        membershipUpdate: true,
      };
    case ACTIONS.SET_MEMBERSHIP_SUCCESS:
    case ACTIONS.SAVE_MEMBER_SUCCESS:
    case ACTIONS.SET_MEMBERSHIP_FAILURE:
    case ACTIONS.SAVE_MEMBER_FAILURE:
      return {
        ...state,
        membershipUpdate: false,
      };
    case ACTIONS.BECOME_MEMBER_SUCCESS:
    case ACTIONS.GET_MEMBER_SUCCESS:
    case ACTIONS.ADD_CARD_SUCCESS:
    case ACTIONS.CHANGE_DEFULT_CARD_SUCCESS:
    case ACTIONS.DELETE_CARD_SUCCESS:
    case ACTIONS.CHANGE_CARD_SUCCESS:
    case ACTIONS.ADD_EXTERNAL_ACCOUNT_SUCCESS:
    case ACTIONS.CREATE_STRIPE_ACCOUNT_SUCCESS:
      return {
        ...state,
        member: action.data,
        isLoading: false,
      };
    case ACTIONS.BECOME_MEMBER_FAILURE:
    case ACTIONS.GET_MEMBER_FAILURE:
    case ACTIONS.ADD_CARD_FAILURE:
    case ACTIONS.CHANGE_DEFULT_CARD_FAILURE:
    case ACTIONS.DELETE_CARD_FAILURE:
    case ACTIONS.CHANGE_CARD_FAILURE:
    case ACTIONS.ADD_EXTERNAL_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case ACTIONS.CLEAR_MEMBER:
      return {
        ...state,
        member: null,
      };
    default:
      return state;
  }
};
