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
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 30,
    fontFamily: HelveticaLight,
    fontWeight: '300',
  },
  text: {
    width: 300,
    fontFamily: HelveticaLight,
    color: '#4c4c4c',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
});
