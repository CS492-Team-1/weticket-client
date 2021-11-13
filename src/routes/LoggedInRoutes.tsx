import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Reservation, ReservationConfirm, Reservations } from '../pages';
import { accessTokenVar } from '../utils/cache';

export const LoggedInRoutes: React.FC = () => {
  const _logout = () => {
    localStorage.removeItem('token');
    accessTokenVar(null);
  };

  return (
    <>
      <button onClick={_logout}>로그아웃</button>
      <Switch>
        <Route path="/reservation" component={Reservation} />
        <Route path="/reservation_confirm/:id" component={ReservationConfirm} />
        <Route path="/reservations" component={Reservations} />
        <Redirect from="*" to="/reservation" />
      </Switch>
    </>
  );
};
