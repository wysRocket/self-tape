import React, { PureComponent } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  statusBarBackground: {
    height: Platform.OS === 'android' ? 0 : 0,
  },

});
export default class StatusBarBackground extends PureComponent {
  render() {
    return (
      <View style={[styles.statusBarBackground, this.props.style || {}]} />
    );
  }
}

StatusBarBackground.propTypes = {
  style: PropTypes.shape({}),
};

StatusBarBackground.defaultProps = {
  style: {},
};
