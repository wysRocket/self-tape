import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import MapView from 'react-native-maps';
import styles from '../../../styles/MapViewStyles';
import Marker from '../../../images/icons/marker.png';

class BookMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { location } = this.props;
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        onPress={() => this.props.onPress()}
      >
        <MapView.Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        >
          <Image source={Marker} style={{ width: 40, height: 40 }} />
        </MapView.Marker>
      </MapView>
    );
  }
}

BookMap.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  onPress: PropTypes.func,
};

BookMap.defaultProps = {
  onPress: () => {},
};

export default BookMap;
