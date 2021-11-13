import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Login } from '../pages';

export const LoggedOutRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Redirect from="*" to="/login" />
    </Switch>
  );
};
