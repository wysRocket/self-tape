import React, { Component, Fragment } from 'react';
import {
  Text, View, ScrollView, TouchableOpacity, RefreshControl, Image,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import ImageLoading from '../../custom-components/ImageLoading';

import {
  getSessionsAttempt, refreshSessionsAttempt, sessionsUpdateAttempt,
} from '../../actions/sessions';
import { moveToSessionInfoAttempt } from '../../actions/notifications';

import { filterSessions, sortSessions } from '../../helpers/sessions';
import { capitalizeFirstLetter } from '../../helpers/textHelpers';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/ScheduleStyles';
import { SESSIONS_STATUSES } from '../../constants/apiConstants';

import CalendarIcon from '../../images/icons/calendarGray.png';

const AVAILABLE = [SESSIONS_STATUSES.created, SESSIONS_STATUSES.accepted];
const FINISHED = [SESSIONS_STATUSES.finished];

class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      sessionFilter: AVAILABLE,
    };
  }

  componentWillMount = () => {
    const { dispatch, profile } = this.props;
    const findData = {
      itemId: profile.uid,
      role: profile.role,
      locationId: null,
      startDate: moment().format('YYYY-MM-DD'),
      endDate: null,
    };
    dispatch(getSessionsAttempt(findData));
  }

  onRefreshSessions = () => {
    const { dispatch, profile } = this.props;
    const findData = {
      itemId: profile.uid,
      role: profile.role,
      locationId: null,
      startDate: moment().format('YYYY-MM-DD'),
      endDate: null,
    };
    dispatch(refreshSessionsAttempt(findData));
  }

  changeSessionsStatus = (session, newStatus) => {
    const {
      dispatch,
    } = this.props;
    dispatch(sessionsUpdateAttempt({ ...session, ...{ newStatus } }));
  }

  navigateToClient = (sessionUid) => {
    const { navigation } = this.props;
    this.onRefreshSessions();
    navigation.navigate('ClientInfo', { sessionUid });
  }

  goToFinishedSession = ({ session }) => {
    const {
      navigation: {
        dispatch,
      },
    } = this.props;
    const sessionInfo = { notificationData: session, backScreen: 'Schedule' };
    dispatch(moveToSessionInfoAttempt(JSON.stringify(sessionInfo)));
  }

  changeFilter = sessionFilter => this.setState({ sessionFilter });

  renderSessions() {
    const { sessionFilter } = this.state;
    const reverse = sessionFilter === FINISHED;
    const { sessions } = this.props;
    const sessionsArray = sortSessions(filterSessions({
      sessions,
      filterBy: sessionFilter,
      newSessions: sessionFilter !== FINISHED,
    }), reverse);

    const clientsArray = [];

    sessionsArray.forEach((session) => {
      let color;
      switch (session.status) {
        case SESSIONS_STATUSES.accepted: color = '#74c4b2'; break;
        case SESSIONS_STATUSES.declined: color = '#be324e'; break;
        default: color = '#326cb2'; break;
      }
      const datatime = moment(new Date(session.selectedTime.dateTime), 'YYYY-MM-DD-hh-A');
      if (!clientsArray[session.selectedDate]) {
        clientsArray[session.selectedDate] = (
          <View key={session.selectedDate} style={styles.containerDate}>
            <Image source={CalendarIcon} style={styles.calendarIcon} />
            <Text style={styles.textDate}>
              {datatime.format('dddd, MMMM DD, YYYY')}
            </Text>
          </View>
        );
      }
      clientsArray[datatime.format('LLLL')] = (
        <TouchableOpacity
          key={datatime.format('LLLL')}
          delayPressIn={20}
          onPress={() => {
            if (session.status === SESSIONS_STATUSES.finished) {
              this.goToFinishedSession({ session });
            } else this.navigateToClient(session.uid);
          }}
        >
          <View style={styles.containerClient}>
            <View style={styles.containerClientAvatar}>
              <ImageLoading
                style={styles.avatar}
                source={{ uri: session.details.profileClient.image }}
              />
            </View>
            <View style={styles.containerClientRight}>
              <View style={styles.containerClientRightJustifyContainer}>
                <View
                  style={[styles.status, { backgroundColor: color }]}
                />
                <View style={styles.containerClientInfo}>
                  <Text
                    numberOfLines={1}
                    style={styles.clientName}
                  >
                    {session.details.profileClient.username}
                  </Text>
                  <View style={styles.containerClientInfoLeft}>
                    <View style={styles.timeContainer}>
                      <Text style={styles.clientTime}>{datatime.format('hh:mma')}</Text>
                      <Text style={styles.bookLength}>
                        {`: ${session.selectedTime.selectedPrice.duration}`}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.containerClientInfoRight}>
                    {(session.status === SESSIONS_STATUSES.created) ? (
                      <Fragment>
                        <TouchableOpacity
                          style={styles.sessionStatusContainer}
                          onPress={() => {
                            this.changeSessionsStatus(session, SESSIONS_STATUSES.accepted);
                          }}
                        >
                          <Text style={styles.sessionStatus}>Confirm | </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.sessionStatusContainer}
                          onPress={() => {
                            this.changeSessionsStatus(session, SESSIONS_STATUSES.declined);
                          }}
                        >
                          <Text style={styles.sessionStatus}>Decline</Text>
                        </TouchableOpacity>
                      </Fragment>
                    )
                      : (
                        <Text style={styles.sessionStatus}>
                          {capitalizeFirstLetter(session.status)}
                        </Text>
                      )
                    }
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
    const result = Object.values(clientsArray);
    return result;
  }

  render() {
    const {
      sessions, isLoading, isRefreshing, navigation,
    } = this.props;
    const filteredSessions = sessions && this.renderSessions();
    const { sessionFilter } = this.state;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Schedule Sessions"
        goBackScreen="Dashboard"
      >
        {(sessions !== null || (filteredSessions && filteredSessions.length !== 0) || !isLoading) && (
          <Fragment>
            <View style={styles.containerTopMenu}>
              <TouchableOpacity
                delayPressIn={20}
                onPress={() => this.changeFilter(AVAILABLE)}
              >
                <Text style={sessionFilter === AVAILABLE && styles.selectedTopButton}>
                  Available Session
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                delayPressIn={20}
                onPress={() => this.changeFilter(FINISHED)}
              >
                <Text style={sessionFilter === FINISHED && styles.selectedTopButton}>
                  Completed Session
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.container}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={this.onRefreshSessions}
                />
              }
            >
              {filteredSessions}
            </ScrollView>
          </Fragment>
        )
        }
        <CustomActivityIndicator
          text="No sessions found"
          isLoading={isLoading}
          showNoData={filteredSessions === null || filteredSessions.length === 0}
        />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({
  authorizationReducer: { userId, profile },
  sessionsReducer: { sessions, isLoading, isRefreshing },
}) => ({
  userId,
  profile,
  sessions,
  isLoading,
  isRefreshing,
});

Schedule.propTypes = {
  navigation: PropTypes.shape({}),
  profile: PropTypes.shape({}),
  sessions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
};

Schedule.defaultProps = {
  navigation: {},
  profile: {},
  sessions: null,
};

export default connect(mapStateToProps)(Schedule);
