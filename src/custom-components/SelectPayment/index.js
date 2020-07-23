import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import { setMembershipAttempt } from '../../actions/userDetails';
import { getCardLogo } from '../../helpers/payments';
import * as FONTS from '../../constants/fontConstants';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#0c8cd0',
    opacity: 0.9,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '60%',
    width: '80%',
    alignSelf: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: FONTS.HelveticaLight,
    textAlign: 'center',
    paddingBottom: 10,
  },
  cardWrapper: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 5,
  },
  cardNumber: {
    fontFamily: FONTS.OCRARegular,
    fontSize: 14,
    color: '#000',
    paddingHorizontal: 5,
  },
  image: {
    paddingHorizontal: 5,
  },
});

class SelectPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  payForPlan = (card) => {
    const { dispatch, selectedPlan: plan, toggleModal } = this.props;
    toggleModal();
    dispatch(setMembershipAttempt({ plan, card }));
  }

  renderSinglecard = card => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => this.payForPlan(card.item)}
    >
      <AutoHeightImage
        source={getCardLogo(card.item.brand)}
        width={40}
        style={styles.image}
      />
      <Text style={styles.cardNumber}>
        {`**** **** **** ${card.item.last4}`}
      </Text>
    </TouchableOpacity>
  )

  render() {
    const { isModalVisible, member, toggleModal } = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => toggleModal()}
        onBackButtonPress={() => toggleModal()}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>Please select card for pay</Text>
          <FlatList
            style={styles.flatListContainer}
            data={member && member.sources.data ? member.sources.data : []}
            renderItem={elem => this.renderSinglecard(elem)}
            keyExtractor={(elem, index) => index.toString()}
          />
        </View>
      </Modal>
    );
  }
}

SelectPayment.propTypes = {
  dispatch: PropTypes.func.isRequired,
  member: PropTypes.shape({}),
  selectedPlan: PropTypes.shape({}),
  isModalVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

SelectPayment.defaultProps = {
  member: null,
  selectedPlan: null,
};

const mapStateToProps = ({
  userDetails: { isLoading, member },
}) => ({
  isLoading,
  member,
});

export default connect(mapStateToProps)(SelectPayment);
