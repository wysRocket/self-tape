import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import CustomTouchableOpacity from '../../custom-components/CustomTouchableOpacity';
import COLORS from '../../constants/colorsConstants';
import { HelveticaLight } from '../../constants/fontConstants';


const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    backgroundColor: COLORS.MAIN_BLUE,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
  },
  AnswerText: {
    fontSize: 17,
    color: COLORS.MAIN_BLACK,
    fontFamily: HelveticaLight,
    fontWeight: '800',
  },
});

const AnswerQuestion = ({ onAnswer, question }) => (
  <View style={styles.Container}>
    <CustomTouchableOpacity
      onPressFunction={() => onAnswer({ answer: true, question })}
      styles={styles.ButtonContainer}
    >
      <Text style={[styles.AnswerText, { color: COLORS.MAIN_WHITE }]}>YES</Text>
    </CustomTouchableOpacity>
    <CustomTouchableOpacity
      onPressFunction={() => onAnswer({ answer: false, question })}
      styles={styles.ButtonContainer}
    >
      <Text style={styles.AnswerText}>NO</Text>
    </CustomTouchableOpacity>
  </View>
);

AnswerQuestion.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({}).isRequired,
};

AnswerQuestion.defaultProps = {};

export default AnswerQuestion;
