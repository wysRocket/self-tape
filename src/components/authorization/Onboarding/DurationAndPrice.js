import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  BackHandler,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import DurationAndPriceComponent from '../../../custom-components/DurationAndPrice';
import { styles as mainStyles } from './index';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});

class DurationAndPrice extends Component {
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
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
          <View>
            <View style={mainStyles.headerWrapper}>
              <Text style={mainStyles.headerTitle}>Set your duration and price</Text>
              <Text style={mainStyles.headerSubTitle}>
                You can change services & categories later.
              </Text>
            </View>
            <DurationAndPriceComponent {...this.props} hideHeader />
          </View>
          <CustomTouchableOpacity
            styles={[mainStyles.button, { marginTop: 0 }]}
            onPressFunction={this.props.onNext}
          >
            <Text style={mainStyles.buttonText}>Continue</Text>
          </CustomTouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

DurationAndPrice.propTypes = {
  onNext: PropTypes.func.isRequired,
};

DurationAndPrice.defaultProps = {
};

export default DurationAndPrice;
