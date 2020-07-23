import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import { profileUpdateAttempt } from '../../actions/authorization';
import AddPhoto from '../../images/onboarding/addPhotoIcon.png';
import * as FONTS from '../../constants/fontConstants';

import ImageLoading from '../ImageLoading';

const optionsCamera = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const imageSize = 20;
const selectedAvatar = 150;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderBottomWidth: 1,
    padding: 20,
  },
  addImage: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
  },
  inputStyle: {
    marginLeft: 15,
    fontSize: 16,
    flex: 1,
    color: '#cececb',
  },
  addImageText: {
    fontFamily: FONTS.HelveticaLight,
    color: '#000',
    marginTop: -20,
  },
  icon: {
    tintColor: '#cececb',
  },
  bioImageContainer: {
    borderRadius: imageSize / 2,
  },
  bioImage: {
    borderRadius: imageSize / 2,
    width: imageSize,
    height: imageSize,
  },
  userImage: {
    borderRadius: selectedAvatar / 2,
    width: selectedAvatar,
    height: selectedAvatar,
  },
});

class ImageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoPermission: false,
      cameraPermission: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.requestPermission();
    }, 1000);
  }

  requestPermission = () => {
    Permissions.request('photo').then(photoPermission => this.setState({ photoPermission }));
    Permissions.request('camera').then(cameraPermission => this.setState({ cameraPermission }));
  }

  pickImage = async () => {
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
            dispatch(profileUpdateAttempt({ image: response }));
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

  render() {
    const {
      placeholder, icon, style, image, user = false,
    } = this.props;
    return (
      <View>
        {user ? (
          <TouchableOpacity
            onPress={this.pickImage}
            style={[styles.addImage, style]}
          >
            {image !== '' ? (
              <ImageLoading
                style={styles.userImage}
                source={{ uri: image }}
              />
            ) : (
              <View style={{ alignItems: 'center' }}>
                <AutoHeightImage
                  source={AddPhoto}
                  width={selectedAvatar}
                />
                <Text style={styles.addImageText}>Add Photo</Text>
              </View>
            )
          }
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={this.pickImage}
            style={[styles.inputWrapper, style]}
          >
            {image !== '' ? (
              <View style={styles.bioImageContainer}>
                <ImageLoading
                  style={styles.bioImage}
                  source={{ uri: image }}
                />
              </View>
            ) : (
              <AutoHeightImage
                source={icon}
                width={imageSize}
                style={styles.icon}
              />
            )
            }
            <Text style={styles.inputStyle}>{placeholder}</Text>
          </TouchableOpacity>
        )
      }
      </View>
    );
  }
}

ImageButton.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  image: PropTypes.string,
  style: PropTypes.shape({}),
  user: PropTypes.bool,
};

ImageButton.defaultProps = {
  style: {},
  image: '',
  user: false,
};

export default ImageButton;
