import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  WebView, View, StyleSheet, Text, SafeAreaView, BackHandler, Platform,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import CustomTouchableOpacity from '../../custom-components/CustomTouchableOpacity';
import LeftArrow from '../../images/icons/backLeftArrow.png';
import * as COLORS from '../../styles/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  activity: {
    marginTop: -40,
  },
  buttonWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.COLOR_BLUE,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    tintColor: '#fff',
  },
});

class Agreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    const { navigation: { goBack } } = this.props;
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        goBack();
        return true;
      });
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <WebView
            originWhitelist={['*']}
            startInLoadingState
            renderLoading={() => <CustomActivityIndicator style={styles.activity} isLoading />}
            source={{ uri: 'https://stripe.com/us/connect-account/legal' }}
            style={styles.container}
          />
          <CustomTouchableOpacity onPressFunction={() => this.props.navigation.goBack()}>
            <View style={styles.buttonWrapper}>
              <AutoHeightImage source={LeftArrow} style={styles.image} width={30} />
              <Text style={styles.backText}>BACK</Text>
            </View>
          </CustomTouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

Agreement.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

Agreement.defaultProps = {
};


export default Agreement;
