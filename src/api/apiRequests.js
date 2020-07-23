import firebase from 'react-native-firebase';
import { Platform, Share } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNSmtpMailer from 'react-native-smtp-mailer';
import moment from 'moment';
import base64 from 'base-64';
import Stripe from './Strype';

import * as API from '../constants/apiConstants';
import firebaseCommunities from '../mockup/firebaseCommunities';
import {
  weekSessionsByDays, sessionsFinished, thisHourSession, sessionsDashboardStats,
} from '../helpers/sessions';
import { getItem } from '../helpers/authorization';
import { capitalizeFirstLetter } from '../helpers/textHelpers';
import Plans from '../mockup/plans';

const client = new Stripe(API.stripeKey);
const fb = link => firebase.database().ref(link);
const { polyfill: { Blob }, fs: { dirs } } = RNFetchBlob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
// dev imports:
// end

export const firebaseUpdate = updates => firebase.database().ref().update(updates);

// ----- LOGIN  ------ //
export const logIn = props => firebase.auth()
  .signInWithEmailAndPassword(props.email, props.password);

export const signUp = props => firebase.auth()
  .createUserWithEmailAndPassword(props.email, props.password);

export const resetPassword = email => firebase.auth()
  .sendPasswordResetEmail(email);

export const saveProfileData = (props) => {
  firebase.database().ref(`profiles/${props.uid}/${props.role}`).set(props);
};

export const getProfileData = uid => firebase.database()
  .ref(`profiles/${uid}/`)
  .once('value').then(snapshot => snapshot.val());

export const signOut = () => firebase.auth()
  .signOut();

export const getProfiles = () => firebase.database()
  .ref('profiles/')
  .once('value')
  .then(snapshot => snapshot.val());

export const getProfilesByLocations = locationUid => firebase.database()
  .ref('profiles/')
  .orderByChild('practitioner/locations')
  .equalTo(locationUid)
  .once('value')
  .then(snapshot => snapshot.val());

// ----- LOCATION ------ //

export const createLocation = async (props) => {
  const key = await fb('locations/').push(props).key;
  return fb(`locations/${key}`).update({ uid: key });
};

export const getLocations = () => firebase.database()
  .ref('locations/').once('value').then(snapshot => snapshot.val());

export const getLocation = key => firebase.database()
  .ref(`locations/${key}`).once('value').then(snapshot => snapshot.val());

export const getLocationByPlaceId = placeId => firebase.database()
  .ref('locations/')
  .orderByChild('placeId')
  .equalTo(placeId)
  .once('value')
  .then(snapshot => snapshot.val());

export const getLocationByUniversalId = universalId => firebase.database()
  .ref('locations/')
  .orderByChild('universalId')
  .equalTo(universalId)
  .once('value')
  .then(snapshot => snapshot.val());

// ----- Sessions ------ //

export const makeViewed = ({ sessionUid }) => fb(`sessions/${sessionUid}`)
  .update({ viewed: true });

export const createSession = data => firebase.database()
  .ref('sessions/').push(data);

export const getSessionFiles = sessionUid => fb(`sessions/${sessionUid}/files`)
  .once('value')
  .then(snapshot => snapshot.val());

export const getSessions = (params) => {
  switch (true) {
    case (params.startDate === null && params.endDate === null && params.locationId !== null):
      return firebase.database().ref('sessions')
        .orderByChild('filterPractitionerLocation')
        .startAt(`${params.itemId}_&_`)
        .endAt(`${params.itemId}_&_\uf8ff`)
        .once('value')
        .then(snapshot => snapshot.val());
    case (params.startDate !== null && params.endDate === null && params.locationId === null):
      return firebase.database().ref('sessions/')
        .orderByChild(`filter${capitalizeFirstLetter(params.role)}DateStart`)
        .startAt(`${params.itemId}_&_`)
        .endAt(`${params.itemId}_&_\uf8ff`)
        .once('value')
        .then(snapshot => snapshot.val());
    default:
      return firebase.database().ref('sessions/')
        .orderByChild(`filter${capitalizeFirstLetter(params.role)}DateStart`)
        .startAt(`${params.itemId}_&_`)
        .endAt(`${params.itemId}_&_\uf8ff`)
        .once('value')
        .then(snapshot => snapshot.val());
  }
};

