import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Linking } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import BecomePractitionerImage from '../../images/profile/becomePractitioner.jpg';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/BacomePractitionerStyles';

export default class BecomePractitioner extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  openURL = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  }

  render() {
    const { width } = Dimensions.get('window');
    return (
      <MainWrapper
        navigation={this.props.navigation}
        pageName="Become a Practitioner"
        // goBackScreen="HomeCommunities"
        goBackScreen="Home"
      >
        <KeyboardAwareScrollView
          style={styles.container}
        >
          <View>
            <AutoHeightImage
              source={BecomePractitionerImage}
              width={width}
              style={styles.imageStyle}
            />
            <Text style={styles.imageText}>BECOME A PRACTITIONER</Text>
          </View>
          <View style={styles.containerText}>
            <View style={styles.dot} />
            <Text style={styles.dottedText}>
              DO YOU HAVE A KICK ASS SELF-TAPE SETUP AND SHOOT ALL YOUR FRIENDS SELF-TAPES?
            </Text>
          </View>
          <View style={styles.containerText}>
            <View style={styles.dot} />
            <Text style={styles.dottedText}>
              DO YOU WANT TO MAKE MONEY WORKING AS AN ACTOR?
            </Text>
          </View>
          <View style={styles.containerText}>
            <View style={styles.dot} />
            <Text style={styles.dottedText}>
            HONE YOUR CRAFT AND MAKE UP TO SIX FIGURES WORKING AT YOUR OWN PLACE IN YOUR OWN PLACE!
            </Text>
          </View>
          <View style={styles.signUpBlock}>
            <Text style={styles.signUpBlockText}>SIMPLY SIGN UP BELOW FOR MORE INFO!</Text>
            <View style={styles.becomeExpertButtons}>
              <TouchableOpacity
                style={styles.becomeButton}
                delayPressIn={20}
                onPress={() => this.openURL('https://eepurl.com/dN7Wjz')}
              >
                <Text style={styles.becomeButtonText}>BECOME A PRACTITIONER!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </MainWrapper>
    );
  }
}

BecomePractitioner.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

BecomePractitioner.defaultProps = {};
