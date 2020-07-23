import { StyleSheet } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageStyles: {
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 45,
    fontFamily: HelveticaLight,
    fontWeight: '300',
  },
  text: {
    width: 300,
    fontFamily: HelveticaLight,
    color: '#3b3b3b',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
});
