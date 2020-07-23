import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import { getCommunitiesAttempt } from '../../actions/communities';
import { getTipsAttempt } from '../../actions/tips';

import MainWrapper from '../../share/MainWrapper';
import communitiesList from '../../mockup/communities';
import CommunitiesListItem from './CommunitesListItem';
import styles from '../../styles/CommunitiesStyles';

class HomeCommunities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: communitiesList,
    };
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(getCommunitiesAttempt());
    dispatch(getTipsAttempt());
  }

  render() {
    const { navigation } = this.props;
    const { communities } = this.state;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Home"
      >
        <View style={styles.container}>
          <View style={styles.top} />
          <FlatList
            style={styles.flatListContainer}
            data={communities}
            renderItem={elem => (
              <CommunitiesListItem
                item={elem.item}
                navigation={navigation}
              />
            )}
            keyExtractor={(elem, index) => index.toString()}
          />
        </View>
        <CustomActivityIndicator text="No data found" isLoading={!communities} showNoData={false} />
      </MainWrapper>
    );
  }
}

const mapStateToProps = () => ({
});

HomeCommunities.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.shape().isRequired,
};

HomeCommunities.defaultProps = {
};

export default connect(mapStateToProps)(HomeCommunities);

