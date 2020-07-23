import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import OpeningHoursComponent from '../../../custom-components/OpeningHours';
import { styles as mainStyles } from './index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
class YourOpeningHours extends Component {
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
      <View style={styles.container}>
        <View>
          <View style={mainStyles.headerWrapper}>
            <Text style={mainStyles.headerTitle}>Your Opening Hours</Text>
            <Text style={mainStyles.headerSubTitle}>When can clients book with you?</Text>
          </View>
        </View>
        <OpeningHoursComponent
          {...this.props}
          hideHeader
        />
        <View>
          <CustomTouchableOpacity
            styles={mainStyles.button}
            onPressFunction={this.props.onNext}
          >
            <Text style={mainStyles.buttonText}>Continue</Text>
          </CustomTouchableOpacity>
        </View>
      </View>
    );
  }
}

YourOpeningHours.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

YourOpeningHours.defaultProps = {
};

export default YourOpeningHours;
