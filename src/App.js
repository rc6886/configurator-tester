import React, { Component } from 'react';
import { Provider } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import initialState from './configurator/reducers/initialState';
import configureStore from './configurator/store/configureStore';
import ConfiguratorPage from './configurator/components/configurator/ConfiguratorPage';

const store = configureStore(initialState);

class App extends Component {
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
