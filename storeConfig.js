import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware } from './src/utils/redux';
import sagas from './src/sagas/rootSaga';
import AppReducer from './src/reducers';

export default initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, middleware];

  // Enable Redux DevTools Extension - see https://github.com/zalmoxisus/redux-devtools-extension
  const devToolsExtension =
      window && window.devToolsExtension ? window.devToolsExtension() : f => f;

  const store = createStore(AppReducer, initialState, compose(
    applyMiddleware(...middlewares),
    devToolsExtension,
  ));

  sagaMiddleware.run(sagas);

  return store;
};

