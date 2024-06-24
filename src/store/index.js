// == Import : npm
import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';

// == Import : local
import rootReducer from 'src/reducers';
import fansunMiddleware from '../middleware/fansunMiddleware';

// == Enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    fansunMiddleware
  ),
);

// == Store
const store = createStore(
  rootReducer,
  // preloadedState,
  enhancers,
);

// == Export
export default store;
