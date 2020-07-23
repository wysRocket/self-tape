import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { setLocation } from '../../actions/book';
import ImageLoading from '../../custom-components/ImageLoading';
import styles from '../../styles/SingleLocationStyles';

export default class SingleLocationItem extends Component {
  navigateToChosePractitioners = () => {
    const { navigation: { dispatch }, choosePractitioners, location } = this.props;
    if (!choosePractitioners) {
      dispatch(setLocation(location));
    }
  }

  render() {
    const { location } = this.props;
    return (
      <TouchableOpacity
        delayPressIn={20}
        onPress={this.navigateToChosePractitioners}
      >
        <View style={styles.container}>
          <ImageLoading source={{ uri: location.img }} style={styles.backgroundLocationImage}>
            <View
              style={{
                position: 'absolute',
                width: styles.backgroundLocationImage.width,
                height: styles.backgroundLocationImage.height,
                bottom: 0,
              }}
            >
              <Text style={styles.locationText}>{location.name}</Text>
            </View>
          </ImageLoading>
        </View>
      </TouchableOpacity>
    );
  }
}

SingleLocationItem.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
  choosePractitioners: PropTypes.bool,
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

SingleLocationItem.defaultProps = {
  choosePractitioners: false,
};
