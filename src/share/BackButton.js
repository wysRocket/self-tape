import React, { PureComponent } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import LeftArrow from '../images/icons/backLeftArrow.png';

import styles from '../styles/MainWrapper';

export default class BackButton extends PureComponent {
  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.backWrapper}
        onPress={onPress}
      >
        <Image style={styles.backImage} source={LeftArrow} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    );
  }
}

BackButton.propTypes = {
  style: PropTypes.shape({}),
  onPress: PropTypes.func,
};

BackButton.defaultProps = {
  style: {},
  onPress: () => {},
};
