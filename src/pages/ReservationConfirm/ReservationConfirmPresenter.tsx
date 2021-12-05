import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../../assets/styles/colors';
import { Spinner } from '../../components';
import { ReservationStatus, useReservationQuery } from '../../utils/client';

type ReservationConfirmPresenterProps = {
  reserveLoading: boolean;
  cancelLoading: boolean;
  reserveSeat: (reservationId: string) => Promise<void>;
  cancelReservation: (reservationId: string) => Promise<void>;
};

export const ReservationConfirmPresenter: React.FC<ReservationConfirmPresenterProps> =
  ({ reserveLoading, cancelLoading, reserveSeat, cancelReservation }) => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const { data, loading } = useReservationQuery({
      variables: {
        input: {
          reservationId: id,
        },
      },
      onCompleted: data => {
        if (
          data.reservation.reservation?.status === ReservationStatus.Reserved
        ) {
          window.alert('이미 예약된 좌석입니다.');
          history.push('/reservation');
        }
      },
      onError: err => {
        window.alert(err);
        history.push('/reservation');
      },
    });

    const reservationDate = () => {
      if (!data?.reservation.reservation) {
        return null;
      }

      return data.reservation.reservation.time.split('T')[0];
    };

    const reservationTime = () => {
      if (!data?.reservation.reservation) {
        return null;
      }
      const timeString = data.reservation.reservation.time.split('T')[1];

      const [hour, minute] = timeString.split(':');
      const hourAsNumber = parseInt(hour, 10);

      const a = hourAsNumber >= 12 ? '오후' : '오전';

      const parsedHour = hourAsNumber > 12 ? hourAsNumber - 12 : hourAsNumber;

      return `${a} ${parsedHour}:${minute}`;
    };

    const onPressConfirm = async () => {
      if (reserveLoading) return;
      await reserveSeat(id);
    };

    const onPressCancel = async () => {
      if (cancelLoading) return;
      await cancelReservation(id);
    };

    return loading ? (
      <Loader>
        <Spinner />
      </Loader>
    ) : (
      <Container>
        <Content>
          <InputHeader first>날짜</InputHeader>
          <Text>{reservationDate()}</Text>
          <InputHeader>시간</InputHeader>
          <Text>{reservationTime()}</Text>
          <InputHeader>선택좌석</InputHeader>
          <Text>{data?.reservation.reservation?.seats.join(', ')}</Text>
          <Buttons>
            <CancelButton loading={cancelLoading} onClick={onPressCancel}>
              예약 취소
            </CancelButton>
            <ConfirmButton loading={reserveLoading} onClick={onPressConfirm}>
              예약 확정
            </ConfirmButton>
          </Buttons>
        </Content>
      </Container>
    );
  };

const Container = styled.div`
  flex: 1;
  margin-top: 40px;
  background-color: ${colors.white};
  @media (min-width: 1100px) {
    height: calc(100vh - 80px);
    margin-top: 80px;
    padding-top: 40px;
    background-color: ${colors.primary};
    box-sizing: border-box;
  }
`;

const Content = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
  flex-direction: column;
  @media (min-width: 1100px) {
    width: 1100px;
    border-radius: 12px;
    background-color: ${colors.white};
    padding: 40px;
  }
`;

const InputHeader = styled.p<{ first?: boolean }>`
  font-weight: 700;
  font-size: 8;
  line-height: 1.6;
  margin-top: ${props => (props.first ? 0 : 10)}px;
  margin-bottom: 5px;
`;

const Loader = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
`;

const Text = styled.p`
  font-size: 15px;
  line-height: 1.6;
  font-weight: 400;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  @media (min-width: 1100px) {
    margin-top: 200px;
  }
`;

const CancelButton = styled.div<{ loading: boolean }>`
  width: 100px;
  height: 44px;
  border-radius: 6px;
  border: 3px solid ${props => (props.loading ? colors.gray : colors.primary)};
  cursor: ${props => (props.loading ? 'progress' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => (props.loading ? colors.gray : colors.primary)};
  font-size: 18px;
  font-weight: 700;
  @media (min-width: 1100px) {
    width: 270px;
  }
`;

const ConfirmButton = styled.div<{ loading: boolean }>`
  width: 100px;
  height: 44px;
  border-radius: 6px;
  border: 3px solid ${props => (props.loading ? colors.gray : colors.primary)};
  cursor: ${props => (props.loading ? 'progress' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.loading ? colors.gray : colors.primary)};
  color: ${colors.white};
  font-size: 18px;
  font-weight: 700;
  @media (min-width: 1100px) {
    width: 270px;
  }
`;
