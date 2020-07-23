import React from 'react';
import {
  View, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import ValidComponent from './ValidComponent';
import COLORS from '../constants/colorsConstants';


const SmallActivity = ({ isLoading, style }) => (
  <ValidComponent exist={isLoading}>
    <View style={style}>
      <ActivityIndicator size="small" color={COLORS.MAIN_BLUE} animating />
    </View>
  </ValidComponent>
);

SmallActivity.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  style: PropTypes.shape({}),
};

SmallActivity.defaultProps = {
  style: {},
};

export default SmallActivity;
