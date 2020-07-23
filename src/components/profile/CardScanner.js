import React, { PureComponent, Fragment } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../styles/MembershipStyles';

export default class CardScanner extends PureComponent {
  render() {
    return (
      <Fragment>
        <TouchableOpacity
          style={styles.buttonScan}
          onPress={() => this.props.scanCard()}
        >
          <Text style={styles.buttonScanText}>
            {this.props.buttonTitle}
          </Text>
        </TouchableOpacity>
      </Fragment>
    );
  }
}

CardScanner.propTypes = {
  card: PropTypes.shape({}).isRequired,
  scanCard: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string.isRequired,
};

CardScanner.defaultProps = {};
