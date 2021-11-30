import React from 'react';

import {
  useCancelReservationMutation,
  useReserveSeatMutation,
} from '../../utils/client';
import { ReservationConfirmPresenter } from './ReservationConfirmPresenter';

export const ReservationConfirmContainer: React.FC = () => {
  const [reserveSeatMutation, { loading: reserveLoading }] =
    useReserveSeatMutation();
  const [cancelReservationMutation, { loading: cancelLoading }] =
    useCancelReservationMutation();

  const reserveSeat = async (reservationId: string) => {
    await reserveSeatMutation({
      variables: {
        input: {
          reservationId,
        },
      },
    });
  };

  const cancelReservation = async (reservationId: string) => {
    await cancelReservationMutation({
      variables: {
        input: {
          reservationId,
        },
      },
    });
  };

  return (
    <ReservationConfirmPresenter
      reserveSeat={reserveSeat}
      reserveLoading={reserveLoading}
      cancelReservation={cancelReservation}
      cancelLoading={cancelLoading}
    />
  );
};
