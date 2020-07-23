import { StyleSheet } from 'react-native';
import { COLOR_GREEN_00CFBE, COLOR_GREY, COLOR_RED_D04437 } from './common';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    width: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOR_GREY,
    borderRightWidth: 1,
    marginTop: 6,
    paddingTop: 4,
    marginBottom: 6,
  },
  statusContainer: {
    width: 42,
    height: 1,
    flexDirection: 'row',
  },
  statusItem: {
    width: 42 / 4,
    height: 1,
  },
  active: {
    backgroundColor: COLOR_GREEN_00CFBE,
  },
  time: {
    color: COLOR_GREEN_00CFBE,
    fontFamily: HelveticaLight,
    fontSize: 16,
    paddingBottom: 6,
  },
  period: {
    fontSize: 10,
    color: COLOR_GREEN_00CFBE,
    fontFamily: HelveticaLight,
    paddingBottom: 8,
  },
  disabled: {
    color: COLOR_GREY,
  },
  exist: {
    backgroundColor: COLOR_RED_D04437,
  },
});
