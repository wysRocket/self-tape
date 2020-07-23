import { StyleSheet } from 'react-native';
import { COLOR_GREY } from './common';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    height: 198,
    width: '100%',
  },
  backgroundLocationImage: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 15,
    width: '100%',
  },
  locationText: {
    backgroundColor: 'black',
    color: COLOR_GREY,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 11,
    fontFamily: HelveticaLight,
  },
});
