import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Platform,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';

import { SingleElement } from './elements';
import styles from '../../../styles/SettingsStyles';
import { locale } from '../../../constants/textConstants';

class BusinessProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    const { onToggleToScreen } = this.props;
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        onToggleToScreen('BusinessProfile');
        return true;
      });
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  navigateToScreen = (name, params = {}) => {
    const { parentProps: { navigation } } = this.props;
    navigation.navigate(name, params);
  }

  render() {
    const { parentProps: { profile, isLoading }, onToggleToScreen } = this.props;
    return (
      !isLoading && profile !== null && (
        <View style={styles.top}>
          <ScrollView
            style={[styles.container, { backgroundColor: '#fff' }]}
          >
            {SingleElement({
              pressFunction: () => this.navigateToScreen('SelfProfile', { goBackScreen: 'BusinessProfile' }),
              title: 'Profile',
              first: true,
            })}
            {SingleElement({ pressFunction: () => onToggleToScreen('StudioPhotos'), title: 'Studio Photos' })}
            {SingleElement({ pressFunction: () => onToggleToScreen('OpeningHours'), title: 'Available Hours' })}
            {SingleElement({ pressFunction: () => onToggleToScreen('PriceSettings'), title: locale.setYourServicePrice })}
            {SingleElement({ pressFunction: () => onToggleToScreen('PaymentSettings'), title: 'Manage Payment Account' })}
          </ScrollView>
        </View>
      )
    );
  }
}

BusinessProfile.propTypes = {
  parentProps: PropTypes.shape({}).isRequired,
  onToggleToScreen: PropTypes.func.isRequired,
};

BusinessProfile.defaultProps = {
};

export default BusinessProfile;
