import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { BaskervilleItalic, HelveticaLight } from '../../constants/fontConstants';
import COLORS from '../../constants/colorsConstants';
import CustomTouchableOpacity from '../../custom-components/CustomTouchableOpacity';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MultilineInput: {
    borderColor: COLORS.MAIN_BLACK,
    borderWidth: 1,
    width: width - 100,
    height: 100,
    padding: 4,
    fontSize: 17,
    color: '#ababaa',
    fontFamily: BaskervilleItalic,
  },
  ButtonContainer: {
    backgroundColor: COLORS.MAIN_BLUE,
    marginTop: 8,
    padding: 8,
    paddingHorizontal: 50,
  },
  ButtonText: {
    fontFamily: HelveticaLight,
    fontSize: 18,
    color: COLORS.MAIN_WHITE,
  },
});

const ReviewPerson = ({ handleChangeReview, review, sendData }) => (
  <View style={styles.Container}>
    <TextInput
      style={styles.MultilineInput}
      multiline
      onChangeText={handleChangeReview}
      value={review}
      underlineColorAndroid="transparent"
      numberOfLines={20}
      placeholder=""
    />
    <CustomTouchableOpacity
      styles={styles.ButtonContainer}
      onPressFunction={sendData}
    >
      <Text style={styles.ButtonText}>Send</Text>
    </CustomTouchableOpacity>
  </View>
);

ReviewPerson.propTypes = {
  handleChangeReview: PropTypes.func.isRequired,
  review: PropTypes.string,
  sendData: PropTypes.func.isRequired,
};

ReviewPerson.defaultProps = {
  review: '',
};

export default ReviewPerson;
