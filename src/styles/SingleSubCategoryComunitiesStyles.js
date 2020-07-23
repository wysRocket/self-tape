import { StyleSheet } from 'react-native';
import { COLOR_GREY } from './common';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  top: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
  },
  topIco: {
    width: 120,
    height: 120,
  },
  topTitle: {
    width: 195,
    fontSize: 32,
    fontWeight: '400',
    fontFamily: HelveticaLight,
    color: '#f05dbd',
  },
  companiesContainer: {
    alignSelf: 'stretch',
    paddingLeft: 3,
  },
  subCategoryNameContainer: {
    padding: 4,
    paddingVertical: 25,
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
  },
  subcategoryName: {
    fontFamily: HelveticaLight,
    fontWeight: '600',
    textTransform: 'capitalize',
    fontSize: 20,
  },
  containerCompanyItem: {
    alignSelf: 'stretch',
    height: 80,
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 7,
    marginHorizontal: 5,
  },
  containerListItemName: {
    fontSize: 17,
    fontFamily: HelveticaLight,
    fontWeight: '400',
  },
});
