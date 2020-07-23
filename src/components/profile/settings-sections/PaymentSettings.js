import React, { Component, Fragment } from 'react';
import {
  View,
  Platform,
  BackHandler,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Swipeout from 'react-native-swipeout';
import PropTypes from 'prop-types';
import AutoHeightImage from 'react-native-auto-height-image';
import CardInput from '../../../custom-components/Input/CardInput';
import { Header } from './elements';
import * as ACTIONS from '../../../actions/userDetails';
import styles from '../../../styles/SettingsStyles';
import * as COLORS from '../../../styles/common';
import CheckedIcon from '../../../images/icons/checked.png';
import CardIcon from '../../../images/icons/creditCardIcon.png';
import BankIcon from '../../../images/icons/bankAccount.png';
import { PRODUCTION } from '../../../constants/apiConstants';
import * as FONTS from '../../../constants/fontConstants';

const currentStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: 20,
    marginBottom: 10,
    textDecorationLine: 'underline',
    color: '#000',
  },
  sourceSwipeout: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 7,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  sourceContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  sourceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    borderColor: '#e8edf0',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
  },
  active: {
    fontWeight: '600',
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: COLORS.COLOR_GREY_5E5E60,
    padding: 10,
    color: COLORS.COLOR_GREY_5E5E60,
    fontSize: 16,
    fontWeight: '400',
  },
  buttonContainer: {
    backgroundColor: COLORS.COLOR_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  disabled: {
    backgroundColor: COLORS.COLOR_GREY_5E5E60,
  },
  image: {
    tintColor: '#000',
    marginRight: 10,
  },
  buttonSave: {
    width: '90%',
    padding: 12,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.COLOR_BLUE,
    marginTop: 25,
  },
  buttonSaveText: {
    color: '#fff',
    fontFamily: FONTS.HelveticaLight,
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
});

class PaymentSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLeftTab: true,
      card: {
        cardNumber: '',
        cardType: '*****',
        cardholderName: 'Holder Name',
        cvv: '***',
        expiryMonth: '**',
        expiryYear: '****',
        postalCode: null,
        redactedCardNumber: '****************',
        scanned: false,
      },
      holderName: '',
      routingNumber: !PRODUCTION ? '110000000' : '',
      accountNumber: !PRODUCTION ? '000123456789' : '',
      activeScrollElem: null,
      disableScroll: true,
    };
  }

  componentDidMount = () => {
    const { onToggleToScreen } = this.props;
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        onToggleToScreen('BusinessProfile');
        return true;
      });
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') BackHandler.removeEventListener('hardwareBackPress');
  }

  onChangeValue = (name, value) => {
    this.setState({ [name]: value });
  }

  onChangeCreditCard = (data) => {
    this.setState({ card: data });
  }

  defaultState = () => {
    this.setState({
      holderName: '',
      routingNumber: '',
      accountNumber: '',
    });
  }

  saveCard = () => {
    const { parentProps: { navigation: { dispatch } }, onNext } = this.props;
    const { card } = this.state;
    const cardObj = { ...card, currency: 'usd' };
    if (!PRODUCTION) cardObj.cardNumber = '5200828282828210';
    dispatch(ACTIONS.addExternalAccountAttempt({ obj: cardObj, type: 'card' }, () => {
      this.setState({ card: null });
      onNext();
    }));
  }

  saveBankAccount = () => {
    const { holderName, routingNumber, accountNumber } = this.state;
    const { onNext } = this.props;
    const cardObj = {
      'bank_account[country]': 'US',
      'bank_account[currency]': 'usd',
      'bank_account[account_holder_name]': holderName,
      'bank_account[account_holder_type]': 'individual',
      'bank_account[routing_number]': routingNumber,
      'bank_account[account_number]': accountNumber,
    };
    const { parentProps: { navigation: { dispatch } } } = this.props;
    dispatch(ACTIONS.addExternalAccountAttempt({ obj: cardObj, type: 'bank_account' }, () => {
      this.setState({
        holderName: '',
        routingNumber: '',
        accountNumber: '',
      });
      onNext();
    }));
  }

  removeElement = () => {
    const { activeScrollElem } = this.state;
    const { parentProps: { navigation: { dispatch } } } = this.props;
    dispatch(ACTIONS.deleteCardAttempt({ id: activeScrollElem }));
  }

  updateDefaltSource = (id) => {
    const { parentProps: { navigation: { dispatch } } } = this.props;
    dispatch(ACTIONS.updateBankAccountAttempt({ id }));
  }

  toogleActiveTab = () => this.setState(prevState => ({ activeLeftTab: !prevState.activeLeftTab }))

  keyExtractor = item => item.id;

  srollSwipeout = (e, id) => {
    this.setState({
      activeScrollElem: id,
      disableScroll: e,
    });
  }

  renderItem = ({
    item: {
      id, last4, object, default_for_currency: defaultCurrency,
    },
  }) => {
    const { activeScrollElem } = this.state;
    const swipeoutBtns = [{
      text: 'Delete',
      backgroundColor: '#fe3a2f',
      underlayColor: '#fe3a2f',
      onPress: this.removeElement,
    }];
    return (
      <Swipeout
        style={currentStyles.sourceSwipeout}
        right={swipeoutBtns}
        autoClose
        disabled={defaultCurrency}
        close={activeScrollElem !== id}
        scroll={e => this.srollSwipeout(e, id)}
      >
        <TouchableOpacity
          style={currentStyles.sourceContainer}
          onPress={() => this.updateDefaltSource(id)}
        >
          <View style={currentStyles.sourceLeft}>
            <AutoHeightImage
              source={object === 'bank_account' ? BankIcon : CardIcon}
              style={currentStyles.image}
              width={25}
            />
            <Text style={currentStyles.sourceText}>
              {
                object === 'bank_account'
                  ? `******** ${last4}`
                  : `**** **** **** ${last4}`
              }
            </Text>
          </View>
          {defaultCurrency && <AutoHeightImage source={CheckedIcon} width={20} />}
        </TouchableOpacity>
      </Swipeout>
    );
  }

  renderNewBankAccount = () => {
    const { holderName, routingNumber, accountNumber } = this.state;
    const disabled = holderName.length === 0
      || routingNumber.length < 9
      || accountNumber.length < 9;
    return (
      <View style={currentStyles.container}>
        <TextInput
          onChangeText={value => this.onChangeValue('holderName', value)}
          underlineColorAndroid="transparent"
          style={currentStyles.inputStyle}
          keyboardType="default"
          placeholder="Holder Name"
          value={holderName}
        />
        <TextInput
          onChangeText={value => this.onChangeValue('routingNumber', value)}
          underlineColorAndroid="transparent"
          style={currentStyles.inputStyle}
          keyboardType="numeric"
          placeholder="Routing Number"
          value={routingNumber}
        />
        <TextInput
          onChangeText={value => this.onChangeValue('accountNumber', value)}
          underlineColorAndroid="transparent"
          style={currentStyles.inputStyle}
          keyboardType="numeric"
          placeholder="Account Number"
          value={accountNumber}
        />
        <TouchableOpacity
          disabled={disabled}
          onPress={this.saveBankAccount}
          style={[currentStyles.buttonContainer, disabled ? currentStyles.disabled : {}]}
        >
          <Text style={currentStyles.tabText}>Add bank account</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { activeLeftTab } = this.state;
    const {
      parentProps: {
        profile, isLoading, member, isLoadingDetails,
      }, onToggleToScreen, hideHeader,
    } = this.props;
    const { card, disableScroll } = this.state;
    return (
      !isLoading && profile !== null && !isLoadingDetails && (
        <View style={[styles.top, styles.topWhite]}>
          {!hideHeader && (
            Header({
              onToggleToScreen,
              backScreen: 'BusinessProfile',
              title: 'Payout settings',
            })
          )}
          <View style={currentStyles.tabContainer}>
            <TouchableOpacity
              onPress={this.toogleActiveTab}
              style={currentStyles.tabItem}
            >
              <Text style={[currentStyles.tabText, activeLeftTab && currentStyles.active]}>
                Card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.toogleActiveTab}
              style={currentStyles.tabItem}
            >
              <Text style={[currentStyles.tabText, !activeLeftTab && currentStyles.active]}>
                Bank account
              </Text>
            </TouchableOpacity>
          </View>
          <KeyboardAwareScrollView
            scrollEnabled={disableScroll}
            onScroll={() => this.setState({ activeScrollElem: null })}
            scrollEventThrottle={16}
          >
            {activeLeftTab ? (
              <Fragment>
                <CardInput
                  onChangeCreditCard={cardData => this.onChangeCreditCard(cardData)}
                  card={card}
                />
                <TouchableOpacity
                  style={currentStyles.buttonSave}
                  onPress={this.saveCard}
                >
                  <Text style={currentStyles.buttonSaveText}>Save</Text>
                </TouchableOpacity>
              </Fragment>
            ) : this.renderNewBankAccount()}
            {member && member.external_accounts.data.length > 0 && (
              <Text style={currentStyles.title}>Payout account or card</Text>
            )}
            <FlatList
              data={member ? member.external_accounts.data : []}
              extraData={this.state}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              scrollEnabled={false}
            />
          </KeyboardAwareScrollView>
        </View>
      )
    );
  }
}

PaymentSettings.propTypes = {
  parentProps: PropTypes.shape({}).isRequired,
  onToggleToScreen: PropTypes.func.isRequired,
  hideHeader: PropTypes.bool,
  onNext: PropTypes.func,
};

PaymentSettings.defaultProps = {
  hideHeader: false,
  onNext: () => {},
};

export default PaymentSettings;
