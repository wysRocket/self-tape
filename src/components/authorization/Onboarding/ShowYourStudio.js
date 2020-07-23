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
import StudioPhotos from '../../../custom-components/StudioPhotos';
import { styles as mainStyles } from './index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

class ShowYourStudio extends Component {
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
            <Text style={mainStyles.headerTitle}>Show off your studio</Text>
            <Text style={mainStyles.headerSubTitle}>
              Photo will be displayed on your profile on the Selftape Now client app.
            </Text>
          </View>
          <StudioPhotos {...this.props} />
        </View>
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

ShowYourStudio.propTypes = {
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

ShowYourStudio.defaultProps = {
};

export default ShowYourStudio;
