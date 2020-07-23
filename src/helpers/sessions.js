import _ from 'lodash';
import moment from 'moment';
import call from 'react-native-phone-call';
import sms from 'react-native-sms-linking';
import ImageResizer from 'react-native-image-resizer';
import { Alert } from 'react-native';
import { SESSIONS_STATUSES } from '../constants/apiConstants';
import { isCrossingBookingTime, compareBookTime } from './time';

export const resizeImage = async (image) => {
  const res = await ImageResizer.createResizedImage(image.uri, 600, 600, 'JPEG', 90)
    .then(resized => resized)
    .catch((err) => { console.log(err); });
  return res;
};

export const returnTimeArray = () => {
  let i = 0;
  let hh;
  let time;
  let period;
  let mm;
  const x = 60; // minutes interval
  const times = []; // time array
  let tt = 0; // start time
  const ap = ['AM', 'PM']; // AM-PM

  // loop to increment the time and push results in array
  for (i = 0; tt < 24 * 60; i += 1) {
    hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    mm = (tt % 60); // getting minutes of the hour in 0-55 format
    time = (`0${(hh % 12)}`).slice(-2);
    if (mm !== 0) time += `:0${mm}`.slice(-2);
    period = ap[Math.floor(hh / 12)];
    if ((period === 'PM' || period === 'AM') && time === '00') time = '12';
    times[i] = {
      period,
      time,
    }; // pushing data in array in [00:00 - 12:00 AM/PM format]
    tt += x;
  }

  return times;
};

export const filterSessions = ({ sessions, filterBy, newSessions = undefined }) => {
  const sessionsArr = sessions ? Object.values(sessions) : [];

  const offset = new Date().getTimezoneOffset();
  const currentTime = new Date(new Date().getTime() + offset);

  const filteredArray = sessionsArr.filter((item) => {
    const isMore = compareBookTime(item.selectedTime.dateTime, currentTime.getTime());
    const filteredByStatus = filterBy.filter(filterItem => filterItem === item.status).length !== 0;
    if (newSessions === true) { return filteredByStatus && isMore === 1; }
    return filteredByStatus;
  });
  return filteredArray;
};

export const filterSessionsDashboard = (sessionsArray, filterArray) => {
  const sessions = sessionsArray !== null ? Object.values(sessionsArray) : [];
  const filteredArray = sessions.filter(arrayEl => filterArray.filter(anotherOneEl => anotherOneEl === arrayEl.status).length !== 0);
  return filteredArray;
};

export const weekSessionsByDays = (sessionsArray) => {
  const grouped = _.mapValues(
    _.groupBy(sessionsArray, 'selectedDate'),
    sessList => sessList.map(session => _.omit(session, 'selectedDate')),
  );
  return grouped;
};

export const groupByHour = (hourses) => {
  const dateArr = [];
  const dateArrKeyHolder = [];
  hourses.forEach((item) => {
    const time = moment(item);
    time.minutes(0);
    dateArrKeyHolder[time.format('hh:mm A')] = dateArrKeyHolder[time.format('hh:mm A')] || {};
    const obj = dateArrKeyHolder[time.format('hh:mm A')];
    if (Object.keys(obj).length === 0) dateArr.push(obj);
    obj.time = time.format('hh:mm A');
    obj.hourses = obj.hourses || [];
    obj.hourses.push(item);
  });
  return dateArr;
};

export const sessionsFinished = (sessionsArray) => {
  let count = 0;
  if (sessionsArray) {
    const acceptedSessions = filterSessionsDashboard(sessionsArray, [SESSIONS_STATUSES.finished]);
    count = acceptedSessions.length > 0 ? acceptedSessions.length : 0;
  }
  return count;
};

export const countNewSessions = (sessionsArray) => {
  let newSessions = 0;
  let notAccepted = 0;
  const offset = new Date().getTimezoneOffset();
  const currentTime = new Date(new Date().getTime() + offset);
  if (sessionsArray) {
    sessionsArray.forEach((item) => {
      const isMore = compareBookTime(item.selectedTime.dateTime, currentTime.getTime());
      if (item.viewed !== undefined && item.viewed === false && isMore === 1 && item.status === SESSIONS_STATUSES.accepted) {
        newSessions += 1;
      }
      if (isMore === 1 && item.status === SESSIONS_STATUSES.created) {
        notAccepted += 1;
      }
    });
  }
  return { newSessions, notAccepted };
};

export const sessionsDashboardStats = (sessionsArray) => {
  const stats = { duration: 0, cost: 0, count: 0 };
  if (sessionsArray) {
    const sessions = filterSessionsDashboard(sessionsArray, [SESSIONS_STATUSES.finished]);
    sessions.forEach((session) => {
      const { selectedTime: { selectedPrice: { duration, value } } } = session;
      stats.duration += duration;
      stats.cost += value;
      stats.count += 1;
    });
  }
  return stats;
};

