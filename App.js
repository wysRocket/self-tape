import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './storeConfig';
import AppWithNavigationState from './src/routes/AppNavigator';
import OverlayAlert from './src/custom-components/OverlayAlert';
import { setOverlay } from './src/helpers';

console.disableYellowBox = true;

const store = configureStore();

export default () => (
  <Provider store={store}>
    <OverlayAlert ref={node => setOverlay(node)} />
    <AppWithNavigationState />
  </Provider>
);
