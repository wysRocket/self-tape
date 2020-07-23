import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Permissions from 'react-native-permissions';
import AutoHeightImage from 'react-native-auto-height-image';
import ImagePicker from 'react-native-image-picker';
import ImageLoading from '../custom-components/ImageLoading';

import { profileUpdateAttempt } from '../actions/authorization';
import Plus from '../images/icons/plus.png';
import styles from '../styles/SettingsStyles';

const optionsCamera = {
  title: 'Select Studio Photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class StudioPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoPermission: false,
      cameraPermission: false,
    };
  }

  componentDidMount = () => this.requestPermission();

  requestPermission = () => {
    Permissions.request('photo').then(photoPermission => this.setState({ photoPermission }));
    Permissions.request('camera').then(cameraPermission => this.setState({ cameraPermission }));
  }

  pickImage = async (field, index) => {
    const { navigation: { dispatch } } = this.props;
    const { photoPermission, cameraPermission } = this.state;
    if (photoPermission === 'authorized' || cameraPermission === 'authorized') {
      ImagePicker.showImagePicker(optionsCamera, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          dispatch(profileUpdateAttempt({ [field]: { file: response, index } }));
        }
      });
    }
  };

  singlePhoto = (photo, index) => (
    <TouchableOpacity
      key={`${index + 1}`}
      style={styles.studioPhotoWrapper}
      onPress={() => this.pickImage('setup', index)}
    >
      {photo === ''
      ? <AutoHeightImage source={Plus} width={60} />
      : <ImageLoading source={{ uri: photo }} style={styles.studioImage} />}
    </TouchableOpacity>
  );

  render() {
    const { profile, isLoading } = this.props;
    return (
      <View
        style={styles.containerStudioPhotos}
      >
        {profile.setup.map((photo, index) => this.singlePhoto(photo, index))}
      </View>
    );
  }
}

StudioPhotos.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

StudioPhotos.defaultProps = {
};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
    isLoading,
  },
}) => ({
  profile,
  isLoading,
});

export default connect(mapStateToProps)(StudioPhotos);
