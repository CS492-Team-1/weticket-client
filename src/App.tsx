import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Login, Reservation, ReservationConfirm, Reservations } from './pages';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/reservation/:time" component={Reservation} />
        <Route path="/reservation_confirm/:id" component={ReservationConfirm} />
        <Route path="/reservations" component={Reservations} />
        <Redirect from="*" to="/login" />
      </Switch>
    </BrowserRouter>
  );
};
