import React from 'react';

import { gql } from '@apollo/client';

import { useCancelReservationMutation } from '../../utils/client';
import { ReservationsPresenter } from './ReservationsPresenter';

gql`
  mutation cancelReservation($input: CancelReservationInput!) {
    cancelReservation(input: $input) {
      ok
      error
    }
  }
`;

export const ReservationsContainer: React.FC = () => {
  const [cancelReservationMutation, { loading }] =
    useCancelReservationMutation();

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

  //TODO : prop으로 필요한 데이터 및 메소드 전달
  return <ReservationsPresenter />;
};
