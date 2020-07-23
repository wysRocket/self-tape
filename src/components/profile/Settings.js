import React, { Component, Fragment } from 'react';
import {
  Text, View, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInputMask from 'react-native-text-input-mask';

import CustomLoadingIndicator from '../../custom-components/CustomActivityIndicator';
import ImageLoading from '../../custom-components/ImageLoading';

import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/SettingsStyles';
import Arrow from '../../images/icons/rightArrow.png';
import MailConfig from '../../images/icons/mailConfig.png';
import PhoneConfig from '../../images/icons/phoneConfig.png';
import Cube from '../../images/icons/cube.png';
import Dollar from '../../images/icons/dollar.png';
import LocationConfig from '../../images/icons/locationConfig.png';
import Logout from '../../images/icons/logout.png';
import { signOutAttempt, profileUpdateAttempt } from '../../actions/authorization';
import * as HELPERS from '../../helpers/textHelpers';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      firstRender: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.mobileNumber === '' && prevState.mobileNumber.length !== 2 && !prevState.firstRender) {
      return {
        ...prevState,
        mobileNumber: nextProps.profile.phone,
        firstRender: true,
      };
    }
    return prevState;
  }

  onChangeText = mobileNumber => this.setState({ mobileNumber });

  onSavePhoneChanges = () => {
    const { mobileNumber } = this.state;
    const { navigation: { dispatch }, profile } = this.props;
    if (mobileNumber.length === 17 || mobileNumber.length === 0) {
      dispatch(profileUpdateAttempt({ phone: mobileNumber }));
    } else {
      this.setState({ mobileNumber: profile.phone });
    }
  }

  signOut = () => {
    const { navigation: { dispatch } } = this.props;
    dispatch(signOutAttempt());
  }

  navigateToScreen(name, params = {}) {
    const { navigation } = this.props;
    navigation.navigate(name, params);
  }

  renderSettings = () => {
    const { profile } = this.props;
    const { mobileNumber } = this.state;
    return (
      profile && (
        <ScrollView
          style={styles.container}
        >
          <View style={styles.containerTop}>
            <TouchableOpacity
              style={styles.containerItemTouchable}
              onPress={() => this.navigateToScreen('Profile')}
              delayPressIn={20}
            >
              <View style={styles.containerItem}>
                <View style={styles.containerItemLeft}>
                  <ImageLoading
                    style={styles.containerItemImage}
                    source={{ uri: profile.image }}
                  />
                  <View style={styles.containerItemLeftTitle}>
                    <Text style={styles.containerItemLeftTitleTop}>{profile.username}</Text>
                    <Text style={styles.containerItemLeftTitleBottom}>
                      {`Joined ${profile.joined}`}
                    </Text>
                  </View>
                </View>
                <Image source={Arrow} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerItemTouchable}
              delayPressIn={20}
            >
              <View style={styles.containerItem}>
                <View style={styles.containerItemLeft}>
                  <Image style={styles.containerItemIcon} source={MailConfig} />
                  <View style={styles.containerItemLeftTitle}>
                    <Text style={styles.containerItemLeftTitleTop}>{profile.email}</Text>
                    <Text style={styles.containerItemLeftTitleBottom}>Unverfied</Text>
                  </View>
                </View>
                <Image source={Arrow} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerItemTouchable}
              delayPressIn={20}
            >
              <View style={styles.containerItem}>
                <View style={styles.containerItemLeft}>
                  <Image style={styles.containerItemIcon} source={PhoneConfig} />
                  <View style={styles.containerItemLeftTitle}>
                    <TextInputMask
                      refInput={(ref) => { this.input = ref; }}
                      keyboardType="numeric"
                      onChangeText={(formatted) => {
                        this.onChangeText(formatted);
                      }}
                      value={mobileNumber}
                      mask="+1 ([000]) [000]-[00][00]"
                      onBlur={() => this.onSavePhoneChanges()}
                    />
                  </View>
                </View>
                <Image source={Arrow} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerItemTouchable}
              onPress={() => this.navigateToScreen('SetLocation', { type: 'address' })}
              delayPressIn={20}
            >
              <View style={styles.containerItem}>
                <View style={styles.containerItemLeft}>
                  <Image style={styles.containerItemMoreHeight} source={Cube} />
                  <View style={styles.containerItemLeftTitle}>
                    <Text style={styles.containerItemLeftSingleTitle}>
                      {HELPERS.formatLocation(profile.address)}
                    </Text>
                  </View>
                </View>
                <Image source={Arrow} />
              </View>
            </TouchableOpacity>
            {profile.role !== 'practitioner' && (
              <TouchableOpacity
                style={styles.containerItemTouchable}
                onPress={() => this.navigateToScreen('Membership')}
                delayPressIn={20}
              >
                <View style={[styles.containerItem, { borderBottomWidth: 0 }]}>
                  <View style={styles.containerItemLeft}>
                    <Image style={styles.containerItemMoreHeight} source={Dollar} />
                    <View style={styles.containerItemLeftTitle}>
                      <Text style={styles.containerItemLeftSingleTitle}>Payment Info</Text>
                    </View>
                  </View>
                  <Image source={Arrow} />
                </View>
              </TouchableOpacity>
            )}
          </View>
          {profile.role !== 'user' && (
            <Fragment>
              <View style={styles.containerTop}>
                <TouchableOpacity
                  style={styles.containerItemTouchable}
                  onPress={() => this.navigateToScreen('SetLocation', { type: 'locations' })}
                  delayPressIn={20}
                >
                  <View style={styles.containerItem}>
                    <View style={styles.containerItemLeft}>
                      <Image style={styles.containerItemMoreHeight} source={LocationConfig} />
                      <View style={styles.containerItemLeftTitle}>
                        <Text style={styles.containerItemLeftSingleTitle}>Location</Text>
                      </View>
                    </View>
                    <Image source={Arrow} />
                  </View>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
          <View style={styles.containerTop}>
            <TouchableOpacity
              style={styles.containerItemTouchable}
              onPress={() => this.signOut('Login')}
              delayPressIn={20}
            >
              <View style={[styles.containerItem, { borderBottomWidth: 0 }]}>
                <View style={styles.containerItemLeft}>
                  <Image style={styles.containerItemMoreHeight} source={Logout} />
                  <View style={styles.containerItemLeftTitle}>
                    <Text style={styles.containerItemLeftSingleTitle}>Log out</Text>
                  </View>
                </View>
                <Image style={{ width: 20 }} source={Arrow} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    );
  }

  render() {
    const {
      profile, isLoading, isLoadingDetails, membershipUpdate, navigation,
    } = this.props;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Settings"
        goBackScreen="Home"
      >
        {!isLoading && profile !== null && this.renderSettings()}
        <CustomLoadingIndicator
          isLoading={isLoading || profile === null || isLoadingDetails || membershipUpdate}
          showNoData={false}
        />
      </MainWrapper>
    );
  }
}

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }),
  profile: PropTypes.shape({
    role: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
  isLoading: PropTypes.bool,
  isLoadingDetails: PropTypes.bool.isRequired,
  membershipUpdate: PropTypes.bool.isRequired,
};

SettingsScreen.defaultProps = {
  profile: null,
  isLoading: false,
  navigation: () => {},
};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
    isLoading,
  },
  userDetails: {
    membershipUpdate,
    member,
    isLoading: isLoadingDetails,
  },
}) => ({
  profile,
  isLoading,
  membershipUpdate,
  member,
  isLoadingDetails,
});

export default connect(mapStateToProps)(SettingsScreen);
