import React, { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const size = 28;

const styles = StyleSheet.create({
  circle: {
    height: size,
    width: size,
    backgroundColor: '#fff',
    borderColor: '#e9e9e9',
    borderWidth: 1,
    borderRadius: size / 2,
  },
  topText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '800',
    position: 'absolute',
    top: -17,
  },
});

const CustomMarker = ({ value }) => (
  <Fragment>
    <Text style={styles.topText}>{value}</Text>
    <View style={styles.circle} />
  </Fragment>
);

CustomMarker.propTypes = {
  value: PropTypes.string,
};

CustomMarker.defaultProps = {
  value: '',
};

export default CustomMarker;
