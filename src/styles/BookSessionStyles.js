import { StyleSheet, Dimensions, Platform } from 'react-native';
import {
  COLOR_WHITE, COLOR_GREY, COLOR_GREY_65, COLOR_BLUE,
} from './common';
import { HelveticaLight } from '../constants/fontConstants';

const { width } = Dimensions.get('window').width;

export const agendaStyle = {
  height: 1,
  backgroundColor: 'white',
  selectedDayBackgroundColor: 'black',
  dotColor: '#00cfbe',
  agendaKnobColor: '#e8edf0',
  'stylesheet.day.basic': {
    text: {
      marginTop: Platform.OS === 'android' ? 2 : 4,
      fontSize: 18,
      color: '#a3a1a4',
    },
  },
};

export default StyleSheet.create({
  container: {
    width: '98%',
    flex: 1,
    margin: 5,
    paddingBottom: 0,
    borderColor: COLOR_GREY,
    borderWidth: 2,
  },
  containerTop: {
    backgroundColor: COLOR_WHITE,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  containerTopLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  containerTopLeftTitle: {
    color: COLOR_GREY_65,
    fontSize: 14,
    fontFamily: HelveticaLight,
  },
  containerTopLeftName: {
    fontWeight: '900',
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    fontFamily: HelveticaLight,
  },
  containerTopLeftAvatar: {
    left: -22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },
  containerTopLeftRating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  containerTopLeftRatingCount: {
    fontSize: 12,
    fontFamily: HelveticaLight,
  },
  containerTopLeftRatingStar: {
    width: 10,
    height: 8,
    marginRight: 2,
  },
  containerTopRight: {
    flex: 1,
  },
  containerLeftAvatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  containerLeftAvatarWrapper: {
    borderRadius: 80 / 2,
    borderColor: COLOR_GREY,
    backgroundColor: COLOR_GREY,
    borderWidth: 2,
  },
  containerRightUserImg: {
    width: '100%',
    height: '100%',
  },
  containerMap: {
    marginTop: 1,
    height: 70,
  },
  calendar: {
    borderColor: COLOR_GREY,
    borderTopWidth: 1,
    marginTop: 5,
    height: 110,
  },
  timeAndBook: {
    borderColor: COLOR_GREY,
    borderTopWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
  },
  bookButton: {
    height: 50,
    alignItems: 'center',
    backgroundColor: COLOR_BLUE,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  bookButtonLeftSide: {
    justifyContent: 'space-between',
    flex: 1,
  },
  bookButtonCost: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  bookButtonFees: {
    color: '#fff',
    fontSize: 11,
    lineHeight: 11,
  },
  payContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  payButton: {
    backgroundColor: '#fff',
    height: 30,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePaymentContainer: {
    backgroundColor: '#fff',
    height: 30,
    padding: 0,
    paddingHorizontal: 5,
    margin: 0,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePaymentText: {
    padding: 0,
    margin: 0,
    marginLeft: 5,
    marginRight: 0,
    fontWeight: '200',
    color: '#000',
    fontSize: 7,
    width: 60,
    flexWrap: 'wrap',
  },
  payText: {
    fontSize: 16,
    paddingHorizontal: 4,
    color: '#000',
    lineHeight: 18,
  },
  bookButtonText: {
    color: COLOR_WHITE,
    fontWeight: '600',
    fontSize: 30,
    fontFamily: HelveticaLight,
  },
  previewImage: {
    width,
  },
  startTimePopup: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  minutesTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  minutesButton: {
    width: 100,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: COLOR_BLUE,
  },
  minutesItemText: {
    color: COLOR_BLUE,
    fontSize: 16,
  },
});
