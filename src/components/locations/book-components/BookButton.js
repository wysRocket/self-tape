import React, { PureComponent } from 'react';
import { CheckBox } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { HelveticaLight } from '../../../constants/fontConstants';
import { locale } from '../../../constants/textConstants';
import styles from '../../../styles/BookSessionStyles';

const iconSize = 18;

class BookButton extends PureComponent {
  render() {
    const {
      totalPrice,
      selectedElementTime,
      handlePay,
      calculation,
      changeDefaultCard,
      onChangeDefaultCard,
      hasStripeAccount,
      disablePay,
    } = this.props;

    const disabledButton = selectedElementTime === null || totalPrice === 0 || disablePay;
    return (
      <View
        style={[styles.bookButton, disabledButton && { opacity: 0.5 }]}
      >
        <View style={[styles.bookButtonLeftSide, !hasStripeAccount && { flex: 2 }]}>
          <Text style={styles.bookButtonCost}>
            {!disablePay ? `$${totalPrice}` : '$0'}
          </Text>
          {totalPrice !== 0 && !disablePay && (
            <Text style={styles.bookButtonFees}>
              {`${locale.taxesAndFees} $${calculation.getTax()}, ${locale.vendorCharge} $${calculation.getVendor()}`}
            </Text>
          )}
        </View>
        <View style={[styles.payContainer, !hasStripeAccount && { justifyContent: 'flex-end' }]}>
          {hasStripeAccount && (
            <CheckBox
              fontFamily={HelveticaLight}
              size={iconSize}
              containerStyle={styles.changePaymentContainer}
              textStyle={styles.changePaymentText}
              title={locale.changePaymentMethod}
              checked={changeDefaultCard}
              onPress={onChangeDefaultCard}
            />
          )}
          <TouchableOpacity
            disabled={disabledButton}
            delayPressIn={20}
            style={styles.payButton}
            onPress={() => handlePay()}
          >
            <Entypo name="credit-card" size={iconSize} />
            <Text style={styles.payText}>{locale.pay}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

BookButton.propTypes = {
  calculation: PropTypes.shape({}).isRequired,
  totalPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  handlePay: PropTypes.func.isRequired,
  selectedElementTime: PropTypes.number,
  changeDefaultCard: PropTypes.bool,
  onChangeDefaultCard: PropTypes.func,
  hasStripeAccount: PropTypes.bool,
  disablePay: PropTypes.bool,
};

BookButton.defaultProps = {
  selectedElementTime: null,
  changeDefaultCard: false,
  onChangeDefaultCard: () => {},
  hasStripeAccount: false,
  disablePay: false,
};

export default BookButton;
