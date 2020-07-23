import {
  put, takeLatest, takeEvery, call, select,
} from 'redux-saga/effects';
import { Alert } from 'react-native';

import firebaseLocations from '../mockup/firebaseLocations';
import { getProfile } from './storeHelpers';

import {
  createLocationsSuccess,
  CREATE_LOCATIONS_ATTEMPT,
  REFRESH_LOCATIONS_ATTEMPT,
  CREATE_LOCATION_ATTEMPT,
  getLocationsSuccess, GET_LOCATIONS_ATTEMPT,
  createLocationSuccess,
} from '../actions/locations';
import { isError } from '../actions/errors';
import {
  createLocation, getLocations, getLocationByUniversalId,
  // getProfiles, updateProfilesDev,
} from '../api/apiRequests';
import {
  uniqueKeyByCoordinates, generateUniversalIds, distanceFromLocation,
  sortLocations, getCurrentLocation as navigatorGetCurrentLocation,
} from '../helpers/locations';


const universalLocation = 'https://firebasestorage.googleapis.com/v0/b/selftape-ef381.appspot.com/o/locations%2FuniversalLocation.jpg?alt=media&token=41cf397a-4b2a-43ed-bc3f-165755330b72';

function* createLocationsSaga() {
  try {
    yield firebaseLocations.forEach((location) => {
      createLocation(location);
    });
    yield createLocationsSuccess();
  } catch (error) {
    yield put(isError(error.message, 'HomeLocationsComponent'));
  }
}

function* getLocationsSaga() {
  let currentProfile = null;
  try {
    const data = yield call(getLocations);
    currentProfile = yield select(getProfile);
    let coordinates = null;

    try {
      coordinates = yield navigatorGetCurrentLocation();
    } catch (error) {
      console.log('error', error);
    }

    // Alert.alert(
    //   'Coordinates',
    //   JSON.stringify(coordinates),
    //   [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ],
    //   {cancelable: false},
    // );

    // coordinates = { latitude: 34.054737, longitude: -118.362097 };
    // const profiles = yield call(getProfiles);
    // yield call(updateProfilesDev, Object.values(profiles));
    const locations = [];
    if (data) {
      Object.values(data).map((item) => {
        if (currentProfile.isTest) {
          locations.push(item);
        } else if (!item.isTest) {
          locations.push(item);
        }
        return null;
      });
      const sorted = (locations && coordinates)
        ? yield sortLocations(
          distanceFromLocation(locations, coordinates.longitude, coordinates.latitude),
        ) : locations;
      yield put(getLocationsSuccess({ locations: sorted, coordinates }));
    } else {
      yield createLocationsSaga();
      yield getLocationsSaga();
    }
  } catch (error) {
    if (currentProfile.role === 'user') {
      yield put(isError(error.message, 'HomeLocationsComponent'));
    }
  }
}

function* createLocationSaga(data) {
  try {
    const key = uniqueKeyByCoordinates(data.data);
    const universalId = generateUniversalIds(data.data);
    const subLocality = data.data.locality === null ? data.data.subLocality : data.data.locality;
    const neighborhoodAndLocality = data.data.neighborhood !== null ? `${data.data.neighborhood}${'\n'}${subLocality}` : subLocality;
    const locationObject = {
      name: neighborhoodAndLocality.toUpperCase(),
      img: universalLocation,
      location: {
        latitude: data.data.position.lat,
        longitude: data.data.position.lng,
        bounds: data.data.bounds,
      },
      address: data.data.formattedAddress,
      placeId: key,
      universalId,
    };
    const isExist = yield call(getLocationByUniversalId, universalId);
    if (isExist === null) {
      yield call(createLocation, locationObject);
      yield createLocationSuccess();
    }
  } catch (error) {
    yield put(isError(error.message, 'CREATE_LOCATION'));
  }
}

export default function* mySagas() {
  yield takeEvery(CREATE_LOCATIONS_ATTEMPT, createLocationsSaga);
  yield takeLatest(GET_LOCATIONS_ATTEMPT, getLocationsSaga);
  yield takeLatest(REFRESH_LOCATIONS_ATTEMPT, getLocationsSaga);
  yield takeLatest(CREATE_LOCATION_ATTEMPT, createLocationSaga);
}
