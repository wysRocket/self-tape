import { StyleSheet } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: 45,
    paddingRight: 45,
  },
  containerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerMid: {
    alignItems: 'center',
  },
  closeButton: {
    width: 22,
    height: 22,
  },
  emptyStar: {
    width: 15,
    height: 15,
    marginLeft: 3,
  },
  containerTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: HelveticaLight,
  },
  creditCard: {
    marginTop: 20,
  },
  dropdownCard: {
    width: 200,
    marginTop: -30,
  },
  cardInfo: {
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  cardInfoTitle: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: HelveticaLight,
    color: '#7e7e7e',
  },
  cardInfoUpdated: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: HelveticaLight,
    color: '#949494',
  },
  QRCode: {
    marginTop: 130,
  },
  cardNumber: {
    marginTop: 7,
    fontSize: 11,
    width: 130,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: HelveticaLight,
    color: '#9c9c9c',
  },
  buttonContainer: {
    marginTop: 25,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: 80,
  },
  doneButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3a87cc',
    borderRadius: 18,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: HelveticaLight,
    color: 'white',
  },
});
