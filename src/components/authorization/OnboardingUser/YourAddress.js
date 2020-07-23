import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geocoder from 'react-native-geocoder';

import AutoHeightImage from 'react-native-auto-height-image';
import adressIcon from '../../../images/onboarding/adressIcon.png';

import ImageInput from '../../../custom-components/Input/ImageInput';

import * as ACTIONS from '../../../actions/authorization';

import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import { locale } from '../../../constants/textConstants';
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
    width: '70%',
    padding: Platform.OS === 'ios' ? 15 : 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderBottomWidth: 1,
    fontSize: 12,
    paddingLeft: 0,
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
  errorColor: {
    color: 'red',
  },
});
class YourAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      address: '',
      apartmentNumber: '',
      city: '',
      zip: '',
      zipError: false,
      firstRender: true,
    };
    this.address = null;
    this.apartmentNumber = null;
    this.city = null;
    this.zip = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.address && prevState.apartmentNumber === '' && prevState.city === '' && prevState.zip === '' && prevState.firstRender) {
      return {
        ...prevState,
        address: nextProps.profile.address.street,
        apartmentNumber: nextProps.profile.address.apartmentNumber,
        city: nextProps.profile.address.city,
        zip: nextProps.profile.address.zip,
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
    let newText = '';
    const numbers = '0123456789';
    this.setState({ [name]: value }, () => {
      switch (name) {
        case 'zip':
          for (let i = 0; i < value.length; i++) {
            if (numbers.indexOf(value[i]) > -1) {
              newText += value[i];
              if (newText.length >= 5) {
                this.setState({ zipError: false });
                this.onBlur('zip');
              } else this.setState({ zipError: true });
            }
          }
          this.setState({ zip: newText }); break;
        case 'apartmentNumber':
          if (value.length >= 4) this.focusNext('city'); break;
        case 'address':
        case 'city':
        default: break;
      }
    });
  }

  onNext = () => {
    const {
      apartmentNumber, zip, address, city,
    } = this.state;
    const { onNext, navigation: { dispatch } } = this.props;
    dispatch(ACTIONS.profileUpdateAttempt({
      address: {
        ...{
          apartmentNumber, zip, address, city, onboardingUser: true,
        },
      },
    }));
    onNext();
  }

  onBlur = input => this[input] && this[input].blur();


  focusNext = input => this[input] && this[input].focus();

  render() {
    const {
      address, apartmentNumber, city, zip, zipError,
    } = this.state;
    const disabled = address === '' || city === '' || zip.length !== 5;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={{ alignItems: 'center', marginTop: '10%' }}>
          <View style={styles.imageContainer}>
            <AutoHeightImage
              source={adressIcon}
              width={100}
            />
          </View>
          <ImageInput
            style={styles.inputWrapper}
            withoutMargin
            onChangeValue={this.onChangeValue}
            placeholder="Street address & number"
            field="address"
            value={address}
            refInput={(ref) => { this.address = ref; }}
            next={() => this.focusNext('apartmentNumber')}
          />
          <ImageInput
            style={styles.inputWrapper}
            withoutMargin
            onChangeValue={this.onChangeValue}
            placeholder="Apartment or suite number (optional)"
            type="numeric"
            field="apartmentNumber"
            value={apartmentNumber}
            refInput={(ref) => { this.apartmentNumber = ref; }}
            next={() => this.focusNext('city')}
          />
          <ImageInput
            style={styles.inputWrapper}
            withoutMargin
            onChangeValue={this.onChangeValue}
            placeholder="City"
            field="city"
            value={city}
            refInput={(ref) => { this.city = ref; }}
            next={() => this.focusNext('zip')}
          />
          <ImageInput
            style={[styles.inputWrapper, zipError && { borderColor: 'red' }]}
            withoutMargin
            onChangeValue={this.onChangeValue}
            placeholder="Zip code"
            type="numeric"
            field="zip"
            value={zip}
            maxLength={5}
            refInput={(ref) => { this.zip = ref; }}
            next={this.onNext}
          />
          {zipError && <Text style={styles.errorColor}>{locale.errorText}</Text>}
        </View>
        <CustomTouchableOpacity
          disabled={disabled}
          styles={[mainStyles.button, disabled && mainStyles.buttonDisabled]}
          onPressFunction={this.onNext}
        >
          <Text style={mainStyles.buttonText}>{locale.next}</Text>
        </CustomTouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

YourAddress.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

YourAddress.defaultProps = {
};

export default YourAddress;