export const uploadFile = (uri, mime = 'application/octet-stream', fileName = null, storage = 'files') => new Promise((resolve, reject) => {
  if (firebase.storage) {
    firebase.storage().ref(storage).child(fileName)
      .put(uri, { contentType: mime })
      .then((res) => {
        resolve(res.downloadURL);
      })
      .catch((error) => {
        reject(error);
      });
  }
});

// ----- Communities ------ //

export const getCommunities = () => firebase.database()
  .ref('сommunities/')
  .once('value')
  .then(snapshot => snapshot.val());

export const createCommunity = props => firebase.database()
  .ref('сommunities/')
  .push(props);

// ----- SelfTape PRO ----- //

export const getSelfTapePro = () => firebase.database().ref('plans/')
  .once('value')
  .then(snapshot => Object.values(snapshot.val()));

export const updateMember = async (userUID, membership) => {
  const selectedRole = await getItem('@selectedRole');
  return fb(`profiles/${userUID}/${selectedRole}`).update({ membership });
};

// ----- Tips ------ //

export const getTips = () => firebase.database()
  .ref('tips/')
  .once('value')
  .then(snapshot => snapshot.val());

export const createTip = props => firebase.database()
  .ref('tips/')
  .push(props);

// ------ Auditions ------ //

export const getAuditions = () => firebase.database().ref('auditions/')
  .once('value')
  .then(snapshot => snapshot.val());

export const createAuditions = props => firebase.database()
  .ref('auditions/')
  .push(props);

const dateFilter = async (filter, { role, uid }, filterEnd = filter) => fb('sessions')
  .orderByChild(`filter${capitalizeFirstLetter(role)}DateStart`)
  .startAt(`${uid}_&_${filter}`)
  .endAt(`${uid}_&_${filterEnd}\uf8ff`)
  .once('value');

const getQuestions = async ({ role }) => {
  const questions = await fb('questions')
    .once('value')
    .then(snapshot => snapshot.val());
  return questions
    ? Object.values(role === 'practitioner' ? questions.practitioner : questions.user).sort((a, b) => a.order - b.order)
    : [];
};

const allPeriodAuditionsByUser = async () => {
  const { uid } = await firebase.auth().currentUser;
  return fb('sessions')
    .orderByChild('profileUid')
    .equalTo(uid)
    .once('value');
};

export const getTodaySession = async (profile) => {
  const day = moment().format('YYYY-MM-DD');
  const sessionsToday = await dateFilter(day, profile);
  const sessionInfo = await thisHourSession({ sessionsArray: sessionsToday.val(), profile });
  const practitionerProfile = sessionInfo
    ? await getProfileData(sessionInfo.profileUid) : null;
  const userProfile = sessionInfo
    ? await getProfileData(sessionInfo.details.profileClient.uid) : null;
  const locationInfo = sessionInfo
    ? await getLocation(sessionInfo.locationUid) : null;
  const questions = await getQuestions(profile);
  const hourSession = {
    questions,
    sessionInfo,
    practitionerProfile: practitionerProfile
      && practitionerProfile.practitioner && practitionerProfile.practitioner,
    userProfile: userProfile && userProfile.user && userProfile.user,
    locationInfo,
  };
  return sessionInfo && hourSession;
};

export const getSessionStats = async (profile) => {
  const day = moment().format('YYYY-MM-DD');
  const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
  const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');

  const auditionsToday = await dateFilter(day, profile);
  const auditionsWeek = await dateFilter(startOfWeek, profile, endOfWeek);
  const allPeriodAuditions = await allPeriodAuditionsByUser();
  const weekAuditions = await weekSessionsByDays(auditionsWeek.val());
  const weekAuditionsAcceptedCount = await sessionsFinished(auditionsWeek.val());
  const sessions = {
    today: sessionsDashboardStats(auditionsToday.val()),
    week: sessionsDashboardStats(auditionsWeek.val()),
    allPeriodSessions: sessionsFinished(allPeriodAuditions.val()),
    weekAuditions,
    weekAuditionsCount: auditionsWeek.numChildren(),
    weekAuditionsAcceptedCount,
    weekDays: {
      start: startOfWeek,
      end: endOfWeek,
    },
  };
  return sessions;
};

