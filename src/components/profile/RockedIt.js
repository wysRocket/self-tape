import React, { Component } from 'react';
import ReactNative, {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { ratePersonAttempt } from '../../actions/reviews';

import Star from '../../images/icons/star.png';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/RockedItStyles';

class RockedIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      reviewRating: 0,
    };
  }

  onStarRatingPress = rating => this.setState({ reviewRating: rating });

  handleChange = review => this.setState({ review });

  ratePerson = () => {
    const {
      navigation: {
        dispatch,
        navigate,
        state: {
          params: {
            person,
            sessionUid,
          },
        },
      },
      profile,
    } = this.props;
    const { review, reviewRating } = this.state;
    dispatch(ratePersonAttempt({
      review,
      reviewRating,
      ratedPerson: person,
      person: profile,
      sessionUid,
    }));
    // navigate(profile.role === 'user' ? 'HomeCommunities' : 'Dashboard');
    navigate(profile.role === 'user' ? 'Home' : 'Dashboard');
  }

  render() {
    const {
      navigation: {
        state: {
          params: {
            person,
            backScreen,
          },
        },
      },
    } = this.props;
    const { review, reviewRating } = this.state;
    return (
      <MainWrapper
        navigation={this.props.navigation}
        pageName="You Rocked It!"
        goBackScreen={!backScreen ? 'CheckInOut' : backScreen}
      >
        <KeyboardAwareScrollView
          innerRef={(ref) => {
            this.scroll = ref;
          }}
          extraScrollHeight={50}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.title}>YOU ROCKED IT!</Text>
          <Text style={styles.subTitle}> {`You have successfully checked out. Please be sure to rate ${person.username} and leave a review.`} </Text>
          <Image style={styles.avatar} source={{ uri: person.image }} />
          <Text style={styles.name}>{person.name}</Text>
          <View style={styles.ratingContainer}>
            <Image source={Star} />
            <Text style={styles.ratingNumber}>{person.rating}</Text>
          </View>
          <Text style={styles.pleaseRate}> { `PLEASE RATE ${person.username.toUpperCase()}`} </Text>
          <View style={styles.starContainer}>
            <StarRating
              selectedStar={rating => this.onStarRatingPress(rating)}
              disabled={false}
              maxStars={5}
              rating={reviewRating}
              starSize={40}
              fullStarColor="#d8dfe7"
              halfStarColor="#d8dfe7"
              emptyStarColor="#d8dfe7"
            />
          </View>
          <TextInput
            style={styles.multilineInput}
            multiline
            onChangeText={this.handleChange}
            value={review}
            underlineColorAndroid="transparent"
            numberOfLines={20}
            onFocus={(event) => {
              this.scroll.props.scrollToFocusedInput(ReactNative.findNodeHandle(event.target));
            }}
            placeholder="Write a review..."
          />
          <TouchableOpacity
            delayPressIn={20}
            style={styles.sendButton}
            onPress={() => this.ratePerson()}
          >
            <Text style={styles.sendButtonText}>SEND</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </MainWrapper>
    );
  }
}

RockedIt.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired,
};

RockedIt.defaultProps = {};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
  },
}) => ({
  profile,
});

export default connect(mapStateToProps)(RockedIt);
