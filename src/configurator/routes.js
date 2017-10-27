import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import ConfiguratorPage from './components/configurator/ConfiguratorPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ConfiguratorPage} />
    <Route path="configurator" component={ConfiguratorPage} />
    <Route path="*" component={ConfiguratorPage} />
  </Route>
);