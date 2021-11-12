import { InMemoryCache, makeVar } from '@apollo/client';

export const accessTokenVar = makeVar<string | null>(
  localStorage.getItem('token') || null,
);

export const cache = new InMemoryCache();
