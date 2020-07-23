import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import PropTypes from 'prop-types';

import { HelveticaLight } from '../../constants/fontConstants';
import COLORS from '../../constants/colorsConstants';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.MAIN_BLUE,
    marginHorizontal: 10,
    borderRadius: 8,
    margin: 2,
    width: '60%',
  },
  text: {
    fontFamily: HelveticaLight,
    color: COLORS.MAIN_BLACK,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  col: {
    // flex: 1,
    width: 25,
  },
  col2: {
    flex: 1,
    alignItems: 'center',
  },
});

const ButtonIcon = ({
  containerStyles, textStyles, onPress, text, imageStyles, image,
}) => (
  <TouchableOpacity style={[styles.container, containerStyles]} onPress={onPress}>
    <View style={styles.col}>
      <AutoHeightImage source={image} width={25} style={[styles.image, imageStyles]} />
    </View>
    <View style={styles.col2}>
      <Text style={[styles.text, textStyles]}>{text}</Text>
    </View>
    <View style={styles.col} />
  </TouchableOpacity>
);

ButtonIcon.propTypes = {
  containerStyles: PropTypes.shape({}),
  textStyles: PropTypes.shape({}),
  imageStyles: PropTypes.shape({}),
  image: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  text: PropTypes.string,
};

ButtonIcon.defaultProps = {
  containerStyles: {},
  textStyles: {},
  imageStyles: {},
  onPress: () => {},
  text: '',
};

export default ButtonIcon;
