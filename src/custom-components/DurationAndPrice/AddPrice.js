import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import NumericInput from './NumericInput';
import COLORS from '../../constants/colorsConstants';
import {
  COLOR_GREY,
} from '../../styles/common';
import { locale } from '../../constants/textConstants';

const styles = StyleSheet.create({
  addNewPriceContainer: {
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderColor: COLOR_GREY,
    borderTopWidth: 0.5,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: COLORS.COLOR_BLUE_2B71BD,
    padding: 5,
    color: COLORS.COLOR_GREY_5E5E60,
  },
  absoluteButtonWrapper: {
    flexDirection: 'row',
    marginTop: 15,
  },
  pickerButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor: COLORS.COLOR_BLUE_52BCB7,
  },
  descriptionInput: {
    borderColor: COLORS.MAIN_BLACK,
    borderWidth: 1,
    padding: 5,
    color: COLORS.COLOR_GREY_5E5E60,
    marginTop: 20,
    height: 70,
  },
});

const AddPrice = ({
  addPrice, addService, duration, maxPrice,
  title, description, onChangeValue, toggleAddPrice,
  saveNewPrice, toggleAddService,
}) => (
  <View style={styles.addNewPriceContainer}>
    <View style={styles.inputContainer}>
      {addService && (
        <TextInput
          onChangeText={value => onChangeValue('title', value)}
          underlineColorAndroid="transparent"
          style={styles.inputStyle}
          keyboardType="default"
          placeholder="Title"
          value={title}
        />
      )}
      {addPrice && (
        <NumericInput
          stateName="duration"
          name="Option duration"
          initValue={duration}
          onChangeValue={onChangeValue}
        />
      )}
      <NumericInput
        stateName="maxPrice"
        name="Max price value"
        initValue={maxPrice}
        onChangeValue={onChangeValue}
      />
      {addService && (
        <TextInput
          onChangeText={value => onChangeValue('description', value)}
          underlineColorAndroid="transparent"
          style={styles.descriptionInput}
          keyboardType="default"
          placeholder={locale.serviceDescription}
          numberOfLines={6}
          multiline
          value={description}
        />
      )}
    </View>
    <View style={styles.absoluteButtonWrapper}>
      <TouchableOpacity
        onPress={addPrice ? toggleAddPrice : toggleAddService}
        style={styles.pickerButton}
      >
        <Text>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={saveNewPrice}
        style={styles.pickerButton}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  </View>
);

AddPrice.propTypes = {
  duration: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  toggleAddPrice: PropTypes.func.isRequired,
  saveNewPrice: PropTypes.func.isRequired,
  addPrice: PropTypes.bool.isRequired,
  addService: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  toggleAddService: PropTypes.func.isRequired,
};

AddPrice.defaultProps = {
  title: '',
  description: '',
};

export default AddPrice;
