import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, ScrollView, Image, TouchableOpacity, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { getSessionsAttempt } from '../../actions/sessions';
import { getSessionsStats, refreshSessionsStats } from '../../actions/statistic';
import { getProfileAttempt } from '../../actions/authorization';
import { SESSIONS_STATUSES } from '../../constants/apiConstants';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';

import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/DashboardStyles';
import Star from '../../images/icons/blackStar.png';
import { returnTimeArray } from '../../helpers/sessions';
import { weekDays } from '../../constants/textConstants';
import Lightning from '../../images/icons/lightningDashboard.png';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAudition: 'today',
    };
  }

  componentDidMount = () => {
    const { dispatch, profile } = this.props;
    const findData = {
      itemId: profile.uid,
      role: profile.role,
      locationId: null,
      startDate: moment().format('YYYY-MM-DD'),
      endDate: null,
    };
    dispatch(getSessionsAttempt(findData));
    this.onGetStats();
  }

  onGetStats = () => {
    const { dispatch, user } = this.props;
    dispatch(getSessionsStats());
    dispatch(getProfileAttempt({ user }));
  }

  onRefreshStats = () => {
    const { dispatch, user } = this.props;
    dispatch(refreshSessionsStats());
    dispatch(getProfileAttempt({ user }));
  }

  setAudition = showAudition => this.setState({ showAudition })

  formatDate = date => date.format('YYYY-MM-DD');

  singleDayColumn = (el, exist) => (
    <View
      key={`${el.period}${el.time}`}
      style={styles.singleDayColumn}
    >
      {exist && <Image source={Lightning} style={styles.lightningImage} />}
    </View>
  )

  singleDayRow = (tempDate, dayAuditions) => {
    const time = returnTimeArray();
    const formatedTempDate = this.formatDate(tempDate);
    return (
      <View key={`${formatedTempDate}`} style={styles.singleDayRow}>
        <Text style={styles.weekTitle}>
          {weekDays[tempDate.day()][0]}
        </Text>
        {time.map((el) => {
          let exist = false;
          if (dayAuditions) {
            dayAuditions.forEach((element) => {
              if (moment(element.selectedTime.dateTime).format('hh A') === `${el.time} ${el.period}`
              && element.status !== SESSIONS_STATUSES.declined) exist = true;
            });
          }
          return this.singleDayColumn(el, exist);
        })}
      </View>
    );
  }

  renderWeekSessions = () => {
    const { sessionsStats: { weekDays: { start, end }, weekAuditions } } = this.props;
    const tempDate = moment(start);
    const endDate = moment(end).add(1, 'd');
    const returnValue = [];
    do {
      const formatedTempDate = this.formatDate(tempDate);
      returnValue.push(this.singleDayRow(tempDate, weekAuditions[formatedTempDate]));
      tempDate.add(1, 'd');
    } while (this.formatDate(tempDate) !== this.formatDate(endDate));
    return returnValue;
  }

  render() {
    const {
      navigation, profile, sessionsStats, isLoading, isRefreshing,
    } = this.props;
    const { showAudition: value } = this.state;
    const acceptanceRate = sessionsStats !== null
      && (sessionsStats.weekAuditionsAcceptedCount * 100) / sessionsStats.weekAuditionsCount;

    return (
      <MainWrapper
        navigation={navigation}
        pageName="Dashboard"
        goBackScreen="Home"
      >
        <ScrollView
          style={styles.container}
          refreshControl={(
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefreshStats}
            />
          )}
        >
          {sessionsStats !== null && (
            <Fragment>
              <View style={styles.containerBlock}>
                <Text style={styles.auditionTitle}>Auditions</Text>
                <View style={styles.auditionTime}>
                  <TouchableOpacity onPress={() => this.setAudition('today')}>
                    <Text style={styles[`auditionTime${(value === 'today' ? '' : 'Un')}Active`]}>Today</Text>
                  </TouchableOpacity>
                  <Text style={styles.auditionTimeUnActive}> | </Text>
                  <TouchableOpacity onPress={() => this.setAudition('week')}>
                    <Text style={styles[`auditionTime${(value === 'week' ? '' : 'Un')}Active`]}>This Week</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.auditionCost}>
                  {`$${sessionsStats[value] ? (sessionsStats[value].cost * 0.8) : 0}`}
                </Text>
                <View style={styles.auditionStats}>
                  <View style={styles.auditionStatsContainer}>
                    <Text style={styles.auditionStatsCount}>
                      {sessionsStats[value] ? sessionsStats[value].count : 0}
                    </Text>
                    <Text style={styles.auditionStatsTitle}>Sessions</Text>
                  </View>
                  <View style={styles.auditionStatsContainer}>
                    <Text style={styles.auditionStatsCount}>
                      {`${sessionsStats[value] ? sessionsStats[value].duration : 0}m`}
                    </Text>
                    <Text style={styles.auditionStatsTitle}>Time</Text>
                  </View>
                </View>
              </View>
              <View style={styles.containerBlock}>
                <Text style={styles.statsName}>Stats</Text>
                <Text style={styles.statsPercentages}>
                  {`${acceptanceRate ? acceptanceRate.toFixed(1) : 0}%`}
                </Text>
                <Text style={styles.statsSubtitle}>Weekly Acceptance Rate</Text>
                <View style={styles.statsAdditionalInfo}>
                  <View style={styles.statsAdditionalBottomContainers}>
                    <View style={styles.statsAdditionalInfoRating}>
                      <Image style={styles.statsAdditionalInfoRatingStar} source={Star} />
                      <Text style={styles.statsRatingCount}>{profile ? profile.rating : '--'}</Text>
                    </View>
                    <Text style={styles.statsSubtitleBottom}>Rating</Text>
                  </View>
                  <View style={styles.statsAdditionalBottomContainers}>
                    <Text style={styles.statsRatingCount}>
                      {sessionsStats.allPeriodSessions ? sessionsStats.allPeriodSessions : 0}
                    </Text>
                    <Text style={styles.statsSubtitleBottom}>Lifetime Sessions</Text>
                  </View>
                </View>
              </View>
              <View style={styles.containerBlockWeekDays}>
                {sessionsStats && sessionsStats.weekDays && this.renderWeekSessions()}
              </View>
            </Fragment>
          )}
        </ScrollView>
        <CustomActivityIndicator text="No data found" isLoading={isLoading} showNoData={sessionsStats === null} />
      </MainWrapper>
    );
  }
}

Dashboard.propTypes = {
  navigation: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({}),
  sessionsStats: PropTypes.shape({
    today: PropTypes.shape({}),
    week: PropTypes.shape({}),
  }),
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
};

Dashboard.defaultProps = {
  profile: null,
  user: null,
  sessionsStats: null,
};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
    user,
  },
  locations: {
    locations,
  },
  statisticReducer: {
    sessionsStats,
    isLoading,
    isRefreshing,
  },
}) => ({
  user,
  profile,
  locations,
  sessionsStats,
  isLoading,
  isRefreshing,
});

export default connect(mapStateToProps)(Dashboard);
