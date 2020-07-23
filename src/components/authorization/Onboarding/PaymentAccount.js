import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  BackHandler,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import PaymentSettings from '../../profile/settings-sections/PaymentSettings';
import { styles as mainStyles } from './index';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  content: {
    paddingBottom: 10,
  },
});

class PaymentAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.onBack();
        return true;
      });
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  render() {
    const { onNext } = this.props;
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <View style={mainStyles.headerWrapper}>
              <Text style={mainStyles.headerTitle}>Time to Get Paid</Text>
              <Text style={mainStyles.headerSubTitle}>
                Enter your payment information so you can stack your coins.
              </Text>
            </View>
            <View style={styles.content}>
              <PaymentSettings parentProps={this.props} hideHeader onNext={onNext} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

PaymentAccount.propTypes = {
  onNext: PropTypes.func.isRequired,
};

PaymentAccount.defaultProps = {
};

export default PaymentAccount;
