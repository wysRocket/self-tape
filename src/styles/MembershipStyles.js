import { StyleSheet, Platform } from 'react-native';
import { HelveticaLight, OCRARegular } from '../constants/fontConstants';

export default StyleSheet.create({
  signUpWrapper: {
    flex: 1,
  },
  container: {
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    marginVertical: 10,
  },
  cardInputContainer: {
    flexDirection: 'row',
  },
  cardInput: {
    height: '50%',
  },
  topText: {
    margin: 20,
    color: '#000',
    fontFamily: HelveticaLight,
    fontWeight: '400',
    fontSize: 20,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  title: {
    color: '#000',
    fontFamily: HelveticaLight,
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 10,
  },
  buttonScan: {
    width: '90%',
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#3488cb',
  },
  buttonScanText: {
    color: '#fff',
    fontFamily: HelveticaLight,
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
  additionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  cardInfoContainer: {
    padding: 15,
  },

  // member
  memberWrapper: {
    flex: 1,
    width: '100%',
  },
  memberContainer: {
    flex: 1,
    backgroundColor: '#3488cb',
    paddingHorizontal: 15,
  },
  row: {
    flex: 1,
  },
  col: {
    flex: 1,
  },
  colRight: {
    width: '35%',
  },
  topRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 40,
  },
  centerRow: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomRow: {
    marginTop: 60,
    marginBottom: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 110,
  },
  valueTitle: {
    color: '#000',
    fontFamily: HelveticaLight,
    fontWeight: '400',
    fontSize: 19,
  },
  valueText: {
    color: '#fff',
    fontFamily: HelveticaLight,
    fontWeight: '400',
    fontSize: 24,
  },
  carrdId: {
    color: '#000',
    fontFamily: HelveticaLight,
    fontWeight: '400',
    fontSize: 16,
    marginTop: 5,
  },
  cardBack: {
    width: 300,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBlock: {
    position: 'absolute',
    justifyContent: 'space-between',
    width: 250,
    height: 150,
  },
  cardText: {
    color: '#fff',
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
    fontWeight: '400',
    fontSize: 13,
  },
  topCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcons: {
    tintColor: '#fff',
    marginRight: 2,
    marginLeft: 5,
  },
  cardIconText: {
    color: '#fff',
    fontFamily: HelveticaLight,
    fontSize: 12,
  },
  buttonWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
