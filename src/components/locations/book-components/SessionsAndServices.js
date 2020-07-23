import React, { Fragment } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import SingleCost from './SingleCost';

import COLORS from '../../../constants/colorsConstants';

const styles = StyleSheet.create({
  CostContainer: {
    flex: 1,
  },
  DurationTitle: {
    color: COLORS.MAIN_BLACK,
    fontSize: 18,
    paddingVertical: 15,
    alignSelf: 'center',
  },
  ServiceBorder: {
    height: 2,
    width: '100%',
    backgroundColor: '#e9eff2',
  },
});

const existServices = (prices) => {
  let exist = false;
  prices.map((item) => {
    if (item.type && item.type === 'service' && item.enabled === true) exist = true;
    return null;
  });
  return exist;
};

const SingleService = ({
  practitioner,
  selectedPrice,
  onSelectPrice,
}) => {
  const sortedPrices = practitioner.prices
    && practitioner.prices.sort((a, b) => a.duration - b.duration);
  return (
    <ScrollView style={styles.CostContainer}>
      <Text style={styles.DurationTitle}>Selftape Session Duration</Text>
      <View style={styles.ServiceBorder} />
      {sortedPrices.map((elem, index) => (
        elem.units !== '%' && (!elem.type || elem.type !== 'service')) && (
        <SingleCost
          key={`${index + 1}`}
          onSelectPrice={onSelectPrice}
          price={elem}
          selectedPrice={selectedPrice}
        />
      ))}
      {existServices(sortedPrices) && (
        <Fragment>
          <Text style={styles.DurationTitle}>Other Services</Text>
          <View style={styles.ServiceBorder} />
          {sortedPrices.map((elem, index) => (
            elem.units !== '%' && elem.type === 'service' && elem.enabled === true) && (
            <SingleCost
              key={`${index + 1}`}
              onSelectPrice={onSelectPrice}
              price={elem}
              selectedPrice={selectedPrice}
              service
            />
          ))}
        </Fragment>
      )}
    </ScrollView>
  );
};

SingleService.propTypes = {
  practitioner: PropTypes.shape({}).isRequired,
  selectedPrice: PropTypes.shape({}),
  onSelectPrice: PropTypes.func.isRequired,
};

SingleService.defaultProps = {
  selectedPrice: null,
};

export default SingleService;
