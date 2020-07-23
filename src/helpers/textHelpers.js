
export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

export const formatLocation = ({
  street, apartmentNumber, city, zip,
}) => `${city !== '' ? `${city}, ` : ''}${street}${apartmentNumber !== '' ? `/${apartmentNumber}, ` : ' '}${zip}`;

export const returnPersonName = (person) => {
  const nameLasIndex = person.username.lastIndexOf(' ');
  return `${nameLasIndex !== -1 ? person.username.slice(0, nameLasIndex) : person.username}`;
};

export const formatPhoneNumber = phone => phone.replace(/[^0-9+]+/g, '');

export default capitalizeFirstLetter;
