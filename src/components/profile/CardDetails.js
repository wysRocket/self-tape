import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import AutoHeightImage from 'react-native-auto-height-image';
import CreditCard from '../../images/icons/creditCard.png';
import CloseIcon from '../../images/icons/close.png';
import EmptyStar from '../../images/icons/emptyStar.png';
import QRCode from '../../images/icons/QRCode.png';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/CardDetailsStyles';

class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  navigateToPrevPage = (page) => {
    const { navigation } = this.props;
    navigation.navigate(page);
  }
  render() {
    const {
      navigation: { state: { params: { selectedCard } } },
    } = this.props;
    return (
      <MainWrapper
        navigation={this.props.navigation}
        pageName="Card Details"
        goBackScreen="Membership"
      >
        <ScrollView
          style={styles.container}
        >
          <View style={styles.containerTop}>
            <TouchableOpacity
              delayPressIn={20}
              onPress={() => this.navigateToPrevPage('Membership')}
            >
              <Image style={styles.closeButton} source={CloseIcon} />
            </TouchableOpacity>
            <View style={styles.containerTopRight}>
              <Text style={styles.rating}>{selectedCard.rating}</Text>
              <Image style={styles.emptyStar} source={EmptyStar} />
            </View>
          </View>
          <View style={styles.containerMid}>
            <AutoHeightImage source={CreditCard} width={200} style={styles.creditCard} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoTitle}>SELFTAPE NOW CARD</Text>
              <Dropdown
                data={[{ value: `$${selectedCard.balance}` }]}
                value={`$${selectedCard.balance}`}
                containerStyle={styles.dropdownCard}
                fontSize={15}
              />
              <Text style={styles.cardInfoUpdated}>Updated just now</Text>
            </View>
            <View style={styles.QRCode}>
              <AutoHeightImage source={QRCode} width={130} />
              <Text style={styles.cardNumber}>{selectedCard.number}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              delayPressIn={20}
              style={styles.doneButton}
              onPress={() => this.navigateToPrevPage('Membership')}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </MainWrapper>
    );
  }
}

export default connect()(CardDetails);

CardDetails.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

