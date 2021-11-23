import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Reservation, ReservationConfirm, Reservations } from '../pages';
import { accessTokenVar } from '../utils/cache';
import LogOutButton from './LogOutButton';

export const LoggedInRoutes: React.FC = () => {
  const _logout = () => {
    localStorage.removeItem('token');
    accessTokenVar(null);
  };

  return (
    <>
      <LogOutButton onClick={_logout}>로그아웃</LogOutButton>
      <Switch>
        <Route path="/reservation" component={Reservation} />
        <Route path="/reservation_confirm/:id" component={ReservationConfirm} />
        <Route path="/reservations" component={Reservations} />
        <Redirect from="*" to="/reservation" />
      </Switch>
    </>
  );
};
