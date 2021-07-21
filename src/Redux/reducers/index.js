import { combineReducers } from 'redux';
import authReducer from './auth';
import viewAlertReducer from './viewAlert';
import ListReducer from './opendList';

const rootReducers = combineReducers({ ListReducer, authReducer, viewAlertReducer });

export default rootReducers;
