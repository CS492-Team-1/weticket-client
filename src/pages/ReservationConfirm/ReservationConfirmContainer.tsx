import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  useCancelReservationMutation,
  useReserveSeatMutation,
} from '../../utils/client';
import { ReservationConfirmPresenter } from './ReservationConfirmPresenter';

export const ReservationConfirmContainer: React.FC = () => {
  const history = useHistory();

  const [reserveSeatMutation, { loading: reserveLoading }] =
    useReserveSeatMutation();
  const [cancelReservationMutation, { loading: cancelLoading }] =
    useCancelReservationMutation();

  const reserveSeat = async (reservationId: string) => {
    try {
      const { data } = await reserveSeatMutation({
        variables: {
          input: {
            reservationId,
          },
        },
      });

      if (data?.reserveSeat.ok) {
        window.alert('예약이 확정되었습니다.');
        history.push('/reservations');
      } else if (data?.reserveSeat.error) {
        window.alert(data.reserveSeat.error);
        history.push('/reservation');
      }
    } catch (err) {
      window.alert(err);
    }
  };

  const cancelReservation = async (reservationId: string) => {
    try {
      const { data } = await cancelReservationMutation({
        variables: {
          input: {
            reservationId,
          },
        },
      });
      if (data?.cancelReservation.ok) {
        window.alert('예약이 취소되었습니다.');
        history.push('/reservation');
      } else if (data?.cancelReservation.error) {
        window.alert(data?.cancelReservation.error);
        history.push('/reservation');
      }
    } catch (err) {
      window.alert(err);
    }
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
