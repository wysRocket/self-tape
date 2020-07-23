import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  AppState,
} from 'react-native';
import moment from 'moment';
import 'moment-precise-range-plugin';
import PropTypes from 'prop-types';
import ImageLoading from '../../custom-components/ImageLoading';
import CustomTouchableOpacity from '../../custom-components/CustomTouchableOpacity';
import { HelveticaLight } from '../../constants/fontConstants';
import COLORS from '../../constants/colorsConstants';
import { SESSIONS_STATUSES } from '../../constants/apiConstants';
import { overtime } from './CheckOutUser';

import Rainbow from '../../images/icons/rainbow.png';

const styles = StyleSheet.create({
  Header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },

  AvatarStyles: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },

  PersonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  PersonName: {
    fontFamily: HelveticaLight,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginHorizontal: 15,
    color: COLORS.MAIN_BLACK,
  },

  PersonNameTitle: {
    fontSize: 18,
  },

  TimeInfo: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  TimeText: {
    flex: 1,
    fontFamily: HelveticaLight,
    fontSize: 18,
    color: COLORS.COLOR_GRAY_797979,
    fontWeight: '400',
  },

  TimeTextRight: {
    textAlign: 'right',
  },

  Rainbow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  TimerContainer: {
    marginTop: 15,
    width: '80%',
    height: 170,
  },

  Timer: {
    marginTop: 20,
    fontFamily: HelveticaLight,
    fontSize: 63,
    color: COLORS.COLOR_GRAY_797979,
    fontWeight: '800',
  },

  ChangeSessionsStatus: {
    marginTop: 15,
    backgroundColor: COLORS.MAIN_BLUE,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
  },

  ChangeSessionsStatusText: {
    fontFamily: HelveticaLight,
    fontSize: 20,
    color: COLORS.COLOR_WHITE,
    fontWeight: '400',
  },
});

let timer = null;

const defineNextStatus = (status) => {
  switch (status) {
    case SESSIONS_STATUSES.accepted: return SESSIONS_STATUSES.started;
    case SESSIONS_STATUSES.started: return SESSIONS_STATUSES.finished;
    default: return SESSIONS_STATUSES.finished;
  }
};

