import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { CachedImage } from 'react-native-cached-image';

import ImagePlaceholder from '../images/icons/imagePlaceholder.png';

const ImageLoading = ({ source, style, children }) => (
  <Fragment>
    <CachedImage
      source={{ uri: source.uri }}
      fallbackSource={ImagePlaceholder}
      style={style}
    />
    {children && children}
  </Fragment>
);

ImageLoading.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  source: PropTypes.shape({
    uri: PropTypes.string,
  }),
  children: PropTypes.shape({}),
};

ImageLoading.defaultProps = {
  style: {},
  children: null,
  source: {
    uri: '',
  },
};


export default ImageLoading;
