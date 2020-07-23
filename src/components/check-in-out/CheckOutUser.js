import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import 'moment-precise-range-plugin';
import PropTypes from 'prop-types';
import Map from '../../custom-components/Map';

import { HelveticaLight } from '../../constants/fontConstants';
import COLORS from '../../constants/colorsConstants';
import * as HELPERS from '../../helpers/textHelpers';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },

  TopContainer: {
    // marginTop: 5,
  },

  Text: {
    fontFamily: HelveticaLight,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginHorizontal: 15,
    color: COLORS.MAIN_BLACK,
  },

  MapContainer: {
    marginTop: 25,
    height: 60,
    width,
  },

  SessionType: {
    width,
    textAlign: 'left',
    paddingHorizontal: 10,
    marginTop: 25,
  },

  SessionTime: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  TimeText: {
    fontSize: 21,
    fontWeight: '600',
    color: COLORS.MAIN_BLUE,
  },

  OvertimeContainer: {
    width,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const convertHours = (time) => {
  if (time === null) return '00:00';
  return `${time.hours <= 9 ? `0${time.hours}` : time.hours}:${time.minutes <= 9 ? `0${time.minutes}` : time.minutes}`;
};

export const getOvertimeMinutes = (leftTime) => {
  const overtime = leftTime * (-1);
  const hours = Math.floor(overtime / 60);
  const minutes = overtime % 60;
  return convertHours({ hours, minutes });
};

export const overtime = ({ startedTime, finishedTime, duration }) => {
  const momentStartedTime = moment.utc(startedTime);
  const momentFinishedTime = moment.utc(finishedTime);
  const timeDifferent = moment.preciseDiff(momentStartedTime, momentFinishedTime, true);
  const spendMinutes = (timeDifferent.hours * 60) + timeDifferent.minutes;
  const leftTime = duration - spendMinutes;
  return startedTime === '' || finishedTime === '' || leftTime >= 0
    ? null
    : getOvertimeMinutes(leftTime);
};

const CheckInPractitioner = ({
  person,
  session: { selectedTime: { selectedPrice }, startedTime, finishedTime },
  locationInfo,
}) => {
  const overTime = overtime({ startedTime, finishedTime, duration: selectedPrice.duration });
  return (
    <View style={styles.Header}>
      <View style={styles.TopContainer}>
        <Text style={styles.Text}>Host:</Text>
        <Text style={styles.Text}>{person.username}</Text>
        <Text style={[styles.Text, { color: COLORS.MAIN_BLUE }]}>
          {HELPERS.formatLocation(person.address)}
        </Text>
      </View>
      <View style={styles.MapContainer}>
        <Map
          location={locationInfo.location}
        />
      </View>
      <Text style={[styles.Text, styles.SessionType]}>{`Purchased -\n${selectedPrice.name} Session`}</Text>
      <View style={styles.SessionTime}>
        <Text style={[styles.Text, styles.TimeText]}>
          {`Session Began\n ${startedTime ? moment(startedTime).format('hh:mm a') : ''}`}
        </Text>
        <Text style={[styles.Text, styles.TimeText]}>
          {`Session Ended\n ${finishedTime ? moment(finishedTime).format('hh:mm a') : ''}`}
        </Text>
      </View>
      <View style={styles.OvertimeContainer}>
        <Text style={[styles.Text, { color: COLORS.MAIN_RED }]}>
          {(startedTime && finishedTime && overTime)
            ? `Overtime: ${overTime}`
            : ''
          }
        </Text>
      </View>
    </View>
  );
};

CheckInPractitioner.propTypes = {
  person: PropTypes.shape({}),
  session: PropTypes.shape({}),
  locationInfo: PropTypes.shape({}),
};

CheckInPractitioner.defaultProps = {
  person: null,
  session: null,
  locationInfo: null,
};

export default CheckInPractitioner;
