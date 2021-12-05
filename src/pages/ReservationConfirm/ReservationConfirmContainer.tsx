import React from 'react';
import { useHistory } from 'react-router-dom';

import { useCancelReservation, useReserveSeat } from '../../hooks';
import { ReservationConfirmPresenter } from './ReservationConfirmPresenter';

export const ReservationConfirmContainer: React.FC = () => {
  const history = useHistory();

  const { reserveSeat: reserveSeatMutation, loading: reserveLoading } =
    useReserveSeat();
  const {
    cancelReservation: cancelReservationMutation,
    loading: cancelLoading,
  } = useCancelReservation();

  const reserveSeat = async (reservationId: string) => {
    try {
      const response = await reserveSeatMutation(reservationId);

      if (response?.data?.reserveSeat.ok) {
        window.alert('예약이 확정되었습니다.');
        history.push('/reservations');
      } else if (response?.data?.reserveSeat.error) {
        window.alert(response.data.reserveSeat.error);
        history.push('/reservation');
      }
    } catch (err) {
      window.alert(err);
    }
  };

  const cancelReservation = async (reservationId: string) => {
    try {
      const response = await cancelReservationMutation(reservationId);
      if (response?.data?.cancelReservation.ok) {
        window.alert('예약이 취소되었습니다.');
        history.push('/reservation');
      } else if (response?.data?.cancelReservation.error) {
        window.alert(response?.data?.cancelReservation.error);
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
