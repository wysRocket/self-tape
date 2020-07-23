import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import ImageLoading from '../custom-components/ImageLoading';
import MenuIcon from '../images/icons/menuIcon.png';
import styles from '../styles/HeaderStyles';
import { CountBadge } from '../routes/routes';

export default class Header extends Component {
  navigateToProfile = () => {
    const { navigation: { navigate }, person } = this.props;
    navigate('Profile', { person });
  }

  openDrawer = () => {
    const { navigation: { navigate }, person } = this.props;
    navigate('DrawerOpen', person);
  }

  render() {
    const { person, countNewSessions } = this.props;
    return (
      person && (
        <View style={styles.container}>
          <TouchableOpacity style={styles.menuIconWrapper} onPress={() => this.openDrawer()}>
            <Image style={styles.menuIcon} source={MenuIcon} />
            {person.role !== 'practitioner' && (<CountBadge count={countNewSessions} containerStyle={{ right: -2 }} />)}
          </TouchableOpacity>
          <View style={styles.appName}>
            <Text style={styles.appNameLeft}>SELFTAPE</Text>
            <Text style={styles.appNameRight}> NOW</Text>
          </View>
          <TouchableOpacity delayPressIn={20} onPress={() => this.navigateToProfile()}>
            <View style={styles.userAvatarContainer}>
              <ImageLoading
                style={styles.userAvatar}
                source={{ uri: person.image }}
                spinner={false}
              />
            </View>
          </TouchableOpacity>
        </View>
      )
    );
  }
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  person: PropTypes.objectOf(PropTypes.any).isRequired,
  countNewSessions: PropTypes.number.isRequired,
};
