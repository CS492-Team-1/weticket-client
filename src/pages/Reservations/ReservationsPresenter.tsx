import React from 'react';
import styled from 'styled-components';

import { gql } from '@apollo/client';

import { useMeQuery } from '../../utils/client';

gql`
  query me {
    me {
      username
      reservations {
        id
        time
        status
        preemptedAt
      }
    }
  }
`;

//TODO : prop type 정의
type ReservationPresenterProps = {};

export const ReservationsPresenter: React.FC<ReservationPresenterProps> =
  () => {
    //TODO: 예약 목록 렌더링 및 예약 취소 구현
    const { data, loading } = useMeQuery();
    const reservations = data?.me.reservations || [];

    const result = loading ? (
      <SContainer>
        <h1>loading</h1>
      </SContainer>
    ) : (
      <SContainer>
        Reservations
        <div>{JSON.stringify(reservations)}</div>
      </SContainer>
    );

    return result;
  };

const SContainer = styled.div`
  flex: 1;
`;
