import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useReactiveVar } from '@apollo/client';

import { LoggedInRoutes, LoggedOutRoutes } from './routes';
import { accessTokenVar } from './utils/cache';

export const App: React.FC = () => {
  const accessToken = useReactiveVar(accessTokenVar);
  const loggedIn = !!accessToken;

  return (
    <BrowserRouter>
      {loggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </BrowserRouter>
  );
};
