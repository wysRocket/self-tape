import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  BackHandler,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import NotificationPopup from 'react-native-push-notification-popup';

import { notificationAction } from '../helpers/notifications';
import StatusBarCustom from './StatusBar';
import Header from './Header';
import BackButton from './BackButton';
import Login from '../images/login/login.png';
import styles from '../styles/MainWrapper';
import AppIcon from '../images/icons/ic_launcher.png';

import { locale } from '../constants/textConstants';
import { signOutAttempt } from '../actions/authorization';

export const renderEmptyHeader = (renderLogout = false, dispatch) => (
  <View style={styles.topLogin}>
    {renderLogout ? (
      <TouchableOpacity
        style={styles.HeaderItem}
        onPress={() => dispatch && dispatch(signOutAttempt())}
      >
        <Text style={styles.closeButtonText}>{locale.cancel}</Text>
      </TouchableOpacity>
    ) : <View style={styles.HeaderItem} />}
    <View style={styles.HeaderTitle}>
      <Text style={styles.topTextNameLeft}>SELFTAPE</Text>
      <Text style={styles.topTextNameRight}> NOW</Text>
    </View>
    <View style={styles.HeaderItem} />
  </View>
);
class MainWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: this.props.allowEdit,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { showNotification, navigation: { dispatch } } = this.props;
    if (showNotification !== nextProps.showNotification && nextProps.showNotification === true) {
      const {
        title, body, subtitle, data: { action, data },
      } = nextProps.notification;
      const notifyAction = notificationAction(action);
      this.popup.show({
        appIconSource: AppIcon,
        onPress: () => { if (notifyAction !== null) dispatch(notifyAction(data)); },
        appTitle: 'Selftype',
        timeText: subtitle,
        title,
        body,
      });
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  goBack = () => {
    const { props } = this;
    props.navigation.navigate(props.goBackScreen);
  }

  renderRightHederElememt(profile) {
    const { navigation, onUpdate, allowEdit, onChange } = this.props;
    switch (navigation.state.routeName) {
      // case 'Home':
      case 'Practitioners':
      case 'Book':
      case 'Practitioner':
      case 'BookConfirmation':
        return <Image style={styles.locationButton} source={Login} />;
      case 'Schedule':
      case 'Help':
        return (
          // <TouchableOpacity delayPressIn={20}
          // onPress={() => { navigation.navigate(profile.role === 'practitioner'
          // ? 'Dashboard' : 'HomeCommunities'); }}>
          <TouchableOpacity delayPressIn={20} onPress={() => { navigation.navigate(profile.role === 'practitioner' ? 'Dashboard' : 'Home'); }}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        );
      case 'SelfProfile':
        return (
          <TouchableOpacity delayPressIn={20} onPress={() => { allowEdit ? onUpdate() : onChange() }}>
            <Text style={styles.closeButtonText}>{allowEdit ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        );
      default:
        return <View />;
    }
  }

  renderBackButton = () => {
    const { navigation } = this.props;
    // case 'HomeCommunities':
    switch (navigation.state.routeName) {
      case 'Dashboard':
      case 'Activity':
      case 'Settings':
      case 'Profile':
      case 'Pricing':
      case 'CheckInOut':
        if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
        BackHandler.addEventListener('hardwareBackPress', () => {
          BackHandler.exitApp();
          return true;
        });
        return null;
      case 'Home':
      case 'Schedule':
      case 'Help':
      case 'CardDetails':
      case 'BusinessProfile':
        if (Platform.OS === 'android') {
          BackHandler.addEventListener('hardwareBackPress', () => {
            this.goBack();
            return true;
          });
        }
        return null;
      case 'SelfProfile':
      default:
        if (Platform.OS === 'android') {
          BackHandler.addEventListener('hardwareBackPress', () => {
            this.goBack();
            return true;
          });
        }
        return (<BackButton onPress={this.goBack} />);
    }
  }

  render() {
    const {
      pageName, profile, children, enableHeader, navigation, countNewSessions,
    } = this.props;
    return (
      <SafeAreaView style={styles.safeAreaWrapper}>
        <View style={styles.container}>
          <NotificationPopup ref={(ref) => { this.popup = ref; }} />
          <StatusBarCustom />
          {pageName === 'Login' || pageName === 'Agreement'
            ? renderEmptyHeader()
            : (pageName !== 'SELFTAPE PRO'
            && (
              <View style={styles.top}>
                <View style={styles.backWrapperContainer}>
                  {this.renderBackButton()}
                </View>
                <Text style={styles.pageTitleTop}>{pageName}</Text>
                <View style={styles.closeButton}>
                  {this.renderRightHederElememt(profile)}
                </View>
              </View>
            ))
          }
          {(enableHeader && pageName !== 'Login' && pageName !== 'Agreement') && (
            <Header navigation={navigation} person={profile} countNewSessions={countNewSessions} />
          )}
          <KeyboardAvoidingView
            style={styles.container}
          >
            {children}
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    );
  }
}

MainWrapper.propTypes = {
  navigation: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  profile: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
  pageName: PropTypes.string,
  children: PropTypes.node.isRequired,
  enableHeader: PropTypes.bool,
  showNotification: PropTypes.bool.isRequired,
  notification: PropTypes.shape({}),
  countNewSessions: PropTypes.number,
};

MainWrapper.defaultProps = {
  profile: null,
  pageName: '',
  enableHeader: true,
  notification: {},
  countNewSessions: 0,
};

const mapStateToProps = ({
  authorizationReducer: {
    isLoading,
    msg,
    user,
    profile,
    isReady,
  },
  notificationsReducer: {
    showNotification,
    notification,
  },
  sessionsReducer: {
    countNewSessions,
  },
}) => ({
  isLoading,
  msg,
  user,
  profile,
  isReady,
  showNotification,
  notification,
  countNewSessions,
});

export default connect(mapStateToProps)(MainWrapper);
