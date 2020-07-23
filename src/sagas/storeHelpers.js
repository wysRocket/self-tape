export const getProfile = state => state.authorizationReducer.profile;

export const getSessions = state => state.sessionsReducer.sessions;

export const getSessionInfo = state => state.sessionsReducer.bookData;

export const getCurrentHourSession = state => state.sessionsReducer.currentHourSession;

export const getStateSelfTapePro = ({ userDetails: { selftapePro } }) => Boolean(selftapePro);

export const getMemberData = state => state.userDetails.member;

export const getBookData = state => state.bookReducer;

export const getChatInfo = state => state.chatReducer.chat;

export const getChatMessages = state => state.chatReducer.messages;

export const getChatLimit = state => state.chatReducer.limit;

export const getCurrentLocation = state => state.locations.coordinates;

export const getUserKey = ({ authorizationReducer: { profile: { uid } } }) => ({ userUID: uid });

export const sleep = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));

export default getProfile;
