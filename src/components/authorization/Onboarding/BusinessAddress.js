import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  BackHandler,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import AutoHeightImage from 'react-native-auto-height-image';
import Geocoder from 'react-native-geocoder';

import * as ACTIONS from '../../../actions/authorization';

import ImageInput from '../../../custom-components/Input/ImageInput';
import GeoLocationIcon from '../../../images/icons/geoLocation.png';
import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import { styles as mainStyles } from './index';
import * as FONTS from '../../../constants/fontConstants';
import * as COLORS from '../../../styles/common';
import LocationIcon from '../../../images/icons/location.png';
import ArrowFortyFive from '../../../images/icons/arrow45.png';
import SearchIcon from '../../../images/icons/search.png';
import { GOOGLE_API_KEY } from '../../../constants/apiConstants';
import { requestLocationsPermission } from '../../../helpers/permissions';

Geocoder.fallbackToGoogle(GOOGLE_API_KEY);

const { width } = Dimensions.get('window');
const options = { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 };

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    padding: 15,
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    padding: 15,
    borderColor: '#eeeeee',
  },
  buttonText: {
    fontSize: 16,
    color: '#85857f',
    fontFamily: FONTS.HelveticaLight,
  },
  buttonTextGreen: {
    color: COLORS.COLOR_GREEN_00CFBE,
  },
  // single location
  locationWrapper: {
    justifyContent: 'space-between',
    padding: 15,
    paddingLeft: 15 / 2,
    borderColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
  buttonLocation: {
  },
  image: {
    tintColor: '#bcbcb8',
  },
  imageArrow: {
    tintColor: '#bcbcb8',
    transform: [{ rotate: '90deg' }],
  },
  imageLocation: {
    tintColor: COLORS.COLOR_GREEN_00CFBE,
    marginRight: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textLocation: {
    width: width / 1.5,
    marginLeft: 5,
  },
  currentLocation: {
    fontSize: 12,
    color: COLORS.COLOR_GREEN_00CFBE,
    fontFamily: FONTS.HelveticaLight,
  },
  locationTitle: {
    fontSize: 15,
    color: '#000',
    fontFamily: FONTS.HelveticaLight,
  },
});

class BusinessAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      searchResults: [],
      currrentLocation: null,
    };
  }

  componentDidMount = () => {
    if (Platform.OS === 'android') {
      const { onBack } = this.props;
      BackHandler.addEventListener('hardwareBackPress', () => {
        onBack();
        return true;
      });
    }
    this.onFocus();
    this.navigatorGetCurrentPosition();
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
    this.getGeoData(value);
  }

  onFocus = () => this.location && this.location.focus();

  onBloor = () => this.location && this.location.blur();

  onSelect = (place) => {
    const { onNext, navigation: { dispatch } } = this.props;
    dispatch(ACTIONS.profileUpdateAttempt({ searchLocation: place }));
    onNext();
  }

  getGeoData = (value) => {
    if (value !== '') {
      Geocoder.geocodeAddress(value)
        .then((json) => {
          this.setState({ searchResults: !json ? [] : json });
        })
        .catch((error) => {
          this.isError(error);
          this.setState({ searchResults: [] });
        });
    } else this.setState({ searchResults: [] });
  }

  getLocation = async (cords) => {
    Geocoder.geocodePosition({ lat: cords.latitude, lng: cords.longitude })
      .then((json) => {
        this.setState({ currrentLocation: json ? json[0] : null });
      })
      .catch(() => {
        this.setState({ currrentLocation: null });
      });
  }

  navigatorGetCurrentPosition = async () => {
    await requestLocationsPermission();
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => this.getLocation({ longitude, latitude }),
      this.isError,
      options,
    );
  }

  isError = error => console.log('error', error);

  renderSingleLocation = (place, current = false) => (
    <View
      key={place.place_id}
      style={styles.locationWrapper}
    >
      <CustomTouchableOpacity
        onPressFunction={() => this.onSelect(place)}
      >
        <View style={styles.contentRow}>
          <View style={styles.row}>
            <AutoHeightImage source={LocationIcon} width={40} style={styles.image} />
            <View style={styles.textLocation}>
              {current && (
                <View style={[styles.row, { justifyContent: 'flex-start' }]}>
                  <AutoHeightImage
                    source={GeoLocationIcon}
                    width={12}
                    style={styles.imageLocation}
                  />
                  <Text style={styles.currentLocation}>Your current location</Text>
                </View>
              )}
              <Text style={styles.locationTitle}>{place.formattedAddress}</Text>
            </View>
          </View>
          <AutoHeightImage source={ArrowFortyFive} width={25} style={styles.imageArrow} />
        </View>
      </CustomTouchableOpacity>
    </View>
  );

  render() {
    const { location, searchResults, currrentLocation } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <View style={mainStyles.headerWrapper}>
            <Text style={mainStyles.headerTitle}>Address of your business</Text>
            <ImageInput
              style={styles.input}
              onChangeValue={this.onChangeValue}
              icon={SearchIcon}
              placeholder="Street & number"
              field="location"
              value={location}
              refInput={(ref) => { this.location = ref; }}
              next={() => this.onBloor()}
            />
          </View>
          <ScrollView>
            {currrentLocation && this.renderSingleLocation(currrentLocation, true)}
            {searchResults.map(item => this.renderSingleLocation(item))}
          </ScrollView>
        </View>
        {/* <View style={styles.rowContainer}>
          <Text style={styles.buttonText}>Cannot find the address?</Text>
          <CustomTouchableOpacity
            styles={styles.button}
            onPressFunction={() => {}}
          >
            <Text style={[styles.buttonText, styles.buttonTextGreen]}>
              Add it here
            </Text>
          </CustomTouchableOpacity>
        </View> */}
      </View>
    );
  }
}

BusinessAddress.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

BusinessAddress.defaultProps = {
};

export default BusinessAddress;
