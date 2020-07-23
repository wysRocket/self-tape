import React from 'react';
import { View } from 'react-native';

const style = {
  marginTop: 10,
  marginBottom: 10,
  width: '100%',
  alignItems: 'center',
};

const Block = props => (
  <View {...props} style={[style, props.style]} />
);

export default Block;
