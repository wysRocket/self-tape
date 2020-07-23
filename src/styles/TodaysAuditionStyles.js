import { StyleSheet } from 'react-native';
import { COLOR_BLUE, COLOR_WHITE } from './common';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  penContainer: {
    paddingRight: 0,
    alignItems: 'flex-end',
  },
  bottomContainer: {
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
  },
  penImage: {
    width: 28,
    height: 28,
  },
  title: {
    fontSize: 26,
    color: '#2c2c2c',
    paddingTop: 0,
    marginBottom: 5,
    fontFamily: HelveticaLight,
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 7,
  },
  inputStyle: {
    height: 40,
    textAlign: 'center',
    width: '100%',
    color: '#3b88cd',
    fontWeight: '400',
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: HelveticaLight,
    borderBottomColor: '#3b88cd',
    borderBottomWidth: 1,
  },
  placeholderStyle: {
    color: '#3b88cd',
  },
  practitionerAvatarContainer: {
    marginTop: 25,
  },
  practitionerAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'stretch',
  },
  ratingCount: {
    fontFamily: HelveticaLight,
    color: '#4b4b4b',
    marginLeft: 4,
    fontWeight: '400',
  },
  personName: {
    fontFamily: HelveticaLight,
    color: '#4b4b4b',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '400',
  },
  sendButton: {
    marginTop: 20,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_BLUE,
  },
  sendButtonText: {
    color: COLOR_WHITE,
    fontWeight: '600',
    fontSize: 30,
    fontFamily: HelveticaLight,
  },
});
