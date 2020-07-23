import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import BusinessProfile from './BusinessProfile';
import StudioPhotos from './StudioPhotos';
import OpeningHours from './OpeningHours';
import PriceSettings from './PriceSettings';
import PaymentSettings from './PaymentSettings';

import CustomLoadingIndicator from '../../../custom-components/CustomActivityIndicator';

import MainWrapper from '../../../share/MainWrapper';
import { signOutAttempt } from '../../../actions/authorization';

class BusinessProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggledScreen: 'BusinessProfile',
    };
  }

  onToggleToScreen = screen => this.setState({ toggledScreen: screen });

  signOut = () => {
    const { navigation: { dispatch } } = this.props;
    dispatch(signOutAttempt());
  }

  renderSwitch() {
    const { toggledScreen } = this.state;
    switch (toggledScreen) {
      case 'BusinessProfile':
        return (
          <BusinessProfile
            parentProps={this.props}
            onToggleToScreen={this.onToggleToScreen}
          />
        );
      case 'StudioPhotos':
        return (
          <StudioPhotos
            parentProps={this.props}
            onToggleToScreen={this.onToggleToScreen}
          />
        );
      case 'OpeningHours':
        return (
          <OpeningHours
            parentProps={this.props}
            onToggleToScreen={this.onToggleToScreen}
          />
        );
      case 'PriceSettings':
        return (
          <PriceSettings
            parentProps={this.props}
            onToggleToScreen={this.onToggleToScreen}
          />
        );
      case 'PaymentSettings':
        return (
          <PaymentSettings
            parentProps={this.props}
            onToggleToScreen={this.onToggleToScreen}
          />
        );
      default:
        return (
          <BusinessProfile
            parentProps={this.props}
            onToggleToScreen={this.onToggleToScreen}
          />
        );
    }
  }

  render() {
    const {
      profile, isLoading, isLoadingDetails, membershipUpdate, navigation,
    } = this.props;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Business Profile"
        goBackScreen="Dashboard"
      >
        {!isLoading && profile !== null && this.renderSwitch()}
        <CustomLoadingIndicator
          isLoading={isLoading || profile === null || isLoadingDetails || membershipUpdate}
          showNoData={false}
        />
      </MainWrapper>
    );
  }
}

BusinessProfileContainer.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }),
  profile: PropTypes.shape({
    role: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
  isLoading: PropTypes.bool,
  isLoadingDetails: PropTypes.bool.isRequired,
  membershipUpdate: PropTypes.bool.isRequired,
};

BusinessProfileContainer.defaultProps = {
  profile: null,
  isLoading: false,
  navigation: () => {},
};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
    isLoading,
  },
  userDetails: {
    membershipUpdate,
    member,
    isLoading: isLoadingDetails,
  },
}) => ({
  profile,
  isLoading,
  membershipUpdate,
  member,
  isLoadingDetails,
});

export default connect(mapStateToProps)(BusinessProfileContainer);
