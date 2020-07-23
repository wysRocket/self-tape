import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import AutoHeightImage from 'react-native-auto-height-image';

import CameraOnboarding1 from '../../../images/onboarding/cameraOnboarding1.png';
import CameraOnboarding2 from '../../../images/onboarding/cameraOnboarding2.png';

import * as FONTS from '../../../constants/fontConstants';
import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import { styles as mainStyles } from './index';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  textContainer: {
    marginTop: 40,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontFamily: FONTS.HelveticaLight,
    fontWeight: '200',
    marginHorizontal: '12%',
    textAlign: 'center',
  },
  textStart: {
    marginBottom: 20,
  },
});

class OnboardingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
        return true;
      });
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  render() {
    const { onNext, activeIndex, onMoveToDashboard } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <AutoHeightImage
            source={activeIndex === 0 ? CameraOnboarding1 : CameraOnboarding2}
            width={width}
          />
          <View style={styles.textContainer}>
            <Text style={[styles.text, activeIndex !== 0 && styles.textStart]}>
              {activeIndex === 0 ? "WELCOME TO SELFTAPE NOW \nLet's get your studio setup!" : 'CONGRATULATIONS!'}
            </Text>
            <Text style={styles.text}>
              {activeIndex === 0 ?
                "We'll need your info to get you going!" :
                "You're all set up! Your profile is now available for clients to book their selftapes with you!"
              }
            </Text>
          </View>
        </View>
        <CustomTouchableOpacity
          onPressFunction={() => {
            if (activeIndex === 0) onNext();
            else onMoveToDashboard();
          }}
          styles={mainStyles.button}
        >
          <Text style={mainStyles.buttonText}>{activeIndex === 0 ? "Let's Get Started!" : 'Start'}</Text>
        </CustomTouchableOpacity>
      </View>
    );
  }
}

OnboardingComponent.propTypes = {
  onNext: PropTypes.func.isRequired,
  onMoveToDashboard: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

OnboardingComponent.defaultProps = {};

export default OnboardingComponent;
