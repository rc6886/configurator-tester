import {combineReducers} from 'redux';
import configurator from './configuratorReducer';
import templates from './templateReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import settings from './settingsReducer';
import messages from './messageReducer';

const rootReducer = combineReducers({
  configurator,
  templates,
  ajaxCallsInProgress,
  settings,
  messages
});

export default rootReducer;
