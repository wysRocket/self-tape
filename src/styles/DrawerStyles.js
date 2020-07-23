import { StyleSheet } from 'react-native';
import { COLOR_GREY_65 } from './common';
import { HelveticaLight } from '../constants/fontConstants';
import COLORS from '../constants/colorsConstants';

export default StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    display: 'flex',
    paddingTop: 40,
  },
  topDrawer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  topDrawerImage: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  },
  topDrawerName: {
    fontFamily: HelveticaLight,
    fontWeight: '600',
    marginTop: 15,
  },
  topDrawerViewProfile: {
    fontFamily: HelveticaLight,
    color: COLOR_GREY_65,
    marginTop: 2,
    fontSize: 10,
  },
  topDrawerItems: {
    width: 24,
    height: 24,
    tintColor: COLORS.MAIN_BLACK,
  },
  ItemText: {
    fontFamily: HelveticaLight,
    color: COLOR_GREY_65,
    fontSize: 14,
    fontWeight: '600',
  },
  MenuItemContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CountContainer: {
    position: 'absolute',
    right: -23,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    backgroundColor: COLORS.MAIN_BLUE,
    marginLeft: 5,
  },
  MenuItemCount: {
    fontFamily: HelveticaLight,
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});
