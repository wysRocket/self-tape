/** Pay */
export const MEMBERSHIP_PAY_ATTEMPT = 'MEMBERSHIP_PAY_ATTEMPT';
export const membershipPayAttempt = data => ({ type: MEMBERSHIP_PAY_ATTEMPT, data });

export const MEMBERSHIP_PAY_SUCCESS = 'MEMBERSHIP_PAY_SUCCESS';
export const membershipPaySuccess = data => ({ type: MEMBERSHIP_PAY_SUCCESS, data });

export const MEMBERSHIP_PAY_FAILURE = 'MEMBERSHIP_PAY_FAILURE';
export const membershipPayFailure = message => ({ type: MEMBERSHIP_PAY_FAILURE, message });

export const PREPARE_BOOK_PAY_ATTEMPT = 'PREPARE_BOOK_PAY_ATTEMPT';
export const prepareBookPayAttempt = data => ({ type: PREPARE_BOOK_PAY_ATTEMPT, data });

export const PREPARE_BOOK_PAY_SUCCESS = 'PREPARE_BOOK_PAY_SUCCESS';
export const prepareBookPaySuccess = data => ({ type: PREPARE_BOOK_PAY_SUCCESS, data });

export const PREPARE_BOOK_PAY_FAILURE = 'PREPARE_BOOK_PAY_FAILURE';
export const prepareBookPayFailure = message => ({ type: PREPARE_BOOK_PAY_FAILURE, message });

export const BOOK_PAY_ATTEMPT = 'BOOK_PAY_ATTEMPT';
export const bookPayAttempt = data => ({ type: BOOK_PAY_ATTEMPT, data });

export const BOOK_PAY_SUCCESS = 'BOOK_PAY_SUCCESS';
export const bookPaySuccess = data => ({ type: BOOK_PAY_SUCCESS, data });

export const BOOK_PAY_FAILURE = 'BOOK_PAY_FAILURE';
export const bookPayFailure = message => ({ type: BOOK_PAY_FAILURE, message });

export const REFUND_ATTEMPT = 'REFUND_ATTEMPT';
export const refundAttempt = data => ({ type: REFUND_ATTEMPT, data });

export const REFUND_SUCCESS = 'REFUND_SUCCESS';
export const refundSuccess = data => ({ type: REFUND_SUCCESS, data });

export const REFUND_FAILURE = 'REFUND_FAILURE';
export const refundFailure = message => ({ type: REFUND_FAILURE, message });
