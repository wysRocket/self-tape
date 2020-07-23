import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ValidComponent = ({ renderEmptyComponent, children, exist }) =>
  exist ? <Fragment>{children}</Fragment> : renderEmptyComponent;

ValidComponent.propTypes = {
  renderEmptyComponent: PropTypes.element,
  children: PropTypes.element,
  exist: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

ValidComponent.EmptyTextStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
};

ValidComponent.defaultProps = {
  renderEmptyComponent: null,
  children: null,
  exist: false,
};

export default ValidComponent;
