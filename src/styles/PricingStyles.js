import { StyleSheet, Platform } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';
import { COLOR_BLUE_7799BD, COLOR_GREY_DEDEDE, COLOR_WHITE, COLOR_BLACK } from './common';


export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: COLOR_BLUE_7799BD,
    borderWidth: 2,
  },
  containerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 22,
    fontFamily: HelveticaLight,
    fontWeight: '600',
    color: '#000',
  },
  horizontalLine: {
    backgroundColor: COLOR_GREY_DEDEDE,
    width: 200,
    marginTop: 6,
    marginBottom: 3,
    height: 2,
  },
  membership: {
    fontSize: 16,
    fontFamily: HelveticaLight,
    fontWeight: '400',
    color: '#656565',
  },
  middleContainer: {
    marginVertical: 15,
    width: '80%',
    marginHorizontal: 35,
  },
  containerSingleText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    marginRight: 15,
    marginVertical: 7,
  },
  singleText: {
    fontFamily: HelveticaLight,
    color: COLOR_BLACK,
    fontWeight: '600',
    fontSize: 15,
  },
  planContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  costWrapper: {
    paddingVertical: 20,
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  currency: {
    fontSize: 38,
    fontWeight: '200',
  },
  cost: {
    fontSize: 46,
    fontWeight: '400',
  },
  dot: {
    fontSize: 29,
    fontWeight: '200',
  },
  subCost: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '200',
  },
  slesh: {
    fontSize: 26,
    marginTop: 8,
    fontWeight: '400',
    marginLeft: 2,
  },
  period: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '200',
  },
  textStyle: {
    color: '#000',
    fontFamily: HelveticaLight,
  },
  costSubTitle: {
    fontSize: 14,
    fontFamily: HelveticaLight,
    fontWeight: '400',
    color: '#656565',
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? -6 : -14,
  },
  topTitleContainer: {
    paddingVertical: 2,
    paddingHorizontal: 25,
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  topTitle: {
    color: COLOR_WHITE,
    fontFamily: HelveticaLight,
    fontSize: 26,
    fontWeight: '600',
  },
  button: {
    width: '80%',
    backgroundColor: '#d2ac12',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: COLOR_WHITE,
    fontFamily: HelveticaLight,
    fontSize: 15,
    fontWeight: '600',
  },
  verticalLine: {
    height: '100%',
    backgroundColor: COLOR_GREY_DEDEDE,
    width: 2,
  },
});
