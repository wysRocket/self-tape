import React, { Component } from 'react';
import {
  View,
  Platform,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';

import DurationAndPrice from '../../../custom-components/DurationAndPrice';
import { Header } from './elements';
import styles from '../../../styles/SettingsStyles';
import { locale } from '../../../constants/textConstants';

class PriceSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPrice: false,
      addService: false,
    };
    this.toggleAddPrice = () => {};
    this.toggleAddService = () => {};
    this.saveData = () => {};
  }

  componentDidMount = () => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        this.backAndSave();
        return true;
      });
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  backAndSave = () => {
    const { onToggleToScreen } = this.props;
    const { addPrice, addService } = this.state;
    if (!addPrice && !addService) {
      this.saveData();
      onToggleToScreen('BusinessProfile');
    } else if (addPrice) this.toggleAddPrice();
    else this.toggleAddService();
  }

  defineToggleFunction = () => {
    const { addPrice, addService } = this.state;
    const { backAndSave, toggleAddPrice, toggleAddService } = this;
    if (addPrice) {
      return toggleAddPrice;
    } if (addService) {
      return toggleAddService;
    } return backAndSave;
  }

  render() {
    const { parentProps, parentProps: { profile, isLoading } } = this.props;
    const { addPrice, addService } = this.state;
    return (
      !isLoading && profile !== null && (
        <View style={[styles.top, styles.topWhite]}>
          {Header({
            onToggleToScreen: this.defineToggleFunction(),
            backScreen: 'BusinessProfile',
            title: locale.setYourServicePrice,
            right: !addPrice && !addService,
          })}
          <DurationAndPrice
            {...parentProps}
            addPriceState={value => this.setState({ addPrice: value })}
            addServiceState={value => this.setState({ addService: value })}
            toggleAddPrice={(func) => { this.toggleAddPrice = func; }}
            toggleAddService={(func) => { this.toggleAddService = func; }}
            saveData={(func) => { this.saveData = func; }}
          />
        </View>
      )
    );
  }
}

PriceSettings.propTypes = {
  parentProps: PropTypes.shape({}).isRequired,
  onToggleToScreen: PropTypes.func.isRequired,
};

PriceSettings.defaultProps = {
};

export default PriceSettings;
