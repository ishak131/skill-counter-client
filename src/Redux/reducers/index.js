import { combineReducers } from 'redux';
import authReducer from './auth';
import viewAlertReducer from './viewAlert';

const rootReducers = combineReducers({ authReducer, viewAlertReducer });

export default rootReducers;
