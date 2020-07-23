import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import ImageLoading from '../../custom-components/ImageLoading';
import MainWrapper from '../../share/MainWrapper';
import Star from '../../images/icons/star.png';
import styles from '../../styles/BookSessionConfirmationStyles';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import * as HELPERS from '../../helpers/textHelpers';

import { locale } from '../../constants/textConstants';

class BookSessionConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isReady } = this.props;
    if (!isReady && nextProps.isReady) {
      nextProps.navigation.navigate('Book');
    }
  }

  goNext = () => {
    const { navigation: { navigate } } = this.props;
    navigate('Book');
  }

  sessionInfo = () => {
    const { selectedTime, practitioner } = this.props;
    const bookStartTime = moment(selectedTime.dateTime);
    const sessionData = [
      { name: locale.when, value: bookStartTime.format('DD/MM/YYYY') },
      { name: locale.time, value: bookStartTime.format('hh:mm A') },
      { name: locale.where, value: HELPERS.formatLocation(practitioner.address) },
    ];
    return sessionData;
  }

  render() {
    const {
      isLoading,
      isReady,
      practitioner,
      navigation,
    } = this.props;

    return (
      <MainWrapper
        navigation={navigation}
        pageName={locale.confirmationOfBooking}
        goBackScreen="Book"
      >
        <View
          style={styles.container}
        >
          <View style={styles.containerPaddingTop}>
            <View style={styles.bioImageContainer}>
              <ImageLoading
                style={styles.bioImage}
                source={{ uri: practitioner.image }}
              />
            </View>
            <Text style={styles.bioName}>{practitioner.username}</Text>
            <View style={styles.bioRating}>
              <Image source={Star} />
              <Text style={styles.bioRatingNumber}>{practitioner.rating}</Text>
            </View>
          </View>
          <View style={styles.containerPaddingBottom}>
            <Text style={styles.congratulation}>{locale.details}</Text>
            <Text style={styles.infoConfirmationTitle}>
              {`${locale.weWillNotifyYou} ${HELPERS.returnPersonName(practitioner)} ${locale.confirmsSession}!`}
            </Text>
            {this.sessionInfo().map(item => (
              <View
                key={item.value}
                style={styles.confirmationBlockForText}
              >
                <Text style={styles.infoConfirmation}>{item.name}</Text>
                <Text style={styles.infoConfirmationValue}>{item.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.containerConfirmationButton}>
            <TouchableOpacity
              delayPressIn={20}
              style={styles.confirmationButton}
              onPress={() => this.goNext()}
            >
              <Text style={styles.bookConfirmationText}>{locale.next}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomActivityIndicator isLoading={isLoading || !isReady} showNoData={false} text="" />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({
  sessionsReducer: { isReady, isLoading },
  bookReducer: {
    location,
    practitioner,
    selectedTime,
    selectedDate,
  },
}) => ({
  isReady,
  isLoading,
  location,
  practitioner,
  selectedTime,
  selectedDate,
});

BookSessionConfirmation.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    dispatch: PropTypes.func,
  }),
  isReady: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  selectedTime: PropTypes.shape({}),
  practitioner: PropTypes.shape({}).isRequired,
};

BookSessionConfirmation.defaultProps = {
  navigation: {},
  selectedTime: {},
};

export default connect(mapStateToProps)(BookSessionConfirmation);
