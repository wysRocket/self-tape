import * as ACTIONS from '../actions/book';

const initialState = {
  location: null,
  practitioner: null,
  selectedTime: null,
  selectedDate: null,
  auditionDetails: null,
  visibleMinutesPopup: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTIONS.SET_LOCATION:
      return {
        ...state,
        location: action.data,
      };
    case ACTIONS.SET_PRACTITIONER:
      return {
        ...state,
        practitioner: action.data,
      };
    case ACTIONS.SET_BOOK_AGAIN_DATA:
      return {
        ...state,
        practitioner: action.data.practitioner,
        location: action.data.location,
      };
    case ACTIONS.SET_DATE_TIME:
      return {
        ...state,
        selectedTime: action.data.selectedTime,
        selectedDate: action.data.selectedDate,
      };
    case ACTIONS.SET_AUDITION_DETAILS:
      return {
        ...state,
        auditionDetails: action.data,
      };
    case ACTIONS.TOGGLE_MINUTES_POPUP:
      return {
        ...state,
        visibleMinutesPopup: action.data.visibleMinutesPopup,
      };
    default:
      return state;
  }
};
