import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from '../../styles/SingleFinishedStyles';

import { moveToSessionInfoAttempt } from '../../actions/notifications';
import { locale, months } from '../../constants/textConstants';

export default class SingleFinished extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  navigateRoSession = (item) => {
    const {
      navigation: {
        dispatch,
      },
    } = this.props;
    const sessionInfo = { notificationData: item, backScreen: '' };
    dispatch(moveToSessionInfoAttempt(JSON.stringify(sessionInfo)));
  }

  render() {
    const { item, confirmationScreen } = this.props;
    const date = moment(new Date(item.selectedTime.dateTime));
    const currentDate = moment().format('YYYY-MM-DD');
    return (
      <View
        style={styles.container}
      >
        <View style={styles.containerLeft}>
          <View style={styles.containerLeftTime}>
            <Text style={styles.containerLeftText}>
              {item.selectedDate === currentDate
                ? locale.today.toUpperCase()
                : months[date.month()].substring(0, 3).toUpperCase()
              }
            </Text>
            <Text style={styles.containerLeftDay}>{date.date()}</Text>
            <Text style={styles.containerLeftText}>
              {date.format('hh:mm A')}
            </Text>
          </View>
          <View style={styles.containerRightInfo}>
            <View style={styles.statusContainer}>
              <Text style={styles.containerRightInfoStatus}>{item.status.toUpperCase()}</Text>
              {confirmationScreen && item.viewed === false && (
                <Text style={styles.containerRightInfoViewed}>{locale.new}</Text>
              )}
            </View>
            <Text style={styles.containerRightInfoText}>
              {item.details.profilePractitioner.username.toUpperCase()}
            </Text>
            <Text style={styles.containerRightInfoText}>{item.details.location.name}</Text>
          </View>
        </View>
        <View style={styles.containerRight}>
          <TouchableOpacity
            delayPressIn={20}
            style={styles.bookButton}
            onPress={() => this.navigateRoSession(item)}
          >
            <Text style={styles.bookButtonText}>
              {locale.show.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SingleFinished.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({}).isRequired,
  confirmationScreen: PropTypes.bool,
};

SingleFinished.defaultProps = {
  confirmationScreen: false,
};
