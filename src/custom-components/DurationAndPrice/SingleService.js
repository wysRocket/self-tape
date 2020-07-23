import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Switch } from 'react-native-switch';

import SinglePrice from './SinglePrice';
import COLORS from '../../constants/colorsConstants';

const styles = StyleSheet.create({
  priceElement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.COLOR_GREY,
    paddingVertical: 15,
  },
  priceName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '800',
    minWidth: 70,
    maxWidth: 80,
  },
  Circle: {
    borderColor: COLORS.MAIN_BLUE,
  },
  ActiveText: {
    fontSize: 10,
    paddingRight: 2,
  },
  InactiveText: {
    fontSize: 10,
    paddingLeft: 2,
  },
});

const SingleService = ({
  price, index, isLast, multiSliderValuesChange, removeItem, onChangeActive,
}) => (
  <View>
    <View style={styles.priceElement}>
      <Text style={styles.priceName}>
        {price.name}
      </Text>
      <Switch
        value={price.enabled}
        onValueChange={value => onChangeActive({ value, index })}
        disabled={false}
        activeText="ON"
        inActiveText="OFF"
        circleSize={25}
        circleBorderWidth={2}
        backgroundActive={COLORS.MAIN_BLUE}
        backgroundInactive={COLORS.MAIN_BLUE}
        circleActiveColor={COLORS.MAIN_WHITE}
        circleInActiveColor={COLORS.MAIN_WHITE}
        innerCircleStyle={styles.Circle}
        activeTextStyle={styles.ActiveText}
        inactiveTextStyle={styles.InactiveText}
        renderActiveText
        renderInActiveText
        changeValueImmediately
      />
    </View>
    {price.enabled && (
      <SinglePrice
        service
        price={price}
        index={index}
        isLast={isLast}
        multiSliderValuesChange={multiSliderValuesChange}
        removeItem={removeItem}
      />
    )}
  </View>
);

SingleService.propTypes = {
  price: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  multiSliderValuesChange: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  onChangeActive: PropTypes.func.isRequired,
};

SingleService.defaultProps = {
};

export default SingleService;
