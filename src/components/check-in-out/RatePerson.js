import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

const RatePerson = ({ onStarRatingPress, reviewRating }) => (
  <View style={styles.Container}>
    <StarRating
      selectedStar={rating => onStarRatingPress(rating)}
      disabled={false}
      maxStars={5}
      rating={reviewRating}
      starSize={40}
      fullStarColor="#d8dfe7"
      halfStarColor="#d8dfe7"
      emptyStarColor="#d8dfe7"
    />
  </View>
);

RatePerson.propTypes = {
  onStarRatingPress: PropTypes.func.isRequired,
  reviewRating: PropTypes.number,
};

RatePerson.defaultProps = {
  reviewRating: 0,
};

export default RatePerson;
