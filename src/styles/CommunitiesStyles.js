import { StyleSheet } from 'react-native';
import { COLOR_WHITE } from './common';
import { AbrilFatface } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  flatListContainer: {
    width: '100%',
  },
  top: {
    height: 30,
    alignSelf: 'stretch',
  },
  containerListItem: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    height: 190,
  },
  communityItem: {
    fontSize: 30,
    color: COLOR_WHITE,
    fontWeight: '400',
    fontFamily: AbrilFatface,
  },
});
