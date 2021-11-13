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
  seat: Scalars['Float'];
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
  reservations: ReservationsOutput;
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
  reservedAt?: Maybe<Scalars['DateTime']>;
  seat: Scalars['Float'];
  status: ReservationStatus;
  time: Scalars['DateTime'];
  user: User;
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