import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { setConfiguredAttempt } from '../../../actions/authorization';

import { HeaderSwiper } from './HeaderSwiper';
import { renderEmptyHeader } from '../../../share/MainWrapper';
import CustomActivityIndicator from '../../../custom-components/CustomActivityIndicator';
import About from './About';
import Phone from './Phone';
import YourAddress from './YourAddress';
import Agent from './Agent';
import Link from './Link';
import * as FONTS from '../../../constants/fontConstants';
import * as COLORS from '../../../styles/common';

export const styles = StyleSheet.create({
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
      activeIndex: 0,
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
      0: About,
      1: Phone,
      2: YourAddress,
      3: Agent,
      4: Link,
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
    const { isLoading, navigation: { dispatch } } = this.props;
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderEmptyHeader(activeIndex === 0, dispatch)}
        {activeIndex !== 0 && (
          <HeaderSwiper
            activeIndex={activeIndex}
            onBack={this.onBack}
          />
        )}
        {this.renderElementByIndex(activeIndex)}
        <CustomActivityIndicator isLoading={isLoading} showNoData={false} />
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
};

Onboarding.defaultProps = {
};

const mapStateToProps = ({
  authorizationReducer: {
    isLoading,
    profile,
  },
}) => ({
  isLoading,
  profile,
});

export default connect(mapStateToProps)(Onboarding);
