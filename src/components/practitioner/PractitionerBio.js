import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';

import { getPersonReviewsAttempt } from '../../actions/reviews';

import MainWrapper from '../../share/MainWrapper';
import SingleReview from './SingleReview';
import Star from '../../images/icons/star.png';
import UserIcon from '../../images/icons/user.png';
import styles from '../../styles/PractitionerBioStyles';

class PractitionerBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practitioner: null,
    };
  }

  componentDidMount = () => {
    const {
      navigation: { dispatch },
      practitioner,
    } = this.props;
    this.setState({ practitioner });
    dispatch(getPersonReviewsAttempt(practitioner));
  }

  renderReviews = reviews => reviews.map((review, index) => <SingleReview key={`${index + 1}`} review={review} />);

  render() {
    const {
      personReviews,
      navigation: { state: { params: { backScreen } } },
    } = this.props;
    const { practitioner } = this.state;
    return (
      practitioner !== null && (
        <MainWrapper
          navigation={this.props.navigation}
          pageName={practitioner.username}
          goBackScreen={backScreen}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainerAligment}
            style={styles.container}
          >
            <View style={styles.containerPadding}>
              <Image style={styles.bioImage} source={{ uri: practitioner.image }} />
              <Text style={styles.bioName}> {practitioner.username}</Text>
              <View style={styles.bioRating}>
                <Image source={Star} />
                <Text style={styles.bioRatingNumber}>{practitioner.rating}</Text>
              </View>
              <Text style={styles.bioTitle}>
                BIO
              </Text>
              <Text style={styles.bioText}>
                {practitioner.bio}
              </Text>
            </View>
            <View style={styles.containerReviewsBottomContainer}>
              <Text style={styles.containerReviewsBottomTitle}>Reviews</Text>
              <View style={styles.containerReviewsBottom}>
                <View style={styles.containerReviewsBottomLeft}>
                  <View style={styles.containerReviewsBottomLeftStarBlock}>
                    <Text style={styles.containerReviewsBottomLeftStarBlockCount}>
                      {practitioner.rating}
                    </Text>
                    <StarRating
                      disabled
                      maxStars={5}
                      rating={practitioner.rating}
                      starSize={14}
                      fullStarColor="#f0ce00"
                    />
                    <View style={styles.containerReviewsBottomLeftStarBlockTotal}>
                      <Image
                        style={styles.containerReviewsBottomLeftStarBlockUserIocn}
                        source={UserIcon}
                      />
                      <Text style={styles.containerReviewsBottomLeftStarBlockTotalCount}>
                        {practitioner.totalReviews} total
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.containerReviewsBottomRight}>
                  {personReviews && this.renderReviews(personReviews)}
                </View>
              </View>
            </View>
          </ScrollView>
        </MainWrapper>
      )
    );
  }
}

const mapStateToProps = ({
  reviewsReducer: { personReviews },
  bookReducer: {
    practitioner,
  },
}) => ({
  personReviews,
  practitioner,
});

PractitionerBio.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  personReviews: PropTypes.arrayOf(PropTypes.shape({})),
  practitioner: PropTypes.shape({}).isRequired,
};

PractitionerBio.defaultProps = {
  personReviews: [],
};

export default connect(mapStateToProps)(PractitionerBio);
