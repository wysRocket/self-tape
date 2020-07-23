/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { CardIOModule } from 'react-native-awesome-card-io';
import AutoHeightImage from 'react-native-auto-height-image';
import { isEqual } from 'lodash';
import Card from '../../images/icons/Card.png';
import CardBack from '../../images/icons/CardBack.png';
import Camera from '../../images/icons/cameraViolet.png';

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

const BASE_SIZE = { width: 300 };

const styles = StyleSheet.create({
  scanCameraContainer: {
    position: 'absolute',
    zIndex: 200,
    padding: 5,
    left: 5,
    top: 0,
  },
  scanImage: {
    tintColor: '#fff',
  },
});

class CardInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: cardObj,
    };
    this.cardInput = null;
  }

  shouldComponentUpdate = (nextProps) => {
    if (nextProps.card === null && !isEqual(nextProps.card, this.props.card)) {
      if (this.cardInput) {
        this.setState({ card: cardObj }, () => {
          this.cardInput._onClear();
        });
      }
      return true;
    }
    return false;
  }

  onChangeCreditCard = (data) => {
    let spitExpire = ['', ''];
    if (data.values.expiry.length === 5) {
      spitExpire = data.values.expiry.split('/');
    }
    const { card } = this.state;
    const prepareCard = {
      ...card,
      cardNumber: data.values.number,
      cardType: data.values.type,
      cardholderName: data.values.name,
      cvv: data.values.cvc,
      expiryMonth: spitExpire[0],
      expiryYear: spitExpire[1],
      typed: data.status.number === 'valid',
      valid: data.valid,
    };
    this.setCard(prepareCard);
  }

  setCard = (card) => {
    const { onChangeCreditCard } = this.props;
    this.setState({ card }, () => {
      onChangeCreditCard(this.state.card);
    });
  }

  scanCard = () => {
    const { card: cardTyped } = this.state;
    if (!cardTyped.typed) {
      CardIOModule.scanCard({ requireCardholderName: true }).then((card) => {
        const prepareCard = {
          ...card,
          ...{ valid: true },
        };
        this.cardInput._change('number', card.cardNumber.replace(/(.{4})/g, '$1 '));
        this.cardInput.state.values.expiry = `${card.expiryMonth.toString()}/${card.expiryYear.toString().slice(-2)}`;
        this.cardInput.state.values.name = card.cardholderName;
        this.cardInput.state.values.cvc = card.cvv;
        this.setCard(prepareCard);
      }).catch(() => {});
    }
  }

  render() {
    const { card } = this.state;
    return (
      <View style={[BASE_SIZE, { alignSelf: 'center' }]}>
        <CreditCardInput
          ref={(ref) => { this.cardInput = ref; }}
          requiresName
          allowScroll
          onChange={this.onChangeCreditCard}
          cardImageFront={Card}
          cardImageBack={CardBack}
        />
        {!card.typed &&
          <TouchableOpacity
            style={styles.scanCameraContainer}
            onPress={this.scanCard}
          >
            <AutoHeightImage source={Camera} style={styles.scanImage} width={30} />
          </TouchableOpacity>
        }
      </View>
    );
  }
}

CardInput.propTypes = {
  onChangeCreditCard: PropTypes.func,
  card: PropTypes.shape({}),
};

CardInput.defaultProps = {
  onChangeCreditCard: () => {},
  card: null,
};

export default CardInput;
