import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import NumericInput from 'react-native-numeric-input';
import COLORS from '../../constants/colorsConstants';

const styles = StyleSheet.create({
  rowNumeric: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  numericName: {
    fontSize: 16,
    color: COLORS.COLOR_GREY_5E5E60,
  },
});

const NumericInputComponent = ({
  stateName, name, initValue, onChangeValue,
}) => (
  <View style={styles.rowNumeric}>
    <Text style={styles.numericName}>{name}</Text>
    <NumericInput
      initValue={initValue}
      onChange={value => onChangeValue(stateName, value)}
      totalWidth={200}
      totalHeight={40}
      iconSize={25}
      step={1}
      minValue={0}
      valueType="real"
      rounded
      textColor="#2b71bd"
      iconStyle={{ color: 'white' }}
      rightButtonBackgroundColor="#2b71bd"
      leftButtonBackgroundColor="#2b71bd"
    />
  </View>
);

NumericInputComponent.propTypes = {
  stateName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  initValue: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

NumericInputComponent.defaultProps = {
};

export default NumericInputComponent;
