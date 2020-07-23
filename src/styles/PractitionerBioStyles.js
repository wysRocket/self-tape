import { StyleSheet } from 'react-native';
import { COLOR_WHITE, COLOR_GREY, COLOR_GREY_65, COLOR_GREY_F5F5F7 } from './common';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  scrollContainerAligment: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    margin: 10,
    borderColor: COLOR_GREY,
    borderWidth: 2,
  },
  containerPadding: {
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
  },
  bioImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    borderColor: COLOR_GREY,
    borderWidth: 2,
    marginTop: 20,
  },
  bioName: {
    fontWeight: '600',
    color: 'black',
    marginTop: 20,
    fontFamily: HelveticaLight,
  },
  bioRating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  bioRatingNumber: {
    fontWeight: '600',
    marginLeft: 3,
    fontFamily: HelveticaLight,
  },
  bioTitle: {
    marginTop: 26,
    fontSize: 18,
    fontFamily: HelveticaLight,
  },
  bioText: {
    marginTop: 25,
    fontFamily: HelveticaLight,
  },
  containerReviewsBottomContainer: {
    width: '98%',
    backgroundColor: COLOR_GREY_F5F5F7,
    margin: 5,
    marginTop: 25,
  },
  containerReviewsBottomTitle: {
    fontSize: 16,
    marginLeft: 3,
    color: COLOR_GREY_65,
    fontFamily: HelveticaLight,
  },
  containerReviewsBottom: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'flex-start',
  },
  containerReviewsBottomLeft: {
    backgroundColor: COLOR_WHITE,
    flexDirection: 'row',
    display: 'flex',
    paddingLeft: 5,
    marginLeft: 3,
    paddingRight: 10,
  },
  containerReviewsBottomRight: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  containerReviewsBottomLeftStarBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },

  containerReviewsBottomLeftStarBlockCount: {
    fontSize: 38,
    marginBottom: 3,
    fontFamily: HelveticaLight,
  },
  containerReviewsBottomLeftStarBlockTotal: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
    marginLeft: 7,
  },
  containerReviewsBottomLeftStarBlockUserIocn: {
    width: 9,
    height: 8,
    marginRight: 3,
  },
  containerReviewsBottomLeftStarBlockTotalCount: {
    fontSize: 9,
    fontFamily: HelveticaLight,
  },
});
