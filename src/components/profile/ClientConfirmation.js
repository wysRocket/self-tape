import React, { Component } from 'react';
import {
  Text, View, ScrollView, Image,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import MainWrapper from '../../share/MainWrapper';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import DownloadSides from '../../custom-components/DownloadSides';
import ImageLoading from '../../custom-components/ImageLoading';
import Star from '../../images/icons/star.png';
import styles from '../../styles/ClientConfirmationStyles';
import * as HELPERS from '../../helpers/textHelpers';
import { locale } from '../../constants/textConstants';

class ClientConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      sessions,
      navigation,
      navigation: { state: { params: { sessionUid } } },
      isLoading,
    } = this.props;
    const client = sessions[sessionUid];
    const dateTime = new Date(client.selectedTime.dateTime);
    return (
      <MainWrapper
        navigation={navigation}
        pageName={locale.confirmation}
        goBackScreen="Schedule"
      >
        <ScrollView
          style={styles.container}
        >
          <View style={styles.containerTop}>
            <Text style={styles.containerTopText}>{locale.youWillBeTapping}</Text>
            <Text style={styles.containerTopText}>
              {`${locale.client} ${client.details.profileClient.username}`}
            </Text>
            <Text style={styles.containerTopText}>{`${locale.when} ${moment(dateTime).format('YYYY-MM-DD')}`}</Text>
            <Text style={styles.containerTopText}>{`${locale.time} ${moment(dateTime).format('hh:mm A')}`}</Text>
            <Text style={styles.containerTopText}>
              {`${locale.yourLocation} ${HELPERS.formatLocation(client.details.profilePractitioner.address)}`}
            </Text>
          </View>
          <View style={styles.containerMiddle}>
            <View style={styles.containerMiddleImageWrap}>
              <ImageLoading
                style={styles.containerMiddleImage}
                source={{ uri: client.details.profileClient.image }}
              />
            </View>
            <Text style={styles.containerMiddleClientName}>
              {client.details.profileClient.username}
            </Text>
            <View style={styles.containerMiddleRating}>
              <Image style={styles.containerMiddleRatingImage} source={Star} />
              <Text style={styles.containerMiddleRatingCount}>
                {client.details.profileClient.rating}
              </Text>
            </View>
          </View>
          <View style={styles.containerMiddle}>
            <DownloadSides {...this.props} client={client} />
          </View>
        </ScrollView>
        <CustomActivityIndicator text="" isLoading={isLoading} showNoData={false} />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({
  authorizationReducer: { userId },
  sessionsReducer: { sessions, isLoading },
}) => ({
  userId,
  sessions,
  isLoading,
});

ClientConfirmation.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  sessions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

ClientConfirmation.defaultProps = {};

export default connect(mapStateToProps)(ClientConfirmation);

