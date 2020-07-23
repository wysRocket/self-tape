import React, { Component } from 'react';
import { BackHandler, Animated, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Header } from 'react-navigation';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { userExist, userNotExist } from '../actions/authorization';
import { getSessionAttempt, getNotViewedSessionsAttempt } from '../actions/sessions';
import { AppNavigator } from './routes';
import { addListener } from '../utils/redux';
import { clearAlert } from '../actions/errors';
import { showNotification } from '../actions/notifications';
import { notificationAction } from '../helpers/notifications';

import styles, { width, offsetAlterTop } from '../styles/AppNavigator';

const timerOffset = 2200;

class AppWithNavigationState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: '',
      errorMessagesColor: 'red',
    };
    this.statusBarOpen = false;
    this.statusMessage = new Animated.Value(0);
  }

  componentDidMount = async () => {
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentDidUpdate = () => {
    const { alertMsg, dispatch } = this.props;
    if (alertMsg !== '' && this.statusBarOpen === false) this.showMessage(alertMsg);
    dispatch(getNotViewedSessionsAttempt());
  }

  componentWillUnmount = () => {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      this.requestPermission();
    }
  }

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  createNotificationListeners = async () => {
    const { showPopUp } = this.props;
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { dispatch } = this.props;
      if (!showPopUp) dispatch(showNotification(notification));
      // eslint-disable-next-line no-underscore-dangle
      if (notification && notification._data && notification._data.action === 'MOVE_TO_CHECK_IN_OUT') {
        dispatch(getSessionAttempt());
      }
    });

    this.notificationOpenedListener = firebase.notifications()
      .onNotificationOpened((notificationOpen) => {
        this.callNotificationAction(notificationOpen);
      });

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      this.callNotificationAction(notificationOpen);
    }
    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }

  callNotificationAction = (notificationOpen) => {
    const { dispatch } = this.props;
    const { data: { action, data } } = notificationOpen.notification;
    const notifyAction = notificationAction(action);
    try {
      firebase.auth().onAuthStateChanged((userData) => {
        if (userData) {
          dispatch(userExist(userData, (exist) => {
            if (notifyAction !== null && exist) dispatch(notifyAction(data));
          }));
        } else dispatch(userNotExist());
      });
    } catch (error) {
      dispatch(userNotExist());
    }
  }


  backPressSubscribe = () => {
    let invokeDefault = true;
    const subscriptions = [];

    this.backPressSubscriptions.forEach(sub => subscriptions.push(sub));

    for (let i = 0; i < subscriptions.reverse().length; i += 1) {
      if (subscriptions[i]()) {
        invokeDefault = false;
        break;
      }
    }

    if (invokeDefault) {
      BackHandler.exitApp();
    }
  }

  isMessage = async ({ code, message, color = 'red' }) => {
    if (!code) return;
    this.setState({
      errorMessages: message,
      errorMessagesColor: color,
    }, () => this.pullDownMessage());
  }

  showMessage = async (alertMessage) => {
    const {
      dispatch,
    } = this.props;
    this.isMessage({ code: 'alert', message: alertMessage });
    await dispatch(clearAlert());
    setTimeout(this.pullUpMessage, timerOffset);
  }

  pullDownMessage = () => {
    if (this.statusBarOpen) return;
    this.statusBarOpen = true;
    this.statusMessage.setValue(0);
    Animated.spring(
      this.statusMessage,
      {
        toValue: 1,
        bounciness: 0,
      },
    ).start();
  }

  pullUpMessage = () => {
    if (!this.statusBarOpen) return;
    this.statusBarOpen = false;
    this.statusMessage.setValue(1);
    Animated.spring(this.statusMessage, {
      toValue: 0,
      bounciness: 0,
    }).start();
  }

  render() {
    const {
      dispatch,
      nav,
      profile,
      countNewSessions,
      countNotAccepted,
    } = this.props;
    const { errorMessagesColor, errorMessages } = this.state;
    const menuMoveY = this.statusMessage.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Header.HEIGHT + offsetAlterTop],
    });
    return [
      <AppNavigator
        key="AppNavigator"
        screenProps={{
          profile,
          countNewSessions,
          countNotAccepted,
        }}
        navigation={{
          dispatch,
          state: nav,
          addListener,
        }}
      />,
      <Animated.View
        key="alert"
        style={[styles.statusView,
          {
            backgroundColor: errorMessagesColor,
            width,
            transform: [{ translateY: menuMoveY }],
          },
        ]}
      >
        <Text style={styles.statusText}>{errorMessages}</Text>
      </Animated.View>,
    ];
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    index: PropTypes.number,
  }).isRequired,
  alertMsg: PropTypes.string,
  profile: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
  showPopUp: PropTypes.bool.isRequired,
  countNewSessions: PropTypes.number,
  countNotAccepted: PropTypes.number,
};

AppWithNavigationState.defaultProps = {
  alertMsg: '',
  profile: null,
  countNewSessions: 0,
  countNotAccepted: 0,
};

const mapStateToProps = ({
  nav,
  errorsReducer: { alertMsg },
  notificationsReducer: { showNotification: showPopUp },
  authorizationReducer: {
    profile,
  },
  sessionsReducer: {
    countNewSessions,
    countNotAccepted,
  },
}) => ({
  nav,
  alertMsg,
  profile,
  showPopUp,
  countNewSessions,
  countNotAccepted,
});
export default connect(mapStateToProps, null, null)(AppWithNavigationState);
