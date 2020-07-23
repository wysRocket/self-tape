import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNFetchBlob from 'rn-fetch-blob';
import CustomActivityIndicator from '../../../custom-components/CustomActivityIndicator';

import * as ACTIONS from '../../../actions/authorization';
import { showAlert } from '../../../actions/errors';

import ImageInput from '../../../custom-components/Input/ImageInput';
import StreetIcon from '../../../images/icons/street.png';
import ApartmentIcon from '../../../images/icons/apartment.png';
import CityIcon from '../../../images/icons/cityIcon.png';
import PostIcon from '../../../images/icons/postIndex.png';

import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import { getLocationByAddressURI, formationLocationObject } from '../../../helpers/locations';
import { styles as mainStyles } from './index';

// Geocoder.fallbackToGoogle(GOOGLE_API_KEY);

class YourAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      address: '',
      apartmentNumber: '',
      city: '',
      zip: '',
      firstRender: true,
      isLoading: false,
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
    const { navigation: { dispatch } } = this.props;
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.onBack();
        return true;
      });
    }
    this.focusNext('address');
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  onChangeValue = (name, value) => {
    this.setState({ [name]: value }, () => {
      switch (name) {
        case 'zip':
          if (value.length >= 5) this.onBlur('zip'); break;
        case 'apartmentNumber':
          if (value.length >= 4) this.focusNext('city'); break;
        case 'address':
        case 'city':
        default: break;
      }
    });
  }

  onNext = async () => {
    this.setState({ isLoading: true });
    const {
      apartmentNumber, zip, address, city,
    } = this.state;
    const { onNext, navigation: { dispatch } } = this.props;
    await this.getGeoData();
    if (this.state.location === null) {
      this.setState({ isLoading: false });
      dispatch(showAlert('Please enter a correct address'));
    } else {
      dispatch(ACTIONS.profileUpdateAttempt({
        searchLocation: this.state.location,
        address: {
          ...this.state.location,
          ...{
            apartmentNumber, zip, address, city, onboarding: true,
          },
        },
      }));
      this.setState({ isLoading: false });
      onNext();
    }
  }

  onBlur = input => this[input] && this[input].blur();

  getGeoData = async () => {
    const { address, apartmentNumber, city, zip } = this.state;
    await RNFetchBlob
      .fetch('GET', getLocationByAddressURI(address, apartmentNumber, city, zip))
      .then((res) => {
        const response = res.json();
        if (response && response.results !== null && response.results.length > 0) {
          const newRes = response.results[0];
          this.setState({ location: formationLocationObject(newRes) });
        }
      });
  }

  focusNext = input => this[input] && this[input].focus();

  render() {
    const {
      address, apartmentNumber, city, zip, isLoading,
    } = this.state;
    const disabled = address === '' || city === '' || zip === '' || zip.length !== 5;
    if (isLoading) return <CustomActivityIndicator isLoading={isLoading} showNoData={false} />;
    return (
      <KeyboardAwareScrollView contentContainerStyle={mainStyles.container}>
        <View>
          <View style={mainStyles.headerWrapper}>
            <Text style={mainStyles.headerTitle}>Your Address</Text>
            <Text style={mainStyles.headerSubTitle}>
              Where can clients find you?
            </Text>
          </View>
          <ImageInput
            onChangeValue={this.onChangeValue}
            icon={StreetIcon}
            placeholder="Street address & number"
            field="address"
            value={address}
            refInput={(ref) => { this.address = ref; }}
            next={() => this.focusNext('apartmentNumber')}
          />
          <ImageInput
            onChangeValue={this.onChangeValue}
            icon={ApartmentIcon}
            placeholder="Apartment or suite number (optional)"
            type="numeric"
            field="apartmentNumber"
            value={apartmentNumber}
            refInput={(ref) => { this.apartmentNumber = ref; }}
            next={() => this.focusNext('city')}
          />
          <ImageInput
            onChangeValue={this.onChangeValue}
            icon={CityIcon}
            placeholder="City"
            field="city"
            value={city}
            refInput={(ref) => { this.city = ref; }}
            next={() => this.focusNext('zip')}
          />
          <ImageInput
            onChangeValue={this.onChangeValue}
            icon={PostIcon}
            placeholder="Zip code"
            type="numeric"
            field="zip"
            value={zip}
            maxLength={5}
            refInput={(ref) => { this.zip = ref; }}
            next={this.onNext}
          />
        </View>
        <CustomTouchableOpacity
          disabled={disabled}
          styles={[mainStyles.button, disabled && mainStyles.buttonDisabled]}
          onPressFunction={this.onNext}
        >
          <Text style={mainStyles.buttonText}>Continue</Text>
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
