import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ImageLoading from '../../custom-components/ImageLoading';
import styles from '../../styles/SingleLocationStyles';

class SingleLocationItemSelectPractitioner extends PureComponent {
  render() {
    const { location } = this.props;
    return (
      <View style={styles.container}>
        <ImageLoading source={{ uri: location.img }} style={styles.backgroundLocationImage}>
          <Text style={styles.locationText}>{location.name}</Text>
        </ImageLoading>
      </View>
    );
  }
}

SingleLocationItemSelectPractitioner.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

SingleLocationItemSelectPractitioner.defaultProps = {
};

const mapStateToProps = ({
  bookReducer: {
    location,
  },
}) => ({
  location,
});

export default connect(mapStateToProps)(SingleLocationItemSelectPractitioner);
