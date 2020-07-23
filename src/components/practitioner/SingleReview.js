import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import PropTypes from 'prop-types';

import ReviewImage from '../../images/icons/reviewUser.png';
import styles from '../../styles/SingleReviewStyles';

export default class SingleReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      review,
      ImageStyle,
      ReviewContainerStyle,
      TextReviewContainer,
      TextReviewStyle,
      UserNameReviewStyle,
      StartSize,
    } = this.props;

    return (
      <View style={[styles.container, ReviewContainerStyle]}>
        <View style={[styles.containerImage, ImageStyle]}>
          <Image
            style={[styles.reviewImage, ImageStyle]}
            source={(review.personImage && review.personImage !== '') ? { uri: review.personImage } : ReviewImage}
          />
        </View>
        <View style={[styles.containerReview, TextReviewContainer]}>
          <View style={styles.topReview}>
            <Text style={[styles.topReviewName, UserNameReviewStyle]}>{review.personName}</Text>
            <StarRating
              disabled
              maxStars={5}
              rating={review.reviewRating}
              starSize={!StartSize ? 6 : StartSize}
              fullStarColor="#59575a"
            />
          </View>
          <View style={styles.topReviewTextContainer}>
            <Text style={[styles.topReviewTextBold, TextReviewStyle]}>
              {review.review}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

SingleReview.propTypes = {
  review: PropTypes.shape({}).isRequired,
  ImageStyle: PropTypes.shape({}),
  ReviewContainerStyle: PropTypes.shape({}),
  UserNameReviewStyle: PropTypes.shape({}),
  TextReviewStyle: PropTypes.shape({}),
  TextReviewContainer: PropTypes.shape({}),
  StartSize: PropTypes.number,
};

SingleReview.defaultProps = {
  ImageStyle: {},
  ReviewContainerStyle: {},
  TextReviewStyle: {},
  UserNameReviewStyle: {},
  TextReviewContainer: {},
  StartSize: 6,
};
