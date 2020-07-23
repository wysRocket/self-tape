import { StyleSheet, Dimensions } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    width,
  },
  containerTop: {
    margin: 8,
  },
  containerMiddle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBottom: {
    margin: 8,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTopText: {
    fontFamily: HelveticaLight,
    fontSize: 14,
    color: '#868a8a',
    marginBottom: 13,
  },
  containerMiddleImage: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  containerMiddleImageWrap: {
    borderRadius: 130 / 2,
    borderColor: '#c4c5be',
    backgroundColor: '#c4c5be',
    borderWidth: 2,
  },
  containerMiddleClientName: {
    fontFamily: HelveticaLight,
    fontSize: 18,
    fontWeight: '400',
    color: '#211e22',
    marginTop: 10,
  },
  containerMiddleRating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  containerMiddleRatingImage: {
    width: 18,
    height: 18,
    marginRight: 3,
  },
  containerMiddleRatingCount: {
    fontFamily: HelveticaLight,
    fontSize: 15,
    fontWeight: '400',
  },
  containerBottomTitle: {
    fontFamily: HelveticaLight,
    fontSize: 17,
    fontWeight: '400',
    color: '#753b40',
  },
  containerBottomImage: {
    width: 200,
    height: 140,
    marginTop: 15,
  },
});
