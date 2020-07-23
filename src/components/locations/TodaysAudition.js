import React, { Component } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import InputScrollView from 'react-native-input-scroll-view';

import PropTypes from 'prop-types';

import { createSessionsAttempt } from '../../actions/sessions';
import { setAuditionDetails } from '../../actions/book';

import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import CustomTouchableOpacity from '../../custom-components/CustomTouchableOpacity';
import ImageLoading from '../../custom-components/ImageLoading';
import MainWrapper from '../../share/MainWrapper';
import Pen from '../../images/icons/pen.png';
import Star from '../../images/icons/star.png';
import styles from '../../styles/TodaysAuditionStyles';

import { locale } from '../../constants/textConstants';

const placeholderColor = '#7cb4de';
const selectionColor = '#202a33';
const auditionFormInputs = [
  { inputName: 'projectName', placeholder: 'NAME OF PROJECT', nextInput: 'characterName' },
  { inputName: 'characterName', placeholder: 'NAME OF CHARACTER', nextInput: 'scenes' },
  { inputName: 'scenes', placeholder: '# OF SCENES', nextInput: 'agent' },
  { inputName: 'agent', placeholder: 'AGENT', nextInput: 'manager' },
  { inputName: 'manager', placeholder: 'MANAGER', nextInput: 'website' },
  { inputName: 'website', placeholder: 'WEBSITE', nextInput: 'email' },
  { inputName: 'email', placeholder: 'EMAIL', nextInput: null },
];

class TodaysAudition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      characterName: '',
      scenes: '',
      agent: '',
      manager: '',
      website: '',
      email: '',
    };
    this.scrollView = null;
    this.projectName = null;
    this.characterName = null;
    this.scenes = null;
    this.agent = null;
    this.manager = null;
    this.website = null;
    this.email = null;
  }

  creteBookSession = () => {
    const { dispatch } = this.props;
    dispatch(setAuditionDetails(this.state));
    dispatch(createSessionsAttempt());
  }

  renderInput = ({ inputName, placeholder, nextInput }, isLastInput) => {
    const { state } = this;
    return (
      <View
        key={inputName}
        style={styles.inputWrapper}
      >
        <TextInput
          ref={(input) => { this[inputName] = input; }}
          returnKeyType={!isLastInput ? 'next' : 'send'}
          onSubmitEditing={() => {
            if (this[nextInput]) {
              this[nextInput].focus();
            } else this.creteBookSession();
          }}
          underlineColorAndroid="transparent"
          style={styles.inputStyle}
          placeholderStyle={styles.placeholderStyle}
          placeholderTextColor={placeholderColor}
          keyboardType="default"
          placeholder={placeholder}
          selectionColor={selectionColor}
          value={state[inputName]}
          onChangeText={value => this.setState({ [inputName]: value })}
          secureTextEntry={false}
        />
      </View>
    );
  }

  render() {
    const {
      navigation,
      navigation: { state: { params: { backScreen } } },
      isLoading,
      practitioner: person,
    } = this.props;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Audition"
        goBackScreen={backScreen}
      >
        <View style={styles.mainContainer}>
          {!isLoading && (
            <InputScrollView
              ref={(ref) => { this.scrollView = ref; }}
              style={styles.container}
            >
              <View style={styles.penContainer}>
                <CustomTouchableOpacity>
                  <Image style={styles.penImage} source={Pen} />
                </CustomTouchableOpacity>
              </View>
              <View style={styles.bottomContainer}>
                <Text style={styles.title}>{locale.todaysAudition}</Text>
                {auditionFormInputs.map((input, index) => this.renderInput(
                  input,
                  index === auditionFormInputs.length - 1,
                ))}
                <View style={styles.practitionerAvatarContainer}>
                  <ImageLoading
                    source={{ uri: person.image }}
                    style={styles.practitionerAvatar}
                  />
                </View>
                <Text style={styles.personName}>{person.username}</Text>
                <View style={styles.ratingWrapper}>
                  <Image source={Star} />
                  <Text style={styles.ratingCount}>{person.rating}</Text>
                </View>
                <CustomTouchableOpacity
                  onPressFunction={this.creteBookSession}
                  styles={styles.sendButton}
                >
                  <Text style={styles.sendButtonText}>{locale.send}</Text>
                </CustomTouchableOpacity>
              </View>
            </InputScrollView>
          )}
        </View>
        <CustomActivityIndicator text="No data found" isLoading={isLoading} showNoData={false} />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({
  authorizationReducer: { profile },
  sessionsReducer: { isLoading, isReady },
  bookReducer: {
    location,
    practitioner,
    selectedTime,
  },
}) => ({
  profile, isLoading, isReady, location, practitioner, selectedTime,
});

TodaysAudition.propTypes = {
  navigation: PropTypes.shape({}),
  screenProps: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  practitioner: PropTypes.shape({}).isRequired,
  selectedTime: PropTypes.shape({}),
};

TodaysAudition.defaultProps = {
  navigation: {},
  screenProps: {},
  selectedTime: {},
};

export default connect(mapStateToProps)(TodaysAudition);
