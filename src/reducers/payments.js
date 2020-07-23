import * as ACTIONS from '../actions/payment';

const initialState = {
  isLoadingPayment: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTIONS.MEMBERSHIP_PAY_ATTEMPT:
      return {
        ...state,
        isLoadingPayment: true,
      };
    case ACTIONS.MEMBERSHIP_PAY_SUCCESS:
    case ACTIONS.MEMBERSHIP_PAY_FAILURE:
      return {
        ...state,
        isLoadingPayment: false,
      };
    default:
      return state;
  }
};
