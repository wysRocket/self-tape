import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import AutoHeightImage from 'react-native-auto-height-image';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInputMask from 'react-native-text-input-mask';
import { connect } from 'react-redux';
import AddPhone from '../../../images/onboarding/phoneIcon.png';

import * as ACTIONS from '../../../actions/authorization';

import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import { styles as mainStyles } from './index';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  phoneContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30%',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    borderWidth: 2,
    borderColor: '#c3c3c3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyles: {
    width: '60%',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 24,
  },
  textConst: {
    color: '#000',
    marginTop: 20,
    fontSize: 24,
  },
  maskContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
});

class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      firstRender: true,
    };
    this.phone = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.firstRender && prevState.phone === '') {
      return {
        ...prevState,
        phone: nextProps.profile.phone,
        firstRender: false,
      };
    }
    return prevState;
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

  onNext = () => {
    const { phone } = this.state;
    const { onNext, navigation: { dispatch } } = this.props;
    dispatch(ACTIONS.profileUpdateAttempt({ phone }));
    onNext();
  }

  render() {
    const { phone } = this.state;
    const disabled = phone.length <= 14;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.phoneContainer}>
          <View style={styles.imageContainer}>
            <AutoHeightImage
              source={AddPhone}
              width={100}
            />
          </View>
          <View style={styles.maskContainer}>
            <TextInputMask
              style={styles.inputStyles}
              refInput={(ref) => { this.phone = ref; }}
              onChangeText={phone => this.setState({ phone })}
              value={phone}
              placeholder="123-456-7890"
              keyboardType="numeric"
              mask="+1 [000]-[000]-[0000]"
            />
          </View>
        </View>
        <CustomTouchableOpacity
          onPressFunction={this.onNext}
          styles={[mainStyles.button, disabled && mainStyles.buttonDisabled]}
        >
          <Text style={mainStyles.buttonText}>Next</Text>
        </CustomTouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

Phone.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

Phone.defaultProps = {};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
  },
}) => ({
  profile,
});

export default connect(mapStateToProps)(Phone);