const isRatedSessionPerson = async (personUid, sessionUid) => fb('reviews')
  .orderByChild('filterRatedPersonSession')
  .startAt(`${personUid}_&_${sessionUid}`)
  .endAt(`${personUid}_&_${sessionUid}\uf8ff`)
  .once('value')
  .then(snapshot => snapshot.val());

export const getBookData = async (data) => {
  const singleLocation = await getLocation(data.locationUid);
  const practitionerProfile = await getProfileData(data.profileUid);
  const isRatedPerson = await isRatedSessionPerson(data.profileUid, data.sessionUid);
  const bookData = {
    singleLocation,
    practitionerProfile,
    isRatedPerson: isRatedPerson !== null,
  };
  return bookData;
};

export const ratePerson = async (review) => {
  const key = await fb('reviews/').push(review).key;
  return fb(`reviews/${key}`).update({
    uid: key,
  }).catch(error => console.error(error));
};

export const saveAnswers = async (answers) => {
  const key = await fb('answers/').push(answers).key;
  return fb(`answers/${key}`).update({
    uid: key,
  }).catch(error => console.error(error));
};

export const updateWhoRated = async ({ sessionUid, role }) => {
  return fb(`sessions/${sessionUid}`).update({
    [`${role}LeftReview`]: true,
  }).catch(error => console.error(error));
};

export const getPersonReviews = async ({ uid, role }) => fb('reviews')
  .orderByChild('ratedPersonUid')
  .equalTo(`${uid}_&_${role}`)
  .once('value')
  .then(snapshot => snapshot.val());

