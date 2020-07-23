import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import SmallActivity from '../SmallActivity';

import { HelveticaLight } from '../../constants/fontConstants';
import COLORS from '../../constants/colorsConstants';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MAIN_BLUE,
    borderWidth: 1,
    borderColor: COLORS.MAIN_BLUE,
    marginHorizontal: 10,
  },
  text: {
    fontFamily: HelveticaLight,
    color: COLORS.MAIN_WHITE,
    fontSize: 16,
    fontWeight: '400',
  },
  disabledButton: {
    backgroundColor: COLORS.MAIN_GREY,
    borderColor: COLORS.MAIN_GREY,
  },
});

const Button = ({
  containerStyles, textStyles, onPress, text, disabled = false, isLoading = false,
}) => (
  <TouchableOpacity
    style={[styles.container, containerStyles, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
  >
    {!isLoading ? (
      <Text style={[styles.text, textStyles]}>{text}</Text>
    ) : (
      <SmallActivity style={styles.SendButton} isLoading />
    )}
  </TouchableOpacity>
);

Button.propTypes = {
  containerStyles: PropTypes.shape({}),
  textStyles: PropTypes.shape({}),
  onPress: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

Button.defaultProps = {
  containerStyles: {},
  textStyles: {},
  onPress: () => {},
  text: '',
  isLoading: false,
};

export default Button;
