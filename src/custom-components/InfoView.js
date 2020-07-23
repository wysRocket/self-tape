import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import styles from '../styles/InfoView';
import mainStyles from '../styles/MainStyles';

const InfoView = ({ text }) => (
  <View style={mainStyles.noDataContainer}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

InfoView.propTypes = {
  text: PropTypes.string.isRequired,
};

export default InfoView;
