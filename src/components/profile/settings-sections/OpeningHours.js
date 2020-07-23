import React, { Component } from 'react';
import {
  View,
  Platform,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';

import { Header } from '../../../components/profile/settings-sections/elements';
import OpeningHoursComponent from '../../../custom-components/OpeningHours';
import styles from '../../../styles/SettingsStyles';

class OpeningHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.toggleTimePicker = () => {};
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
    const { showPicker } = this.state;
    if (!showPicker) {
      onToggleToScreen('BusinessProfile');
    } else this.toggleTimePicker(null);
  }

  render() {
    const { backAndSave } = this;
    const { parentProps } = this.props;
    return (
      <View style={[styles.top, styles.topWhite]}>
        {Header({
          onToggleToScreen: backAndSave,
          backScreen: 'BusinessProfile',
          title: 'OPENING HOURS',
          })
        }
        <OpeningHoursComponent
          {...parentProps}
          showPicker={showPicker => this.setState({ showPicker })}
          toggleTimePicker={(toggleTimePicker) => { this.toggleTimePicker = toggleTimePicker; }}
        />
      </View>
    );
  }
}

OpeningHours.propTypes = {
  parentProps: PropTypes.shape({}).isRequired,
  onToggleToScreen: PropTypes.func.isRequired,
};

OpeningHours.defaultProps = {
};

export default OpeningHours;
