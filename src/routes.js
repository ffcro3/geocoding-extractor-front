import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/Homepage';
import Home from './pages/Home';
import Import from './pages/Import';
import Extract from './pages/Extract';
import View from './pages/View';
import Settings from './pages/Settings';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/home" exact component={Home} />
        <Route path="/extract" exact component={Extract} />
        <Route path="/view" exact component={View} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/import-new" exact component={Import} />
      </Switch>
    </BrowserRouter>
  );
}