const download = (file) => {
  const date = new Date();
  return RNFetchBlob
    .config({
      path: `${Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir}/${file.fileName}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: file.fileType !== 'application/pdf' ? `selftype_${Math.floor((date.getTime() + date.getSeconds()) / 2)}.jpg` : file.fileName,
        mime: file.fileType,
        description: 'File downloaded by download manager.',
        path: `${Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir}/${file.fileName}`,
      },
    })
    .fetch('GET', file.fileURL)
    .then(async (res) => {
      if (Platform.OS === 'ios') {
        const resource = await res.base64();
        const url = `data:application/pdf;base64,${resource}`;
        const result = await Share.share({ url });
        if (result.action === Share.sharedAction) {
          return { data: res, status: 200 };
        } if (result.action === Share.dismissedAction) {
          return { data: res, status: 400 };
        }
      }
      return { data: res, status: 200 };
    })
    .catch((err) => {
      return { data: { message: err.message }, status: 400 };
    });
};

export const downloadFile = async (file) => {
  const result = await download(file);
  return result;
};

// Push notification
export const sendNotification = async (ids, notification) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `key=${API.fcmKey}`,
  });
  try {
    await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        registration_ids: ids,
        notification,
        priority: 10,
        data: notification.data,
      }),
    });
  } catch (err) {
    console.log('err', err);
  }
};


// STRYPE
export const stripeRequest = async (url = '', object = {}) => {
  const result = await client.stripeRequest('POST', url, object);
  return result;
};

export const createCustomer = async ({ profile, cardToken }) => {
  const result = await client.stripeRequest('POST', 'customers', {
    email: profile.email,
    source: cardToken.id,
    description: profile.role,
  });
  return result;
};

export const createStripeAccount = async ({ profile }) => {
  const time = moment.utc().valueOf();
  const result = await client.stripeRequest('POST', 'accounts', {
    type: 'custom',
    country: 'US',
    'tos_acceptance[date]': Math.floor(time / 1000),
    'tos_acceptance[ip]': '8.8.8.8',
    email: profile.email,
  });
  return result;
};

export const memberRequest = async (id, url = '', object = {}) => {
  const selectedRole = await getItem('@selectedRole');
  const memberType = selectedRole === 'user' ? 'customers' : 'accounts';
  const result = await client.stripeRequest('POST', `${memberType}/${id}${url}`, object);
  return result;
};

export const removeCard = async (id, url = '', object = {}) => {
  const selectedRole = await getItem('@selectedRole');
  const memberType = selectedRole === 'user' ? 'customers' : 'accounts';
  const memberPayData = selectedRole === 'user' ? 'sources' : 'external_accounts';
  const result = await client.stripeRequest('DELETE', `${memberType}/${id}/${memberPayData}${url}`, object);
  return result;
};

export const createCardToken = async (data) => {
  const cardObj = {
    number: data.cardNumber,
    exp_month: data.expiryMonth,
    exp_year: data.expiryYear,
    cvc: data.cvv,
    name: data.cardholderName,
  };
  if (data.currency) cardObj.currency = data.currency;
  const result = await client.createToken(cardObj);
  return result;
};

export const pay = async (payObject) => {
  const result = await client.stripeRequest('POST', 'charges', payObject);
  return result;
};

export const refunds = async (refundsObject) => {
  const result = await client.stripeRequest('POST', 'refunds', refundsObject);
  return result;
};

export const twilioRequest = async ({ resource, formData }) => {
  const result = await RNFetchBlob.fetch('POST', `${API.TWILIO_BASE_URL}/${API.TWILIO_ACCOUNT_SID}/${resource}`, {
    Authorization: `Basic ${base64.encode(`${API.TWILIO_ACCOUNT_SID}:${API.TWILIO_AUTH_TOKEN}`)}`,
    'Content-Type': 'multipart/form-data',
  }, formData);
  return result;
};

export const sendMail = async (data) => {
  const result = await RNSmtpMailer.sendMail({
    ...{
      mailhost: 'smtp.gmail.com',
      port: '465',
      ssl: true,
      username: 'bookings@selftapenow.com',
      password: 'Showmethe$1',
      from: 'bookings@selftapenow.com',
    },
    ...data,
  });
  return result;
};

// Chat requests

export const createChat = ({ practitioner, user }) => {
  const chat = {
    filterUid: `practitioner_${practitioner.uid}_user_${user.uid}`,
    practitionerUid: practitioner.uid,
    userUid: user.uid,
  };
  return firebase.database().ref('chats/').push(chat);
};

export const getChatByProfiles = ({ practitioner, user }) => fb('chats')
  .orderByChild('filterUid')
  .equalTo(`practitioner_${practitioner.uid}_user_${user.uid}`)
  .once('value')
  .then(snapshot => snapshot.val());

export const getChatByKey = key => fb(`chats/${key}`).once('value').then(snapshot => snapshot.val());

export const sendMessage = ({ uid, messageObj }) => fb(`chats/${uid}/messages`)
  .push(messageObj);


// ----- Dev API ------ //

export const createCommunityDev = async () => firebaseCommunities.forEach(async (item) => {
  const key = await fb('сommunities/').push(item).key;
  return fb(`сommunities/${key}`).update({ uid: key });
}).catch(error => console.error(error));

export const setSelfTapePro = async () => Plans.forEach(async (item) => {
  const key = await fb('plans/').push(item).key;
  return fb(`plans/${key}`).update({ uid: key });
}); // .catch(error => console.error(error));

export const updateProfilesDev = async (profiles) => {
  // profiles.forEach(async (item) => {
  //   if (item.user) {
  //     const newPrices = [];
  //     item.user.prices.forEach((item) => {
  //       if (item.uid !== 'coaching') {
  //         newPrices.push(item);
  //       } else {
  //         newPrices.push({ ...item, description: 'This is a per hour rate.' });
  //       }
  //     });
  //     console.log('newPrices', newPrices)
  //     return fb(`profiles/${item.user.uid}/user`).update({
  //       prices: newPrices,
  //     });
  //   }
  // });
//     if (item.user) {
//       return fb(`profiles/${item.user.uid}/user`).update({
//         address: {
//           apartmentNumber: '',
//           city: 'Los Angeles',
//           street: '19 Temple str',
//           zip: '90038',
//         },
//       });
//     }
};
