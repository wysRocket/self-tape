import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

const CustomTouchableOpacity = ({
  disabled, onPressFunction, styles, children,
}) => (
  <TouchableOpacity
    delayPressIn={20}
    disabled={disabled}
    onPress={() => onPressFunction()}
    style={styles}
  >
    {children}
  </TouchableOpacity>
);

CustomTouchableOpacity.propTypes = {
  onPressFunction: PropTypes.func,
  children: PropTypes.shape({}).isRequired,
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  disabled: PropTypes.bool,
};

CustomTouchableOpacity.defaultProps = {
  styles: {},
  disabled: false,
  onPressFunction: () => {},
};


export default CustomTouchableOpacity;
