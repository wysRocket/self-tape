import { compareTime } from './time';

export const chatData = (chat, singleChat = false) => {
  const data = {
    messages: null,
    chat: null,
  };
  let threadData = chat;
  if (!singleChat) {
    threadData = Object.values(chat);
    threadData = threadData.length === 1 ? threadData[0] : null;
  }

  const messages = (threadData && threadData.messages)
    ? Object.values(threadData.messages).sort((a, b) => compareTime(a.timestamp, b.timestamp, true)).reverse()
    : [];
  data.messages = messages;
  data.chat = {
    filterUid: threadData.filterUid,
    uid: threadData.uid,
    practitionerUid: threadData.practitionerUid,
    userUid: threadData.userUid,
  };
  return data;
};

export default chatData;
