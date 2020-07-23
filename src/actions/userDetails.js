
export const GET_DETAILS_ATTEMPT = 'GET_DETAILS_ATTEMPT';
export const getDetailsAttempt = () => ({ type: GET_DETAILS_ATTEMPT });

export const GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS';
export const getDetailsSuccess = data => ({ type: GET_DETAILS_SUCCESS, data });

export const GET_DETAILS_FAILURE = 'GET_DETAILS_FAILURE';
export const getDetailsFailure = message => ({ type: GET_DETAILS_FAILURE, message });

export const SET_MEMBERSHIP_ATTEMPT = 'SET_MEMBERSHIP_ATTEMPT';
export const setMembershipAttempt = data => ({ type: SET_MEMBERSHIP_ATTEMPT, data });

export const SET_MEMBERSHIP_SUCCESS = 'SET_MEMBERSHIP_SUCCESS';
export const setMembershipSuccess = membership => ({ type: SET_MEMBERSHIP_SUCCESS, membership });

export const SET_MEMBERSHIP_FAILURE = 'SET_MEMBERSHIP_FAILURE';
export const setMembershipFailure = () => ({ type: SET_MEMBERSHIP_FAILURE });

/** User account functions */
export const CLEAR_MEMBER = 'CLEAR_MEMBER';
export const clearMember = () => ({ type: CLEAR_MEMBER });

export const BECOME_MEMBER_ATTEMPT = 'BECOME_MEMBER_ATTEMPT';
export const becomeMemberAttempt = data => ({ type: BECOME_MEMBER_ATTEMPT, data });

export const BECOME_MEMBER_SUCCESS = 'BECOME_MEMBER_SUCCESS';
export const becomeMemberSuccess = data => ({ type: BECOME_MEMBER_SUCCESS, data });

export const BECOME_MEMBER_FAILURE = 'BECOME_MEMBER_FAILURE';
export const becomeMemberFailure = message => ({ type: BECOME_MEMBER_FAILURE, message });

export const SAVE_MEMBER_ATTEMPT = 'SAVE_MEMBER_ATTEMPT';
export const saveMemberAttempt = data => ({ type: SAVE_MEMBER_ATTEMPT, data });

export const SAVE_MEMBER_SUCCESS = 'SAVE_MEMBER_SUCCESS';
export const saveMemberSuccess = () => ({ type: SAVE_MEMBER_SUCCESS });

export const SAVE_MEMBER_FAILURE = 'SAVE_MEMBER_FAILURE';
export const saveMemberFailure = () => ({ type: SAVE_MEMBER_FAILURE });

export const ADD_CARD_ATTEMPT = 'ADD_CARD_ATTEMPT';
export const addCardAttempt = data => ({ type: ADD_CARD_ATTEMPT, data });

export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const addCardSuccess = data => ({ type: ADD_CARD_SUCCESS, data });

export const ADD_CARD_FAILURE = 'ADD_CARD_FAILURE';
export const addCardFailure = message => ({ type: ADD_CARD_FAILURE, message });

export const CHANGE_DEFAULT_CARD_ATTEMPT = 'CHANGE_DEFAULT_CARD_ATTEMPT';
export const changeDefaultCardAttempt = data => ({ type: CHANGE_DEFAULT_CARD_ATTEMPT, data });

export const CHANGE_DEFULT_CARD_SUCCESS = 'CHANGE_DEFULT_CARD_SUCCESS';
export const changeDefaultCardSuccess = data => ({ type: CHANGE_DEFULT_CARD_SUCCESS, data });

export const CHANGE_DEFULT_CARD_FAILURE = 'CHANGE_DEFULT_CARD_FAILURE';
export const changeDefaultCardFailure = message => ({ type: CHANGE_DEFULT_CARD_FAILURE, message });

export const DELETE_CARD_ATTEMPT = 'DELETE_CARD_ATTEMPT';
export const deleteCardAttempt = data => ({ type: DELETE_CARD_ATTEMPT, data });

