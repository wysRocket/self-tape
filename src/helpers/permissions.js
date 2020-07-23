import { PermissionsAndroid, Platform } from 'react-native';

export async function requestLocationsPermission() {
  if (Platform.OS !== 'ios') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'SelfType',
          message: 'SelfType access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return;
      }
    } catch (err) {
      console.log('err', err);
    }
  }
}

export default requestLocationsPermission;
