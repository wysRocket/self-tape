import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import OhNoImage from '../../images/icons/ohNo.png';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/OhNoStyles';

export default class OhNo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MainWrapper
        navigation={this.props.navigation}
        pageName="Oh no!"
        goBackScreen="Practitioners"
      >
        <View
          style={styles.container}
        >
          <Image source={OhNoImage} style={styles.imageStyles} />
          <Text style={styles.title}>Oh no!</Text>
          <Text style={styles.text}>
            Unfortunately your appointment has not been confirmed.
            Please select another practitioner.
          </Text>
        </View>
      </MainWrapper>
    );
  }
}

OhNo.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

OhNo.defaultProps = {};
