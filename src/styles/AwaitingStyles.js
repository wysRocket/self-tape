import { StyleSheet } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subContainer: {
    alignItems: 'center',
  },
  imageAppinment: {
    marginTop: -20,
    marginBottom: -12,
  },
  title: {
    fontSize: 22,
    fontFamily: HelveticaLight,
    color: '#4390d0',
    textAlign: 'center',
    fontWeight: '400',
  },
  subTitle: {
    textAlign: 'center',
    color: '#717171',
    fontFamily: HelveticaLight,
    marginBottom: 50,
  },
  buttonAwaiting: {
    width: '100%',
    backgroundColor: '#050505',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAwaitingText: {
    color: 'white',
    fontFamily: HelveticaLight,
    fontSize: 24,
    fontWeight: '400',
  },
});
