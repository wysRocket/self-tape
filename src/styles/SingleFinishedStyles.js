import { StyleSheet } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';
import COLORS from '../constants/colorsConstants';

export default StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    paddingRight: 15,
    paddingLeft: 10,
    paddingBottom: 0,
    borderColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  containerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerLeftTime: {
    alignItems: 'center',
    paddingRight: 7,
    borderColor: '#eeeeee',
    borderRightWidth: 1,
  },
  containerRightInfo: {
    paddingLeft: 10,
    paddingTop: 6,
    paddingBottom: 4,

  },
  containerLeftDay: {
    fontFamily: HelveticaLight,
    fontSize: 22,
    fontWeight: '400',
  },
  containerLeftText: {
    fontFamily: HelveticaLight,
    fontSize: 13,
  },
  containerRightInfoStatus: {
    fontFamily: HelveticaLight,
    fontSize: 11,
    color: '#3d89ce',
    fontWeight: '500',
    marginBottom: 5,
  },
  containerRightInfoText: {
    fontFamily: HelveticaLight,
    fontSize: 14,
    color: '#14052a',
    fontWeight: '200',
    marginBottom: 3,
  },
  bookButton: {
    backgroundColor: '#000000',
    padding: 6,
  },
  bookButtonText: {
    fontFamily: HelveticaLight,
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
  },
  containerRightInfoViewed: {
    fontFamily: HelveticaLight,
    fontSize: 11,
    color: COLORS.MAIN_WHITE,
    fontWeight: '500',
    marginBottom: 5,
    backgroundColor: COLORS.MAIN_BLUE,
    padding: 2,
    marginLeft: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
