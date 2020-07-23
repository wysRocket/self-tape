import { Platform, StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-navigation';
import {
  COLOR_GREY_F0F0F0,
  COLOR_WHITE,
  COLOR_GREY,
  COLOR_YELLOW_F9F8F4,
  COLOR_GREY_A2A19C,
  COLOR_BLUE_52BCB7,
  COLOR_GREY_AEAEAE,
  COLOR_GREY_5E5E60,
  COLOR_BLUE_2B71BD,
} from './common';
import COLORS from '../constants/colorsConstants';
import { HelveticaLight } from '../constants/fontConstants';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: COLOR_GREY_F0F0F0,
  },
  top: {
    paddingTop: 20,
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  topWhite: {
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
    backgroundColor: '#fff',
  },
  headerImage: {
    transform: [{ rotate: '180deg' }],
  },
  pageTitle: {
    fontWeight: '600',
    color: '#000',
    fontSize: 15,
  },
  headerBlock: {
    width: 40,
    paddingVertical: 5,
  },
  headerSave: {
    fontFamily: HelveticaLight,
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.MAIN_BLUE,
  },
  containerTop: {
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
    borderTopWidth: 2,
    marginTop: 20,
    marginBottom: 20,
  },
  containerItemTouchable: {
    backgroundColor: COLOR_WHITE,
    alignSelf: 'stretch',
  },
  containerItem: {
    alignSelf: 'stretch',
    backgroundColor: COLOR_WHITE,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
  },
  containerItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  containerItemLeftAlert: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerItemLeftTitle: {
    marginLeft: 8,
    width: '80%',
  },
  containerItemImage: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  switcherElement: {
    marginTop: Platform.OS === 'ios' ? -15 : -30,
  },
  containerItemIcon: {
    width: 22,
    height: 18,
    marginLeft: 4,
    marginRight: 4,
  },
  containerItemIconAlert: {
    width: 22,
    height: 18,
    marginLeft: 4,
    marginRight: 4,
    marginTop: Platform.OS === 'ios' ? 0 : 5,
  },
  containerItemIconProfile: {
    width: 18,
    height: 16,
    marginLeft: 5,
    marginRight: 5,
  },
  containerItemMoreHeight: {
    width: 22,
    height: 21,
    marginLeft: 4,
    marginRight: 4,
  },
  containerItemLeftTitleTop: {
    fontFamily: HelveticaLight,
    fontSize: 16,
    fontWeight: '400',
  },
  containerItemLeftTitlePhone: {
    fontFamily: HelveticaLight,
    fontSize: 17,
    fontWeight: '400',
    color: '#cdcbd1',
  },
  containerItemLeftSingleTitle: {
    fontFamily: HelveticaLight,
    fontSize: 16,
    fontWeight: '400',
  },
  containerItemLeftTitleBottom: {
    fontFamily: HelveticaLight,
    fontSize: 12,
    color: '#cdcbd1',
  },
  containerItemLeftTitleBottomAlert: {
    fontFamily: HelveticaLight,
    fontSize: 12,
    color: '#cdcbd1',
    width: 200,
  },

  notActiveText: {
    fontSize: 15,
    color: COLOR_GREY_AEAEAE,
  },

  // Studio photo
  containerStudioPhotos: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingTop: 10,
  },
  studioPhotoWrapper: {
    width: '47%',
    height: 120,
    flexWrap: 'wrap',
    borderColor: COLOR_GREY,
    borderWidth: 1,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studioImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // AvailableHours
  availableHoursContainer: {
    flex: 1,
    borderColor: COLOR_GREY,
    borderTopWidth: 1,
  },
  openingHoursItemWrapper: {
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
    width: '100%',
  },
  openingHoursTitle: {
    backgroundColor: COLOR_YELLOW_F9F8F4,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: COLOR_GREY_A2A19C,
    fontSize: 14,
  },
  weekWraper: {
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    paddingVertical: 7,
  },
  col: {
    flex: 1,
  },
  colLeft: {
    flex: 2.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colRight: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colCenter: {
    flex: 3,
  },
  closeImage: {
    width: 25,
    height: 25,
    tintColor: COLOR_GREY_5E5E60,
  },
  plusImage: {
    width: 25,
    height: 25,
    tintColor: COLOR_BLUE_52BCB7,
  },
  checkedIcon: {
    width: 18,
    height: 18,
  },
  checkWrapper: {
    marginRight: 10,
    width: 22,
    height: 22,
    marginVertical: 1.5,
    borderColor: COLOR_GREY,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: '#000',
  },
  timePickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: Platform.OS === 'ios' ? 60 : 0,
  },
  rowPicker: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  titlePicker: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
    textDecorationLine: 'underline',
  },
  pickerNotWorking: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  addHeaderOffset: {
    height: height - Header.HEIGHT - 100,
  },

  // Price styles
  priceDuration: {
    paddingHorizontal: 25,
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
  },
  priceDurationText: {
    color: '#000',
    fontSize: 13,
  },
  priceWrapper: {
    paddingHorizontal: 20,
  },

  // Payment settings
  containerPaymentSettings: {
    borderTopWidth: 1,
    borderColor: COLOR_GREY,
    paddingTop: 20,
  },

  pickerButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor: COLORS.COLOR_BLUE_52BCB7,
  },
  absoluteButtonWrapper: {
    flexDirection: 'row',
    marginTop: 15,
  },
});
