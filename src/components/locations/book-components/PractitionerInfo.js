import React, { PureComponent } from 'react';
import {
  Text, View, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import ImageLoading from '../../../custom-components/ImageLoading';
import CardView from '../../../custom-components/CardView';
import Star from '../../../images/icons/star.png';
import styles from '../../../styles/BookSessionStyles';

class PractitionerInfo extends PureComponent {
  render() {
    const {
      practitioner, setPreviewImage, navigateToPractitionerBio,
    } = this.props;
    const gallery = practitioner && practitioner.setup.filter(el => el !== '');
    return (
      <View style={styles.containerTop}>
        <View style={styles.containerTopLeft}>
          <Text style={styles.containerTopLeftTitle}> Reviews </Text>
          <View style={styles.containerTopLeftAvatar}>
            <TouchableOpacity
              onPress={() => navigateToPractitionerBio()}
              delayPressIn={20}
            >
              <View style={styles.containerLeftAvatarWrapper}>
                <ImageLoading
                  source={{ uri: practitioner.image }}
                  style={styles.containerLeftAvatar}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateToPractitionerBio()}
              delayPressIn={20}
            >
              <Text style={styles.containerTopLeftName}>
                {practitioner.username}
              </Text>
            </TouchableOpacity>
            <View style={styles.containerTopLeftRating}>
              <Image style={styles.containerTopLeftRatingStar} source={Star} />
              <Text style={styles.containerTopLeftRatingCount}>
                {practitioner.rating}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerTopRight}>
          <CardView
            inline
          >
            {gallery.map((l, index) => (
              <TouchableOpacity
                key={l}
                onPress={() => setPreviewImage(index)}
                delayPressIn={20}
              >
                <ImageLoading
                  source={{ uri: l }}
                  style={styles.containerRightUserImg}
                />
              </TouchableOpacity>
            ))}
          </CardView>
        </View>
      </View>
    );
  }
}

PractitionerInfo.propTypes = {
  practitioner: PropTypes.shape({}).isRequired,
  navigateToPractitionerBio: PropTypes.func.isRequired,
  setPreviewImage: PropTypes.func.isRequired,
};

PractitionerInfo.defaultProps = {
};


export default PractitionerInfo;
