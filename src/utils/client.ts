import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CancelReservationInput = {
  reservationId: Scalars['String'];
};

export type CancelReservationOutput = {
  __typename?: 'CancelReservationOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};


export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelReservation: CancelReservationOutput;
  login: LoginOutput;
  preemptSeat: PreemptSeatOutput;
  register: RegisterOutput;
  reserveSeat: ReserveSeatOutput;
};


export type MutationCancelReservationArgs = {
  input: CancelReservationInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPreemptSeatArgs = {
  input: PreemptSeatInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationReserveSeatArgs = {
  input: ReserveSeatInput;
};

export type PreemptSeatInput = {
  seats: Array<Scalars['String']>;
  time: Scalars['DateTime'];
};

export type PreemptSeatOutput = {
  __typename?: 'PreemptSeatOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  reservation?: Maybe<Reservation>;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  reservation: ReservationOutput;
  reservations: ReservationsOutput;
};


export type QueryReservationArgs = {
  input: ReservationInput;
};


export type QueryReservationsArgs = {
  input: ReservationsInput;
};

export type RegisterInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterOutput = {
  __typename?: 'RegisterOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['String'];
  preemptedAt?: Maybe<Scalars['DateTime']>;
  seats: Array<Scalars['String']>;
  status: ReservationStatus;
  time: Scalars['DateTime'];
  user: User;
};

export type ReservationInput = {
  reservationId: Scalars['String'];
};

export type ReservationOutput = {
  __typename?: 'ReservationOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  reservation?: Maybe<Reservation>;
};

export enum ReservationStatus {
  Preempted = 'PREEMPTED',
  Reserved = 'RESERVED'
}

export type ReservationsInput = {
  time: Scalars['DateTime'];
};

export type ReservationsOutput = {
  __typename?: 'ReservationsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  reservations?: Maybe<Array<Reservation>>;
};

export type ReserveSeatInput = {
  reservationId: Scalars['String'];
};

export type ReserveSeatOutput = {
  __typename?: 'ReserveSeatOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  reservation?: Maybe<Reservation>;
};

export type Subscription = {
  __typename?: 'Subscription';
  canceledReservationOnTime: Reservation;
  newReservationOnTime: Reservation;
};


export type SubscriptionCanceledReservationOnTimeArgs = {
  time: Scalars['DateTime'];
};


export type SubscriptionNewReservationOnTimeArgs = {
  time: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  reservations: Array<Reservation>;
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginOutput' }
    & Pick<LoginOutput, 'ok' | 'error' | 'accessToken'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterOutput' }
    & Pick<RegisterOutput, 'ok' | 'error'>
  ) }
);

export type PreemptSeatMutationVariables = Exact<{
  input: PreemptSeatInput;
}>;


export type PreemptSeatMutation = (
  { __typename?: 'Mutation' }
  & { preemptSeat: (
    { __typename?: 'PreemptSeatOutput' }
    & Pick<PreemptSeatOutput, 'ok' | 'error'>
    & { reservation?: Maybe<(
      { __typename?: 'Reservation' }
      & Pick<Reservation, 'id' | 'time' | 'status' | 'preemptedAt'>
    )> }
  ) }
);

export type ReservationsQueryVariables = Exact<{
  input: ReservationsInput;
}>;


export type ReservationsQuery = (
  { __typename?: 'Query' }
  & { reservations: (
    { __typename?: 'ReservationsOutput' }
    & Pick<ReservationsOutput, 'ok' | 'error'>
    & { reservations?: Maybe<Array<(
      { __typename?: 'Reservation' }
      & Pick<Reservation, 'seats'>
    )>> }
  ) }
);

export type NewReservationOnTimeSubscriptionVariables = Exact<{
  time: Scalars['DateTime'];
}>;


export type NewReservationOnTimeSubscription = (
  { __typename?: 'Subscription' }
  & { newReservationOnTime: (
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'id' | 'seats'>
  ) }
);

export type CanceledReservationOnTimeSubscriptionVariables = Exact<{
  time: Scalars['DateTime'];
}>;


export type CanceledReservationOnTimeSubscription = (
  { __typename?: 'Subscription' }
  & { canceledReservationOnTime: (
    { __typename?: 'Reservation' }
    & Pick<Reservation, 'id' | 'seats'>
  ) }
);

export type ReservationQueryVariables = Exact<{
  input: ReservationInput;
}>;


