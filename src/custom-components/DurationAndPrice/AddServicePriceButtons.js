import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import COLORS from '../../constants/colorsConstants';
import {
  COLOR_GREY,
} from '../../styles/common';
import Plus from '../../images/icons/plus.png';

const styles = StyleSheet.create({
  // New Price
  newPriceContainer: {
    borderTopWidth: 1,
    borderColor: COLOR_GREY,
    flex: 1,
    marginBottom: 40,
  },
  addPriceButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLOR_GREY,
    paddingHorizontal: 20,
    paddingRight: 10,
    paddingVertical: 15,
    height: 40,
  },
  addBack: {
    width: 27,
    height: 27,
    borderRadius: 27 / 2,
    backgroundColor: COLORS.COLOR_BLUE_2B71BD,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 70 - 20,
  },
  imageAdd: {
    width: 22,
    height: 22,
    tintColor: '#fff',
  },
  addText: {
    fontSize: 14,
    lineHeight: 17,
    height: 17,
    color: COLORS.COLOR_GREY_5E5E60,
    fontWeight: '600',
  },
});

const AddServicePriceButtons = ({
  toggleAddPrice,
  toggleAddService,
}) => (
  <View style={styles.newPriceContainer}>
    <TouchableOpacity
      style={styles.addPriceButton}
      onPress={toggleAddPrice}
    >
      <View style={styles.addBack}>
        <Image source={Plus} style={styles.imageAdd} />
      </View>
      <Text style={styles.addText}>ADD DURATION/PRICE OPTIONS</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.addPriceButton}
      onPress={toggleAddService}
    >
      <View style={styles.addBack}>
        <Image source={Plus} style={styles.imageAdd} />
      </View>
      <Text style={styles.addText}>ADD OTHER SERVICE</Text>
    </TouchableOpacity>
  </View>
);

AddServicePriceButtons.propTypes = {
  toggleAddPrice: PropTypes.func.isRequired,
  toggleAddService: PropTypes.func.isRequired,
};

AddServicePriceButtons.defaultProps = {
};

export default AddServicePriceButtons;
