import { StyleSheet } from 'react-native';
import { HelveticaLight } from '../constants/fontConstants';

export default StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  containerTop: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  videoContainer: {
    flex: 7,
    justifyContent: 'flex-start',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  videoName: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: HelveticaLight,
    fontWeight: '600',
  },
  underLine: {
    width: 180,
    borderColor: 'red',
    borderBottomWidth: 2,
    marginTop: 5,
  },
});
