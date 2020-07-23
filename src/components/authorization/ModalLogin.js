import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown';

import CustomTouchableOpacity from '../../custom-components/CustomTouchableOpacity';

import { loginAttempt, signUpAttempt, resetPasswordAttempt } from '../../actions/authorization';

import {
  signUpText,
  loginText,
  resetPasswordText,
  userType,
  nameText,
  emailText,
  passwordText,
  passwordConfirmationText,
  submitText,
} from '../../constants/textConstants';

import styles from '../../styles/ModalLoginStyles';
import { saveItem } from '../../helpers/authorization';

const roles = [{ value: 'practitioner' }, { value: 'user' }];
class ModalLogin extends Component {
  navigateToLocation = () => {
    const {
      dispatch, signUp, username, password, email,
      role, passwordConfirmation, forgotPassword, toggleModal, forgotToggle,
    } = this.props;
    Keyboard.dismiss();
    saveItem('@usedEmail', email);

    if (forgotPassword) {
      toggleModal();
      if (forgotPassword) forgotToggle();
      dispatch(resetPasswordAttempt({ email }));
    } else if (!signUp) dispatch(loginAttempt(email, password, role));
    else dispatch(signUpAttempt(username, email, password, role, passwordConfirmation));
  }

  navigateAgreement = () => {
    const { navigate, closeModal } = this.props;
    closeModal();
    navigate('Agreement');
  }

  selectModalTitle = (forgotPassword, signUp) => {
    let modalTitle = '';
    if (forgotPassword) {
      modalTitle = resetPasswordText;
    } else if (signUp) {
      modalTitle = signUpText;
    } else {
      modalTitle = loginText;
    }
    return modalTitle;
  }

  render() {
    const {
      isModalVisible,
      signUp,
      toggleModal,
      selectUser,
      onChangeText,
      username,
      password,
      email,
      role,
      passwordConfirmation,
      forgotToggle,
      forgotPassword,
    } = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.3}
        onBackdropPress={() => {
          toggleModal();
          if (forgotPassword) forgotToggle();
        }}
        avoidKeyboard
      >
        <View style={styles.container}>
          <Text style={styles.loginTitle}>{this.selectModalTitle(forgotPassword, signUp)}</Text>
          {!forgotPassword && (
            <Dropdown
              key="selectuserType"
              label={userType}
              data={roles}
              value={role}
              containerStyle={styles.dropdownRoles}
              pickerStyle={styles.dropdownPicker}
              onChangeText={selectUser}
            />
          )}
          {signUp && [
            <View
              key="userName"
              style={styles.inputWrapper}
            >
              <TextInput
                onChangeText={value => onChangeText('username', value)}
                underlineColorAndroid="transparent"
                style={styles.inputStyle}
                keyboardType="default"
                placeholder={nameText}
                value={username}
                secureTextEntry={false}
              />
            </View>,
          ]
          }
          <View style={styles.inputWrapper}>
            <TextInput
              onChangeText={value => onChangeText('email', value)}
              underlineColorAndroid="transparent"
              style={styles.inputStyle}
              keyboardType="email-address"
              placeholder={emailText}
              value={email}
              secureTextEntry={false}
              autoCapitalize="none"
            />
          </View>
          {!forgotPassword && (
            <View style={styles.inputWrapper}>
              <TextInput
                onChangeText={value => onChangeText('password', value)}
                underlineColorAndroid="transparent"
                style={styles.inputStyle}
                keyboardType="default"
                placeholder={passwordText}
                value={password}
                autoCapitalize="none"
                secureTextEntry
              />
            </View>
          )}
          {signUp && [
            <View style={styles.inputWrapper} key="passwordConfirmation">
              <TextInput
                onChangeText={value => onChangeText('passwordConfirmation', value)}
                underlineColorAndroid="transparent"
                style={styles.inputStyle}
                keyboardType="default"
                placeholder={passwordConfirmationText}
                value={passwordConfirmation}
                autoCapitalize="none"
                secureTextEntry
              />
            </View>,
            <CustomTouchableOpacity
              onPressFunction={() => this.navigateAgreement()}
              key="agreement"
            >
              <Text style={styles.agrrementText}>By signing up you agree to the Stripe policy</Text>
            </CustomTouchableOpacity>,
          ]}
          <CustomTouchableOpacity
            styles={styles.submitButtonWrapper}
            onPressFunction={() => this.navigateToLocation()}
          >
            <Text style={styles.submitButton}>{!forgotPassword ? submitText : 'Reset password'}</Text>
          </CustomTouchableOpacity>
          {!signUp && (
            <CustomTouchableOpacity
              onPressFunction={forgotToggle}
              styles={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>{!forgotPassword ? 'Forgot password?' : 'Login'}</Text>
            </CustomTouchableOpacity>
          )}
        </View>
      </Modal>
    );
  }
}

ModalLogin.propTypes = {
  dispatch: PropTypes.func,
  isModalVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  signUp: PropTypes.bool,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  selectUser: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  forgotToggle: PropTypes.func,
  forgotPassword: PropTypes.bool.isRequired,
};

ModalLogin.defaultProps = {
  dispatch: () => {},
  signUp: false,
  forgotToggle: () => {},
};

const mapStateToProps = ({
  locations: {
    locations,
  },
}) => ({
  locations,
});


export default connect(mapStateToProps)(ModalLogin);
