import React, { Component, Fragment } from 'react';
import {
  View,
  Platform,
  BackHandler,
  Text,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { isEqual } from 'lodash';

import SinglePrice from './SinglePrice';
import SingleService from './SingleService';
import AddPrice from './AddPrice';
import AddServicePriceButtons from './AddServicePriceButtons';
import { profileUpdateAttempt } from '../../actions/authorization';
import styles from '../../styles/SettingsStyles';

const leftDate = new Date();
leftDate.setMinutes(0);
leftDate.setHours(9);
const rightDate = new Date();
rightDate.setMinutes(0);
rightDate.setHours(18);
let scrollTimeout = null;

const MAX_PRICE = 150;

class DurationAndPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      firstRender: false,
      addPrice: false,
      addService: false,
      duration: 15,
      maxPrice: MAX_PRICE,
      description: '',
      disabledScroll: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { profile } = nextProps;
    if (!isEqual(profile.prices, prevState.prices) && prevState.firstRender !== true) {
      return {
        ...prevState,
        prices: profile.prices,
        firstRender: true,
      };
    }
    return prevState;
  }

  componentDidMount = () => {
    const { toggleAddPrice, toggleAddService, saveData } = this.props;
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        const { addPrice, addService } = this.state;
        if (addPrice) this.toggleAddPrice();
        if (addService) this.toggleAddService();
        return true;
      });
    }
    toggleAddPrice(this.toggleAddPrice);
    toggleAddService(this.toggleAddService);
    saveData(this.saveData);
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  onChangeValue = (name, value) => this.setState({ [name]: value });

  onChangeActive = ({ index, value }) => {
    const prices = [...this.state.prices];
    prices[index] = { ...prices[index], enabled: value };
    this.setState({ prices });
  }

  multiSliderValuesChange = (value, index) => {
    const { disabledScroll } = this.state;
    clearTimeout(scrollTimeout);
    if (disabledScroll !== true) { this.setState({ disabledScroll: true }); }
    scrollTimeout = setTimeout(() => {
      this.setState({ disabledScroll: false });
    }, 200);
    const prices = [...this.state.prices];
    const newValue = value[0];
    prices[index] = { ...prices[index], value: newValue };
    this.setState({ prices });
  }

  removeItem = (index) => {
    const prices = [...this.state.prices];
    prices.splice(index, 1);
    this.setState({ prices }, () => {
      this.saveData();
    });
  }

  saveData = () => {
    const { navigation: { dispatch } } = this.props;
    const { prices } = this.state;
    dispatch(profileUpdateAttempt({ prices }));
  }

  saveNewPrice = () => {
    const {
      duration, maxPrice, addPrice, title, description,
    } = this.state;
    const newPrice = {
      uid: Math.round((Math.random() * 36 * 12)).toString(36),
      value: 0,
      name: addPrice ? `:${duration} min` : title,
      units: '$',
      maxValue: maxPrice,
      duration: addPrice ? '' : 'This is per hour rate. Message me and we can coordinate me coming to you.',
      description,
      enabled: true,
      type: addPrice ? 'price' : 'service',
      removable: true,
    };
    this.setState(prevState => ({
      prices: [newPrice, ...prevState.prices],
    }), () => {
      this.saveData();
      if (addPrice) {
        this.toggleAddPrice();
      } else { this.toggleAddService(); }
    });
  }

  toggleAddPrice = () => {
    const { addPriceState } = this.props;
    this.setState(prevState => ({
      addPrice: !prevState.addPrice,
      duration: 15,
      maxPrice: MAX_PRICE,
    }), () => {
      const { addPrice } = this.state;
      addPriceState(addPrice);
    });
  }

  toggleAddService = () => {
    const { addServiceState } = this.props;
    this.setState(prevState => ({
      addService: !prevState.addService,
      duration: 60,
      maxPrice: MAX_PRICE,
      description: '',
    }), () => {
      const { addService } = this.state;
      addServiceState(addService);
    });
  }

  render() {
    const { profile, isLoading, hideHeader } = this.props;
    const {
      prices, addPrice, disabledScroll,
      title, duration, maxPrice, addService,
      description,
    } = this.state;
    const sortedPrices = prices
    && prices.sort((a, b) => a.duration - b.duration);
    return (
      !isLoading && profile !== null && (
        <ScrollView
          scrollEnabled={!disabledScroll}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {(!addPrice && !addService) ? (
            <Fragment>
              {!hideHeader && (
                <View style={styles.priceDuration}>
                  <Text style={styles.priceDurationText}>Duration</Text>
                </View>
              )}
              <View style={styles.priceWrapper}>
                {sortedPrices.map((item, index) => (
                  ((!item.type || item.type === 'price') && item.units !== '%') && (
                    <SinglePrice
                      key={`${index + 1}`}
                      price={item}
                      index={index}
                      isLast={prices.length - 1 === index}
                      multiSliderValuesChange={this.multiSliderValuesChange}
                      removeItem={this.removeItem}
                    />
                  )
                ))}
                {sortedPrices.map((item, index) => (
                  ((item.type && item.type === 'service') && item.units !== '%') && (
                    <SingleService
                      key={`${index + 1}`}
                      price={item}
                      index={index}
                      isLast={prices.length - 1 === index}
                      multiSliderValuesChange={this.multiSliderValuesChange}
                      removeItem={this.removeItem}
                      onChangeActive={this.onChangeActive}
                    />
                  )
                ))}
                {sortedPrices.map((item, index) => (
                  (item.units === '%') && (
                    <SinglePrice
                      key={`${index + 1}`}
                      price={item}
                      index={index}
                      isLast={prices.length - 1 === index}
                      multiSliderValuesChange={this.multiSliderValuesChange}
                      removeItem={this.removeItem}
                    />
                  )
                ))}
              </View>
              <AddServicePriceButtons
                toggleAddPrice={this.toggleAddPrice}
                toggleAddService={this.toggleAddService}
              />
            </Fragment>
          ) : (
            <AddPrice
              addPrice={addPrice}
              addService={addService}
              title={title}
              description={description}
              duration={duration}
              maxPrice={maxPrice}
              onChangeValue={this.onChangeValue}
              toggleAddPrice={this.toggleAddPrice}
              toggleAddService={this.toggleAddService}
              saveNewPrice={this.saveNewPrice}
            />
          )}
        </ScrollView>
      )
    );
  }
}

DurationAndPrice.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}),
  addPriceState: PropTypes.func,
  addServiceState: PropTypes.func,
  toggleAddPrice: PropTypes.func,
  toggleAddService: PropTypes.func,
  saveData: PropTypes.func,
  hideHeader: PropTypes.bool,
};

DurationAndPrice.defaultProps = {
  navigation: {},
  addPriceState: () => {},
  addServiceState: () => {},
  toggleAddPrice: () => {},
  toggleAddService: () => {},
  saveData: () => {},
  hideHeader: false,
};

const mapStateToProps = ({
  authorizationReducer: {
    profile,
    isLoading,
  },
}) => ({
  profile,
  isLoading,
});

export default connect(mapStateToProps)(DurationAndPrice);