export const thisHourSession = ({ sessionsArray, profile }) => {
  const sessions = sessionsArray !== null ? Object.values(sessionsArray) : [];
  const currentTime = new Date();
  currentTime.setSeconds(0);
  const currentHourSession = sessions.find((session) => {
    const timeStart = new Date(session.selectedTime.dateTime);
    const timeEnd = new Date(session.selectedTime.dateTime);
    timeEnd.setMinutes(timeEnd.getMinutes() + session.selectedTime.selectedPrice.duration);
    const isSameOrAfter = moment(currentTime, 'YYYY-MM-DD').isSameOrAfter(moment(timeStart, 'YYYY-MM-DD'), 'minutes');
    return (isSameOrAfter && !session[`${profile.role}LeftReview`])
      && (session.status === SESSIONS_STATUSES.accepted
        || session.status === SESSIONS_STATUSES.started
        || session.status === SESSIONS_STATUSES.finished);
  });
  return currentHourSession;
};

export const sortSessions = (sessionsArray, reverse = false) => {
  const sessions = sessionsArray.sort((a, b) => compareBookTime(
    a.selectedTime.dateTime, b.selectedTime.dateTime,
  ));
  if (reverse) sessions.reverse();
  return sessions;
};

export const getTimeArray = (start, end, isCurrentDate) => {
  const arr = [];
  const dt = new Date();
  const currHour = new Date();
  const endDate = new Date();
  const currentTime = moment(new Date(), 'hh:mm A');
  let isEnd = false;
  dt.setHours(start.getHours());
  dt.setMinutes(start.getMinutes());
  endDate.setHours(end.getHours());
  endDate.setMinutes(end.getMinutes());
  let nextTime = moment(endDate, 'hh:mm A');

  while (dt.getHours() <= endDate.getHours() + 1 && !isEnd) {
    dt.setMinutes(0);
    nextTime = moment(dt, 'hh:mm A');
    const isAfter = moment(nextTime).isSameOrAfter(currentTime, 'hours');
    const checkMinutesNotZero = dt.getHours() === endDate.getHours() + 1
      ? endDate.getMinutes() > 0
      : true;
    const availableMinutesForHour = (dt.getHours() === currHour.getHours()
      && currHour.getMinutes() <= 45) || dt.getHours() !== new Date().getHours();

    if ((isCurrentDate && isAfter && checkMinutesNotZero && availableMinutesForHour)
      || (!isCurrentDate && checkMinutesNotZero)) {
      arr.push(new Date(dt));
    }

    if (dt.getHours() === endDate.getHours() + 1) isEnd = true;
    dt.setHours(dt.getHours() + 1);
  }
  return arr;
};

export const getDaysInMonth = (month, year, days) => {
  const pivot = moment().month(month).year(year).startOf('year');
  const end = moment().month(month).year(year).endOf('year');

  const dates = {};
  const disabled = { disabled: true };
  while (pivot.isBefore(end)) {
    days.forEach((day) => {
      if (!day.active) {
        dates[pivot.day(day.name).format('YYYY-MM-DD')] = disabled;
      }
    });
    pivot.add(7, 'days');
  }
  return dates;
};

const zero = digint => (`0${digint}`).slice(-2);

export const formatTimeHHMMA = (d) => {
  const h = d.getHours();
  function z(n) {
    return (n < 10 ? '0' : '') + n;
  }
  const hour = h % 12 || 12;
  return `${zero(hour)}:${zero(z(d.getMinutes()))} ${h < 12 ? 'AM' : 'PM'}`;
};

export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return { hours, minutes };
};

export const showAlert = (text, submitFunction = () => {}) => {
  Alert.alert(
    text,
    '',
    [
      { text: 'OK', onPress: submitFunction },
    ],
    { cancelable: false },
  );
};

export const messageAlert = ({
  title = '',
  text = '',
  submitText = 'OK',
  cancelText = '',
  func = () => {},
  funcCancel = () => {},
}) => {
  Alert.alert(
    title,
    text,
    [
      { text: submitText, onPress: func },
      cancelText !== '' && {
        text: cancelText,
        onPress: funcCancel,
        style: 'cancel',
      },
    ],
    { cancelable: false },
  );
};

export const showConfirmAlert = (text, submitFunction = () => {}) => {
  Alert.alert(
    text,
    '',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: submitFunction },
    ],
    { cancelable: false },
  );
};

