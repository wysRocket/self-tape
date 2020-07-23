import { StyleSheet } from 'react-native';
import { BaskervilleItalic, HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    borderColor: '#d7d1d0',
    borderWidth: 1,
    marginTop: 40,
  },
  title: {
    fontFamily: HelveticaLight,
    fontSize: 32,
    fontWeight: '300',
  },
  subTitle: {
    marginTop: 16,
    fontFamily: HelveticaLight,
    fontSize: 12,
    fontWeight: '300',
    width: '75%',
    textAlign: 'center',
  },
  name: {
    marginTop: 20,
    fontFamily: HelveticaLight,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  ratingNumber: {
    fontFamily: HelveticaLight,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  pleaseRate: {
    fontFamily: HelveticaLight,
    fontSize: 21,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20,
  },
  starContainer: {
    marginTop: 30,
    width: 245,
  },
  multilineInput: {
    marginTop: 26,
    borderColor: '#90bbe2',
    borderWidth: 1,
    width: '80%',
    height: 150,
    borderRadius: 4,
    padding: 4,
    fontSize: 17,
    color: '#ababaa',
    fontFamily: BaskervilleItalic,
  },
  sendButton: {
    backgroundColor: '#449ce9',
    padding: 8,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 4,
  },
  sendButtonText: {
    fontFamily: HelveticaLight,
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white',
  },
});
