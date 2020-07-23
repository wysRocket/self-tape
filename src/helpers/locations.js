import { GOOGLE_API_KEY } from '../constants/apiConstants';

const options = { enableHighAccuracy: true, timeout: 500, maximumAge: 1000 };

const calculateDistance = (lat1, lon1, lat2, lon2, unit = 'K') => {
  const radLat1 = (Math.PI * lat1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radTheta = (Math.PI * theta) / 180;
  let dist = (Math.sin(radLat1) * Math.sin(radLat2))
    + (Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta));
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') { dist *= 1.609344; }
  if (unit === 'N') { dist *= 0.8684; }
  return dist;
};

const getLineDots = ({
  x1 = 0, y1 = 0, x2 = 0, y2 = 0,
}) => {
  const cordsArray = [];
  const time = 10;
  for (let i = 0; i <= time; i += 1) {
    const delta = i / time;
    const a = delta * (x2 - x1) + x1;
    const b = delta * (y2 - y1) + y1;
    cordsArray.push({ longitude: a, latitude: b });
  }
  return cordsArray;
};

const getAreaOfDots = ({ bounds }) => {
  const line1 = getLineDots({
    x1: bounds[0].longitude,
    y1: bounds[0].latitude,
    x2: bounds[2].longitude,
    y2: bounds[2].latitude,
  });
  const line2 = getLineDots({
    x1: bounds[2].longitude,
    y1: bounds[2].latitude,
    x2: bounds[1].longitude,
    y2: bounds[1].latitude,
  });
  const line3 = getLineDots({
    x1: bounds[1].longitude,
    y1: bounds[1].latitude,
    x2: bounds[3].longitude,
    y2: bounds[3].latitude,
  });
  const line4 = getLineDots({
    x1: bounds[3].longitude,
    y1: bounds[3].latitude,
    x2: bounds[0].longitude,
    y2: bounds[0].latitude,
  });
  return [...line1, ...line2, ...line3, ...line4];
};

export const distanceFromLocation = (arrayOfLocations, longitude, latitude) => {
  const locations = arrayOfLocations;
  for (let i = 0; i < locations.length; i += 1) {
    const { location: { bounds } } = locations[i];

    // Push additional coordinates for area
    locations[i].location.bounds.push(
      { longitude: bounds[0].longitude, latitude: bounds[1].latitude },
      { longitude: bounds[1].longitude, latitude: bounds[0].latitude },
    );
    locations[i].location.cords = getAreaOfDots({ bounds }); // Get list of cords for each segment

    let minimumDistance = calculateDistance(
      latitude, longitude, // Calculate distance for between center and current location
      locations[i].location.latitude, locations[i].location.longitude,
    );
    locations[i].location.cords.forEach((item) => { // Define minimum distance from current location
      const dist = calculateDistance(latitude, longitude, item.latitude, item.longitude);
      if (dist < minimumDistance) minimumDistance = dist;
    });

    locations[i].distance = minimumDistance;
  }
  return locations;
};

export const sortLocations = async (uniqueNodes) => {
  await uniqueNodes.sort((a, b) => a.distance - b.distance);
  return uniqueNodes;
};

export const formationLocationObject = (raw) => {
  const locationObject = {
    position: {},
    formattedAddress: raw.formatted_address || '',
    feature: null,
    streetNumber: null,
    neighborhood: null,
    streetName: null,
    postalCode: null,
    locality: null,
    country: null,
    countryCode: null,
    adminArea: null,
    subAdminArea: null,
    subLocality: null,
    bounds: [],
  };

  if (raw.geometry && raw.geometry.location) {
    locationObject.position = {
      lat: raw.geometry.location.lat,
      lng: raw.geometry.location.lng,
    };
  }

  if (raw.geometry) {
    const geometryName = raw.geometry.bounds ? 'bounds' : 'viewport';
    locationObject.bounds = [
      {
        latitude: raw.geometry[geometryName].northeast.lat,
        longitude: raw.geometry[geometryName].northeast.lng,
      },
      {
        latitude: raw.geometry[geometryName].southwest.lat,
        longitude: raw.geometry[geometryName].southwest.lng,
      },
    ];
  }

  raw.address_components.forEach((component) => {
    if (component.types.indexOf('route') !== -1) {
      locationObject.streetName = component.long_name;
    } else if (component.types.indexOf('neighborhood') !== -1) {
      locationObject.neighborhood = component.long_name;
    } else if (component.types.indexOf('street_number') !== -1) {
      locationObject.streetNumber = component.long_name;
    } else if (component.types.indexOf('country') !== -1) {
      locationObject.country = component.long_name;
      locationObject.countryCode = component.short_name;
    } else if (component.types.indexOf('locality') !== -1) {
      locationObject.locality = component.long_name;
    } else if (component.types.indexOf('postal_code') !== -1) {
      locationObject.postalCode = component.long_name;
    } else if (component.types.indexOf('administrative_area_level_1') !== -1) {
      locationObject.adminArea = component.long_name;
    } else if (component.types.indexOf('administrative_area_level_2') !== -1) {
      locationObject.subAdminArea = component.long_name;
    } else if (component.types.indexOf('sublocality') !== -1 || component.types.indexOf('sublocality_level_1') !== -1) {
      locationObject.subLocality = component.long_name;
    } else if (component.types.indexOf('point_of_interest') !== -1 || component.types.indexOf('colloquial_area') !== -1) {
      locationObject.feature = component.long_name;
    }
  });
  return locationObject;
};

export const uniqueKeyByCoordinates = location => `${location.position.lat}${location.position.lng}`.replace(/\D/g, '');

export const generateUniversalIds = (location) => {
  const locality = location.locality === null ? 'null' : location.locality;
  const adminArea = location.adminArea === null ? 'null' : location.adminArea;
  const countryCode = location.countryCode === null ? 'null' : location.countryCode;
  const neighborhood = location.neighborhood === null ? 'null' : location.neighborhood;
  const notNeighborhood = locality.toUpperCase() === 'SANTA MONICA' || locality.toUpperCase() === 'WEST HOLLYWOOD';
  const universalId = `${notNeighborhood ? 'NULL' : neighborhood.toUpperCase()}, ${locality.toUpperCase()}, ${adminArea.toUpperCase()}, ${countryCode.toUpperCase()}`;
  return universalId;
};

export const getLocationByAddressURI = (address, apartmentNumber, zip, city) => `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(`${address}${apartmentNumber}${zip}${city}`)}&key=${GOOGLE_API_KEY}`;

export const getCurrentLocation = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { longitude, latitude } }) => {
      resolve({ longitude, latitude });
    },
    (err) => {
      reject(err);
    },
    options,
  );
});
