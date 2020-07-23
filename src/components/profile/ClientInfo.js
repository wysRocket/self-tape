import React, { Component, Fragment } from 'react';
import {
  Text, View, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainWrapper from '../../share/MainWrapper';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import ImageLoading from '../../custom-components/ImageLoading';
import DownloadSides from '../../custom-components/DownloadSides';
import Star from '../../images/icons/star.png';
import styles from '../../styles/ClientInfoStyles';
import { SESSIONS_STATUSES } from '../../constants/apiConstants';

import { createOrGetChatAttempt } from '../../actions/chat';
import { sessionsUpdateAttempt } from '../../actions/sessions';
import { makeCallAttempt } from '../../actions/calls';
import { locale } from '../../constants/textConstants';
import { messageAlert } from '../../helpers/sessions';

class ClientInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startCreate: props.isLoading,
      page: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { startCreate, page } = this.state;
    const {
      navigation,
      navigation: { state: { params: { sessionUid } } },
    } = this.props;
    if (!nextProps.isReady) {
      this.setState({ startCreate: nextProps.isLoading });
    }
    if (page !== null && startCreate && nextProps.isReady) {
      this.setState({
        startCreate: nextProps.isLoading,
        page: null,
      }, () => {
        navigation.navigate(page, { sessionUid });
      });
    }
  }

  changeSessionsStatus = (page, newStatus) => {
    const {
      dispatch,
      sessions,
      navigation: { state: { params: { sessionUid } } },
    } = this.props;
    const session = sessions[sessionUid];
    this.setState({ page });
    dispatch(sessionsUpdateAttempt({ ...session, ...{ newStatus } }));
  }

  renderUserInfo = ({ name, value, style = styles.containerMiddleText }) => (
    value !== '' && <Text style={style}>{`${name}: ${value}`}</Text>
  );

  goToChat = (client) => {
    const profileClient = {
      ...client,
      role: 'user',
    };
    const {
      navigation: { dispatch },
    } = this.props;
    dispatch(createOrGetChatAttempt({ profile: profileClient }));
  }

  onCancelAppointment = () => {
    messageAlert({
      title: 'Are you sure you want to cancel this appointment?',
      submitText: 'Yes',
      cancelText: 'No',
      func: () => { this.changeSessionsStatus('Schedule', SESSIONS_STATUSES.canceled); },
    });
  }

  render() {
    const {
      sessions,
      navigation,
      navigation: { state: { params: { sessionUid } } },
      isLoading,
    } = this.props;
    const client = sessions[sessionUid];
    console.log('client', client)
    const created = client.status === SESSIONS_STATUSES.created;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Client Info"
        goBackScreen="Schedule"
      >
        <ScrollView
          style={styles.container}
        >
          <View style={styles.containerTop}>
            <View style={styles.containerTopImageContainer}>
              <ImageLoading
                style={styles.containerTopImage}
                source={{ uri: client.details.profileClient.image }}
              />
            </View>
            <Text style={styles.containerTopClientName}>
              {client.details.profileClient.username}
            </Text>
            <View style={styles.containerTopRating}>
              <Image style={styles.containerTopRatingImage} source={Star} />
              <Text style={styles.containerTopRatingCount}>
                {client.details.profileClient.rating}
              </Text>
            </View>
          </View>
          <View style={styles.containerMiddle}>
            {this.renderUserInfo({ name: 'Agent', value: client.details.agent })}
            {this.renderUserInfo({ name: 'Manager', value: client.details.manager })}
            {this.renderUserInfo({ name: 'Website', value: client.details.website })}
            {this.renderUserInfo({ name: 'Email', value: client.details.email })}
          </View>
          <View style={styles.containerBottom}>
            <Text style={styles.containerBottomTextTitle}>
              {(client.selectedTime.selectedPrice.type && client.selectedTime.selectedPrice.type === 'service')
                ? `${client.selectedTime.selectedPrice.name}\n${client.selectedTime.selectedPrice.duration} minute session`
                : `${client.selectedTime.selectedPrice.duration} minute session`
              }
            </Text>
            {this.renderUserInfo({ name: 'Title', value: client.details.projectName, style: styles.containerBottomText })}
            {this.renderUserInfo({
              name: 'Character',
              value: client.details.characterName ? `"${client.details.characterName}"` : '',
              style: styles.containerBottomText,
            })}
            {this.renderUserInfo({ name: '# of scenes', value: client.details.scenes, style: styles.containerBottomText })}
            <DownloadSides {...this.props} client={client} />
            <View style={[styles.buttonsContainer, created && { flexDirection: 'row' }]}>
              {client.status !== SESSIONS_STATUSES.declined && (
                <TouchableOpacity
                  delayPressIn={20}
                  style={[styles.containerBottomButton, { backgroundColor: 'black' }]}
                  onPress={this.onCancelAppointment}
                >
                  <Text style={styles.containerBottomButtonText}>CANCEL</Text>
                </TouchableOpacity>
              )}
              {created ? (
                <TouchableOpacity
                  delayPressIn={20}
                  style={styles.containerBottomButton}
                  onPress={() => this.changeSessionsStatus('ClientConfirmation', SESSIONS_STATUSES.accepted)}
                >
                  <Text style={styles.containerBottomButtonText}>ACCEPT</Text>
                </TouchableOpacity>
              ) : (
                <Fragment>
                  <TouchableOpacity
                    delayPressIn={20}
                    style={[styles.containerBottomButton, { backgroundColor: 'black' }]}
                    onPress={() => {
                      navigation.dispatch(makeCallAttempt({
                        phone: client.details.profileClient.phoneNumber,
                      }));
                    }}
                  >
                    <Text style={styles.containerBottomButtonText}>CALL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    delayPressIn={20}
                    style={[styles.containerBottomButton, { backgroundColor: 'black' }]}
                    onPress={() => this.goToChat(client.details.profileClient)}
                  >
                    <Text style={styles.containerBottomButtonText}>{locale.chat.toUpperCase()}</Text>
                  </TouchableOpacity>
                </Fragment>
              )}
            </View>
          </View>
        </ScrollView>
        <CustomActivityIndicator isLoading={isLoading} style={{ opacity: 0.7 }} showNoData={false} />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({
  sessionsReducer: { sessions, isLoading, isReady },
}) => ({
  sessions,
  isLoading,
  isReady,
});

ClientInfo.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  sessions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isReady: PropTypes.bool.isRequired,
};

ClientInfo.defaultProps = {};

export default connect(mapStateToProps)(ClientInfo);
