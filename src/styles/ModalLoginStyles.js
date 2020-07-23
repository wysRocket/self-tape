import { StyleSheet } from 'react-native';
import { COLOR_BLUE, COLOR_WHITE } from './common';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  submitButtonWrapper: {
    height: 37,
    width: 200,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_BLUE,
  },
  submitButton: {
    color: COLOR_WHITE,
    fontSize: 16,
    justifyContent: 'center',
    fontFamily: HelveticaLight,
  },
  loginTitle: {
    color: COLOR_BLUE,
    fontSize: 20,
    fontFamily: HelveticaLight,
  },
  inputWrapper: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    padding: 10,
  },
  inputStyle: {
    borderColor: COLOR_BLUE,
    borderBottomWidth: 1,
    height: 37,
    padding: 5,
    width: '100%',
    fontFamily: HelveticaLight,
  },
  dropdownRoles: {
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
  },
  dropdownPicker: {
    width: '80%',
    left: '10%',
  },
  agrrementText: {
    color: COLOR_BLUE,
    padding: 5,
    width: '100%',
    textAlign: 'center',
    fontFamily: HelveticaLight,
    textDecorationLine: 'underline',
  },
  forgotPasswordContainer: {
    marginTop: 5,
  },
  forgotPasswordText: {
    color: COLOR_BLUE,
    padding: 5,
    textAlign: 'center',
    fontFamily: HelveticaLight,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
