import React, { Component, Fragment } from 'react';
import { Text, View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RNFetchBlob from 'rn-fetch-blob';

import MainWrapper from '../../share/MainWrapper';
import CustomTouchableOpacity from '../../custom-components/CustomTouchableOpacity';
import { profileUpdateAttempt } from '../../actions/authorization';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import { showAlert } from '../../helpers/sessions';
import { getLocationByAddressURI, formationLocationObject } from '../../helpers/locations';

import styles from '../../styles/SetLocationStyles';


class SetLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      searchResult: null,
    };
  }

  onChange = async (value) => {
    this.setState({ address: value });
    await RNFetchBlob
      .fetch('GET', getLocationByAddressURI(value))
      .then((res) => {
        const response = res.json();
        if (response && response.results !== null && response.results.length > 0) {
          const newRes = response.results[0];
          this.setState({ searchResult: formationLocationObject(newRes) });
        }
      });
  }

  updateBio = async () => {
    const { navigation: { dispatch, navigate, state: { params } } } = this.props;
    const { searchResult } = this.state;
    if (params && params.type === 'address') await dispatch(profileUpdateAttempt({ address: searchResult }));
    else await dispatch(profileUpdateAttempt({ searchLocation: searchResult }));
    showAlert(`${params && params.type === 'address' ? 'Address' : 'Location'} was changed`, () => navigate('Settings'));
  }

  renderSingleLocation = (location) => {
    const { navigation: { state: { params } } } = this.props;
    return (
      <View
        style={styles.singleElementWrapper}
      >
        <Text style={styles.sinleElementText}>
          {this.state.searchResult !== null
            ? `${params && params.type === 'address'
              ? 'Your address will be changed to:'
              : 'Your profile will appear in this location:'} \n${location.formattedAddress}`
            : 'No results found'}
        </Text>
      </View>
    );
  }

  render() {
    const { navigation, isLoading } = this.props;
    const { address, searchResult } = this.state;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Set location"
        goBackScreen="Settings"
      >
        {!isLoading && (
          <Fragment>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.inputStyle}
              placeholderTextColor="white"
              placeholder="Search location"
              selectionColor="white"
              value={address}
              onChangeText={this.onChange}
              secureTextEntry={false}
            />
            <KeyboardAwareScrollView
              style={styles.container}
              contentContainerStyle={styles.containerContetnt}
            >
              {this.renderSingleLocation(searchResult)}
              {searchResult !== null && (
                <CustomTouchableOpacity
                  styles={styles.buttonContainer}
                  onPressFunction={() => this.updateBio()}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </CustomTouchableOpacity>
              )}
            </KeyboardAwareScrollView>
          </Fragment>
        )}
        <CustomActivityIndicator text="" isLoading={isLoading} showNoData={false} />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({
  authorizationReducer: {
    profile,
    isLoading,
  },
}) => ({
  profile,
  isLoading,
});

SetLocation.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

SetLocation.defaultProps = {};

export default connect(mapStateToProps)(SetLocation);
