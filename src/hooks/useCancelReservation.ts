import { gql } from '@apollo/client';

import { useCancelReservationMutation } from '../utils/client';

gql`
  mutation cancelReservation($input: CancelReservationInput!) {
    cancelReservation(input: $input) {
      ok
      error
    }
  }
`;

export const useCancelReservation = () => {
  const [cancelReservationMutation, { loading }] =
    useCancelReservationMutation();

  const cancelReservation = async (reservationId: string) => {
    try {
      const response = await cancelReservationMutation({
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
    cancelReservation,
    loading,
  };
};
