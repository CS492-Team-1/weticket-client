import React from 'react';

import { useCancelReservation, useReserveSeat } from '../../hooks';
import { ReservationsPresenter } from './ReservationsPresenter';

export const ReservationsContainer: React.FC = () => {
  const { cancelReservation: cancelReservationMutation } =
    useCancelReservation();

  const { reserveSeat: reserveSeatMutation } = useReserveSeat();

  /**
   * 예약 취소
   * 성공시, 예약 성공 alert 띄움
   * 실패시, 에러메시지 alert 띄움
   * @param reservationId 예약 아이디
   */
  const cancelReservation = async (reservationId: string) => {
    try {
      const response = await cancelReservationMutation(reservationId);

      if (response?.data?.cancelReservation.ok) {
        window.alert('예약이 취소되었습니다.');
      } else if (response?.data?.cancelReservation.error) {
        window.alert(response.data.cancelReservation.error);
      }
    } catch (err) {
      window.alert(err);
    }
  };

  /**
   * 예약 확정
   * 성공시, 예약 확정 alert 띄움
   * 실패시, 에러메시지 alert 띄움
   * @param reservationId  예약 아이디
   */
  const reserveSeat = async (reservationId: string) => {
    try {
      const response = await reserveSeatMutation(reservationId);

      if (response?.data?.reserveSeat.ok) {
        window.alert('예약이 확정되었습니다.');
      } else if (response?.data?.reserveSeat.error) {
        window.alert(response.data.reserveSeat.error);
      }
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <ReservationsPresenter
      reserveSeat={reserveSeat}
      cancelReservation={cancelReservation}
    />
  );
};
