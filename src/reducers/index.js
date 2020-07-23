import { combineReducers } from 'redux';
import nav from './nav';
import authorizationReducer from './authorization';
import errorsReducer from './errors';
import locations from './locations';
import sessionsReducer from './sessions';
import communitiesReducer from './communities';
import tipsReducer from './tips';
import auditionsReducer from './auditions';
import statisticReducer from './statistic';
import reviewsReducer from './reviews';
import userDetails from './userDetails';
import notificationsReducer from './notifications';
import bookReducer from './book';
import paymentReducer from './payments';
import chatReducer from './chat';

const allReducers = combineReducers({
  nav,
  errorsReducer,
  authorizationReducer,
  locations,
  sessionsReducer,
  communitiesReducer,
  tipsReducer,
  auditionsReducer,
  statisticReducer,
  reviewsReducer,
  userDetails,
  notificationsReducer,
  bookReducer,
  paymentReducer,
  chatReducer,
});

export default allReducers;
