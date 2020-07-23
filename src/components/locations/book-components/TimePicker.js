import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { SESSIONS_STATUSES } from '../../../constants/apiConstants';
import SingleTimeItem from './SingleTimeItem';
import {
  getTimeArray,
  formatTimeHHMMA,
  groupByHour,
} from '../../../helpers/sessions';
import styles from '../../../styles/BookSessionStyles';

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      sessions, practitioner: { workWeek },
      selectedElementTime, timline, selectedDate, onTimeChange,
      minutesArray, visibleMinutesPopup, setRef, toggleModal, onSelectMinutes,
    } = this.props;

    const offset = new Date().getTimezoneOffset() * 60000;
    const selected = new Date(new Date(selectedDate).getTime() + offset);
    const isCurrentDate = moment(selected).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
    const { workHours } = workWeek[selected.getDay()];
    const selectedHour = new Date();
    selectedHour.setHours(selectedElementTime);
    // For filer already picked time
    let alreadyPicked = [];
    if (sessions) {
      Object.values(sessions).map((session) => {
        const sessionStart = new Date(session.selectedTime.dateTime);
        if (selectedDate === moment(sessionStart).format('YYYY-MM-DD')
        && session.status !== SESSIONS_STATUSES.declined
        && session.status !== SESSIONS_STATUSES.canceled) {
          alreadyPicked.push(sessionStart);
          let partsOfPickedTime = session.selectedTime.selectedPrice.duration / 15;
          let tempMinutes = sessionStart.getMinutes();
          while (partsOfPickedTime !== 1 && partsOfPickedTime >= 0) {
            partsOfPickedTime -= 1;
            tempMinutes += 15;
            const partOfHour = new Date(sessionStart);
            partOfHour.setMinutes(tempMinutes);
            alreadyPicked.push(partOfHour);
          }
        }
        return null;
      });
    }
    alreadyPicked = groupByHour(alreadyPicked);

    let workHoursArray = [];
    workHours.forEach((elem) => {
      const closeTime = new Date(elem.to);
      closeTime.setHours(closeTime.getHours() - 1);
      workHoursArray = workHoursArray.concat(
        getTimeArray(new Date(elem.from), closeTime, isCurrentDate),
      );
    });
    const justTime = workHoursArray.map(hour => `${formatTimeHHMMA(hour)}`);
    return (
      <View style={styles.timeAndBook}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={(ref) => { setRef(ref); }}
        >
          {timline.map((item, index) => {
            const time = `${item.time}:00 ${item.period}`;
            const include = justTime.includes(time);
            return (
              <SingleTimeItem
                item={item}
                selectedElementTime={selectedElementTime}
                onTimeChange={onTimeChange}
                index={index}
                active={include}
                alreadyPicked={include ? alreadyPicked.find((el => el.time === `${item.time}:00 ${item.period}`)) : null}
                key={`${item.time}${item.period}-timeline`}
              />
            );
          })
        }
        </ScrollView>
        <Dialog
          visible={visibleMinutesPopup && minutesArray.length > 0}
          onTouchOutside={toggleModal}
          onHardwareBackPress={toggleModal}
        >
          <DialogContent>
            <View style={styles.startTimePopup}>
              <Text style={styles.minutesTitle}>{`${moment(selectedHour).format('h A')}: Select start time`}</Text>
              {minutesArray && minutesArray.map((elem) => {
                const sameHour = moment(selectedHour).format('hh A') === moment(new Date()).format('hh A');
                const pastMinutes = elem.minutes < parseInt(moment(new Date()).format('mm'), 10);
                if (sameHour && pastMinutes && isCurrentDate) return null;
                return (
                  <TouchableOpacity
                    key={`${elem + Math.random()}`}
                    style={styles.minutesButton}
                    onPress={() => onSelectMinutes(elem)}
                  >
                    <Text style={styles.minutesItemText}>{`${moment(selectedHour).format('h')}:${elem.minutes} ${moment(selectedHour).format('A')}`}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

TimePicker.propTypes = {
  sessions: PropTypes.shape([]),
  practitioner: PropTypes.shape({}).isRequired,
  selectedElementTime: PropTypes.number,
  timline: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  selectedDate: PropTypes.string.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  onSelectMinutes: PropTypes.func.isRequired,
  setRef: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  visibleMinutesPopup: PropTypes.bool,
  minutesArray: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

TimePicker.defaultProps = {
  sessions: null,
  selectedElementTime: null,
  visibleMinutesPopup: false,
  timline: [],
  minutesArray: [],
};

export default TimePicker;
