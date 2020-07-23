import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PropTypes from 'prop-types';

import CustomMarker from '../CustomMarker';
import COLORS from '../../constants/colorsConstants';
import Remove from '../../images/icons/remove.png';

const styles = StyleSheet.create({
  priceElement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.COLOR_GREY,
  },
  priceName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '800',
    minWidth: 70,
    maxWidth: 80,
  },
  priceTitlesLeft: {
    position: 'absolute',
    left: 0,
    top: -7,
    fontSize: 13,
  },
  priceTitlesRight: {
    position: 'absolute',
    right: 0,
    top: -7,
    fontSize: 13,
  },
  deletePrice: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deletePriceImage: {
    width: 20,
    height: 20,
  },
});

const returnMarkerText = price => `${price.units === '$' ? `${price.units}${price.value}` : `${price.value}${price.units}`}`;

const SinglePrice = ({
  price, index, isLast, multiSliderValuesChange, removeItem, service,
}) => (
  <View
    key={`${price.uid}`}
    style={[styles.priceElement, isLast && { borderBottomWidth: 0 }]}
  >
    <Text style={styles.priceName}>{!service ? price.name : ''}</Text>
    <View>
      {price.value >= 15 && (
        <Text style={styles.priceTitlesLeft}>
          {`${price.units === '$'
            ? `${price.units}0`
            : `0${price.units}`}`
          }
        </Text>
      )}
      {price.maxValue - 20 >= price.value && (
        <Text style={styles.priceTitlesRight}>
          {`${price.units === '$'
            ? `${price.units}${price.maxValue}`
            : `${price.maxValue}${price.units}`}`
          }
        </Text>
      )}
      <MultiSlider
        values={[price.value]}
        sliderLength={220}
        onValuesChange={value => multiSliderValuesChange(value, index)}
        customMarker={() => CustomMarker({
          value: returnMarkerText(price),
        })
        }
        min={0}
        max={price.maxValue}
        step={1}
        allowOverlap
        snapped
      />
    </View>
    {((price.units !== '%' && price.removable)) ? (
      <TouchableOpacity
        style={styles.deletePrice}
        onPress={() => removeItem(index)}
      >
        <Image source={Remove} style={styles.deletePriceImage} />
      </TouchableOpacity>
    ) : <View style={styles.deletePrice} />}
  </View>
);

SinglePrice.propTypes = {
  price: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  multiSliderValuesChange: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  service: PropTypes.bool,
};

SinglePrice.defaultProps = {
  service: false,
};

export default SinglePrice;
