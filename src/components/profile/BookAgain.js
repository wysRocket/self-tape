import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Text, View, Linking,
} from 'react-native';

import { profilesByLocationsAttempt } from '../../actions/authorization';
import { getBookDataAttempt } from '../../actions/sessions';
import { setBookAgainData } from '../../actions/book';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import CustomTouchableOpacity from '../../custom-components/CustomTouchableOpacity';
import SessionStatus from '../../custom-components/Session/SessionStatus';
import MapWithCard from '../../custom-components/Maps/MapWithCard';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/BookAgainStyles';
import { locale } from '../../constants/textConstants';

const bookActions = [locale.selfTape, locale.edit, locale.send];

class BookAgain extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    const {
      navigation: {
        dispatch,
        state: { params: { item: { locationUid, profileUid, uid } } },
      },
    } = this.props;
    dispatch(getBookDataAttempt({ locationUid, profileUid, sessionUid: uid }));
    dispatch(profilesByLocationsAttempt(locationUid));
  }

  toCamelCase = str => str
    .toLowerCase()
    .split(' ')
    .map(word => word[0].toUpperCase() + word.substr(1))
    .join(' ');

  rateUser = () => {
    const {
      navigation: { navigate, state: { params: { item } } }, bookData,
    } = this.props;
    navigate('RockedIt', { person: bookData.practitionerProfile.practitioner, backScreen: 'BookAgain', sessionUid: item.uid });
  }

  bookAgain = () => {
    const {
      navigation: { dispatch },
      bookData: { practitionerProfile: { practitioner }, singleLocation },
    } = this.props;
    dispatch(setBookAgainData({ practitioner, location: singleLocation }));
  }

  renderButton = ({ style, onPressFunction, text }) => (
    <CustomTouchableOpacity
      styles={style}
      onPressFunction={onPressFunction}
    >
      <Text style={styles.textLinks}>{text}</Text>
    </CustomTouchableOpacity>
  )

  render() {
    const {
      navigation,
      navigation: {
        state: {
          params: {
            item: historySession,
            item: { details: { profilePractitioner } },
          },
        },
      },
      bookData,
      isLoading,
    } = this.props;
    const uber = `https://m.uber.com/ul/?action=setPickup&client_id=vbWU0LfUtvQQbs0Li3LFzgD1VquEpnMW&pickup=my_location&dropoff[latitude]=${profilePractitioner.location.latitude}&dropoff[longitude]=${profilePractitioner.location.longitude}`;
    const lyft = `https://lyft.com/ride?id=lyft&pickup[latitude]=${profilePractitioner.location.latitude}&pickup[longitude]=${profilePractitioner.location.longitude}`; // &partner=YOUR_CLIENT_ID
    const date = moment(historySession.selectedTime.dateTime);

    return (
      <MainWrapper
        navigation={navigation}
        pageName={locale.session}
        goBackScreen="FinishedSessions"
      >
        {bookData !== null && !isLoading
        && (
          <View
            style={styles.container}
          >
            <SessionStatus session={historySession} />
            <MapWithCard session={historySession} />
            <View style={styles.bookList}>
              <View style={styles.singleBook}>
                <View style={styles.singleBookLeft}>
                  <View style={styles.singleBookLeftTop}>
                    {bookActions.map((action, index) => (
                      <CustomTouchableOpacity
                        key={action}
                        styles={index !== bookActions.length - 1 ? styles.singleBookLeftTopButtonContainer : {}}
                      >
                        <Text style={styles.singleBookLeftTopButton}>{action}</Text>
                      </CustomTouchableOpacity>
                    ))}
                  </View>
                  <Text style={styles.singleBookLeftTopName}>
                    {historySession.details.profilePractitioner.username.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.singleBookRight}>
                  <Text style={styles.singleBookRightTime}>
                    {date.format('hh:mm A')}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.linksBlock}>
              {this.renderButton({
                style: styles.uber,
                onPressFunction: () => { Linking.openURL(uber); },
                text: locale.getThereWithUber,
              })}
              {this.renderButton({
                style: styles.lyft,
                onPressFunction: () => { Linking.openURL(lyft); },
                text: locale.getThereWithLyft,
              })}
            </View>
            <View style={styles.bottomButtons}>
              {this.renderButton({
                style: styles.bookAgain,
                onPressFunction: () => this.bookAgain(),
                text: locale.bookAgain,
              })}
              {!bookData.isRatedPerson
              && (
                this.renderButton({
                  style: styles.reviewButton,
                  onPressFunction: () => this.rateUser(),
                  text: locale.review,
                })
              )}
            </View>
          </View>
        )}
        <CustomActivityIndicator
          text={locale.noBookData}
          isLoading={isLoading}
          showNoData={bookData === null}
        />
      </MainWrapper>
    );
  }
}

BookAgain.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
  bookData: PropTypes.shape({}),
  isLoading: PropTypes.bool.isRequired,
};

BookAgain.defaultProps = {
  bookData: null,
};

const mapStateToProps = ({
  sessionsReducer: {
    bookData,
    isLoading,
  },
}) => ({
  bookData,
  isLoading,
});

export default connect(mapStateToProps)(BookAgain);
