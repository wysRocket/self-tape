import moment from 'moment';
import { PRODUCTION } from '../constants/apiConstants';

export const membershipId = (member) => {
  if (!PRODUCTION) return member.id || '';
  return member.idProduction || '';
};

export const addedCard = (member) => {
  if (!PRODUCTION) return member.addedCard && member.addedCard === true;
  return member.addedCardProduction && member.addedCardProduction === true;
};

export const isMember = (profile) => {
  const { membership: { key, dateEnd } } = profile;
  const endMemberDate = new Date(dateEnd);
  return key !== false && moment(endMemberDate).isAfter(moment());
};

export const isRegisteredMember = (profile) => {
  const { membership, membership: { isMember: member } } = profile;
  return membershipId(membership) !== '' && member;
};

export const hasStripeAccount = (profile) => {
  const { membership } = profile;
  return membershipId(membership) !== '';
};

export const getDefaultCard = (member) => {
  let defaultCard = null;
  if (member) {
    const { default_source: defaultSource, sources: { data } } = member;
    defaultCard = member && data.find(card => card.id === defaultSource);
  }
  return defaultCard;
};

export const getRandomDigit = length =>
  Math.floor((10 ** (length - 1)) + (Math.random() * 9 * (10 ** (length - 1))));
