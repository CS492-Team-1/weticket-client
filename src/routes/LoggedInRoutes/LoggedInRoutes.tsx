import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Reservation, ReservationConfirm, Reservations } from '../../pages';
import { LoggedInHeader } from './LoggedInHeader';

export const LoggedInRoutes: React.FC = () => {
  return (
    <>
      <LoggedInHeader />
      <Switch>
        <Route path="/reservation" component={Reservation} />
        <Route path="/reservation_confirm/:id" component={ReservationConfirm} />
        <Route path="/reservations" component={Reservations} />
        <Redirect from="*" to="/reservation" />
      </Switch>
    </>
  );
};
