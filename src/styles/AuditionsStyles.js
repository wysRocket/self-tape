import { StyleSheet } from 'react-native';
import { COLOR_GREY } from './common';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  auditionsContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 5,
  },
  top: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImage: {
    height: 200,
    width: '100%',
  },
  singleItem: {
    alignSelf: 'stretch',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
  },
  singleItemText: {
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
    fontFamily: HelveticaLight,
  },
  singleItemImage: {
    width: 19,
    height: 19,
  },
});
