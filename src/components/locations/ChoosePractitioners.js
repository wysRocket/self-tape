import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  profilesByLocationsAttempt,
  refreshProfilesByLocationsAttempt,
} from '../../actions/authorization';

import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/ChoosePractitionersStyles';
import SingleLocationItemSelectPractitioner from './SingleLocationItemSelectPractitioner';
import Practitioner from './Practitioner';

class ChoosePractitioners extends Component {
  static navigationOptions() {
    const drawerLabel = 'Practitioners';
    return { drawerLabel };
  }

  componentWillMount = () => {
    const { location, navigation: { dispatch } } = this.props;
    dispatch(profilesByLocationsAttempt(location.uid));
  }

  onRefreshProfilesByLocation = () => {
    const { location, navigation: { dispatch } } = this.props;
    dispatch(refreshProfilesByLocationsAttempt(location.uid));
  }

  render() {
    const {
      profilesByLocation,
      isRefreshing,
      isLoading,
      navigation,
    } = this.props;

    return (
      <MainWrapper
        navigation={navigation}
        pageName="Practitioners"
        goBackScreen="Home"
      >
        <View style={styles.container}>
          <SingleLocationItemSelectPractitioner
            choosePractitioners="true"
          />
          <FlatList
            style={styles.flatListContainer}
            data={profilesByLocation && profilesByLocation}
            onRefresh={this.onRefreshProfilesByLocation}
            refreshing={isRefreshing}
            renderItem={elem => (
              <Practitioner
                practitioner={elem.item}
                navigation={navigation}
              />
            )}
            keyExtractor={(elem, index) => index.toString()}
          />
        </View>
        <CustomActivityIndicator text="No practitioners found" isLoading={isLoading} showNoData={profilesByLocation.length === 0} />
      </MainWrapper>
    );
  }
}

ChoosePractitioners.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    state: PropTypes.shape({}).isRequired,
  }).isRequired,
  profilesByLocation: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
};

ChoosePractitioners.defaultProps = {
};

const mapStateToProps = ({
  authorizationReducer: {
    profilesByLocation,
    isLoading,
    isRefreshing,
  },
  bookReducer: {
    location,
  },
}) => ({
  profilesByLocation,
  isLoading,
  isRefreshing,
  location,
});

export default connect(mapStateToProps)(ChoosePractitioners);
