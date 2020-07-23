import {
  CREATE_LOCATIONS_ATTEMPT,
  CREATE_LOCATIONS_SUCCESS,
  CREATE_LOCATIONS_FAILURE,
  GET_LOCATIONS_ATTEMPT,
  REFRESH_LOCATIONS_ATTEMPT,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAILURE,
  CREATE_LOCATION_ATTEMPT,
  CREATE_LOCATION_SUCCESS,
  CREATE_LOCATION_FAILURE,
} from '../actions/locations';

const initialState = {
  locations: null,
  isLoading: false,
  isReady: false,
  isRefreshing: false,
  coordinates: {
    longitude: 0,
    latitude: 0,
  },
  msg: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_LOCATIONS_ATTEMPT:
    case GET_LOCATIONS_ATTEMPT:
    case CREATE_LOCATION_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        isReady: false,
        isRefreshing: false,
        msg: '',
      };
    case REFRESH_LOCATIONS_ATTEMPT:
      return {
        ...state,
        isLoading: false,
        isReady: false,
        isRefreshing: true,
        msg: '',
      };
    case CREATE_LOCATIONS_SUCCESS:
    case CREATE_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        locations: action.data,
        msg: '',
      };
    case GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isReady: true,
        isRefreshing: false,
        locations: action.data.locations,
        coordinates: action.data.coordinates ? action.data.coordinates : state.coordinates,
        msg: '',
      };
    case CREATE_LOCATIONS_FAILURE:
    case GET_LOCATIONS_FAILURE:
    case CREATE_LOCATION_FAILURE:
      return {
        ...state,
        locations: null,
        isLoading: false,
        isRefreshing: false,
        isReady: true,
        msg: action.message,
      };
    default:
      return state;
  }
};
