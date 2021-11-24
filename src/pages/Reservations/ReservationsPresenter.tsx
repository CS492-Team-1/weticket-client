import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../assets/styles/colors';
import { gql } from '@apollo/client';

import { Reservation, ReservationStatus, useMeQuery } from '../../utils/client';
import { Spinner } from '../../components';

gql`
  query me {
    me {
      username
      reservations {
        id
        seats
        time
        status
        preemptedAt
      }
    }
  }
`;

//TODO : prop type 정의
type ReservationPresenterProps = {};

export const ReservationsPresenter: React.FC<ReservationPresenterProps> =
  () => {
    const { data, loading } = useMeQuery();
    const [clicked, setClicked] = useState('');
    const reservations = data?.me.reservations || [];
    const preempted = reservations.filter(
      reservation => reservation.status === ReservationStatus.Preempted,
    );
    const reserved = reservations.filter(
      reservation => reservation.status === ReservationStatus.Reserved,
    );

    const timeParser = (
      reservation: {
        __typename?: 'Reservation' | undefined;
      } & Pick<Reservation, 'id' | 'time' | 'status' | 'preemptedAt'>,
    ) => {
      let result: string = reservation.time;
      result = result.replace('T', ' ');
      result = result.substring(0, result.lastIndexOf(':'));
      return result;
    };

    const ReservationBlock = (
      reservation: {
        __typename?: 'Reservation' | undefined;
      } & Pick<Reservation, 'id' | 'time' | 'status' | 'preemptedAt'>,
    ) => {
      const result = reservation.__typename === 'Reservation' && (
        <div onClick={() => setClicked(clicked => reservation.id)}>
          <BlockLid>
            <Text className="title">공연명</Text>
          </BlockLid>
          <BlockBottom isClicked={clicked === reservation.id}>
            <Text className="location">장소</Text>
            <Text className="date">
              시각
              <br />
              {timeParser(reservation)}
            </Text>
            <VerticalLine />
            {reservation.status === ReservationStatus.Preempted
              ? clicked === reservation.id && (
                  <>
                    <Text className="seat">선택 좌석</Text>
                    <Button className="reservation">예약 확정</Button>
                    <Button className="cancelPreempted">예약 취소</Button>
                  </>
                )
              : clicked === reservation.id && (
                  <>
                    <Text className="seat">선택 좌석</Text>
                    <Button className="cancelReserved">예약 취소</Button>
                  </>
                )}
          </BlockBottom>
        </div>
      );
      return result;
    };

    const loadingScreen = <Spinner />;

    const loadedScreen = (
      <SContainer>
        {preempted.length !== 0 && '예약 미완료'}
        {preempted.map(reservation => ReservationBlock(reservation))}
        {reserved.length !== 0 && '예약 완료'}
        {reserved.map(reservation => ReservationBlock(reservation))}
      </SContainer>
    );

    return loading ? loadingScreen : loadedScreen;
  };

const BlockLid = styled.div`
  width: 304px;
  height: 30px;
  margin-right: 8px;
  border-radius: 6px 6px 0px 0px;
  background: ${colors.primary};
`;

const BlockBottom = styled.div<{ isClicked: boolean }>`
  display: flex;
  box-sizing: content-box;
  width: 304px;
  height: ${props => (props.isClicked ? '123px' : '38px')};
  margin-right: 8px;
  background: ${colors.gray};
  border-radius: 0px 0px 6px 6px;
`;

const handleText = (className: string) => {
  switch (className) {
    case 'location':
      return 'line-height: 12px;padding-top: 4px;';
    case 'date':
      return 'padding-top: 2px;line-height: 16px;left: 160px;';
    case 'title':
      return `color: ${colors.white};line-height: 14px;margin-top: 8px; font-size:12px`;
    case 'seat':
      return `padding-top: 38px`;
    default:
      return '';
  }
};

const Text = styled.h1<{ className: string }>`
  position: absolute;
  height: 12px;
  padding-left: 8px;
  font-size: 10px;
  ${props => props.className && handleText(props.className)}
`;

const VerticalLine = styled.div`
  position: absolute;
  height: 24px;
  left: 160px;
  margin-top: 6px;
  border: 1px solid ${colors.primary_light};
`;

const handleButton = (className: string) => {
  switch (className) {
    case 'reservation':
      return `border-color: ${colors.success}; background:${colors.success};
      margin-left: 8px;
      width: 139px;`;
    case 'cancelPreempted':
      return `border-color: ${colors.error};background:${colors.error}; 
      float:left;
      margin-left: 12px;
      width: 139px;`;
    case 'cancelReserved':
      return `border-color: ${colors.error};background:${colors.error};
      width:288px;
      margin-left: 8px;
      `;
    default:
      return '';
  }
};

const Header = styled.div`
  box-sizing: border-box;
  z-index: 5;
  position: fixed;
  width: 320px;
  height: 40px;
  top: 0px;
  background: ${colors.primary};
  padding-top: 9px;
  padding-left: 9px;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.white};
`;

const Button = styled.button<{ className: string }>`
  display: block;
  height: 41px;
  box-sizing: border-box;
  margin-top: 75px;
  border-radius: 6px;
  color: ${colors.white};
  font-weight: bold;

  ${props => props.className && handleButton(props.className)}
`;

const SContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  grid-row-gap: 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  padding-left: 8px;
  padding-top: 8px;
`;
