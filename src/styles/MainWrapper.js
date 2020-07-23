import { StyleSheet } from 'react-native';
import { COLOR_BLUE, COLOR_GREY, COLOR_WHITE, COLOR_GREY_65, COLOR_BLACK } from './common';
import { AbrilFatface, HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: COLOR_WHITE,
  },
  container: {
    width: '100%',
    flex: 1,
    display: 'flex',
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  HeaderItem: {
    width: 80,
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
    paddingLeft: 0,
    paddingRight: 15,
  },
  topLogin: {
    width: '100%',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
    paddingLeft: 5,
    paddingRight: 15,
  },
  locationButton: {
    width: 27,
    height: 27,
  },
  locationButtonLogin: {
    width: 27,
    height: 27,
    position: 'absolute',
    right: -25,
  },
  closeButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  backWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backWrapperContainer: {
    width: 75,
    justifyContent: 'flex-start',
    marginRight: -18,
  },
  backImage: {
    width: 25,
    height: 25,
  },
  backText: {
    fontFamily: HelveticaLight,
    fontWeight: '400',
    color: COLOR_BLACK,
  },
  closeButtonText: {
    fontFamily: HelveticaLight,
    fontWeight: '400',
  },
  topTextNameLeft: {
    color: COLOR_BLUE,
    fontSize: 28,
    fontWeight: '400',
    fontFamily: AbrilFatface,
  },
  topTextNameRight: {
    color: 'black',
    fontSize: 28,
    fontWeight: '400',
    fontFamily: AbrilFatface,
  },
  pageTitleTop: {
    color: COLOR_GREY_65,
    fontFamily: HelveticaLight,
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center',
  },
});
