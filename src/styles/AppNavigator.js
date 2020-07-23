import { StyleSheet, Dimensions, Platform } from 'react-native';

export const { width } = Dimensions.get('window');
export const alertBarHeight = 35;
export const offsetIos = alertBarHeight;
export const offsetAlterTop = Platform.OS === 'ios' ? offsetIos - 5 : offsetIos + 18;

export default StyleSheet.create({
  statusView: {
    position: 'absolute',
    zIndex: 100,
    top: -alertBarHeight - 10,
    opacity: 0.9,
    minHeight: alertBarHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
  },
});
