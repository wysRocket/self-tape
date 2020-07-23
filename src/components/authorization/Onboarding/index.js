import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { setConfiguredAttempt } from '../../../actions/authorization';

import { HeaderSwiper } from './HeaderSwiper';
import { renderEmptyHeader } from '../../../share/MainWrapper';
import CustomActivityIndicator from '../../../custom-components/CustomActivityIndicator';
import OnboardingComponent from './Onboarding';
import YourAddress from './YourAddress';
import AboutYou from './AboutYou';
import YourLocation from './YourLocation';
import ShowYourStudio from './ShowYourStudio';
import YourOpeningHours from './OpeningHours';
import DurationAndPrice from './DurationAndPrice';
import PaymentAccount from './PaymentAccount';
import * as FONTS from '../../../constants/fontConstants';
import * as COLORS from '../../../styles/common';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f7f7f5',
    borderColor: '#e2e2e2',
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: FONTS.HelveticaLight,
  },
  headerSubTitle: {
    color: '#000',
    fontSize: 15,
    fontWeight: '200',
    fontFamily: FONTS.HelveticaLight,
    marginVertical: 15,
  },
  button: {
    backgroundColor: COLORS.COLOR_BLUE,
    marginHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 10,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: COLORS.COLOR_GREY,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: FONTS.HelveticaLight,
  },
});

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.profile.configured ? 7 : 0,
    };
  }

  onBack = () => {
    const { activeIndex } = this.state;
    if (activeIndex !== 0) {
      this.setState(prevState => ({ activeIndex: prevState.activeIndex - 1 }));
    }
  }

  onNext = () => this.setState(prevState => ({ activeIndex: prevState.activeIndex + 1 }));

  onMoveToDashboard = () => {
    const { navigation: { dispatch } } = this.props;
    dispatch(setConfiguredAttempt({ configured: true }));
  }

  renderElementByIndex = (activeIndex) => {
    const { props } = this;
    const ComponentByIndex = {
      0: OnboardingComponent,
      1: AboutYou,
      2: YourAddress,
      3: YourLocation,
      4: YourOpeningHours,
      5: ShowYourStudio,
      6: DurationAndPrice,
      7: PaymentAccount,
      8: OnboardingComponent,
    };
    const Elem = ComponentByIndex[activeIndex];

    return (
      <Elem
        {...props}
        activeIndex={activeIndex}
        onBack={this.onBack}
        onNext={this.onNext}
        onMoveToDashboard={this.onMoveToDashboard}
      />
    );
  }

  render() {
    const { activeIndex } = this.state;
    const { isLoading, isLoadingDetails, navigation: { dispatch } } = this.props;
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderEmptyHeader(activeIndex === 0, dispatch)}
        {activeIndex !== 0 && activeIndex !== 8 && (
          <HeaderSwiper
            activeIndex={activeIndex}
            onBack={this.onBack}
          />
        )}
        {this.renderElementByIndex(activeIndex)}
        <CustomActivityIndicator isLoading={isLoading || isLoadingDetails} showNoData={false} />
      </SafeAreaView>
    );
  }
}

Onboarding.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingDetails: PropTypes.bool.isRequired,
  profile: PropTypes.shape({}),
};

Onboarding.defaultProps = {
  profile: null,
};

const mapStateToProps = ({
  authorizationReducer: {
    isLoading,
    profile,
  },
  userDetails: {
    membershipUpdate,
    member,
    isLoading: isLoadingDetails,
  },
}) => ({
  isLoading,
  profile,
  membershipUpdate,
  member,
  isLoadingDetails,
});

export default connect(mapStateToProps)(Onboarding);
