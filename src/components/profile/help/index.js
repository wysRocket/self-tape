import React, { Component } from 'react';
import {
  View, ScrollView, Text, Platform, BackHandler, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import MainWrapper from '../../../share/MainWrapper';
import HelpItem from './HelpItem';
import { locale } from '../../../constants/textConstants';
import styles from '../../../styles/HelpStyles';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    const { navigation, screenProps: { profile } } = this.props;
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate(profile.role === 'practitioner' ? 'Dashboard' : 'Home');
        return true;
      });
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  openUrl = (endpoint, type = 'url') => {
    let url = '';
    if (type === 'url') url = `https://www.selftapenow.com/${endpoint}`;
    else url = `mailto:${endpoint}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url)
            .catch(() => null);
        }
      });
  }

  renderHeader = () => (
    <View style={styles.titleContainer}>
      <Text style={[styles.containerItemTitle, styles.header]}>
        {locale.legal}
      </Text>
    </View>
  )

  renderHelpItems = items => (
    items.map(item => (
      <HelpItem
        key={item.title}
        title={item.title}
        onPressFunction={item.onPressFunction}
      />
    ))
  );

  render() {
    const { navigation } = this.props;
    const helpItems = [
      { title: locale.helpCenter, onPressFunction: () => this.openUrl('faq') },
      { title: locale.tutorial, onPressFunction: () => {} },
      { title: locale.reportAnIssue, onPressFunction: () => this.openUrl('info@selftapenow.com', 'mail') },
    ];
    const legalItems = [
      { title: locale.privacyPolicy, onPressFunction: () => this.openUrl('privacy-policy') },
      { title: locale.termsAndConditions, onPressFunction: () => this.openUrl('terms-agreements') },
    ];
    return (
      <MainWrapper
        navigation={navigation}
        pageName={locale.help}
      >
        <ScrollView
          style={styles.container}
        >
          <View style={styles.containerTop}>
            {this.renderHelpItems(helpItems)}
            {this.renderHeader()}
            {this.renderHelpItems(legalItems)}
          </View>
          <View style={styles.containerCopyright}>
            <Text style={styles.containerCopyrightYear}>{locale.copyrightYear}</Text>
            <Text style={styles.containerCopyrightVersion}>{locale.version}</Text>
          </View>
        </ScrollView>
      </MainWrapper>
    );
  }
}

Help.propTypes = {
  navigation: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  screenProps: PropTypes.shape({}),
};

Help.defaultProps = {
  screenProps: {},
};

export default Help;
