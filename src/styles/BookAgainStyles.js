import { StyleSheet } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  bottomContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'green',
    justifyContent: 'space-between',
  },
  bookList: {
    flex: 1,
    alignSelf: 'stretch',
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bookAgain: {
    backgroundColor: 'black',
    width: 150,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButton: {
    backgroundColor: '#3b88cd',
    width: 150,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: HelveticaLight,
    fontSize: 14,
    fontWeight: '400',
  },
  singleBook: {
    margin: 15,
    borderColor: '#efefef',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 3,
    paddingBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  singleBookLeftTop: {
    flexDirection: 'row',
  },
  singleBookLeftTopButton: {
    fontFamily: HelveticaLight,
    fontSize: 12,
    color: 'black',
  },
  singleBookLeftTopButtonContainer: {
    borderColor: 'black',
    borderRightWidth: 1,
    paddingRight: 5,
    marginRight: 5,
  },
  singleBookLeftTopName: {
    fontFamily: HelveticaLight,
    marginTop: 8,
    fontSize: 11,
    color: '#8b8b8b',
    fontWeight: '400',
  },
  singleBookRight: {
    justifyContent: 'flex-end',
  },
  singleBookRightTime: {
    fontFamily: HelveticaLight,
    marginTop: 8,
    fontSize: 11,
    color: '#8b8b8b',
    fontWeight: '400',
  },
  linksBlock: {
    flex: 2,
    alignItems: 'center',
  },
  textLinks: {
    fontFamily: HelveticaLight,
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  uber: {
    width: 200,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#040404',
  },
  lyft: {
    marginTop: 5,
    width: 200,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ce06ba',
  },
});