export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const deleteCardSuccess = data => ({ type: DELETE_CARD_SUCCESS, data });

export const DELETE_CARD_FAILURE = 'DELETE_CARD_FAILURE';
export const deleteCardFailure = message => ({ type: DELETE_CARD_FAILURE, message });

export const CHANGE_CARD_ATTEMPT = 'CHANGE_CARD_ATTEMPT';
export const changeCardAttempt = data => ({ type: CHANGE_CARD_ATTEMPT, data });

export const CHANGE_CARD_SUCCESS = 'CHANGE_CARD_SUCCESS';
export const changeCardSuccess = data => ({ type: CHANGE_CARD_SUCCESS, data });

export const CHANGE_CARD_FAILURE = 'CHANGE_CARD_FAILURE';
export const changeCardFailure = message => ({ type: CHANGE_CARD_FAILURE, message });

export const GET_MEMBER_ATTEMPT = 'GET_MEMBER_ATTEMPT';
export const getMemberAttempt = data => ({ type: GET_MEMBER_ATTEMPT, data });

export const GET_MEMBER_SUCCESS = 'GET_MEMBER_SUCCESS';
export const getMemberSuccess = data => ({ type: GET_MEMBER_SUCCESS, data });

export const GET_MEMBER_FAILURE = 'GET_MEMBER_FAILURE';
export const getMemberFailure = message => ({ type: GET_MEMBER_FAILURE, message });

// Practitioner functions
export const CREATE_STRIPE_ACCOUNT_ATTEMPT = 'CREATE_STRIPE_ACCOUNT_ATTEMPT';
export const createStripeAccountAttempt = data => ({ type: CREATE_STRIPE_ACCOUNT_ATTEMPT, data });

export const CREATE_STRIPE_ACCOUNT_SUCCESS = 'CREATE_STRIPE_ACCOUNT_SUCCESS';
export const createStripeAccountSuccess = data => ({ type: CREATE_STRIPE_ACCOUNT_SUCCESS, data });

export const CREATE_STRIPE_ACCOUNT_FAILURE = 'CREATE_STRIPE_ACCOUNT_FAILURE';
export const createStripeAccountFailure = message => ({
  type: CREATE_STRIPE_ACCOUNT_FAILURE, message,
});

export const ADD_EXTERNAL_ACCOUNT_ATTEMPT = 'ADD_EXTERNAL_ACCOUNT_ATTEMPT';
export const addExternalAccountAttempt = (data, cb = () => {}) => ({
  type: ADD_EXTERNAL_ACCOUNT_ATTEMPT, data, cb,
});

export const ADD_EXTERNAL_ACCOUNT_SUCCESS = 'ADD_EXTERNAL_ACCOUNT_SUCCESS';
export const addExternalAccountSuccess = data => ({ type: ADD_EXTERNAL_ACCOUNT_SUCCESS, data });

export const ADD_EXTERNAL_ACCOUNT_FAILURE = 'ADD_EXTERNAL_ACCOUNT_FAILURE';
export const addExternalAccountFailure = message => ({
  type: ADD_EXTERNAL_ACCOUNT_FAILURE, message,
});

export const UPDATE_BANK_ACCOUNT_ATTEMPT = 'UPDATE_BANK_ACCOUNT_ATTEMPT';
export const updateBankAccountAttempt = data => ({ type: UPDATE_BANK_ACCOUNT_ATTEMPT, data });

export const UPDATE_BANK_ACCOUNT_SUCCESS = 'UPDATE_BANK_ACCOUNT_SUCCESS';
export const updateBankAccountSuccess = data => ({ type: UPDATE_BANK_ACCOUNT_SUCCESS, data });

export const UPDATE_BANK_ACCOUNT_FAILURE = 'UPDATE_BANK_ACCOUNT_FAILURE';
export const updateBankAccountFailure = message => ({
  type: UPDATE_BANK_ACCOUNT_FAILURE, message,
});

