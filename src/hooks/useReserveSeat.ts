import { gql } from '@apollo/client';

import { useReserveSeatMutation } from '../utils/client';

gql`
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

export const useReserveSeat = () => {
  const [reserveSeatMutation, { loading }] = useReserveSeatMutation();

  const reserveSeat = async (reservationId: string) => {
    try {
      const response = await reserveSeatMutation({
        variables: {
          input: {
            reservationId,
          },
        },
      });

      return response;
    } catch (err) {
      window.alert(err);
    }
  };

  return {
    reserveSeat,
    loading,
  };
};
