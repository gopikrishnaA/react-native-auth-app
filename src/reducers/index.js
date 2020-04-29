import { combineReducers } from 'redux';
import authReducer from './auth';
import loaderReducer from './loader';
import jokesReducer from './jokes';


export default combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  jokes: jokesReducer
});
