import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ImageLoading from '../../custom-components/ImageLoading';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import CardInput from '../../custom-components/Input/CardInput';
import * as ACTIONS from '../../actions/userDetails';
import { isMember, getDefaultCard, isRegisteredMember } from '../../helpers/membership';
import { getCardLogo } from '../../helpers/payments';
import { messageAlert } from '../../helpers/sessions';
import Card from '../../images/icons/Card.png';

import Pen from '../../images/icons/pen.png';
import QrCode from '../../images/icons/QRCode.png';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/MembershipStyles';
import { PRODUCTION } from '../../constants/apiConstants';

const { width } = Dimensions.get('window');

const cardObj = {
  cardNumber: '',
  cardType: '*****',
  cardholderName: 'Holder Name',
  cvv: '***',
  expiryMonth: '**',
  expiryYear: '****',
  postalCode: null,
  redactedCardNumber: '****************',
  scanned: false,
  typed: false,
  valid: false,
};
class Membership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: cardObj,
    };
  }

  onBecomeMember = () => {
    const { navigation: { dispatch, state: { params } } } = this.props;
    const { card } = this.state;
    let selectedPlan = null;
    if (params && params.plan) selectedPlan = params.plan;
    const cardObject = { ...card };
    if (!PRODUCTION) cardObject.cardNumber = '4242424242424242';
    if (card.valid) {
      dispatch(ACTIONS.becomeMemberAttempt({
        card: cardObject,
        plan: selectedPlan,
        isMember: true,
      }));
    } else messageAlert({ title: 'Card not valid', text: 'Enter valid card details' });
  }

  onChangeCreditCard = (data) => {
    this.setState({ card: data });
  }

  addPaymentCards = () => {
    const { navigation } = this.props;
    navigation.navigate(
      'Payment',
      {
        checkBookTime: this.checkBookTime,
        backScreen: 'Membership',
      },
    );
  }

  renderMembershipSignUp = () => (
    <View style={styles.signUpWrapper}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.cardInput}>
          <Text style={styles.title}>Membership Sign Up</Text>
          <CardInput
            onChangeCreditCard={cardData => this.onChangeCreditCard(cardData)}
          />
          <Text style={styles.topText}>Simply fill out to receive personalized member code.</Text>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.buttonScan}
          onPress={this.onBecomeMember}
        >
          <Text style={styles.buttonScanText}>Become a Member</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  renderMember = (defaultCard) => {
    const { profile } = this.props;
    return (
      <View style={styles.memberWrapper}>
        <ScrollView style={styles.memberContainer}>
          <View style={[styles.row, styles.topRow]}>
            <AutoHeightImage source={Card} width={280} />
            <View style={styles.cardBlock}>
              <View style={styles.topCard}>
                <View />
                <View style={styles.topCardRight}>
                  <TouchableOpacity
                    onPress={() => this.addPaymentCards()}
                    style={styles.buttonWithText}
                  >
                    <AutoHeightImage source={Pen} style={styles.cardIcons} width={12} />
                    <Text style={styles.cardIconText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <View>
                  <Text style={styles.cardText}>{`**** **** **** ${defaultCard.last4}`}</Text>
                  <Text style={styles.cardText}>{`VALID THRU ${defaultCard.exp_month}/${defaultCard.exp_year}`}</Text>
                  <Text style={[styles.cardText, { marginTop: 18 }]}>
                    {defaultCard.name.toUpperCase()}
                  </Text>
                </View>
                <AutoHeightImage source={getCardLogo(defaultCard)} width={40} />
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.centerRow}>
              <View style={styles.col}>
                <Text style={styles.valueTitle}>Name</Text>
                <Text style={styles.valueText}>{profile.username}</Text>
              </View>
              <View style={styles.colRight}>
                <ImageLoading source={{ uri: profile.image }} style={styles.image} />
              </View>
            </View>
            <View style={styles.centerRow}>
              <View style={styles.col}>
                {/* <Text style={styles.valueTitle}>Member No.</Text>
                <Text style={styles.valueText}>12345678</Text> */}
              </View>
              {isMember(profile) && (
                <View style={styles.colRight}>
                  <Text style={styles.valueTitle}>Tier</Text>
                  <Text style={styles.valueText}>{profile.membership.memberType}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={[styles.row, styles.bottomRow]}>
            <AutoHeightImage source={QrCode} width={width / 1.5} />
            <Text style={styles.carrdId}>{profile.membership.memberNumber}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    const {
      member,
      profile,
      isLoading,
      membershipUpdate,
      isLoadingDetails,
      isLoadingPayment,
      navigation,
      navigation: { state: { params } },
    } = this.props;

    const defaultCard = member ? getDefaultCard(member) : null;
    const activityStart = isLoading || membershipUpdate || isLoadingDetails || isLoadingPayment;
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Membership"
        goBackScreen={params && params.backScreen ? params.backScreen : 'Profile'}
      >
        {(!isRegisteredMember(profile) || !defaultCard)
          ? this.renderMembershipSignUp()
          : this.renderMember(defaultCard)
        }
        <CustomActivityIndicator text="" isLoading={activityStart} showNoData={false} />
      </MainWrapper>
    );
  }
}

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
  paymentReducer: { isLoadingPayment },
}) => ({
  profile,
  isLoading,
  membershipUpdate,
  isLoadingDetails,
  member,
  isLoadingPayment,
});

Membership.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  membershipUpdate: PropTypes.bool.isRequired,
  isLoadingDetails: PropTypes.bool.isRequired,
  isLoadingPayment: PropTypes.bool.isRequired,
  member: PropTypes.shape({}),
};

Membership.defaultProps = {
  member: null,
};


export default connect(mapStateToProps)(Membership);
