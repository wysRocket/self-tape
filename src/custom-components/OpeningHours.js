import React, { Component, Fragment } from 'react';
import {
  View,
  Platform,
  BackHandler,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { TimePicker } from 'react-native-wheel-picker-android';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import CustomActivityIndicator from './CustomActivityIndicator';


import { compareTime, isCrossingTime } from '../helpers/time';
import { profileUpdateAttempt } from '../actions/authorization';
import Plus from '../images/icons/plus.png';
import Close from '../images/icons/close.png';
import CheckedGreen from '../images/icons/checkedGreen.png';
import styles from '../styles/SettingsStyles';

const leftDate = new Date();
leftDate.setMinutes(0);
leftDate.setHours(9);
const rightDate = new Date();
rightDate.setMinutes(0);
rightDate.setHours(18);
let timeout = null;
class OpeningHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workWeek: [],
      firstRender: false,
      showPicker: false,
      timeFrom: leftDate,
      timeTo: rightDate,
      chengeDay: null,
      working: true,
      isLoading: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { profile } = nextProps;
    if (!isEqual(profile.workWeek, prevState.workWeek) && prevState.firstRender !== true) {
      return {
        ...prevState,
        workWeek: profile.workWeek,
        firstRender: true,
      };
    }
    return prevState;
  }

  componentDidMount = () => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        this.backAndSave();
        return true;
      });
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  onTimeSelected = (date, side) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      switch (side) {
        case 'left': this.setState({ timeFrom: date }); break;
        case 'right': this.setState({ timeTo: date }); break;
        default: break;
      }
    }, 500);
  }

  backAndSave = () => {
    const { showPicker } = this.state;
    if (showPicker) this.toggleTimePicker(null);
  }

  alreadyExist = (workHours, newTime) => {
    const result = { changedWorkHours: workHours };
    const mergedTime = newTime;
    let existOneTime = false;
    let pushed = false;
    if (workHours && workHours[0].from !== '' && workHours[0].to !== '') {
      workHours.map((time, index) => {
        if (isCrossingTime(time, newTime) === true) {
          const isNewFromMore = compareTime(newTime.from, time.from);
          const isNewToMore = compareTime(newTime.to, time.to);
          mergedTime.from = isNewFromMore === -1 ? newTime.from : time.from;
          mergedTime.to = isNewToMore === -1 ? time.to : newTime.to;
          if (!existOneTime) {
            existOneTime = true;
            result.changedWorkHours[index] = mergedTime;
          } else if (existOneTime) {
            result.changedWorkHours.splice(index, 1);
          }
        } else {
          if (!pushed) result.changedWorkHours.push(mergedTime);
          pushed = true;
        }
      });
    } else result.changedWorkHours = [newTime];
    return result;
  }

  saveNewTime = async () => {
    const { navigation: { dispatch } } = this.props;
    const {
      changeDay, timeFrom, timeTo, working,
    } = this.state;
    const workWeek = [...this.state.workWeek];
    const newTime = { from: timeFrom.getTime(), to: timeTo.getTime() };
    const startIsMoreThanLess = compareTime(newTime.from, newTime.to);
    if (startIsMoreThanLess !== 1 && startIsMoreThanLess !== 0) {
      workWeek[changeDay].active = true;
      if (working) {
        const { changedWorkHours } = await this.alreadyExist(
          workWeek[changeDay].workHours,
          newTime,
        );
        workWeek[changeDay].workHours = changedWorkHours;
        this.setState({ workWeek });
        dispatch(profileUpdateAttempt({ workWeek }));
        this.toggleTimePicker(null);
      } else if (!working) {
        workWeek[changeDay].active = working;
        this.setState({ workWeek });
        dispatch(profileUpdateAttempt({ workWeek }));
        this.toggleTimePicker(null);
      }
    } else {
      this.showAlert();
    }
  }

  showAlert = () => {
    Alert.alert(
      'Can`t select the time',
      'Please enter correct time',
      [{
        text: 'OK',
        onPress: () => {},
      },
      ], {
        cancelable: false,
      },
    );
  }

  removeTime = (dayIndex, index) => {
    const { navigation: { dispatch } } = this.props;
    const workWeek = [...this.state.workWeek];
    workWeek[dayIndex].workHours.splice(index, 1);
    if (workWeek[dayIndex].workHours.length === 0) {
      workWeek[dayIndex].workHours.push({ from: '', to: '' });
      workWeek[dayIndex].active = false;
    }
    this.setState({ workWeek });
    dispatch(profileUpdateAttempt({ workWeek }));
  }

  toggleActiveDay = (dayIndex) => {
    const { navigation: { dispatch } } = this.props;
    const workWeek = [...this.state.workWeek];
    workWeek[dayIndex] = { ...workWeek[dayIndex], active: !workWeek[dayIndex].active };
    this.setState({ workWeek }, () => {
      dispatch(profileUpdateAttempt({ workWeek }));
    });
  }

  toggleTimePicker = (dayIndex) => {
    this.setState(prevState => ({
      showPicker: !prevState.showPicker,
      changeDay: dayIndex,
      timeFrom: leftDate,
      timeTo: rightDate,
      working: true,
    }), () => {
      this.props.showPicker(this.state.showPicker);
    });
  }

  toggleWorking = () => {
    this.setState(prevState => ({ working: !prevState.working }));
  }

  singleHour = (hour, index, dayIndex, day, hours, active) => (
    <View
      key={`${index + 8}`}
      style={styles.row}
    >
      <View style={[styles.col, styles.colLeft]}>
        {index === 0
        && (
          <TouchableOpacity
            disabled={!hour || hour.from === '' || hour.to === ''}
            onPress={() => this.toggleActiveDay(dayIndex)}
          >
            <View style={styles.checkWrapper}>
              {active && <Image source={CheckedGreen} style={styles.checkedIcon} />}
            </View>
          </TouchableOpacity>
        )}
        <Text style={styles.text}>{`${index === 0 ? day : ''}`}</Text>
      </View>
      <View style={[styles.col, styles.colCenter]}>
        <Text style={styles.text}>
          {`${active && hour && hour.from !== '' && hour.to !== ''
            ? `${moment(new Date(hour.from)).format('h:mm A')} - ${moment(new Date(hour.to)).format('h:mm A')}`
            : 'Not Working'}`
          }
        </Text>
      </View>
      <View style={[styles.col, styles.colRight]}>
        {(active && hours.length >= 0) && (
          <TouchableOpacity
            onPress={() => this.removeTime(dayIndex, index)}
          >
            <Image source={Close} style={styles.closeImage} />
          </TouchableOpacity>
        )}
        {index === 0
          ? (
            <TouchableOpacity
              onPress={() => this.toggleTimePicker(dayIndex)}
            >
              <Image source={Plus} style={styles.plusImage} />
            </TouchableOpacity>
          )
          : <View />}
      </View>
    </View>
  )

  singleDay = ({
    dayIndex, day = '', hours = [{ from: '', to: '' }], active,
  }) => (
    active
      ? hours.map((hour, index) => this.singleHour(hour, index, dayIndex, day, hours, active))
      : this.singleHour(hours[0], 0, dayIndex, day, hours, active)
  );

  returnTimePicker = side => (
    <View style={styles.rowPicker}>
      <Text style={styles.titlePicker}>{`${side === 'left' ? 'Open' : 'Close'}`}</Text>
      <TimePicker
        onTimeSelected={date => this.onTimeSelected(date, side)}
        initDate={side === 'left' ? leftDate : rightDate}
      />
    </View>
  )

  renderTimePicker = () => {
    const { working, isLoading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.timePickContainer}>
          {this.returnTimePicker('left')}
          {this.returnTimePicker('right')}
        </View>
        <View style={styles.pickerNotWorking}>
          <TouchableOpacity
            onPress={() => this.toggleWorking()}
          >
            <View style={styles.checkWrapper}>
              {!working && (
                <Image source={CheckedGreen} style={styles.checkedIcon} />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.notActiveText}>Not Working</Text>
        </View>
        <View style={styles.absoluteButtonWrapper}>
          <TouchableOpacity
            onPress={() => this.toggleTimePicker(null)}
            style={styles.pickerButton}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ isLoading: true });
              setTimeout(() => {
                this.saveNewTime();
                this.setState({ isLoading: false });
              }, 1000);
            }}
            disabled={isLoading}
            style={styles.pickerButton}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {
      profile, isLoading, hideHeader, toggleTimePicker,
    } = this.props;
    const { isLoading: isLoadingTimePicker } = this.state;
    const {
      workWeek, showPicker,
    } = this.state;
    toggleTimePicker(this.toggleTimePicker);
    return (
      !isLoading && profile !== null && (
        <View style={[styles.top, styles.topWhite]}>
          <View style={styles.availableHoursContainer}>
            {!showPicker
              ? (
                <Fragment>
                  {!hideHeader && (
                    <View style={styles.openingHoursItemWrapper}>
                      <Text style={styles.openingHoursTitle}>
                        DEFAULT OPENING HOURS FOR BUSINESS
                      </Text>
                    </View>
                  )}
                  <ScrollView style={styles.weekWraper}>
                    {workWeek.map((day, index) => (
                      <View
                        key={`${index + 1}`}
                        style={styles.openingHoursItemWrapper}
                      >
                        {this.singleDay({
                          dayIndex: index, day: day.name, hours: day.workHours, active: day.active,
                        })}
                      </View>
                    ))}
                  </ScrollView>
                </Fragment>
              )
              : (this.renderTimePicker())}
          </View>
          <CustomActivityIndicator
            isLoading={isLoadingTimePicker}
            showNoData={false}
            style={styles.addHeaderOffset}
          />
        </View>
      )
    );
  }
}

OpeningHours.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}),
  toggleTimePicker: PropTypes.func,
  showPicker: PropTypes.func,
  hideHeader: PropTypes.bool,
};

OpeningHours.defaultProps = {
  navigation: {},
  toggleTimePicker: () => {},
  showPicker: () => {},
  hideHeader: false,
};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
    isLoading,
  },
  userDetails: {
    membershipUpdate,
    member,
    isLoading: isLoadingDetails,
  },
}) => ({
  profile,
  isLoading,
  membershipUpdate,
  member,
  isLoadingDetails,
});

export default connect(mapStateToProps)(OpeningHours);