export type ReservationQuery = (
  { __typename?: 'Query' }
  & { reservation: (
    { __typename?: 'ReservationOutput' }
    & Pick<ReservationOutput, 'ok' | 'error'>
    & { reservation?: Maybe<(
      { __typename?: 'Reservation' }
      & Pick<Reservation, 'id' | 'seats' | 'time' | 'status' | 'preemptedAt'>
    )> }
  ) }
);

export type CancelReservationMutationVariables = Exact<{
  input: CancelReservationInput;
}>;


export type CancelReservationMutation = (
  { __typename?: 'Mutation' }
  & { cancelReservation: (
    { __typename?: 'CancelReservationOutput' }
    & Pick<CancelReservationOutput, 'ok' | 'error'>
  ) }
);

export type ReserveSeatMutationVariables = Exact<{
  input: ReserveSeatInput;
}>;


export type ReserveSeatMutation = (
  { __typename?: 'Mutation' }
  & { reserveSeat: (
    { __typename?: 'ReserveSeatOutput' }
    & Pick<ReserveSeatOutput, 'ok' | 'error'>
    & { reservation?: Maybe<(
      { __typename?: 'Reservation' }
      & Pick<Reservation, 'id' | 'time' | 'status' | 'preemptedAt'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'username'>
    & { reservations: Array<(
      { __typename?: 'Reservation' }
      & Pick<Reservation, 'id' | 'seats' | 'time' | 'status' | 'preemptedAt'>
    )> }
  ) }
);


export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    ok
    error
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    ok
    error
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const PreemptSeatDocument = gql`
    mutation preemptSeat($input: PreemptSeatInput!) {
  preemptSeat(input: $input) {
    ok
    error
    reservation {
      id
      time
      status
      preemptedAt
    }
  }
}
    `;
export type PreemptSeatMutationFn = Apollo.MutationFunction<PreemptSeatMutation, PreemptSeatMutationVariables>;

/**
 * __usePreemptSeatMutation__
 *
 * To run a mutation, you first call `usePreemptSeatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePreemptSeatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [preemptSeatMutation, { data, loading, error }] = usePreemptSeatMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePreemptSeatMutation(baseOptions?: Apollo.MutationHookOptions<PreemptSeatMutation, PreemptSeatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PreemptSeatMutation, PreemptSeatMutationVariables>(PreemptSeatDocument, options);
      }
export type PreemptSeatMutationHookResult = ReturnType<typeof usePreemptSeatMutation>;
export type PreemptSeatMutationResult = Apollo.MutationResult<PreemptSeatMutation>;
export type PreemptSeatMutationOptions = Apollo.BaseMutationOptions<PreemptSeatMutation, PreemptSeatMutationVariables>;
export const ReservationsDocument = gql`
    query reservations($input: ReservationsInput!) {
  reservations(input: $input) {
    ok
    error
    reservations {
      seats
    }
  }
}
    `;

/**
 * __useReservationsQuery__
 *
 * To run a query within a React component, call `useReservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReservationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReservationsQuery(baseOptions: Apollo.QueryHookOptions<ReservationsQuery, ReservationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReservationsQuery, ReservationsQueryVariables>(ReservationsDocument, options);
      }
export function useReservationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReservationsQuery, ReservationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReservationsQuery, ReservationsQueryVariables>(ReservationsDocument, options);
        }
export type ReservationsQueryHookResult = ReturnType<typeof useReservationsQuery>;
export type ReservationsLazyQueryHookResult = ReturnType<typeof useReservationsLazyQuery>;
export type ReservationsQueryResult = Apollo.QueryResult<ReservationsQuery, ReservationsQueryVariables>;
export const NewReservationOnTimeDocument = gql`
    subscription newReservationOnTime($time: DateTime!) {
  newReservationOnTime(time: $time) {
    id
    seats
  }
}
    `;

/**
 * __useNewReservationOnTimeSubscription__
 *
 * To run a query within a React component, call `useNewReservationOnTimeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewReservationOnTimeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewReservationOnTimeSubscription({
 *   variables: {
 *      time: // value for 'time'
 *   },
 * });
 */
export function useNewReservationOnTimeSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewReservationOnTimeSubscription, NewReservationOnTimeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewReservationOnTimeSubscription, NewReservationOnTimeSubscriptionVariables>(NewReservationOnTimeDocument, options);
      }
export type NewReservationOnTimeSubscriptionHookResult = ReturnType<typeof useNewReservationOnTimeSubscription>;
export type NewReservationOnTimeSubscriptionResult = Apollo.SubscriptionResult<NewReservationOnTimeSubscription>;
export const CanceledReservationOnTimeDocument = gql`
    subscription canceledReservationOnTime($time: DateTime!) {
  canceledReservationOnTime(time: $time) {
    id
    seats
  }
}
    `;

/**
 * __useCanceledReservationOnTimeSubscription__
 *
 * To run a query within a React component, call `useCanceledReservationOnTimeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCanceledReservationOnTimeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCanceledReservationOnTimeSubscription({
 *   variables: {
 *      time: // value for 'time'
 *   },
 * });
 */
export function useCanceledReservationOnTimeSubscription(baseOptions: Apollo.SubscriptionHookOptions<CanceledReservationOnTimeSubscription, CanceledReservationOnTimeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CanceledReservationOnTimeSubscription, CanceledReservationOnTimeSubscriptionVariables>(CanceledReservationOnTimeDocument, options);
      }
export type CanceledReservationOnTimeSubscriptionHookResult = ReturnType<typeof useCanceledReservationOnTimeSubscription>;
export type CanceledReservationOnTimeSubscriptionResult = Apollo.SubscriptionResult<CanceledReservationOnTimeSubscription>;
export const ReservationDocument = gql`
    query reservation($input: ReservationInput!) {
  reservation(input: $input) {
    ok
    error
    reservation {
      id
      seats
      time
      status
      preemptedAt
    }
  }
}
    `;

/**
 * __useReservationQuery__
 *
 * To run a query within a React component, call `useReservationQuery` and pass it any options that fit your needs.
 * When your component renders, `useReservationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReservationQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReservationQuery(baseOptions: Apollo.QueryHookOptions<ReservationQuery, ReservationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReservationQuery, ReservationQueryVariables>(ReservationDocument, options);
      }
export function useReservationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReservationQuery, ReservationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReservationQuery, ReservationQueryVariables>(ReservationDocument, options);
        }
export type ReservationQueryHookResult = ReturnType<typeof useReservationQuery>;
export type ReservationLazyQueryHookResult = ReturnType<typeof useReservationLazyQuery>;
export type ReservationQueryResult = Apollo.QueryResult<ReservationQuery, ReservationQueryVariables>;
export const CancelReservationDocument = gql`
    mutation cancelReservation($input: CancelReservationInput!) {
  cancelReservation(input: $input) {
    ok
    error
  }
}
    `;
export type CancelReservationMutationFn = Apollo.MutationFunction<CancelReservationMutation, CancelReservationMutationVariables>;

/**
 * __useCancelReservationMutation__
 *
 * To run a mutation, you first call `useCancelReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelReservationMutation, { data, loading, error }] = useCancelReservationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelReservationMutation(baseOptions?: Apollo.MutationHookOptions<CancelReservationMutation, CancelReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelReservationMutation, CancelReservationMutationVariables>(CancelReservationDocument, options);
      }
export type CancelReservationMutationHookResult = ReturnType<typeof useCancelReservationMutation>;
export type CancelReservationMutationResult = Apollo.MutationResult<CancelReservationMutation>;
export type CancelReservationMutationOptions = Apollo.BaseMutationOptions<CancelReservationMutation, CancelReservationMutationVariables>;
export const ReserveSeatDocument = gql`
    mutation reserveSeat($input: ReserveSeatInput!) {
  reserveSeat(input: $input) {
    ok
    error
    reservation {
      id
      time
      status
      preemptedAt
    }
  }
}
    `;
export type ReserveSeatMutationFn = Apollo.MutationFunction<ReserveSeatMutation, ReserveSeatMutationVariables>;

/**
 * __useReserveSeatMutation__
 *
 * To run a mutation, you first call `useReserveSeatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReserveSeatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reserveSeatMutation, { data, loading, error }] = useReserveSeatMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReserveSeatMutation(baseOptions?: Apollo.MutationHookOptions<ReserveSeatMutation, ReserveSeatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReserveSeatMutation, ReserveSeatMutationVariables>(ReserveSeatDocument, options);
      }
export type ReserveSeatMutationHookResult = ReturnType<typeof useReserveSeatMutation>;
export type ReserveSeatMutationResult = Apollo.MutationResult<ReserveSeatMutation>;
export type ReserveSeatMutationOptions = Apollo.BaseMutationOptions<ReserveSeatMutation, ReserveSeatMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    username
    reservations {
      id
      seats
      time
      status
      preemptedAt
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;