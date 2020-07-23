import AsyncStorage from '@react-native-community/async-storage';

import firebase from 'react-native-firebase';
import { months } from '../constants/textConstants';

export const saveItem = async (item, data) => {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(data));
  } catch (e) {
    // saving error
  }
};

export const getItem = async (item) => {
  let data = null;
  try {
    data = JSON.parse(await AsyncStorage.getItem(item));
  } catch (error) {
    data = '';
  }
  return data;
};

export const updateFcmTokens = async (profile) => {
  const fcmToken = await firebase.messaging().getToken();
  const tokens = profile.fcmTokens ? profile.fcmTokens : [];
  const exist = tokens.includes(fcmToken);
  if (!exist) tokens.push(fcmToken);
  return tokens;
};

export const removeFcmToken = async (profile) => {
  const fcmToken = await firebase.messaging().getToken();
  const tokens = profile.fcmTokens ? profile.fcmTokens : [];
  const filtred = tokens.filter(token => token !== fcmToken);
  return filtred;
};

export const prepareProfile = async ({ profile, role }) => {
  const date = new Date();
  const existRole = role === 'practitioner' ? 'user' : 'practitioner';
  const preparedProfile = profile[existRole];
  preparedProfile.fcmTokens = null;
  preparedProfile.joined = `${months[date.getMonth()]} '${date.getDate()}`;
  preparedProfile.locations = '';
  preparedProfile.studioName = '';
  preparedProfile.address = {
    apartmentNumber: '',
    city: '',
    street: '',
    zip: '',
  };
  preparedProfile.configured = false;
  preparedProfile.membership = {
    dateEnd: '',
    key: false,
    active: true,
    id: '',
    memberNumber: '',
    memberType: '',
    isMember: false,
  };
  preparedProfile.image = '';
  preparedProfile.rating = 0;
  preparedProfile.ratingSum = 0;
  preparedProfile.role = role;
  preparedProfile.setup = [
    '',
    '',
    '',
    '',
  ];
  preparedProfile.totalReviews = 0;
  return preparedProfile;
};

export default updateFcmTokens;
