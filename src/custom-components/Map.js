import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import styles from '../styles/MapStyles';
import Marker from '../images/icons/locationBlack.png';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
    };
    this.map = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      latitude: nextProps.location.latitude,
      longitude: nextProps.location.longitude,
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const { latitude, longitude } = this.state;
    const stateChanged = (
      !isEqual(latitude, nextState.longitude)
      || !isEqual(longitude, nextState.longitude)
    );
    if (this.map) {
      this.animateToRegion(nextState.latitude, nextState.longitude);
    }
    return stateChanged;
  }

  animateToCoordinate = (latitude, longitude) => this.map.animateToCoordinate({
    latitude,
    longitude,
  }, 100)

  animateToRegion = (latitude, longitude) => this.map.animateToRegion({
    latitude,
    longitude,
    longitudeDelta: 0.003,
    latitudeDelta: 0.003,
  }, 100);

  render() {
    const { latitude, longitude } = this.state;
    return (
      <MapView
        style={styles.map}
        ref={(component) => { this.map = component; }}
        initialRegion={{
          latitude: latitude - (Platform.OS === 'ios' ? 0.0006 : 0),
          longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
      >
        <MapView.Marker
          coordinate={{ latitude, longitude }}
        >
          <Image source={Marker} style={styles.marker} />
        </MapView.Marker>
      </MapView>
    );
  }
}

Map.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

Map.defaultProps = {};
