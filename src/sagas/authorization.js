/* eslint-disable no-underscore-dangle */
import {
  put, call, takeLatest, select,
} from 'redux-saga/effects';

import * as ACTIONS from '../actions/authorization';
import { getMemberAttempt, createStripeAccountAttempt, clearMember } from '../actions/userDetails';
import { getProfile, sleep } from './storeHelpers';
import {
  updateFcmTokens, removeFcmToken, saveItem, getItem, prepareProfile,
} from '../helpers/authorization';
import firebaseSignUp from '../mockup/firebaseSignUp';
import * as API from '../api/apiRequests';
import { getLocationsAttempt, createLocationAttempt } from '../actions/locations';
import { isError } from '../actions/errors';
import { months } from '../constants/textConstants';
import { resizeImage, messageAlert } from '../helpers/sessions';
import { generateUniversalIds } from '../helpers/locations';
import { membershipId, addedCard } from '../helpers/membership';

function* loginSaga(props) {
  try {
    yield saveItem('@selectedRole', '');
    yield saveItem('@user', '');
    const data = yield call(API.logIn, props);
    if (data) {
      const profile = yield API.getProfileData(data.user._user.uid);
      let selectedProfile = profile[`${props.role}`];
      if (!selectedProfile) {
        selectedProfile = yield prepareProfile({ profile, role: props.role });
        yield call(API.saveProfileData, selectedProfile);
        if (selectedProfile.role !== 'user' && !addedCard(selectedProfile.membership)) {
          yield put(createStripeAccountAttempt(selectedProfile));
        }
      }
      yield saveItem('@selectedRole', props.role);
      yield put(getMemberAttempt(selectedProfile));
      yield put(ACTIONS.loginSuccess({ user: data.user._user, profile: selectedProfile }));
      const user = { profile: selectedProfile };
      yield put(ACTIONS.saveFcmAttempt({ profile: selectedProfile }));
      yield saveItem('@user', user);
    } else {
      yield saveItem('@selectedRole', '');
      yield saveItem('@user', '');
      yield put(isError('Email or password is incorrect', 'login'));
    }
  } catch (error) {
    yield put(isError(error.message, 'login'));
    console.log('error', error);
  }
}

function* signUpSaga(props) {
  try {
    const date = new Date();
    if (props.username === '') {
      yield put(isError('User name is required', 'signUp'));
    } else if (props.passwordConfirmation !== props.password) {
      yield put(isError("Password don't match", 'signUp'));
    } else {
      const data = yield call(API.signUp, props);
      if (data) {
        yield saveItem('@selectedRole', props.role);
        const user = {
          uid: data.user._user.uid,
          email: props.email,
          username: props.username,
          role: props.role,
          joined: `${months[date.getMonth()]} '${date.getDate()}`,
        };
        let mockId = 1;
        if (props.role !== 'user') mockId = 0;
        const userProfile = yield { ...user, ...firebaseSignUp[mockId] };
        yield call(API.saveProfileData, userProfile);
        const userData = { user: data.user._user, profile: userProfile };
        yield put(ACTIONS.signUpSuccess(userData));
        yield saveItem('@user', userData);
        if (props.role !== 'user') yield put(createStripeAccountAttempt(userProfile));
      }
    }
  } catch (error) {
    yield put(isError(error.message, 'signUp'));
  }
}

