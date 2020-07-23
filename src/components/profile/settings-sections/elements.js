import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../../styles/SettingsStyles';
import Arrow from '../../../images/icons/rightArrow.png';

export const SingleElement = ({ pressFunction, title, first = false }) => (
  <TouchableOpacity
    style={styles.containerItemTouchable}
    onPress={pressFunction}
    delayPressIn={20}
  >
    <View
      style={[
        styles.containerItem,
        { borderBottomWidth: 0, borderTopWidth: !first ? 1 : 2 },
      ]}
    >
      <View style={styles.containerItemLeft}>
        <View style={styles.containerItemLeftTitle}>
          <Text style={styles.containerItemLeftSingleTitle}>{title}</Text>
        </View>
      </View>
      <Image source={Arrow} />
    </View>
  </TouchableOpacity>
);

export const Header = ({
  onToggleToScreen, backScreen, title, textStyles = {}, right = false,
}) => (
  <View style={styles.headerContainer}>
    {!right ? (
      <TouchableOpacity
        style={styles.headerBlock}
        onPress={() => onToggleToScreen(backScreen)}
      >
        <Image source={Arrow} style={styles.headerImage} />
      </TouchableOpacity>
    ) : <Text style={styles.headerBlock} />}
    <Text style={[styles.pageTitle, textStyles]}>{title}</Text>
    {right ? (
      <TouchableOpacity
        style={styles.headerBlock}
        onPress={() => onToggleToScreen(backScreen)}
      >
        <Text style={styles.headerSave}>
          Save
        </Text>
      </TouchableOpacity>
    ) : <Text style={styles.headerBlock} />}
  </View>
);

Header.propTypes = {
  onToggleToScreen: PropTypes.func.isRequired,
  backScreen: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  textStyles: PropTypes.shape({}).isRequired,
  right: PropTypes.bool.isRequired,
};

SingleElement.propTypes = {
  pressFunction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  first: PropTypes.bool.isRequired,
};
