export const fcmKey = 'AAAAJvzg7ig:APA91bGwkg_eG_Sw24A5zOB_nhW6sMS6vyUnV_xanwfpqYdJQ_3EaXVx6iF1LthrO6V1gphGVZIOTe_Xz4oA0EsncjGZvXaDU4G-ncwp5WBlZblycB3BANlUuWAwtpE_mzxSzskuMqUS';
export const ENSCRIPT_KEY = 'selftape';
export const STRIPE_URL = 'https://api.stripe.com/v1/';
export const GOOGLE_API_KEY = 'AIzaSyAsMkp1Nnb1gq5KKvwfitqxTYCcU7tkWl0';
export const TWILIO_BASE_URL = 'https://api.twilio.com/2010-04-01/Accounts';
export const TWILIO_BASE_CALL = 'https://proxy.twilio.com/v1';
export const TWILIO_ACCOUNT_SID = 'AC648b06bf9bbc1253bf3c406e5956489f';
export const TWILIO_AUTH_TOKEN = '82f4139c3fa20c3dd7d2897208143dca';
export const TWILIO_TEST_NUMBER = '+13152194605';

export const SESSIONS_STATUSES = {
  created: 'created',
  declined: 'declined',
  accepted: 'accepted',
  started: 'started',
  finished: 'finished',
  canceled: 'canceled',
};

export const NOTIFICATIONS_TYPES = {
  create_session: 'create_session',
  updated_status_practitioner: 'updated_status_practitioner',
  session_started_finished: 'session_started_finished',
  reviewed_person: 'reviewed_person',
  new_message: 'new_message',
};

export const PRODUCTION = true;
export const stripeKey = PRODUCTION ? 'sk_live_LlcvX3uljTeF04f6zBPtYUnm' : 'sk_test_U81ikYvLqa57FloG3CxrqZQz';