function* userExistSaga(props) {
  yield sleep(2);
  try {
    const selectedRole = yield getItem('@selectedRole');
    if (selectedRole !== '') {
      const updates = {};
      let profile = yield call(API.getProfileData, props.data._user.uid);
      profile = profile[`${selectedRole}`];
      // dev config (need delete):
      // if (profile.locations === '' && profile.role !== 'user') {
      //   const locationsKeys = Object.keys(yield call(API.getLocations));
      //   const randomLocationId = Math.floor(Math.random() * Math.floor(locationsKeys.length - 1));
      //   updates[`/profiles/${profile.uid}/${selectedRole}/locations`] = locationsKeys[randomLocationId];
      //   yield put(getLocationsAttempt());
      // }
      // end
      if (profile) {
        if (membershipId(profile) === '' && selectedRole !== 'user' && !addedCard(profile.membership)) {
          yield put(createStripeAccountAttempt(profile));
        }
        yield put(getLocationsAttempt());
        yield API.firebaseUpdate(updates);
        yield put(getMemberAttempt(profile));
        yield put(ACTIONS.saveFcmAttempt({ profile }));
        yield put(ACTIONS.loginSuccess({
          user: props.data._user,
          profile,
        }));
        if (props.cb) { props.cb(true); }
      } else {
        if (props.cb) { props.cb(false); }
        yield put(ACTIONS.signOutAttempt());
      }
    } else {
      yield put(ACTIONS.checkAgain());
    }
  } catch (error) {
    if (props.cb) { props.cb(false); }
    yield put(isError(error.message, 'login'));
    yield saveItem('@selectedRole', '');
    yield saveItem('@user', '');
  }
}

function* signOutSaga() {
  try {
    const updates = {};
    const selectedRole = yield getItem('@selectedRole');
    const profile = yield select(getProfile);
    if (profile) {
      const fcmTokens = yield removeFcmToken(profile);
      updates[`/profiles/${profile.uid}/${selectedRole}/fcmTokens`] = fcmTokens;
      yield API.firebaseUpdate(updates);
    }
    yield API.signOut();
    yield saveItem('@selectedRole', '');
    yield saveItem('@user', '');
    yield put(clearMember());
    yield put(ACTIONS.signOutSuccess());
  } catch (error) {
    yield put(isError(error.message, 'signOut'));
  }
}

function* getProfilesByLocationsSaga(props) {
  try {
    let profiles = yield API.getProfilesByLocations(props.locationUid);
    const currentProfile = yield select(getProfile);
    const constFilteredProfiles = [];
    profiles = profiles !== null ? Object.values(profiles) : [];
    profiles.forEach((profile) => {
      if (profile.practitioner
        && currentProfile.uid !== profile.practitioner.uid
        && profile.practitioner.membership
        && addedCard(profile.practitioner.membership)
        && membershipId(profile.practitioner.membership) !== '') {
        if (currentProfile.isTest) {
          constFilteredProfiles.push(profile.practitioner);
        } else if (!profile.practitioner.isTest) {
          constFilteredProfiles.push(profile.practitioner);
        }
      }
    });

    if (constFilteredProfiles) {
      yield put(ACTIONS.profilesByLocationsSuccess(constFilteredProfiles));
    } else {
      yield put(ACTIONS.profilesByLocationsFailure());
    }
  } catch (error) {
    yield put(isError(error.message, 'getProfilesByLocation'));
  }
}

