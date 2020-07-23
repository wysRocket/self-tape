import { StyleSheet } from 'react-native';
import { COLOR_GREY, COLOR_BLUE } from './common';
import { AbrilFatface } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
  },
  menuIconWrapper: {
    width: 48,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -18,
    marginLeft: -18,
  },
  menuIcon: {
    width: 20,
    height: 16,
  },
  appName: {
    display: 'flex',
    flexDirection: 'row',
  },
  appNameLeft: {
    color: COLOR_BLUE,
    fontSize: 28,
    fontWeight: '400',
    fontFamily: AbrilFatface,
  },
  appNameRight: {
    fontSize: 28,
    fontWeight: '400',
    fontFamily: AbrilFatface,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  userAvatarContainer: {
    borderRadius: 30 / 2,
    borderWidth: 1,
    borderColor: COLOR_GREY,
    backgroundColor: COLOR_GREY,
  },
});
