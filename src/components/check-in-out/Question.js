import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import ImageLoading from '../../custom-components/ImageLoading';
import { HelveticaLight } from '../../constants/fontConstants';
import COLORS from '../../constants/colorsConstants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  Container: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  AvatarStyles: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },

  QuestionText: {
    fontFamily: HelveticaLight,
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 15,
    color: COLORS.MAIN_BLACK,
  },
});

const Head = ({ person, question }) => (
  <View style={styles.Container}>
    <ImageLoading
      style={styles.AvatarStyles}
      source={{ uri: person.image }}
    />
    <Text style={styles.QuestionText}>{question}</Text>
  </View>
);

const Question = ({
  person,
  question,
  children,
}) => (
  <View style={styles.Container}>
    <Head person={person} question={question} />
    {children}
  </View>
);

Question.propTypes = {
  person: PropTypes.shape({}),
  session: PropTypes.shape({}),
  question: PropTypes.string,
  children: PropTypes.shape({}),
};

Question.defaultProps = {
  person: null,
  session: null,
  question: '',
  children: null,
};

Head.propTypes = {
  person: PropTypes.shape({}),
  question: PropTypes.string,
};

Head.defaultProps = {
  person: null,
  question: '',
};

export default Question;