function* updateProfileSaga({
  data: {
    image,
    setup,
    bio,
    searchLocation,
    address,
    phone,
    workWeek,
    prices,
    membership,
    studioName,
    agent,
    manager,
    webSite,
    instagram,
    iMdb,
  },
}) {
  try {
    const selectedRole = yield getItem('@selectedRole');
    const profile = yield select(getProfile);
    const updates = {};
    const updatedProfile = profile;
    if (image) {
      const resized = yield resizeImage(image);
      const fileUrl = yield API.uploadFile(resized.uri, 'image/jpg', resized.name, 'users');
      updates[`/profiles/${profile.uid}/${selectedRole}/image`] = fileUrl;
      updatedProfile.image = fileUrl;
    } if (setup) {
      const resized = yield resizeImage(setup.file);
      const fileUrl = yield API.uploadFile(resized.uri, 'image/jpg', resized.name, 'users');
      updates[`/profiles/${profile.uid}/${selectedRole}/setup/${setup.index}`] = fileUrl;
      updatedProfile.setup[setup.index] = fileUrl;
    } if (bio) {
      updates[`/profiles/${profile.uid}/${selectedRole}/bio`] = bio;
      updatedProfile.bio = bio;
    } if (agent) {
      updates[`/profiles/${profile.uid}/${selectedRole}/agent`] = agent;
      updates[`/profiles/${profile.uid}/${selectedRole}/manager`] = manager;
      updatedProfile.agent = agent;
      updatedProfile.manager = manager;
    } if (webSite) {
      updates[`/profiles/${profile.uid}/${selectedRole}/webSite`] = webSite;
      updates[`/profiles/${profile.uid}/${selectedRole}/iMdb`] = iMdb;
      updates[`/profiles/${profile.uid}/${selectedRole}/instagram`] = instagram;
      updatedProfile.webSite = webSite;
      updatedProfile.iMdb = iMdb;
      updatedProfile.instagram = instagram;
    } if (searchLocation) {
      const universalId = generateUniversalIds(searchLocation);
      yield put(createLocationAttempt(searchLocation));
      yield sleep(2);
      const place = yield call(API.getLocationByUniversalId, universalId);
      const placeUid = Object.keys(place)[0];
      updates[`/profiles/${profile.uid}/${selectedRole}/locations`] = placeUid;
      updatedProfile.locations = placeUid;
    } if (address) {
      if (address.onboardingUser) {
        updates[`/profiles/${profile.uid}/${selectedRole}/address/zip`] = address.zip;
        updates[`/profiles/${profile.uid}/${selectedRole}/address/apartmentNumber`] = address.apartmentNumber;
        updates[`/profiles/${profile.uid}/${selectedRole}/address/city`] = address.city;
        updates[`/profiles/${profile.uid}/${selectedRole}/address/street`] = address.address;
        updatedProfile.address = {
          ...updatedProfile.address,
          zip: address.zip,
          apartmentNumber: address.apartmentNumber,
          city: address.city,
          street: address.address,
        };
      } else {
        if (address.onboarding) {
          updates[`/profiles/${profile.uid}/${selectedRole}/address/zip`] = address.zip;
          updates[`/profiles/${profile.uid}/${selectedRole}/address/apartmentNumber`] = address.apartmentNumber;
          updates[`/profiles/${profile.uid}/${selectedRole}/address/city`] = address.city;
          updates[`/profiles/${profile.uid}/${selectedRole}/address/street`] = address.address;
          updatedProfile.address = {
            ...updatedProfile.address,
            zip: address.zip,
            apartmentNumber: address.apartmentNumber,
            city: address.city,
            street: address.address,
          };
        } else {
          const locality = address.subAdminArea ? address.subAdminArea : '';
          const postalCode = address.postalCode ? address.postalCode : '';
          const street = address.feature ? address.feature : '';
          updates[`/profiles/${profile.uid}/${selectedRole}/address/city`] = locality;
          updates[`/profiles/${profile.uid}/${selectedRole}/address/street`] = street;
          updates[`/profiles/${profile.uid}/${selectedRole}/address/zip`] = postalCode;
          updatedProfile.address = {
            ...updatedProfile.address,
            city: locality,
            street,
            zip: postalCode,
          };
        }
        // cords
        const newCoordinates = {
          latitude: address.position.lat,
          longitude: address.position.lng,
        };
        updates[`/profiles/${profile.uid}/${selectedRole}/location`] = newCoordinates;
        updatedProfile.location = newCoordinates;
      }
    } if (phone || phone === '') {
      updates[`/profiles/${profile.uid}/${selectedRole}/phone`] = phone;
      updatedProfile.phone = phone;
    } if (workWeek) {
      updates[`/profiles/${profile.uid}/${selectedRole}/workWeek`] = workWeek;
      updatedProfile.workWeek = workWeek;
    } if (prices) {
      updates[`/profiles/${profile.uid}/${selectedRole}/prices`] = prices;
      updatedProfile.prices = prices;
    } if (membership) {
      updates[`/profiles/${profile.uid}/${selectedRole}/membership`] = membership;
      updatedProfile.membership = membership;
    } if (studioName) {
      updates[`/profiles/${profile.uid}/${profile.role}/studioName`] = studioName;
      updatedProfile.studioName = studioName;
    }
    yield API.firebaseUpdate(updates);
    yield put(ACTIONS.profileUpdateSuccess(updatedProfile));
  } catch (error) {
    yield put(isError(error.message, 'UpdateProfile'));
  }
}

