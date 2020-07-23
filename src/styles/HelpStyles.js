import { StyleSheet } from 'react-native';
import { COLOR_GREY_F0F0F0, COLOR_WHITE, COLOR_GREY } from './common';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: COLOR_GREY_F0F0F0,
  },
  containerTop: {
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
    borderTopWidth: 2,
    marginTop: 30,
  },
  containerItemTouchable: {
    backgroundColor: COLOR_WHITE,
    alignSelf: 'stretch',
  },
  titleContainer: {
    alignSelf: 'stretch',
    backgroundColor: COLOR_WHITE,
    paddingHorizontal: 8,
    marginTop: 15,
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  header: {
    fontSize: 16,
    textAlign: 'center',
  },
  containerItem: {
    alignSelf: 'stretch',
    backgroundColor: COLOR_WHITE,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    borderColor: COLOR_GREY,
    borderBottomWidth: 1,
  },
  containerCopyright: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  containerItemTitle: {
    fontFamily: HelveticaLight,
    fontSize: 14,
    fontWeight: '400',
  },
  containerCopyrightYear: {
    marginRight: 10,
    fontFamily: HelveticaLight,
    fontSize: 12,
    color: '#727075',
  },
  containerCopyrightVersion: {
    marginLeft: 20,
    fontFamily: HelveticaLight,
    fontSize: 12,
    color: '#727075',
  },
});
