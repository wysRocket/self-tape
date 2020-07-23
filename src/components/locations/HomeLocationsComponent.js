import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLocationsAttempt, refreshLocationsAttempt } from '../../actions/locations';
import MainWrapper from '../../share/MainWrapper';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import styles from '../../styles/HomeLocationsStyles';
import SingleLocationItem from './SingleLocationItem';
import { requestLocationsPermission } from '../../helpers/permissions';

class HomeLocationsComponent extends PureComponent {
  static navigationOptions() {
    const drawerLabel = 'Locations';
    return { drawerLabel };
  }

  componentDidMount = () => {
    const { navigation: { dispatch }, locations } = this.props;
    if (!locations) {
      dispatch(getLocationsAttempt());
      this.navigatorGetCurrentPosition();
    }
  }

  onRefreshLocations = () => {
    const { navigation: { dispatch } } = this.props;
    dispatch(refreshLocationsAttempt());
  }

  navigatorGetCurrentPosition = async () => {
    const { navigation: { dispatch } } = this.props;
    await requestLocationsPermission();
    dispatch(getLocationsAttempt());
  }

  render() {
    const {
      locations, isRefreshing, isLoading, navigation,
    } = this.props;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Locations"
        // goBackScreen="HomeCommunities"
        goBackScreen="Home"
      >
        {locations && (
          <View style={styles.container}>
            <FlatList
              style={styles.flatListContainer}
              data={locations}
              onRefresh={this.onRefreshLocations}
              refreshing={isRefreshing}
              renderItem={elem => (
                <SingleLocationItem location={elem.item} navigation={navigation} />
              )}
              keyExtractor={(elem, index) => index.toString()}
            />
          </View>
        )}
        <CustomActivityIndicator text="No data found" isLoading={isLoading} showNoData={locations && locations.length === 0} />
      </MainWrapper>
    );
  }
}

HomeLocationsComponent.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  locations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
};

HomeLocationsComponent.defaultProps = {
  locations: null,
};


const mapStateToProps = ({
  locations: {
    locations,
    isRefreshing,
    isLoading,
  },
}) => ({
  locations,
  isRefreshing,
  isLoading,
});


export default connect(mapStateToProps)(HomeLocationsComponent);