class CheckInPractitioner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      timeDifferent: null,
      appState: AppState.currentState,
    };
  }

  componentDidMount = () => {
    this.startCountDown();
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    clearInterval(timer);
    timer = null;
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    const { appState } = this.state;
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      if (!timer) this.startCountDown();
    } else {
      clearInterval(timer);
      timer = null;
    }
    this.setState({ appState: nextAppState });
  };

  defineButton = (status) => {
    switch (status) {
      case SESSIONS_STATUSES.accepted:
        return {
          title: 'Start Session',
          backgroundColor: COLORS.MAIN_BLUE,
        };
      case SESSIONS_STATUSES.started:
        setTimeout(() => {
          if (!timer) this.startCountDown(true);
        }, 1000);
        return {
          title: 'End Session',
          backgroundColor: COLORS.MAIN_BLUE,
        };
      case SESSIONS_STATUSES.finished:
        clearInterval(timer);
        timer = null;
        return {
          title: 'Session Ended',
          backgroundColor: COLORS.MAIN_GREY,
        };
      default: return {
        title: 'Start Session',
        backgroundColor: COLORS.MAIN_BLUE,
      };
    }
  };

  startCountDown = (start = false) => {
    const {
      session: { status, startedTime, finishedTime },
    } = this.props;
    if (status === SESSIONS_STATUSES.started || status === SESSIONS_STATUSES.finished || start) {
      const endTime = status === SESSIONS_STATUSES.finished
        ? moment.utc(finishedTime) : moment.utc();
      const startTime = moment.utc(startedTime);
      startTime.set(endTime.seconds(), 'seconds');

      const timeDifferent = moment.preciseDiff(endTime, startTime, true);
      this.setState({
        hours: timeDifferent.minutes <= 9 ? `0${timeDifferent.hours}` : timeDifferent.hours,
        minutes: timeDifferent.minutes <= 9 ? `0${timeDifferent.minutes}` : timeDifferent.minutes,
        seconds: timeDifferent.seconds <= 9 ? `0${timeDifferent.seconds}` : timeDifferent.seconds,
      });
      this.onStartTimer();
    }
  }

  onStartTimer = () => {
    const {
      session: { startedTime, selectedTime: { selectedPrice: { duration } } },
    } = this.props;
    timer = setInterval(() => {
      const { seconds, minutes, hours } = this.state;

      const currentTime = moment.utc();
      const startTime = moment.utc(startedTime);
      startTime.add(duration, 'minutes');
      const timeDifferent = moment.preciseDiff(currentTime, startTime, true);

      let num = (Number(seconds) + 1).toString();
      let count = minutes;
      let countHours = hours;

      if (Number(seconds) === 59) {
        count = (Number(minutes) + 1).toString();
        num = '00';
      }

      if (Number(minutes) === 60) {
        countHours = (Number(hours) + 1).toString();
        num = '00';
        count = '00';
      }

      this.setState({
        hours: countHours.length === 1 ? `0${countHours}` : countHours,
        minutes: count.length === 1 ? `0${count}` : count,
        seconds: num.length === 1 ? `0${num}` : num,
        timeDifferent,
      });
    }, 1000);
  }

  getTimeRemaining = () => {
    const {
      session: { selectedTime: { selectedPrice: { duration } } },
    } = this.props;
    const { timeDifferent, minutes, hours } = this.state;
    const totalMinutes = (parseInt(hours, 10) * 60) + parseInt(minutes, 10);
    if (timeDifferent === null || totalMinutes > duration) return '00:00';

    // const sec = timeDifferent.seconds + 1;
    // const secondsCount = `${timeDifferent.seconds < 9 ? `0${sec}` : sec}`;
    const min = timeDifferent.minutes + 1;
    const hoursCount = `${timeDifferent.hours <= 9 ? `0${timeDifferent.hours}` : timeDifferent.hours}`;
    const minutesCount = `${min <= 9 ? `0${min}` : min}`;
    return `${hoursCount}:${minutesCount}`;
  };

  render() {
    const {
      person,
      session: {
        startedTime,
        finishedTime,
        selectedTime: { selectedPrice }, status,
      },
      changeSessionsStatus,
    } = this.props;
    const { minutes, hours, seconds } = this.state;

    const overTime = overtime({ startedTime, finishedTime, duration: selectedPrice.duration });
    const noHours = hours !== '00' && hours !== 0;

    return (
      <View style={styles.Header}>
        <View style={styles.PersonInfo}>
          <View style={styles.AvatarStyles} />
          <Text style={styles.PersonName}>
            <Text style={[styles.PersonName, styles.PersonNameTitle]}>
              {'Client:\n'}
            </Text>
            {`${person.username}`}
          </Text>
          <ImageLoading
            style={styles.AvatarStyles}
            source={{ uri: person.image }}
          />
        </View>
        <View style={styles.TimeInfo}>
          <Text style={styles.TimeText}>{`Purchased -\n${selectedPrice.name}\nsession`}</Text>
          <View>
            <Text style={[styles.TimeText, styles.TimeTextRight]}>
              {`Time Remaining\n${this.getTimeRemaining()}`}
            </Text>
            {overTime && (
              <Text style={[styles.TimeText, styles.TimeTextRight]}>
                {'+ '}
                <Text style={[styles.TimeText, styles.TimeTextRight, { color: COLORS.MAIN_RED }]}>{`${overTime}`}</Text>
              </Text>
            )}
            <Text style={[styles.TimeText, styles.TimeTextRight]}>
              {status === SESSIONS_STATUSES.finished ? 'Stopped' : ''}
              {status === SESSIONS_STATUSES.accepted ? 'Not started yet' : ''}
            </Text>
          </View>
        </View>
        <View style={styles.TimerContainer}>
          <ImageBackground
            source={Rainbow}
            style={styles.Rainbow}
            resizeMode="contain"
          >
            <Text style={[
              styles.Timer,
              overTime && { color: COLORS.MAIN_RED },
              !noHours && { fontSize: 68 },
            ]}
            >
              {`${noHours ? `${hours}:` : ''}${minutes}:${seconds}`}
            </Text>
          </ImageBackground>
        </View>
        <CustomTouchableOpacity
          disabled={status === SESSIONS_STATUSES.finished}
          styles={[
            styles.ChangeSessionsStatus,
            { backgroundColor: this.defineButton(status).backgroundColor },
          ]}
          onPressFunction={() => { changeSessionsStatus(defineNextStatus(status)); }}
        >
          <Text style={styles.ChangeSessionsStatusText}>{this.defineButton(status).title}</Text>
        </CustomTouchableOpacity>
      </View>
    );
  }
}

CheckInPractitioner.propTypes = {
  person: PropTypes.shape({}),
  session: PropTypes.shape({}),
  changeSessionsStatus: PropTypes.func.isRequired,
};

CheckInPractitioner.defaultProps = {
  person: null,
  session: null,
};

export default CheckInPractitioner;