export const generateSessionObject = ({ bookData, clientProfile }) => {
  const {
    location,
    practitioner,
    selectedDate,
    selectedTime,
    auditionDetails,
  } = bookData;
  const sessionObject = {
    locationUid: location.uid,
    profileUid: practitioner.uid,
    viewed: false,
    selectedDate,
    selectedTime: {
      ...selectedTime,
      dateTime: selectedTime.dateTime.getTime(),
    },
    createdAt: Date.now(),
    details: {
      ...auditionDetails,
      profileClient: {
        uid: clientProfile.uid,
        username: clientProfile.username,
        image: clientProfile.image,
        rating: clientProfile.rating,
        phoneNumber: clientProfile.phone,
        email: clientProfile.email,
      },
      profilePractitioner: {
        username: practitioner.username,
        image: practitioner.image,
        address: practitioner.address,
        location: practitioner.location,
        email: practitioner.email,
      },
      location: {
        name: location.name,
      },
    },
    filterPractitionerDateStart: `${practitioner.uid}_&_${selectedDate}`,
    filterPractitionerLocation: `${practitioner.uid}_&_${location.uid}`,
    filterUserDateStart: `${clientProfile.uid}_&_${selectedDate}`,
    status: SESSIONS_STATUSES.created,
    lastEditedBy: clientProfile.role,
  };
  return sessionObject;
};

export const checkFreeBookTime = ({
  sessions, selectedTime, selectedPrice, selectedDate,
}) => {
  let available = false;
  let message = '';
  let currentSessionStart = new Date(selectedDate);
  const offset = currentSessionStart.getTimezoneOffset() * 60000;
  currentSessionStart = new Date(currentSessionStart.getTime() + offset);
  currentSessionStart.setHours(selectedTime.dateTime.getHours());
  currentSessionStart.setMinutes(selectedTime.dateTime.getMinutes());
  const duplicateSession = sessions ? Object.values(sessions).filter((session) => {
    const existingSessionStart = new Date(session.selectedTime.dateTime);
    const existingSessionEnd = new Date(session.selectedTime.dateTime);
    const currentSessionEnd = new Date(currentSessionStart);
    existingSessionEnd.setMinutes(existingSessionEnd.getMinutes()
      + session.selectedTime.selectedPrice.duration);
    currentSessionEnd.setMinutes(currentSessionEnd.getMinutes()
      + selectedPrice.duration);

    const isCrossingTime = isCrossingBookingTime(
      currentSessionStart,
      currentSessionEnd,
      existingSessionStart,
      existingSessionEnd,
    );
    return (isCrossingTime)
    && session.status !== SESSIONS_STATUSES.declined
    && session.status !== SESSIONS_STATUSES.canceled;
  }) : [];
  if (moment(currentSessionStart).isSameOrAfter(moment())) {
    if (duplicateSession.length === 0) {
      available = true;
    } else {
      message = 'This timeslot is already booked. Please choose another one.';
    }
  } else {
    message = 'This timeslot has expired. Please choose another one in the future.';
  }
  return { available, message };
};

export const checkIfWorkHours = ({
  practitioner: { workWeek }, selectedTime: { dateTime }, selectedPrice,
}) => {
  let result = true;
  if (selectedPrice) {
    const selectedTime = new Date(dateTime);
    selectedTime.setMinutes(selectedTime.getMinutes() + selectedPrice.duration);
    const day = workWeek[selectedTime.getDay()];
    day.workHours.map((elem) => {
      const workUntil = new Date(elem.to);
      const workFrom = new Date(elem.from);
      const isBefore = (selectedTime.getHours() < workUntil.getHours()) ||
        (selectedTime.getHours() === workUntil.getHours()
          && selectedTime.getMinutes() <= workUntil.getMinutes());
      const isEqual = selectedTime.getHours() === workUntil.getHours()
        && selectedTime.getMinutes() === workUntil.getMinutes();
      const isBetween = workFrom.getHours() <= selectedTime.getHours()
        && workUntil.getHours() >= selectedTime.getHours();
      if (!isBetween) return;
      if (isBefore || isEqual) return result;
      result = false;
      messageAlert({
        title: 'Change duration',
        text: `Please choose a duration which is no more than ${60 - dateTime.getMinutes()} minutes because Practitioner's business hours end on ${moment(workUntil).format('HH:mm A')} on this period.`,
      });
    });
  }
  return result;
};

export const callTo = (phone) => {
  const args = {
    number: phone.replace(/\D+/g, ''),
    prompt: false,
  };

  try {
    call(args).catch(err => console.log('error', err));
  } catch (error) {
    console.log('error', error);
  }
};

export const smsTo = (phone) => {
  try {
    sms(phone.replace(/\D+/g, ''), 'Hi! ').catch(err => console.log('error', err));
  } catch (error) {
    console.log('error', error);
  }
};

export const getCancelationFee = (profile) => {
  const cancelationFee = profile.prices.find(price => price.uid === 'CancelFee');
  return !cancelationFee ? null : cancelationFee;
};

export default weekSessionsByDays;
