import { StyleSheet } from 'react-native';
import { COLOR_WHITE, COLOR_BLUE } from './common';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  containerTop: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  containerMiddle: {
    margin: 8,
    marginTop: 25,
  },
  containerBottom: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTopImage: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  containerTopImageContainer: {
    borderRadius: 130 / 2,
    borderColor: '#c4c5be',
    backgroundColor: '#c4c5be',
    borderWidth: 2,
  },
  containerTopClientName: {
    fontFamily: HelveticaLight,
    fontSize: 18,
    fontWeight: '400',
    color: '#211e22',
    marginTop: 10,
  },
  containerTopRating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  containerTopRatingImage: {
    width: 18,
    height: 18,
    marginRight: 3,
  },
  containerTopRatingCount: {
    fontFamily: HelveticaLight,
    fontSize: 15,
    fontWeight: '400',
  },
  containerMiddleText: {
    fontFamily: HelveticaLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 15,
    marginHorizontal: 10,
  },
  containerBottomTextTitle: {
    fontFamily: HelveticaLight,
    fontSize: 20,
    marginBottom: 12,
    textDecorationStyle: 'solid',
    fontWeight: '400',
    textAlign: 'center',
  },
  containerBottomText: {
    fontFamily: HelveticaLight,
    fontSize: 18,
    marginBottom: 12,
    marginHorizontal: 15,
  },
  containerBottomButton: {
    marginBottom: 8,
    flex: 1,
    height: 45,
    backgroundColor: COLOR_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  containerBottomButtonText: {
    fontSize: 20,
    fontFamily: HelveticaLight,
    fontWeight: '400',
    color: COLOR_WHITE,
  },
  buttonsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
});
