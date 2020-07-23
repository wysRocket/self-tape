import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state,
);
const addListener = createReduxBoundAddListener('root');

export {
  middleware,
  addListener,
};
