import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geocoder from 'react-native-geocoder';

import AutoHeightImage from 'react-native-auto-height-image';
import agentIcon from '../../../images/onboarding/agentIcon.png';

import ImageInput from '../../../custom-components/Input/ImageInput';

import * as ACTIONS from '../../../actions/authorization';

import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import { GOOGLE_API_KEY } from '../../../constants/apiConstants';
import { styles as mainStyles } from './index';

Geocoder.fallbackToGoogle(GOOGLE_API_KEY);

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inputStyle: {
    marginLeft: 15,
    fontSize: 16,
    flex: 1,
  },
  inputWrapper: {
    width: '80%',
    padding: Platform.OS === 'ios' ? 15 : 0,
    paddingLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderWidth: 1,
    marginVertical: 15,
    fontSize: 12,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    borderWidth: 2,
    borderColor: '#c3c3c3',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
});
class Agent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agent: '',
      manager: '',
      firstRender: true,
    };
    this.agent = null;
    this.manager = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.firstRender && prevState.agent === '' && prevState.manager === '') {
      return {
        ...prevState,
        agent: nextProps.profile.agent,
        manager: nextProps.profile.manager,
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

  onChangeValue = (name, value) => {
    this.setState({ [name]: value }, () => {
      switch (name) {
        case 'agent':
        case 'manager':
        default: break;
      }
    });
  }

  onNext = () => {
    const { agent, manager } = this.state;
    const { onNext, navigation: { dispatch } } = this.props;
    dispatch(ACTIONS.profileUpdateAttempt({ agent, manager }));
    onNext();
  }

  onBlur = input => this[input] && this[input].blur();

  focusNext = input => this[input] && this[input].focus();

  render() {
    const { agent, manager } = this.state;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={{ alignItems: 'center', marginTop: '10%' }}>
          <View style={styles.imageContainer}>
            <AutoHeightImage
              source={agentIcon}
              width={100}
            />
          </View>
          <ImageInput
            style={styles.inputWrapper}
            onChangeValue={this.onChangeValue}
            placeholder="Agent"
            field="agent"
            value={agent}
            refInput={(ref) => { this.agent = ref; }}
            next={() => this.focusNext('manager')}
          />
          <ImageInput
            style={styles.inputWrapper}
            onChangeValue={this.onChangeValue}
            placeholder="Manager"
            field="manager"
            value={manager}
            refInput={(ref) => { this.manager = ref; }}
            next={this.onNext}
          />
        </View>
        <CustomTouchableOpacity
          styles={mainStyles.button}
          onPressFunction={this.onNext}
        >
          <Text style={mainStyles.buttonText}>Next</Text>
        </CustomTouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

Agent.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

Agent.defaultProps = {
};

export default Agent;
