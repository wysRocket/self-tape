import { StyleSheet } from 'react-native';
import { COLOR_GREY } from './common';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 85,
    borderColor: COLOR_GREY,
    borderWidth: 1,
    borderRadius: 7,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  practitionerAvatar: {
    height: 75,
    width: 75,
    borderRadius: 5,
  }
});
