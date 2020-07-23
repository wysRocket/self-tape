
export const compareTime = (dateTimeA, dateTimeB, compareFullTime = false) => {
  const timeA = new Date(dateTimeA);
  const timeB = new Date(dateTimeB);
  let dateA = new Date();
  let dateB = new Date();
  dateA.setHours(timeA.getHours());
  dateA.setMinutes(timeA.getMinutes());
  dateA.setSeconds(0);

  dateB.setHours(timeB.getHours());
  dateB.setMinutes(timeB.getMinutes());
  dateB.setSeconds(0);

  if (compareFullTime) {
    dateA = new Date(dateTimeA);
    dateB = new Date(dateTimeB);
  }

  if (dateA.getHours() !== 0 && dateA.getHours() <= 11 && dateB.getHours() === 0) return -1;
  if (dateA.getTime() > dateB.getTime()) return 1;
  if (dateA.getTime() < dateB.getTime()) return -1;
  return 0;
};

export const compareBookTime = (dateTimeA, dateTimeB) => {
  const dateA = new Date(dateTimeA);
  const dateB = new Date(dateTimeB);
  dateA.setSeconds(0);
  dateB.setSeconds(0);
  if (dateA.getTime() > dateB.getTime()) return 1;
  if (dateA.getTime() < dateB.getTime()) return -1;
  return 0;
};

export const isCrossingTime = (timeInterval1, timeInterval2) => {
  const a = compareTime(timeInterval1.from, timeInterval2.to);
  const b = compareTime(timeInterval1.to, timeInterval2.from);
  if ((a === -1 || a === 0) && (b === 1 || b === 0)) return true;
  return false;
};

export const isCrossingBookingTime = (time1From, time1To, time2From, time2To) => {
  const a = compareBookTime(time2From, time1To);
  const b = compareBookTime(time2To, time1From);
  if (a === -1 && b === 1) return true;
  return false;
};

export default isCrossingTime;
