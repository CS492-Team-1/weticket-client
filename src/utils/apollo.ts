import { SubscriptionClient } from 'subscriptions-transport-ws';

import { ApolloClient, from, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { accessTokenVar, cache } from './cache';

const httpLink = new HttpLink({
  uri: 'https://weticket-server.herokuapp.com/graphql',
  credentials: 'include',
});

const wsClient = new SubscriptionClient(
  'wss://weticket-server.herokuapp.com/graphql',
  {
    reconnect: true,
    connectionParams: () => {
      const accessToken = accessTokenVar();
      return {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      };
    },
  },
);

const wsLink = new WebSocketLink(wsClient);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = setContext(async (_, context) => {
  const accessToken = accessTokenVar();
  return {
    ...context,
    headers: {
      ...context.headers,
      ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions?.code) {
        case 'FORBIDDEN':
          alert('접근 권한이 없습니다.');
          localStorage.clear();
          accessTokenVar(null);
          break;
        default:
          break;
      }
      console.log(
        `[GraphQL error]: Message: ${err.message}, Location: ${JSON.stringify(
          err.locations,
        )}, Path: ${err.path}`,
      );
    }
  }

  if (networkError) {
    console.error('네트워크 상태를 확인해주세요 : ', networkError.message);
  }
});

const link = from([errorLink, authLink, splitLink]);

export const client = new ApolloClient({
  link,
  cache,
});
