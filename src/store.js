import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const middlewares = [
  thunk
];

const enhancers = [applyMiddleware(...middlewares)];

let composeEnhancers;
if (process.env.NODE_ENV === 'prod') {
  composeEnhancers = compose;
} else {
  composeEnhancers = require('redux-devtools-extension').composeWithDevTools;
}
const store = createStore(
  reducer,
  composeEnhancers(...enhancers)
);

export default store;
