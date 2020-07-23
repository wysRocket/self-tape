import { StyleSheet } from 'react-native';
import { COLOR_GREY_734A4A, COLOR_WHITE } from './common';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  containerBackground: {
    alignSelf: 'stretch',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainerItem: {
    padding: 10,
    paddingTop: 5,
    alignItems: 'center',
  },
  infoContainerTimeAuditing: {
    padding: 10,
    paddingTop: 5,
    borderColor: COLOR_GREY_734A4A,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    alignItems: 'center',
  },
  infoContainerTitle: {
    color: COLOR_WHITE,
    marginTop: 5,
    marginBottom: 5,
  },
  infoContainerStreackCount: {
    color: '#ae6770',
    fontSize: 16,
  },
  infoContainerAuditingCount: {
    color: '#f1d5a3',
    fontSize: 16,
  },
  infoContainerSessionsCount: {
    color: '#4b7a97',
    fontSize: 16,
  },
  infoContainerItemImage: {
    width: 16,
    height: 20,
  },
  infoContainerItemImageTimer: {
    width: 20,
    height: 20,
  },
  controlSessionsButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 2,
  },
  controlSessionsButtonsText: {
    color: COLOR_WHITE,
    marginRight: 35,
    marginLeft: 35,
    fontSize: 12,
  },
  calendarContainer: {
    width: '93%',
  },
});
