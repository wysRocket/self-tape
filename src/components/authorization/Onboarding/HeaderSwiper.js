import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import * as COLORS from '../../../styles/common';
import Arrow from '../../../images/icons/rightArrow.png';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
    backgroundColor: '#f7f7f5',
  },
  headerImage: {
    transform: [{ rotate: '180deg' }],
  },
  headerRight: {
    width: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    marginHorizontal: 20,
  },
  headerElem: {
    marginHorizontal: 2,
    flex: 1,
    backgroundColor: '#dbdbdb',
    height: 2,
  },
  headerActive: {
    backgroundColor: COLORS.COLOR_GREEN_00CFBE,
  },
});

export const HeaderSwiper = ({ onBack, activeIndex }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity
      onPress={() => onBack()}
    >
      <Image source={Arrow} style={styles.headerImage} />
    </TouchableOpacity>
    <View style={styles.headerRow}>
      <View style={[styles.headerElem, activeIndex >= 1 && styles.headerActive]} />
      <View style={[styles.headerElem, activeIndex >= 2 && styles.headerActive]} />
      <View style={[styles.headerElem, activeIndex >= 5 && styles.headerActive]} />
      <View style={[styles.headerElem, activeIndex >= 8 && styles.headerActive]} />
    </View>
    <Text style={styles.headerRight} />
  </View>
);

HeaderSwiper.propTypes = {
  onBack: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

HeaderSwiper.defaultProps = {};
export default HeaderSwiper;
