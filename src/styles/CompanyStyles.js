import { StyleSheet } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
  },
  top: {
    paddingTop: 25,
    alignSelf: 'stretch',
    paddingBottom: 5,
    marginBottom: 0,
  },
  topImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  articlesContainer: {
    paddingBottom: 20,
  },
  bannerTop: {
  },
  bannerTopInfo: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  starStyle: {
    marginRight: 5,
  },
  bannerTopInfoMail: {
    marginRight: 10,
    color: '#6a6a6a',
    fontFamily: HelveticaLight,
    fontSize: 16,
    fontWeight: '400',
  },
  containerArticle: {
    padding: 15,
    borderColor: '#e0dfe0',
    borderWidth: 1,
    margin: 40,
    marginBottom: 0,
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowColor: '#ededef',
    shadowOffset: { width: 5, height: 5 },
    elevation: 5,
  },
  shadowImage: {
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowColor: '#ededef',
    shadowOffset: { width: 5, height: 5 },
    elevation: 5,
  },
  articleImage: {
    width: '100%',
    height: 180,
  },
  articleTitle: {
    marginTop: 10,
    color: '#4c2843',
    fontFamily: HelveticaLight,
    fontSize: 19,
    fontWeight: '600',
  },
  articleSubTitle: {
    marginTop: 5,
    fontFamily: HelveticaLight,
    fontSize: 14,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 8,
  },
  textArticleWrapper: {
    borderColor: '#e7e7e7',
    borderBottomWidth: 1.5,
    marginBottom: 5,

  },
  articleText: {
    fontSize: 14,
    fontFamily: HelveticaLight,
    color: '#808080',
    fontWeight: '400',
  },
});
