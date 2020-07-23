import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, Dimensions, UIManager, LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { messageAlert } from '../../../helpers/sessions';
import { getDefaultCard } from '../../../helpers/membership';
import CardInput from '../../../custom-components/Input/CardInput';
import CustomActivityIndicator from '../../../custom-components/CustomActivityIndicator';
import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import { PRODUCTION } from '../../../constants/apiConstants';
import MainWrapper from '../../../share/MainWrapper';
import styles from '../../../styles/PaymentStyles';
import SwipableCard from './SwipableCard';
import * as ACTIONS from '../../../actions/userDetails';

import { createSessionsAttempt } from '../../../actions/sessions';
import { setAuditionDetails } from '../../../actions/book';

const { width } = Dimensions.get('window');

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      paddingRight: width,
      closedIndices: [],
      scroll: true,
      card: null,
    };
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.shouldRender = this.shouldRender.bind(this);
    this.componentWillMount = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.member &&
      (!isEqual(prevState.cards, nextProps.member.sources.data) || prevState.cards.length === 0)) {
      const { member: { sources: { data: cards } } } = nextProps;
      return {
        ...prevState,
        cards,
        closedIndices: [],
      };
    }
    return prevState;
  }

  onSaveCards = () => {
    const {
      selectedTime: { selectedPrice },
      navigation: {
        navigate,
        state: {
          params: {
            backScreen,
          },
        },
      },
    } = this.props;
    if (selectedPrice.type && selectedPrice.type === 'service') {
      this.creteBookSession();
    } else if (backScreen === 'Book') {
      navigate('TodaysAudition', { backScreen });
    } else navigate('Membership');
  }

  creteBookSession = () => {
    const { navigation: { dispatch } } = this.props;
    dispatch(setAuditionDetails({
      projectName: '',
      characterName: '',
      scenes: '',
      agent: '',
      manager: '',
      website: '',
      email: '',
    }));
    dispatch(createSessionsAttempt());
  }

  onRemove = (index) => {
    const { navigation: { dispatch } } = this.props;
    this.setState({ closedIndices: [...this.state.closedIndices, index] });
    dispatch(ACTIONS.deleteCardAttempt(this.state.cards[index]));
  }

  onChangeCreditCard = (card) => {
    this.setState({ card });
  }

  setActiveCard = (card) => {
    const { navigation: { dispatch } } = this.props;
    dispatch(ACTIONS.changeDefaultCardAttempt(card));
  }

  setScrollState = (scroll) => {
    this.setState({ scroll });
  }

  removeByIndexes = () => {
    const { cards, closedIndices } = this.state;
    const removedArray = cards;
    for (let i = closedIndices.length - 1; i >= 0; i -= 1) {
      removedArray.splice(closedIndices[i], 1);
    }
    return removedArray;
  }

  saveCard = () => {
    const { navigation: { dispatch }, member } = this.props;
    const { card } = this.state;
    const cardObject = { ...card };
    if (!PRODUCTION) cardObject.cardNumber = '4242424242424242';
    if (card.valid) {
      if (member) dispatch(ACTIONS.addCardAttempt(cardObject));
      else {
        dispatch(ACTIONS.becomeMemberAttempt({ card: cardObject, isMember: false }));
      }
      this.setState({ card: null });
    } else messageAlert({ title: 'Card not valid', text: 'Enter valid card details' });
  }

  shouldRender(index) {
    return this.state.closedIndices.indexOf(index) === -1;
  }

  isEnteringCard = () => {
    const { card } = this.state;
    return card && (card.cardNumber.length > 0 ||
      card.cardholderName.length > 0 ||
      card.cvv.length > 0 ||
      card.expiryMonth.length > 0 ||
      card.expiryYear.length > 0);
  }

  returnButtonText = () => {
    const {
      navigation: {
        state: {
          params: {
            backScreen,
          },
        },
      },
    } = this.props;
    let title = 'Save';
    if (backScreen === 'Book') title = 'Select';
    if (this.isEnteringCard()) title = 'Submit';
    return title;
  }

  renderCards = (cards, selected) => [
    <CardInput
      key="CardInput"
      onChangeCreditCard={cardData => this.onChangeCreditCard(cardData)}
      card={this.state.card}
    />,
    cards.map((card, index) => (
      this.shouldRender(index) &&
      <SwipableCard
        key={`${index + 1}`}
        card={card}
        index={index}
        selected={selected}
        onSaveCards={this.onSaveCards}
        setScrollState={this.setScrollState}
        setActiveCard={this.setActiveCard}
        scanCard={this.saveCard}
        onDismiss={() => {
          if ([...new Array(cards.length)].slice(index + 1, cards.length).some(this.shouldRender)) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          }
          this.onRemove(index);
        }}
      />
    )),
  ];

  render() {
    const {
      navigation,
      navigation: {
        state: {
          params: {
            backScreen,
          },
        },
      },
      member,
      isLoading,
    } = this.props;
    const { cards, scroll } = this.state;
    const defaultCard = getDefaultCard(member);
    const disabled = cards.length === 0 && !this.isEnteringCard();
    return (
      <MainWrapper
        enableHeader={false}
        navigation={navigation}
        pageName="Cards"
        goBackScreen={backScreen}
      >
        <KeyboardAwareScrollView
          scroll={scroll}
          contentContainerStyle={styles.container}
        >
          {this.renderCards(cards, defaultCard)}
        </KeyboardAwareScrollView>
        <CustomTouchableOpacity
          delayPressIn={20}
          disabled={disabled}
          styles={[styles.bookButton, disabled && { backgroundColor: 'grey' }]}
          onPressFunction={() => {
            if (this.isEnteringCard()) this.saveCard();
            else this.onSaveCards();
          }}
        >
          <Text
            style={styles.bookText}
          >
            {this.returnButtonText()}
          </Text>
        </CustomTouchableOpacity>
        <CustomActivityIndicator text="" isLoading={isLoading} showNoData={false} />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({
  userDetails: {
    member,
    isLoading,
  },
  bookReducer: {
    selectedTime,
  },
}) => ({
  member,
  isLoading,
  selectedTime,
});


Payment.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  member: PropTypes.shape({}),
  isLoading: PropTypes.bool.isRequired,
  selectedTime: PropTypes.shape({}),
};

Payment.defaultProps = {
  member: null,
  selectedTime: null,
};


export default connect(mapStateToProps)(Payment);