function* setConfiguredSaga({ data: { configured } }) {
  try {
    const profile = yield select(getProfile);
    const updates = {};
    const updatedProfile = profile;
    updates[`/profiles/${profile.uid}/${profile.role}/configured`] = configured;
    updatedProfile.configured = configured;

    yield API.firebaseUpdate(updates);
    if (profile.role === 'user') {
      yield put(ACTIONS.setConfiguredUserSuccess(updatedProfile));
    } else {
      yield put(ACTIONS.setConfigurerdSuccess(updatedProfile));
    }
  } catch (error) {
    yield put(isError(error.message, 'SetConfugured'));
  }
}


function* getProfileAttemptSaga(props) {
  try {
    const selectedRole = yield getItem('@selectedRole');
    const profile = yield API.getProfileData(props.data.user.uid);
    if (profile !== null) {
      yield put(ACTIONS.getProfileSuccess({ user: props.data.user, profile: profile[`${selectedRole}`] }));
    } else {
      yield put(isError('Not found profile data', 'getProfile'));
    }
  } catch (error) {
    yield put(isError(error.message, 'getProfile'));
  }
}

function* resetPasswordSaga({ data: { email } }) {
  try {
    yield API.resetPassword(email);
    messageAlert({ title: 'Recovery link has been sent', text: 'Please check your email' });
    yield put(ACTIONS.resetPasswordSuccess());
  } catch (error) {
    yield put(isError(error.message, 'ResetPassword'));
  }
}

function* saveFcmTokensSaga({ data: { profile } }) {
  try {
    const updates = {};
    const selectedRole = yield getItem('@selectedRole');
    const fcmTokens = yield updateFcmTokens(profile);
    updates[`/profiles/${profile.uid}/${selectedRole}/fcmTokens`] = fcmTokens;
    yield API.firebaseUpdate(updates);
    yield put(ACTIONS.saveFcmSuccess());
  } catch (error) {
    yield put(isError(error.message, 'SaveTokens'));
  }
}


export default function* mySagas() {
  yield takeLatest(ACTIONS.LOGIN_ATTEMPT, loginSaga);
  yield takeLatest(ACTIONS.SIGNUP_ATTEMPT, signUpSaga);
  yield takeLatest(ACTIONS.USER_EXIST, userExistSaga);
  yield takeLatest(ACTIONS.SIGN_OUT_ATTEMPT, signOutSaga);
  yield takeLatest(ACTIONS.PROFILES_BY_LOCATIONS_ATTEMPT, getProfilesByLocationsSaga);
  yield takeLatest(ACTIONS.REFRESH_PROFILES_BY_LOCATIONS_ATTEMPT, getProfilesByLocationsSaga);
  yield takeLatest(ACTIONS.PROFILE_UPDATE_ATTEMPT, updateProfileSaga);
  yield takeLatest(ACTIONS.GET_PROFILE_ATTEMPT, getProfileAttemptSaga);
  yield takeLatest(ACTIONS.REFRESH_PROFILE_ATTEMPT, getProfileAttemptSaga);
  yield takeLatest(ACTIONS.SET_CONFIGURED_ATTEMPT, setConfiguredSaga);
  yield takeLatest(ACTIONS.RESET_PASSWORD_ATTEMPT, resetPasswordSaga);
  yield takeLatest(ACTIONS.SAVE_FCM_ATTEMPT, saveFcmTokensSaga);
}
