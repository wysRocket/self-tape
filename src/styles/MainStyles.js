import { StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-navigation';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  activityIndicatorContainer: {
    position: 'absolute',
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  noDataContainer: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    opacity: 1,
  },
  addHeaderOffset: {
    height: height - Header.HEIGHT,
  },
});
