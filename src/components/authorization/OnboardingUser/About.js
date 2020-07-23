import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputButton from '../../../custom-components/Input/ImageButton';
import AddPhoto from '../../../images/onboarding/addPhotoIcon.png';
import * as ACTIONS from '../../../actions/authorization';

import * as FONTS from '../../../constants/fontConstants';
import { locale } from '../../../constants/textConstants';
import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';

import { styles as mainStyles } from './index';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  aboutYourself: {
    height: 150,
    borderColor: '#cdcdcd',
    borderWidth: 1,
    width: '60%',
    borderRadius: 25,
    padding: Platform.OS === 'ios' ? 20 : 10,
  },
  textContainer: {
    marginTop: 40,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontFamily: FONTS.HelveticaLight,
    marginHorizontal: '12%',
    textAlign: 'center',
    fontWeight: '400',
  },
  addPhoto: {
    fontFamily: FONTS.HelveticaLight,
    color: '#000',
    marginTop: -40,
  },
  bioImage: {
    borderRadius: 150 / 2,
    width: 150,
    height: 150,
  },
});

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      image: '',
      firstRender: true,
    };
    this.bio = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.firstRender && prevState.bio === '' && prevState.image === '') {
      return {
        ...prevState,
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
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
        return true;
      });
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  onSave = () => {
    const { bio } = this.state;
    const { onNext, navigation: { dispatch } } = this.props;
    dispatch(ACTIONS.profileUpdateAttempt({ bio }));
    onNext();
  }

  render() {
    const { bio, image } = this.state;
    const disabled = bio === '';
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{locale.welcome}</Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: '15%' }}>
          <InputButton
            {...this.props}
            image={image}
            icon={AddPhoto}
            placeholder="Chose a Profile Photo"
            user
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: '15%' }}>
          <TextInput
            style={styles.aboutYourself}
            numberOfLines={2}
            onChangeText={bio => this.setState({ bio })}
            value={bio}
            textAlignVertical="top"
            multiline
            underlineColorAndroid="transparent"
            placeholder="Tell us a bit about yourself..."
          />
        </View>
        <CustomTouchableOpacity
          onPressFunction={this.onSave}
          disabled={disabled}
          styles={[mainStyles.button, disabled && mainStyles.buttonDisabled]}
        >
          <Text style={mainStyles.buttonText}>{locale.started}</Text>
        </CustomTouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

About.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  onNext: PropTypes.func.isRequired,
  onMoveToDashboard: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

About.defaultProps = {};

export default About;
