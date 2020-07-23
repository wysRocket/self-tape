import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  BackHandler,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geocoder from 'react-native-geocoder';

import AutoHeightImage from 'react-native-auto-height-image';
import mailIcon from '../../../images/onboarding/mailIcon.png';

import ImageInput from '../../../custom-components/Input/ImageInput';

import * as ACTIONS from '../../../actions/authorization';

import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import { GOOGLE_API_KEY } from '../../../constants/apiConstants';
import { styles as mainStyles } from './index';

Geocoder.fallbackToGoogle(GOOGLE_API_KEY);

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inputStyle: {
    marginLeft: 15,
    fontSize: 16,
    flex: 1,
  },
  inputWrapper: {
    width: '80%',
    padding: Platform.OS === 'ios' ? 15 : 0,
    paddingLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderWidth: 1,
    marginVertical: 15,
    fontSize: 12,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    borderWidth: 2,
    borderColor: '#c3c3c3',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
});
class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instagram: '',
      iMdb: '',
      webSite: '',
      firstRender: true,
    };
    this.webSite = null;
    this.iMdb = null;
    this.instagram = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.firstRender && prevState.webSite === '' && prevState.iMdb === '' && prevState.instagram === '') {
      return {
        ...prevState,
        instagram: nextProps.profile.instagram,
        iMdb: nextProps.profile.iMdb,
        webSite: nextProps.profile.webSite,
        firstRender: false,
      };
    }
    return prevState;
  }

  componentDidMount = () => {
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
      switch (name) {
        case 'webSite':
        case 'iMdb':
        case 'instagram':
        default: break;
      }
    });
  }

  onNext = () => {
    const { webSite, iMdb, instagram } = this.state;
    const { onMoveToDashboard, navigation: { dispatch } } = this.props;
    Keyboard.dismiss();
    dispatch(ACTIONS.profileUpdateAttempt({ webSite, iMdb, instagram }));
    onMoveToDashboard();
  }

  onBlur = input => this[input] && this[input].blur();

  focusNext = input => this[input] && this[input].focus();

  render() {
    const { webSite, iMdb, instagram } = this.state;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={{ alignItems: 'center', marginTop: '10%' }}>
          <View style={styles.imageContainer}>
            <AutoHeightImage
              source={mailIcon}
              width={100}
            />
          </View>
          <ImageInput
            style={styles.inputWrapper}
            onChangeValue={this.onChangeValue}
            placeholder="Website"
            field="webSite"
            value={webSite}
            refInput={(ref) => { this.webSite = ref; }}
            next={() => this.focusNext('iMdb')}
          />
          <ImageInput
            style={styles.inputWrapper}
            onChangeValue={this.onChangeValue}
            placeholder="IMDB"
            field="iMdb"
            value={iMdb}
            refInput={(ref) => { this.iMdb = ref; }}
            next={() => this.focusNext('instagram')}
          />
          <ImageInput
            style={styles.inputWrapper}
            onChangeValue={this.onChangeValue}
            placeholder="Instagram"
            field="instagram"
            value={instagram}
            refInput={(ref) => { this.instagram = ref; }}
            next={this.onNext}
          />
        </View>
        <CustomTouchableOpacity
          styles={mainStyles.button}
          onPressFunction={this.onNext}
        >
          <Text style={mainStyles.buttonText}>Finish</Text>
        </CustomTouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

Link.propTypes = {
  onMoveToDashboard: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

Link.defaultProps = {
};

export default Link;
