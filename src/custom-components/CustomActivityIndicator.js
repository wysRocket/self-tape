import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import InfoView from './InfoView';
import mainStyles from '../styles/MainStyles';

const CustomActivityIndicator = ({
  text, isLoading, showNoData, style, headerOffset = false,
}) => (
  isLoading ? (
    <View style={[
      mainStyles.activityIndicatorContainer,
      headerOffset && mainStyles.addHeaderOffset,
      style,
    ]}
    >
      <ActivityIndicator animating />
    </View>
  )
    : showNoData && (
      <InfoView text={text} />
    )
);

CustomActivityIndicator.propTypes = {
  showNoData: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  text: PropTypes.string,
  style: PropTypes.shape({}),
  headerOffset: PropTypes.bool,
};

CustomActivityIndicator.defaultProps = {
  text: 'No data',
  showNoData: true,
  style: {},
  headerOffset: false,
};

export default CustomActivityIndicator;
