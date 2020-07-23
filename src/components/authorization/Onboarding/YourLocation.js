import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import Map from '../../../custom-components/Map';
import { styles as mainStyles } from './index';
import * as FONTS from '../../../constants/fontConstants';
import * as HELPERS from '../../../helpers/textHelpers';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerSubTitle: {
    marginBottom: 5,
  },
  headerValue: {
    fontFamily: FONTS.HelveticaLight,
    fontSize: 12,
    color: '#9d9d9f',
  },
});
class YourLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.onBack();
        return true;
      });
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  render() {
    const {
      profile: {
        location,
        address,
      },
    } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <View style={mainStyles.headerWrapper}>
            <Text style={mainStyles.headerTitle}>Your Location</Text>
            <Text style={styles.headerValue}>{HELPERS.formatLocation(address)}</Text>
          </View>
          <View style={{ height: '70%' }}>
            {
              location && (
                <Map
                  location={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                />
              )
            }
          </View>
        </View>
        <View>
          <CustomTouchableOpacity
            styles={[
              mainStyles.button,
              {
                position: 'absolute', bottom: 0, width: '90%', alignSelf: 'center',
              },
            ]}
            onPressFunction={this.props.onNext}
          >
            <Text style={mainStyles.buttonText}>Continue</Text>
          </CustomTouchableOpacity>
        </View>
      </View>
    );
  }
}

YourLocation.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
};

YourLocation.defaultProps = {
};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
  },
}) => ({
  profile,
});
export default connect(mapStateToProps)(YourLocation);
