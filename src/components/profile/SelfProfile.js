import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, TextInput, Keyboard, Platform,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Permissions from 'react-native-permissions';
import CardView from '../../custom-components/CardView';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import ImageLoading from '../../custom-components/ImageLoading';
import { profileUpdateAttempt } from '../../actions/authorization';
import MainWrapper from '../../share/MainWrapper';
import Star from '../../images/icons/star.png';
import Laptop from '../../images/icons/laptopIcon.png';
import IMDB from '../../images/icons/imdbIcon.png';
import Instagram from '../../images/icons/instaIcon.png';
import AgentIcon from '../../images/icons/agentIcon.png';
import styles from '../../styles/SelfProfileStyles';
import { locale } from '../../constants/textConstants';

const optionsCamera = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const iconSize = 45;
class SelfProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoPermission: false,
      cameraPermission: false,
      bio: '',
      agent: '',
      manager: '',
      webSite: '',
      instagram: '',
      iMdb: '',
      focusedBio: false,
      focused: false,
      firstRender: false,
    };
    this.bio = null;
    this.agent = null;
    this.manager = null;
    this.webSite = null;
    this.instagram = null;
    this.iMdb = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.bio !== nextProps.profile.bio && nextProps.profile.bio !== '' && prevState.bio === '' && !prevState.firstRender) {
      return {
        ...prevState,
        bio: nextProps.profile.bio,
        agent: nextProps.profile.agent,
        manager: nextProps.profile.manager,
        webSite: nextProps.profile.webSite,
        instagram: nextProps.profile.instagram,
        iMdb: nextProps.profile.iMdb,
        firstRender: true,
      };
    }
    return prevState;
  }

  componentDidMount() {
    this.requestPermission();
  }

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  }

  focusNext = input => this[input] && this[input].focus();

  allowEdit = () => this.setState(prevState => ({ focused: !prevState.focused }));

  requestPermission = () => {
    Permissions.request('photo').then(photoPermission => this.setState({ photoPermission }));
    Permissions.request('camera').then(cameraPermission => this.setState({ cameraPermission }));
  }

  pickImage = async (field) => {
    const { navigation: { dispatch } } = this.props;
    const { photoPermission, cameraPermission } = this.state;
    if (photoPermission === 'authorized' || cameraPermission === 'authorized') {
      ImagePicker.showImagePicker(optionsCamera, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const video = response && (Platform.OS === 'ios' ? null : this.isVideo(response.fileName));
          if (response.uri && !video) {
            dispatch(profileUpdateAttempt({ [field]: response }));
          }
        }
      });
    }
  };

  getExtension = (filename) => {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  };

  isVideo = (filename) => {
    const ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case `m4v`:
      case `avi`:
      case `mpg`:
      case `mp4`:
        return true;
    }
    return false;
  };

  updateBio = () => {
    const { navigation: { dispatch } } = this.props;
    const {
      bio, instagram, agent, manager, webSite, iMdb,
    } = this.state;
    Keyboard.dismiss();
    this.setState({ focused: false });
    dispatch(profileUpdateAttempt({
      bio, instagram, agent, manager, webSite, iMdb,
    }));
  }

  renderAdditionalInfo = () => {
    const {
      agent,
      manager,
      webSite,
      instagram,
      iMdb,
      focused,
    } = this.state;
    return (
      <View style={styles.addintionalInfoContainer}>
        <View style={[styles.row, styles.rowMargin]}>
          <View style={styles.borderImage}>
            <AutoHeightImage source={AgentIcon} width={iconSize} />
          </View>
          <View style={{ width: '80%', alignContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.text, { paddingLeft: 5 }]}>{`${locale.agent}:`}</Text>
              <TextInput
                numberOfLines={1}
                style={[styles.editAgent, focused && styles.focusedAgent]}
                field="agent"
                onChangeText={value => this.onChangeValue('agent', value)}
                value={agent}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                editable={focused}
                onSubmitEditing={() => this.focusNext('manager')}
                returnKeyType="next"
                placeholder="Your agent"
                ref={(ref) => { this.agent = ref; }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.text, { paddingLeft: 5 }]}>{`${locale.manager}:`}</Text>
              <TextInput
                numberOfLines={1}
                style={[styles.editManager, focused && styles.focusedManager]}
                onChangeText={value => this.onChangeValue('manager', value)}
                value={manager}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                editable={focused}
                onSubmitEditing={() => this.focusNext('webSite')}
                returnKeyType="next"
                placeholder="Your manager"
                ref={(ref) => { this.manager = ref; }}
              />
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.rowMargin]}>
          <View style={styles.borderImage}>
            <AutoHeightImage source={Laptop} width={iconSize} />
          </View>
          <TextInput
            numberOfLines={1}
            style={[styles.editInput, focused && styles.focusedEdit]}
            onChangeText={value => this.onChangeValue('webSite', value)}
            value={webSite}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            editable={focused}
            onSubmitEditing={() => this.focusNext('instagram')}
            returnKeyType="next"
            placeholder="Your web site"
            ref={(ref) => { this.webSite = ref; }}
          />
        </View>
        <View style={[styles.row, styles.rowMargin]}>
          <View style={styles.borderImage}>
            <AutoHeightImage source={Instagram} width={iconSize} />
          </View>
          <TextInput
            numberOfLines={1}
            style={[styles.editInput, focused && styles.focusedEdit]}
            onChangeText={value => this.onChangeValue('instagram', value)}
            value={instagram}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            editable={focused}
            onSubmitEditing={() => this.focusNext('iMdb')}
            returnKeyType="done"
            placeholder="Your instagram"
            ref={(ref) => { this.instagram = ref; }}
          />
        </View>
        <View style={[styles.row, styles.rowMargin]}>
          <View style={styles.borderImage}>
            <AutoHeightImage source={IMDB} width={iconSize} />
          </View>
          {focused
            ? (
              <TextInput
                numberOfLines={1}
                style={[styles.editInput, styles.text, focused && styles.focusedEdit]}
                onChangeText={value => this.onChangeValue('iMdb', value)}
                value={iMdb}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                editable={focused}
                returnKeyType="done"
                placeholder="Your IMDB"
                ref={(ref) => { this.iMdb = ref; }}
              />
            )
            : (
              <View style={styles.row}>
                <Text style={styles.text}>
                  {`${locale.click} `}
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.text, styles.line]}>{`${locale.here.toUpperCase()}`}</Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
      </View>
    );
  }
  
  renderReviews = () => {
    
  }

  render() {
    const {
      profile,
      navigation,
      navigation: { state: { params } },
      isLoading,
    } = this.props;
    const {
      bio,
      focused,
    } = this.state;
    const gallery = profile && profile.setup && profile.setup.filter(el => el !== '');

    return (
      <MainWrapper
        navigation={navigation}
        pageName="Profile"
        goBackScreen={!params.goBackScreen ? 'Profile' : params.goBackScreen}
        allowEdit={focused}
        onUpdate={this.updateBio}
        onChange={this.allowEdit}
      >
        <KeyboardAwareScrollView
          style={styles.container}
        >
          <View style={styles.containerPadding}>
            {profile.role === 'practitioner' && gallery.length > 0
            && (
              <View style={styles.studiyaWrapper}>
                <CardView inline>
                  {gallery.map(l => (
                    <ImageLoading
                      key={l}
                      source={{ uri: l }}
                      style={styles.studiyaImage}
                    />
                  ))}
                </CardView>
              </View>
            )}
            <TouchableOpacity
              delayPressIn={20}
              onPress={() => this.pickImage('image')}
              style={{ marginTop: 20 }}
            >
              <View style={styles.bioImageContainer}>
                <ImageLoading
                  style={styles.bioImage}
                  source={{ uri: profile.image }}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.bioRating}>
              <Image source={Star} />
              <Text style={styles.bioRatingNumber}>{profile.rating}</Text>
            </View>
            <Text style={styles.bioName}>{profile.username}</Text>
            <TextInput
              numberOfLines={1}
              style={[styles.editInput, styles.text, focused && styles.focusedEdit]}
              onChangeText={value => this.onChangeValue('bio', value)}
              multiline
              value={bio}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              editable={focused}
              onSubmitEditing={() => this.focusNext('agent')}
              returnKeyType="done"
              placeholder="Tell us something about yourself"
              ref={(ref) => { this.bio = ref; }}
            />
            {profile.role !== 'practitioner' ? this.renderAdditionalInfo() : this.renderReviews()}
          </View>
        </KeyboardAwareScrollView>
        <CustomActivityIndicator text="" isLoading={isLoading} showNoData={false} />
      </MainWrapper>
    );
  }
}

SelfProfile.propTypes = {
  navigation: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  profile: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

SelfProfile.defaultProps = {
};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
    isLoading,
  },
  locations: {
    locations,
  },
}) => ({
  profile,
  isLoading,
  locations,
});

export default connect(mapStateToProps)(SelfProfile);
