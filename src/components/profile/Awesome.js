import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import AutoHeightImage from 'react-native-auto-height-image';

import AwesomeImage from '../../images/profile/awesome.png';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/CheckInOutStyles';

export default class Awsome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MainWrapper
        navigation={this.props.navigation}
        pageName="Awesome!"
        goBackScreen="CheckInOut"
      >
        <View
          style={styles.containerAwesome}
        >
          <AutoHeightImage source={AwesomeImage} width={140} />
          <Text style={styles.awesomeTitle}>Awesome!</Text>
          <Text style={styles.awesomeText}>
            {'You have succcessfully checked in! Have a great audition and remember to check out once you\'ve finished.'}
          </Text>
        </View>
      </MainWrapper>
    );
  }
}

Awsome.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

Awsome.defaultProps = {};
