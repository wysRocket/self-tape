import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
    marginHorizontal: 3,
    flex: 1,
    backgroundColor: '#dbdbdb',
    height: 2,
  },
  headerActive: {
    backgroundColor: COLORS.COLOR_GREEN_00CFBE,
  },
});

export const Header = ({ onBack, activeIndex }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity
      onPress={() => onBack()}
    >
      <Image source={Arrow} style={styles.headerImage} />
    </TouchableOpacity>
    <View style={styles.headerRow}>
      <View style={[styles.headerElem, activeIndex >= 2 && styles.headerActive]} />
      <View style={[styles.headerElem, activeIndex >= 3 && styles.headerActive]} />
      <View style={[styles.headerElem, activeIndex >= 5 && styles.headerActive]} />
      <View style={[styles.headerElem, activeIndex >= 7 && styles.headerActive]} />
    </View>
    <Text style={styles.headerRight} />
  </View>
);

export default Header;
