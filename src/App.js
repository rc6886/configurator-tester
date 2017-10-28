import React, { Component } from 'react';
import { Provider } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import initialState from './configurator/reducers/initialState';
import configureStore from './configurator/store/configureStore';
import ConfiguratorPage from './configurator/components/configurator/ConfiguratorPage';
import configuratorSettings from './configurator/settings';
import { loadOptions } from './configurator/actions/optionActions';
import { loadSettings } from './configurator/actions/settingsActions';
import { loadTemplates } from './configurator/actions/templateActions';
import { groups, options } from './configurator/templates'; 

const store = configureStore(initialState);

class App extends Component {
  constructor(props) {
    super(props);

    store.dispatch(loadSettings(configuratorSettings));

    const templates = { groups, options };
    store.dispatch(loadTemplates(templates));
    store.dispatch(loadOptions());
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>Configurator Below</h2>
        <Provider store={store}>
          <ConfiguratorPage />
        </Provider>
      </div>
    );
  }
}

export default App;
