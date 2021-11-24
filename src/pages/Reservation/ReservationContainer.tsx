import React from 'react';
import { useHistory } from 'react-router-dom';

import { gql } from '@apollo/client';

import { usePreemptSeatMutation } from '../../utils/client';
import { ReservationPresenter } from './ReservationPresenter';

gql`
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

export const ReservationContainer: React.FC = () => {
  const history = useHistory();
  const [preemptSeatMutation, { loading }] = usePreemptSeatMutation();

  const preemptSeat = async (seats: string[], time: string) => {
    const { data } = await preemptSeatMutation({
      variables: {
        input: {
          seats,
          time,
        },
      },
    });

    if (data?.preemptSeat.ok && data.preemptSeat.reservation) {
      history.push(`/reservation_confirm/${data.preemptSeat.reservation.id}`);
    } else if (data?.preemptSeat.error) {
      window.alert(data.preemptSeat.error);
    }
  };

  return <ReservationPresenter preemptSeat={preemptSeat} loading={loading} />;
};
