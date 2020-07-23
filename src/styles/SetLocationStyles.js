import { StyleSheet, Dimensions } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
  },

  containerContetnt: {
    flex: 1,
    justifyContent: 'space-between',
  },

  inputStyle: {
    margin: 15,
    marginBottom: 0,
    backgroundColor: '#3b88cd',
    borderRadius: 10,
    height: 40,
    width: width - 30,
    color: 'white',
    fontWeight: '400',
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: HelveticaLight,
  },
  singleElementWrapper: {
    width: width - (25 * 2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ededef',
    marginTop: 15,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 10,
  },
  sinleElementText: {
    fontFamily: HelveticaLight,
  },
  buttonContainer: {
    width: width - (25 * 2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b88cd',
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: HelveticaLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
