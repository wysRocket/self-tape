import { StyleSheet } from 'react-native';
import { COLOR_BLUE, COLOR_WHITE } from './common';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    display: 'flex',
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    width: '100%',
    flex: 20,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 2,
    backgroundColor: 'black',
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
  },
  imageLogo: {
    flex: 1,
  },
  singUpButton: {
    width: 170,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_BLUE,
  },
  loginButton: {
    width: 170,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsText: {
    color: COLOR_WHITE,
    fontFamily: HelveticaLight,
  },
});
