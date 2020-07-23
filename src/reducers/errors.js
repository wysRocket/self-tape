import { SHOW_ALERT, CLEAR_ALERT } from '../actions/errors';

const initialState = {
  alertMsg: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        alertMsg: action.data,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        alertMsg: '',
      };
    default:
      return state;
  }
};
