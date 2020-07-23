import { StyleSheet } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';
import COLORS from '../constants/colorsConstants';

export default StyleSheet.create({
  scrollContainerAligment: {
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    width: '100%',
  },
  containerPadding: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: '100%',
  },
  studiyaWrapper: {
    width: '99%',
    height: 130,
  },
  studiyaImage: {
    width: '100%',
    height: '100%',
  },
  bioImage: {
    borderRadius: 100 / 2,
    width: 100,
    height: 100,
  },
  bioImageContainer: {
    borderRadius: 100 / 2,
    backgroundColor: COLORS.COLOR_GREY,
  },
  bioName: {
    fontWeight: '400',
    color: COLORS.COLOR_GREY_TEXT,
    fontSize: 24,
    marginTop: 10,
    fontFamily: HelveticaLight,
  },
  bioRating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  bioRatingNumber: {
    fontWeight: '600',
    marginLeft: 3,
    fontFamily: HelveticaLight,
  },
  bioText: {
    color: COLORS.COLOR_GREY_TEXT,
    width: '80%',
    // height: '7%',
    marginTop: 25,
    fontFamily: HelveticaLight,
    marginLeft: 40,
    marginRight: 40,
    paddingLeft: 5,
    paddingRight: 5,
    textAlignVertical: 'top',
  },
  editInput: {
    borderColor: 'transparent',
    color: COLORS.COLOR_GREY_TEXT,
    width: '80%',
    fontSize: 17,
    fontFamily: HelveticaLight,
    padding: 5,
  },
  editAgent: {
    borderColor: 'transparent',
    color: COLORS.COLOR_GREY_TEXT,
    width: '80%',
    fontSize: 17,
    fontFamily: HelveticaLight,
    padding: 5,
  },
  editManager: {
    borderColor: 'transparent',
    color: COLORS.COLOR_GREY_TEXT,
    width: '70%',
    fontSize: 17,
    fontFamily: HelveticaLight,
    padding: 5,
  },
  focusedEdit: {
    width: '80%',
    borderBottomWidth: 1,
    borderColor: COLORS.COLOR_GREY,
  },
  focusedAgent: {
    width: '80%',
    borderBottomWidth: 1,
    borderColor: COLORS.COLOR_GREY,
  },
  focusedManager: {
    width: '70%',
    borderBottomWidth: 1,
    borderColor: COLORS.COLOR_GREY,
  },
  focusedInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: COLORS.COLOR_GREY,
    height: '25%',
  },
  dropdownLocations: {
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
  },
  dropdownPicker: {
    width: '80%',
    left: '10%',
  },
  addintionalInfoContainer: {
    width: '75%',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rowMargin: {
    marginTop: 15,
  },
  text: {
    color: COLORS.COLOR_GREY_TEXT,
    fontFamily: HelveticaLight,
    fontSize: 17,
    // lineHeight: 18,
  },
  line: {
    textDecorationLine: 'underline',
  },
  borderImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderColor: COLORS.COLOR_BLUE_7F97B7,
    borderWidth: 2,
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
