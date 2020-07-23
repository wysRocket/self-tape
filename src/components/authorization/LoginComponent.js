import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';

import MainWrapper from '../../share/MainWrapper';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import CustomTouchableOpacity from '../../custom-components/CustomTouchableOpacity';
import ModalLogin from './ModalLogin';

import { userExist, userNotExist } from '../../actions/authorization';
import { saveItem, getItem } from '../../helpers/authorization';
import { signUpText, loginText } from '../../constants/textConstants';
import { addedCard } from '../../helpers/membership';
import LoginBack from '../../images/login/loginBack.png';
import styles from '../../styles/LoginStyles';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstRender: true,
      isModalVisible: false,
      forgotPassword: false,
      signUp: false,
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      role: 'practitioner',
    };
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    const { isFirstRender } = this.state;
    try {
      firebase.auth().onAuthStateChanged((userData) => {
        if (userData) {
          dispatch(userExist(userData, (exist) => {
            if (exist) {
              // if (isFirstRender) this.appIsReady(this.props);
            } else dispatch(userNotExist());
          }));
        } else dispatch(userNotExist());
      });
    } catch (error) {
      dispatch(userNotExist());
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { user, profile } = this.props;
    const { isFirstRender } = this.state;
    if ((nextProps.user !== null && nextProps.profile !== null)
    && (nextProps.user !== user
      || (profile && nextProps.profile.role !== profile.role)) && isFirstRender) {
      this.appIsReady(nextProps);
    }
  }

  appIsReady = (props) => {
    const { navigation: { dispatch } } = props;

    this.setState({
      isModalVisible: false,
      isFirstRender: false,
    }, () => {
      const practitionerScreen = props.profile.configured && addedCard(props.profile.membership) ? 'Dashboard' : 'Onboarding';
      const userScreen = props.profile.configured ? 'Home' : 'OnboardingUser';
      // HomeCommunities
      const profilePage = NavigationActions.navigate({
        routeName: props.profile.role === 'practitioner' ? practitionerScreen : userScreen,
      });
      console.log('here')
      dispatch(profilePage);
    });
  }

  onChangeText = (name, value) => {
    this.setState({ [name]: value });
  }

  closeModal = () => {
    this.setState({ isModalVisible: false });
  }

  forgotToggle = () => this.setState(prevState => ({ forgotPassword: !prevState.forgotPassword }));

  toggleModal = async (signUp) => {
    const usedMail = await getItem('@usedEmail');
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible,
      signUp,
      username: '',
      password: '',
      passwordConfirmation: '',
      role: 'practitioner',
    }));
    this.onChangeText('email', signUp ? '' : usedMail);
  }

  selectUser = (value) => {
    this.setState({ role: value }, () => {
      saveItem('@selectedRole', value);
    });
  }

  render() {
    const {
      isModalVisible,
      signUp,
      email,
      username,
      password,
      passwordConfirmation,
      role,
      forgotPassword,
    } = this.state;
    const { navigation: { navigate } } = this.props;
    const {
      isLoading,
      isReady,
    } = this.props;
    if (isLoading || !isReady) return <CustomActivityIndicator isLoading={isLoading || !isReady} />;
    return (
      <MainWrapper navigation={navigate} pageName="Login">
        <View style={styles.container}>
          <View style={styles.middle}>
            <Image style={styles.imageBackground} source={LoginBack} />
          </View>
          <View style={styles.bottom}>
            <CustomTouchableOpacity
              styles={styles.singUpButton}
              onPressFunction={() => this.toggleModal(true)}
            >
              <Text style={styles.buttonsText}>{signUpText}</Text>
            </CustomTouchableOpacity>
            <CustomTouchableOpacity
              styles={styles.loginButton}
              onPressFunction={() => this.toggleModal(false)}
            >
              <Text style={styles.buttonsText}>{loginText}</Text>
            </CustomTouchableOpacity>
          </View>
        </View>
        <ModalLogin
          isModalVisible={isModalVisible}
          signUp={signUp}
          toggleModal={this.toggleModal}
          email={email}
          username={username}
          password={password}
          passwordConfirmation={passwordConfirmation}
          role={role}
          onChangeText={this.onChangeText}
          selectUser={this.selectUser}
          cleanData={this.cleanData}
          navigate={navigate}
          closeModal={this.closeModal}
          forgotToggle={this.forgotToggle}
          forgotPassword={forgotPassword}
        />
      </MainWrapper>
    );
  }
}

LoginContainer.propTypes = {
  dispatch: PropTypes.func,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
  isReady: PropTypes.bool,
  profile: PropTypes.shape({
    role: PropTypes.string.isRequired,
    configured: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }),
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
};

LoginContainer.defaultProps = {
  dispatch: () => {},
  isLoading: false,
  isReady: false,
  user: null,
  profile: null,
};

const mapStateToProps = ({
  authorizationReducer: {
    isLoading,
    user,
    profile,
    isReady,
    profilesByLocation,
  },
  locations,
}) => ({
  isLoading,
  user,
  profile,
  isReady,
  profilesByLocation,
  locations,
});

export default connect(mapStateToProps)(LoginContainer);
