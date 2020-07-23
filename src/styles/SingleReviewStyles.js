import { StyleSheet } from 'react-native';
import { COLOR_GREY_65 } from './common';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  containerImage: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  reviewImage: {
    width: 30,
    height: 30,
  },
  topReview: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: HelveticaLight,
  },
  topReviewName: {
    fontWeight: '600',
    fontSize: 9,
    marginRight: 3,
    fontFamily: HelveticaLight,
  },
  topReviewTextContainer: {
    width: '90%',
  },
  topReviewText: {
    color: COLOR_GREY_65,
    fontSize: 9,
    flex: 1,
    fontFamily: HelveticaLight,
  },
  topReviewTextBold: {
    fontWeight: '600',
    fontSize: 9,
    flex: 1,
    marginTop: 5,
    fontFamily: HelveticaLight,
  },
});
