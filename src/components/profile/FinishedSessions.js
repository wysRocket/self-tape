import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import SingleFinished from './SingleFinished';

import { getSessionsAttempt, refreshSessionsAttempt } from '../../actions/sessions';
import { filterSessions, sortSessions } from '../../helpers/sessions';
import { SESSIONS_STATUSES } from '../../constants/apiConstants';

import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/ClientInfoStyles';

class FinishedSessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    const { dispatch, profile } = this.props;
    const findData = {
      itemId: profile.uid,
      role: profile.role,
      locationId: null,
      startDate: null,
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
      startDate: null,
      endDate: null,
    };
    dispatch(refreshSessionsAttempt(findData));
  }

  setPageName = (isConfirmation) => {
    let title = '';
    if (isConfirmation) {
      title = 'Upcoming sessions';
    } else {
      title = 'Past Sessions';
    }
    return title;
  }

  render() {
    const {
      navigation,
      navigation: { state: { params } },
      sessions,
      isLoading,
      isRefreshing,
      isConfirmation,
      goBack,
    } = this.props;
    const confirmationScreen = (params && params.isConfirmation) || isConfirmation
      ? ((params && params.isConfirmation) || isConfirmation) : false;
    const filterBy = confirmationScreen
      ? [SESSIONS_STATUSES.accepted]
      : [SESSIONS_STATUSES.finished];
    const filteredSessions = sortSessions(filterSessions({
      sessions,
      filterBy,
      newSessions: confirmationScreen,
    }), !confirmationScreen);
    return (
      <MainWrapper
        navigation={navigation}
        pageName={this.setPageName(confirmationScreen)}
        goBackScreen={goBack}
      >
        <View
          style={styles.container}
        >
          <FlatList
            data={filteredSessions}
            onRefresh={this.onRefreshSessions}
            refreshing={isRefreshing}
            renderItem={({ item }) => (
              <SingleFinished
                confirmationScreen={confirmationScreen}
                navigation={navigation}
                item={item}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <CustomActivityIndicator text="No data found" isLoading={isLoading} showNoData={filteredSessions.length === 0} />
      </MainWrapper>
    );
  }
}

FinishedSessions.propTypes = {
  navigation: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
  sessions: PropTypes.shape({}),
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  isConfirmation: PropTypes.bool,
  goBack: PropTypes.string,
};

FinishedSessions.defaultProps = {
  profile: null,
  sessions: [],
  isConfirmation: false,
  goBack: 'Profile',
};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
  },
  sessionsReducer: {
    sessions,
    isLoading,
    isRefreshing,
  },
}) => ({
  profile,
  sessions,
  isLoading,
  isRefreshing,
});

export default connect(mapStateToProps)(FinishedSessions);
