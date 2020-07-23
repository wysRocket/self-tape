import React, { Component } from 'react';
import {
  View,
  Platform,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';

import StudioPhotosComponent from '../../../custom-components/StudioPhotos';
import { Header } from './elements';
import styles from '../../../styles/SettingsStyles';

class StudioPhotos extends Component {
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

  render() {
    const { parentProps: { profile, isLoading }, onToggleToScreen } = this.props;
    return (
      !isLoading && profile !== null &&
        <View style={[styles.top, styles.topWhite]}>
          {Header({
            onToggleToScreen,
            backScreen: 'BusinessProfile',
            title: 'Studio Photos',
            textStyles: { fontWeight: '200' },
            })
          }
          <StudioPhotosComponent
            {...this.props.parentProps}
          />
        </View>
    );
  }
}

StudioPhotos.propTypes = {
  parentProps: PropTypes.shape({}).isRequired,
  onToggleToScreen: PropTypes.func.isRequired,
};

StudioPhotos.defaultProps = {
};

export default StudioPhotos;
