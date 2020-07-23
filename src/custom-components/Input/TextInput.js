import React from 'react';
import { TextInput } from 'react-native';
import COLORS from '../../constants/colorsConstants';

const style = {
  marginTop: 10,
  marginBottom: 10,
  width: '100%',
  paddingVertical: 5,
  backgroundColor: 'transparent',
  borderBottomColor: COLORS.MAIN_WHITE,
  borderBottomWidth: 1,
  color: COLORS.MAIN_WHITE,
};

const TextInputCustom = props => (
  <TextInput
    {...props}
    style={[style, props.style]}
  />
);

export default TextInputCustom;
