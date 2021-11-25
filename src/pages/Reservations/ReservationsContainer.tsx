import React from 'react';

import { gql } from '@apollo/client';

import {
  useCancelReservationMutation,
  useReserveSeatMutation,
} from '../../utils/client';
import { ReservationsPresenter } from './ReservationsPresenter';

gql`
  mutation cancelReservation($input: CancelReservationInput!) {
    cancelReservation(input: $input) {
      ok
      error
    }
  }

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

export const ReservationsContainer: React.FC = () => {
  const [cancelReservationMutation, { loading: cancelReservationLoading }] =
    useCancelReservationMutation();

  const [reserveSeatMutation, { loading: reserveSeatLoading }] =
    useReserveSeatMutation();

  /**
   * 예약 취소
   * 성공시, 예약 성공 alert 띄움
   * 실패시, 에러메시지 alert 띄움
   * @param reservationId 예약 아이디
   */
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
      } else if (data?.cancelReservation.error) {
        window.alert(data.cancelReservation.error);
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
      const { data } = await reserveSeatMutation({
        variables: {
          input: {
            reservationId,
          },
        },
      });

      if (data?.reserveSeat.ok) {
        window.alert('예약이 확정되었습니다.');
      } else if (data?.reserveSeat.error) {
        window.alert(data.reserveSeat.error);
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
