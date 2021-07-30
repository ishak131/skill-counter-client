import { combineReducers } from 'redux';
import authReducer from './auth';
import viewAlertReducer from './viewAlert';
import ListReducer from './opendList';
import UpdateSkillScoreReducer from './updateSkill';

const rootReducers = combineReducers({ UpdateSkillScoreReducer, ListReducer, authReducer, viewAlertReducer });

export default rootReducers;
