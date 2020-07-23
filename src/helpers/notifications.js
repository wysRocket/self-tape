import moment from 'moment';

import { NOTIFICATIONS_TYPES, SESSIONS_STATUSES } from '../constants/apiConstants';
import * as actions from '../actions/notifications';

export const prepareNotification = (data, fromProfile, toProfile) => {
  const notification = {
    title: 'Selftape',
    subtile: '',
    body: 'Welcome',
    data: {
      action: '',
    },
    sound: 'default',
    priority: 'high',
    show_in_foreground: true,
  };

  switch (data.notificationType) {
    case NOTIFICATIONS_TYPES.create_session:
      notification.title = 'Session request';
      notification.body = `Dear ${toProfile.username}! You have new session request from ${fromProfile.username}`;
      notification.data.action = actions.MOVE_TO_SCHEDULE;
      break;
    case NOTIFICATIONS_TYPES.updated_status_practitioner:
      notification.title = `Session ${data.notificationData.newStatus}`;
      notification.body = `Dear ${toProfile.username}! You request with ${fromProfile.username} has been ${data.notificationData.newStatus}.`;
      notification.data.action = data.notificationData.newStatus !== SESSIONS_STATUSES.declined ? actions.MOVE_TO_SESSION_INFO_ATTEMPT : '';
      notification.data.data = data;
      break;
    case NOTIFICATIONS_TYPES.session_started_finished:
      notification.title = `Session ${data.notificationData.newStatus}`;
      notification.body = `Dear ${toProfile.username}! ${fromProfile.username} ${data.notificationData.newStatus} the session.`;
      notification.data.action = actions.MOVE_TO_CHECK_IN_OUT;
      break;
    case NOTIFICATIONS_TYPES.reviewed_person:
      notification.title = 'You have been rated!';
      notification.body = `${fromProfile.username} rated you with ${data.notificationData.reviewRating} stars.`;
      break;
    case NOTIFICATIONS_TYPES.new_message:
      notification.title = `You have new message from ${data.notificationData.message.username}`;
      notification.body = data.notificationData.message.message;
      notification.data.action = actions.MOVE_TO_CHAT_ATTEMPT;
      notification.data.data = data;
      break;
    default:
      break;
  }
  return notification;
};


export const prepareSMS = ({ session, fromProfile, toProfile }) => {
  const { notificationData: { selectedTime: { dateTime }, newStatus } } = session;
  const messageData = {};
  const bookTime = moment(dateTime);
  switch (session.notificationType) {
    case NOTIFICATIONS_TYPES.create_session:
      messageData.phone = toProfile.phone;
      messageData.message = `You have a new appointment booked with ${fromProfile.username} on ${bookTime.format('dddd')}, ${bookTime.format('MMM DD, YYYY')} at ${bookTime.format('hh:mm A')}. Please confirm or cancel it by logging in into your Selftape account.`;
      break;
    case NOTIFICATIONS_TYPES.updated_status_practitioner:
      if (newStatus === SESSIONS_STATUSES.declined) {
        messageData.phone = toProfile.phone;
        messageData.message = `Your appointment with ${fromProfile.username} on ${bookTime.format('dddd')}, ${bookTime.format('MMM DD, YYYY')} at ${bookTime.format('hh:mm A')} has been canceled.`;
      } else if (newStatus === SESSIONS_STATUSES.accepted) {
        messageData.phone = toProfile.phone;
        messageData.message = `Your appointment with ${fromProfile.username} on ${bookTime.format('dddd')}, ${bookTime.format('MMM DD, YYYY')} at ${bookTime.format('hh:mm A')} has been confirmed.`;
      }
      break;
    default: break;
  }
  return messageData;
};

export const notificationAction = (action) => {
  switch (action) {
    case actions.MOVE_TO_SCHEDULE: return actions.moveToSchedule;
    case actions.MOVE_TO_CHECK_IN_OUT: return actions.moveToCheckInOut;
    case actions.MOVE_TO_SESSION_INFO_ATTEMPT: return actions.moveToSessionInfoAttempt;
    case actions.MOVE_TO_CHAT_ATTEMPT: return actions.moveToChatAttempt;
    default:
      return null;
  }
};

export default prepareNotification;
