import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import AutoHeightImage from 'react-native-auto-height-image';

import MainWrapper from '../../share/MainWrapper';
import Time from '../../images/icons/submitTime.png';
import styles from '../../styles/AwaitingStyles';

class Awaiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goToUploadSides = () => {
    const { navigation: { navigate } } = this.props;
    navigate('BookConfirmation');
  }

  render() {
    return (
      <MainWrapper
        navigation={this.props.navigation}
        pageName="Awaiting Confirmation"
        goBackScreen="Book"
      >
        <View
          style={styles.container}
        >
          <View style={styles.subContainer}>
            <AutoHeightImage style={styles.imageAppinment} source={Time} width={320} />
            <Text style={styles.title}>APPOINTMENT IS AWAITING CONFIRMATION</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>
              We`ll let you know as soon as your appointment is confirmed by practitioner.
            </Text>
            <TouchableOpacity
              onPress={() => this.goToUploadSides()}
            >
              <View style={styles.buttonAwaiting}>
                <Text style={styles.buttonAwaitingText}>OK, GOT IT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </MainWrapper>
    );
  }
}

Awaiting.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

Awaiting.defaultProps = {
  navigation: () => {},
};


export default Awaiting;
