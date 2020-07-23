import { StyleSheet } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  containerAwesome: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 110,
  },
  mapContainer: {
    height: 110,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  personsAvatars: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 30,
  },
  avatarStyles: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  avatarStylesContainer: {
    borderColor: '#eaeaea',
    backgroundColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 80 / 2,
  },
  leftRightArrow: {
    width: 100,
    height: 10,
  },
  personContainer: {
    alignItems: 'center',
    width: 120,
  },
  personName: {
    textAlign: 'center',
    fontFamily: HelveticaLight,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 15,
  },
  checkIn: {
    height: 40,
    backgroundColor: '#3b88cd',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    marginBottom: 10,
  },
  checkOut: {
    height: 40,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    marginBottom: 10,
  },
  checkText: {
    color: 'white',
    fontSize: 16,
    fontFamily: HelveticaLight,
    fontWeight: '400',
  },
  containerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  star: {
    width: 13,
    height: 13,
  },
  ratingNumber: {
    fontSize: 12,
    fontFamily: HelveticaLight,
    fontWeight: '600',
    marginLeft: 3,
  },
  checkInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInfoWhen: {
    fontSize: 24,
    fontFamily: HelveticaLight,
    fontWeight: '400',
    marginTop: 15,
  },
  checkInfoText: {
    fontSize: 14,
    fontFamily: HelveticaLight,
    fontWeight: '400',
    width: '65%',
    textAlign: 'center',
  },
  bottomButtons: {
    marginTop: 70,
  },
  awesomeTitle: {
    marginTop: 5,
    fontSize: 46,
    fontFamily: HelveticaLight,
    fontWeight: '200',
    width: '70%',
    textAlign: 'center',
  },
  awesomeText: {
    marginTop: 10,
    fontSize: 11,
    fontFamily: HelveticaLight,
    fontWeight: '200',
    width: '60%',
    textAlign: 'center',
  },
});
