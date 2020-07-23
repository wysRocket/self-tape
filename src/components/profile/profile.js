import React, { Component } from 'react';
import {
  Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileAttempt, refreshProfileAttempt } from '../../actions/authorization';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import ImageLoading from '../../custom-components/ImageLoading';

import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/ProfileStyles';
import Back from '../../images/profile/profileBackground.png';
import Pen from '../../images/icons/pen.png';
import Mail from '../../images/icons/mail.png';
import Phone from '../../images/icons/phone.png';
import Arrow from '../../images/icons/rightArrow.png';
import ImageIcon from '../../images/icons/image-ico.png';
import MemberShip from '../../images/icons/membership.png';
import Sessions from '../../images/icons/sessions.png';
import Camera from '../../images/icons/cameraViolet.png';
import LocationProfile from '../../images/icons/locationProfile.png';
import * as HELPERS from '../../helpers/textHelpers';
import { isMember } from '../../helpers/membership';
import { locale } from '../../constants/textConstants';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    const { navigation: { dispatch }, user } = this.props;
    dispatch(getProfileAttempt({ user }));
  }

  onRefreshProfileData = () => {
    const { navigation: { dispatch }, user } = this.props;
    dispatch(refreshProfileAttempt({ user }));
  }

  navigateToNextPage = (screen) => {
    const { navigation } = this.props;
    navigation.navigate(screen, { goBackScreen: 'Profile' });
  }

  render() {
    const {
      navigation, navigation: { navigate }, profile, isLoading, isRefreshing,
    } = this.props;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Profile"
        goBackScreen={profile.role === 'practitioner' ? 'Dashboard' : 'Home'}
      >
        <ScrollView
          style={styles.containerScroll}
          refreshControl={(
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefreshProfileData}
            />
          )}
        >
          {profile !== null && (
          <View
            style={styles.container}
          >
            <ImageBackground source={Back} style={styles.ImageBackStyles} />
            <View style={styles.containerTop}>
              {
                profile.role === 'user'
                && <Text style={styles.profileUserName}>{`${isMember(profile) ? 'PRO MEMBER: ' : 'MEMBER: '}`}</Text>
              }
              <Text style={styles.profileUserName}>{profile.username}</Text>
            </View>
            <View style={styles.profileAvatarWrapper}>
              <View style={styles.profileAvatarContainer}>
                <ImageLoading
                  style={styles.profileAvatar}
                  source={{ uri: profile.image }}
                />
              </View>
              <TouchableOpacity
                delayPressIn={20}
                style={styles.profileEdit}
                onPress={() => this.navigateToNextPage('SelfProfile')}
              >
                <Image style={styles.profileEditIco} source={Pen} />
              </TouchableOpacity>
            </View>

            <View style={styles.containerInfo}>
              <View style={styles.containerInfoItem}>
                <Image style={styles.containerInfoItemImage} source={Mail} />
                <Text style={styles.containerInfoItemEmail}>{profile.email}</Text>
              </View>
              <View style={styles.containerInfoItem}>
                <Image style={styles.containerInfoItemImagePhone} source={Phone} />
                <Text style={styles.containerInfoItemPhone}>{profile.phone}</Text>
              </View>
              <View style={styles.containerInfoItem}>
                <Image style={styles.containerInfoItemImageLocation} source={LocationProfile} />
                <Text style={styles.containerInfoItemAddress}>
                  {HELPERS.formatLocation(profile.address)}
                </Text>
              </View>
            </View>
            {profile.role === 'practitioner' ? (
              <View style={styles.containerAdditionalMenu}>
                <TouchableOpacity
                  delayPressIn={20}
                  onPress={() => this.navigateToNextPage('MyReviews')}
                >
                  <View style={[styles.containerAdditionalMenuItem, { borderBottomWidth: 0 }]}>
                    <View style={styles.containerAdditionalMenuItemLeft}>
                      <Image style={styles.additionalInfoImage} source={MemberShip} />
                      <Text style={styles.containerAdditionalMenuTitle}>My Reviews</Text>
                    </View>
                    <Image source={Arrow} />
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.containerAdditionalMenu}>
                <TouchableOpacity
                  delayPressIn={20}
                  onPress={() => this.navigateToNextPage('Membership')}
                >
                  <View style={styles.containerAdditionalMenuItem}>
                    <View style={styles.containerAdditionalMenuItemLeft}>
                      <Image style={styles.additionalInfoImageNormal} source={MemberShip} />
                      <Text style={styles.containerAdditionalMenuTitle}>Membership</Text>
                    </View>
                    <Image source={Arrow} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  delayPressIn={20}
                  onPress={() => navigate('FinishedSessions', { isConfirmation: false })}
                >
                  <View style={styles.containerAdditionalMenuItem}>
                    <View style={styles.containerAdditionalMenuItemLeft}>
                      <Image style={styles.additionalInfoImage} source={Sessions} />
                      <Text style={styles.containerAdditionalMenuTitle}>{locale.pastSessions}</Text>
                    </View>
                    <Image source={Arrow} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  delayPressIn={20}
                  onPress={() => navigate('FinishedSessions', { isConfirmation: true })}
                >
                  <View style={[styles.containerAdditionalMenuItem, { borderBottomWidth: 0 }]}>
                    <View style={styles.containerAdditionalMenuItemLeft}>
                      <Image style={[styles.additionalInfoImage, styles.additionalInfoImageCamera]} source={Camera} />
                      <Text style={styles.containerAdditionalMenuTitle}>{locale.upcomingSessions}</Text>
                    </View>
                    <Image source={Arrow} />
                  </View>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  delayPressIn={20}
                  onPress={() => this.navigateToNextPage('Auditions')}
                >
                  <View style={styles.containerAdditionalMenuItem}>
                    <View style={styles.containerAdditionalMenuItemLeft}>
                      <Image style={styles.additionalInfoImage} source={ImageIcon} />
                      <Text style={styles.containerAdditionalMenuTitle}>Auditions</Text>
                    </View>
                    <Image source={Arrow} />
                  </View>
                </TouchableOpacity> */}
              </View>
            )}
          </View>
          )}
        </ScrollView>
        <CustomActivityIndicator text="No profile data found" isLoading={isLoading} showNoData={profile === null} />
      </MainWrapper>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({}),
  isLoading: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
};

Profile.defaultProps = {
  profile: null,
  user: null,
};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
    user,
    isLoading,
    isRefreshing,
  },
}) => ({
  profile,
  user,
  isLoading,
  isRefreshing,
});

export default connect(mapStateToProps)(Profile);
