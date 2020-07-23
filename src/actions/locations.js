/** Locations */
export const CREATE_LOCATIONS_ATTEMPT = 'CREATE_LOCATIONS_ATTEMPT';
export const createLocationsAttempt = data => ({ type: CREATE_LOCATIONS_ATTEMPT, data });

export const CREATE_LOCATIONS_SUCCESS = 'CREATE_LOCATIONS_SUCCESS';
export const createLocationsSuccess = () => ({ type: CREATE_LOCATIONS_SUCCESS });

export const CREATE_LOCATIONS_FAILURE = 'CREATE_LOCATIONS_FAILURE';
export const createLocationsFailure = message => ({ type: CREATE_LOCATIONS_FAILURE, message });

export const GET_LOCATIONS_ATTEMPT = 'GET_LOCATIONS_ATTEMPT';
export const getLocationsAttempt = data => ({ type: GET_LOCATIONS_ATTEMPT, data });

export const REFRESH_LOCATIONS_ATTEMPT = 'REFRESH_LOCATIONS_ATTEMPT';
export const refreshLocationsAttempt = data => ({ type: REFRESH_LOCATIONS_ATTEMPT, data });

export const GET_LOCATIONS_SUCCESS = 'GET_LOCATIONS_SUCCESS';
export const getLocationsSuccess = data => ({ type: GET_LOCATIONS_SUCCESS, data });

export const GET_LOCATIONS_FAILURE = 'GET_LOCATIONS_FAILURE';
export const getLocationsFailure = () => ({ type: GET_LOCATIONS_FAILURE });

export const CREATE_LOCATION_ATTEMPT = 'CREATE_LOCATION_ATTEMPT';
export const createLocationAttempt = data => ({ type: CREATE_LOCATION_ATTEMPT, data });

export const CREATE_LOCATION_SUCCESS = 'CREATE_LOCATION_SUCCESS';
export const createLocationSuccess = () => ({ type: CREATE_LOCATION_SUCCESS });

export const CREATE_LOCATION_FAILURE = 'CREATE_LOCATION_FAILURE';
export const createLocationFailure = message => ({ type: CREATE_LOCATION_FAILURE, message });