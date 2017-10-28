import 'core-js/fn/array';
import 'core-js/fn/function';
import 'core-js/fn/object';
import 'core-js/fn/promise';
import 'core-js/es6/symbol';

import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import {loadOptions,updatePrice} from './actions/optionActions';
import {loadSettings} from './actions/settingsActions';
import {loadTemplates} from './actions/templateActions';
import {saveConfiguration} from './actions/saveActions';
import './styles/styles.css';
import initialState from './reducers/initialState';
import configuratorSettings from './settings';
import db from './localstorage/dexieDB';

const store = () => {
  initialState.settings = configuratorSettings;
  configureStore(initialState);
}

window.reduxStore = store;

export function init(element, templates, config) {
  store.dispatch(loadSettings(config));
  store.dispatch(loadOptions());

  // do stuff with templates
  store.dispatch(loadTemplates(templates));

  render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById(element)
  );
}

export function save(successCallback, failureCallback) {
  if (!successCallback || !failureCallback) {
    throw "Cannot save: must provide a callback for both success and failure scenarios.";
  }

  store.dispatch(saveConfiguration(successCallback, failureCallback));
}
