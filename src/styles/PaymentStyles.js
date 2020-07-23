import { StyleSheet } from 'react-native';
import { COLOR_BLUE } from './common';

export default StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumberStyle: {
    marginLeft: 10,
    color: '#bcbbc0',
    fontSize: 16,
    width: '70%',
  },
  delete: {
    marginTop: 15,
    backgroundColor: 'red',
    width: 0,
    height: 50,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  deleteText: {
    fontSize: 15,
    color: '#fff',
    width: 50,
  },
  singleElementWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ededef',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 15,
    borderRadius: 6,
  },
  scanText: {
    color: '#f03df1',
    fontSize: 16,
  },
  bookButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_BLUE,
    paddingVertical: 15,
    width: '100%',
  },
  bookText: {
    fontSize: 16,
    paddingHorizontal: 4,
    color: '#fff',
    lineHeight: 18,
  },
  buttonStyles: {
    flex: 1,
    flexDirection: 'row',
  },
});
