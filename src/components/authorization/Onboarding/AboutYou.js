import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as ACTIONS from '../../../actions/authorization';

import ImageInput from '../../../custom-components/Input/ImageInput';
import InputButton from '../../../custom-components/Input/ImageButton';
import UserIcon from '../../../images/icons/user.png';
import StoreIcon from '../../../images/icons/store.png';
import PhoneIcon from '../../../images/icons/phone.png';
import ProfileIcon from '../../../images/icons/profileIcon.png';

import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import { styles as mainStyles } from './index';

class AboutYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studioName: '',
      phone: '',
      bio: '',
      image: '',
      firstRender: true,
    };
    this.studioName = null;
    this.phone = null;
    this.bio = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.firstRender && prevState.studioName === '' && prevState.phone === '' && prevState.bio === '' && prevState.image === '') {
      return {
        ...prevState,
        studioName: nextProps.profile.studioName,
        phone: nextProps.profile.phone,
        bio: nextProps.profile.bio,
        image: nextProps.profile.image,
        firstRender: false,
      };
    } else if (prevState.image !== nextProps.profile.image) {
      return {
        ...prevState,
        image: nextProps.profile.image,
      };
    }
    return prevState;
  }

  componentDidMount = () => {
    this.focusNext('studioName');
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.onBack();
        return true;
      });
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  onChangeValue = (name, value) => {
    this.setState({ [name]: value }, () => {
      if (name === 'phone' && value.length >= 17) this.focusNext('bio');
    });
  }

  onBlur = (input) => {
    if (this[input]) {
      if (this[input].input) this[input].input.blur();
      else this[input].blur();
    }
  }

  onSave = () => {
    const { studioName, phone, bio } = this.state;
    const { onNext, navigation: { dispatch } } = this.props;
    dispatch(ACTIONS.profileUpdateAttempt({ studioName, phone, bio }));
    onNext();
  }

  focusNext = (input) => {
    if (this[input]) {
      if (this[input].input) this[input].input.focus();
      else this[input].focus();
    }
  }

  render() {
    const {
      studioName, phone, bio, image,
    } = this.state;
    const disabled = studioName === '' || phone === '' || bio === '';
    return (
      <KeyboardAwareScrollView contentContainerStyle={mainStyles.container}>
        <View>
          <View style={mainStyles.headerWrapper}>
            <Text style={mainStyles.headerTitle}>About You</Text>
            <Text style={mainStyles.headerSubTitle}>
              Add a few more details about you to start getting bookings.
            </Text>
          </View>
          <ImageInput
            onChangeValue={this.onChangeValue}
            icon={StoreIcon}
            placeholder="What is the name of your studio?"
            field="studioName"
            value={studioName}
            refInput={(ref) => { this.studioName = ref; }}
            next={() => this.focusNext('phone')}
          />
          <ImageInput
            onChangeValue={this.onChangeValue}
            icon={PhoneIcon}
            placeholder="What is your phone number?"
            field="phone"
            type="numeric"
            mask="+1 ([000]) [000]-[00][00]"
            refInput={(ref) => { this.phone = ref; }}
            value={phone}
          />
          <ImageInput
            onChangeValue={this.onChangeValue}
            icon={UserIcon}
            placeholder="Tell us bit about yourself (Short Bio)"
            field="bio"
            value={bio}
            refInput={(ref) => { this.bio = ref; }}
            next={() => this.onBlur('bio')}
          />
          <InputButton
            {...this.props}
            image={image}
            icon={ProfileIcon}
            placeholder="Chose a Profile Photo"
          />
        </View>
        <CustomTouchableOpacity
          disabled={disabled}
          styles={[mainStyles.button, disabled && mainStyles.buttonDisabled]}
          onPressFunction={this.onSave}
        >
          <Text style={mainStyles.buttonText}>Continue</Text>
        </CustomTouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

AboutYou.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

AboutYou.defaultProps = {
};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
  },
}) => ({
  profile,
});

export default connect(mapStateToProps)(AboutYou);
