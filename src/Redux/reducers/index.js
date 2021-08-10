import { combineReducers } from 'redux';
import authReducer from './auth';
import viewAlertReducer from './viewAlert';
import ListReducer from './opendList';
import arrayOfListsReducer from './arrayOfLists';

const rootReducers = combineReducers({ ListReducer, authReducer, viewAlertReducer, arrayOfListsReducer });

export default rootReducers;
