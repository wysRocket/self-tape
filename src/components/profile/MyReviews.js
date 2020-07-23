import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { getPersonReviewsAttempt, refreshPersonReviewsAttempt } from '../../actions/reviews';

import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import SingleReview from '../practitioner/SingleReview';

import MainWrapper from '../../share/MainWrapper';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: '100%',
    padding: 10,
  },

  ImageStyle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },

  ReviewContainerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },

  TextReviewContainer: {
    marginHorizontal: 10,
  },

  UserNameReviewStyle: {
    fontSize: 16,
    fontWeight: '600',
  },

  TextReviewStyle: {
    fontSize: 15,
    fontWeight: '400',
  },
});

const StartSize = 14;

class MyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    const {
      navigation: { dispatch },
      profile,
    } = this.props;
    dispatch(getPersonReviewsAttempt(profile));
  }

  onRefreshReviews = () => {
    const {
      navigation: { dispatch },
      profile,
    } = this.props;
    dispatch(refreshPersonReviewsAttempt(profile));
  }

  keyExtractor = item => item.uid;

  render() {
    const {
      profile,
      isLoading,
      isLoadingReviews,
      navigation,
      navigation: { state: { params } },
      personReviews,
      isRefreshing,
      msg,
    } = this.props;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="My Reviews"
        goBackScreen={params && params.backScreen ? params.backScreen : 'Profile'}
      >
        <FlatList
          ref={(node) => { this.flatListRef = node; }}
          style={styles.Container}
          data={personReviews}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => (
            <SingleReview
              review={item}
              currentUser={profile}
              ImageStyle={styles.ImageStyle}
              ReviewContainerStyle={styles.ReviewContainerStyle}
              TextReviewContainer={styles.TextReviewContainer}
              UserNameReviewStyle={styles.UserNameReviewStyle}
              TextReviewStyle={styles.TextReviewStyle}
              StartSize={StartSize}
            />
          )}
          refreshControl={(
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefreshReviews}
            />
          )}
        />
        <CustomActivityIndicator
          text={msg}
          isLoading={isLoading || isLoadingReviews}
          showNoData={!isLoading && !isLoadingReviews && personReviews.length === 0}
        />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({
  authorizationReducer: {
    profile,
    isLoading,
  },
  reviewsReducer: {
    personReviews,
    isLoading: isLoadingReviews,
    isRefreshing,
    msg,
  },
}) => ({
  profile,
  personReviews,
  isLoading,
  isLoadingReviews,
  isRefreshing,
  msg,
});

MyReviews.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired,
  personReviews: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingReviews: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  msg: PropTypes.string.isRequired,
};

MyReviews.defaultProps = {
};


export default connect(mapStateToProps)(MyReviews);
