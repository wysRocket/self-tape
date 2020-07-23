import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_WHITE } from './common';
import { AbrilFatface, HelveticaLight } from '../constants/fontConstants';

const { width } = Dimensions.get('window');
const itemWidth = (width - 5) / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  flatListContainer: {
    width: '100%',
  },
  top: {
    paddingTop: 25,
    paddingBottom: 25,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
    fontFamily: AbrilFatface,
  },
  SubCategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  containerListItem: {
    width: itemWidth,
    height: 180,
    backgroundColor: 'black',
    alignItems: 'center',
    marginBottom: 5,
  },
  containerListItemName: {
    fontSize: 20,
    color: COLOR_WHITE,
    fontWeight: '400',
    fontFamily: HelveticaLight,
    marginTop: 70,
    textAlign: 'center',

  },
  containerListItemNameColored: {
    fontSize: 20,
    color: '#0077bb',
    fontWeight: '400',
    fontFamily: HelveticaLight,
    marginTop: 70,
    textAlign: 'center',
  },
});
