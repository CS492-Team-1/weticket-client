import React, { useEffect, useRef, useState } from 'react';
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
type ReservationPresenterProps = {
  cancelReservation: (reservationId: string) => Promise<void>;
  reserveSeat: (reservationId: string) => Promise<void>;
};

export const ReservationsPresenter: React.FC<ReservationPresenterProps> = ({
  cancelReservation,
  reserveSeat,
}) => {
  const { data, loading, refetch } = useMeQuery({ notifyOnNetworkStatusChange : true });
  const [clicked, setClicked] = useState('');
  const [modal, setModal] = useState({isOpen:false, isCancel:false});
  const [reservations, setReservations] = useState(data?.me.reservations || []);
  const scrollY = useRef(0);
  const preempted = reservations.filter(
    reservation => reservation.status === ReservationStatus.Preempted,
  );

  const reserved = reservations.filter(
    reservation => reservation.status === ReservationStatus.Reserved,
  );
  
  useEffect(()=>{
    refetch()
  },[])

  useEffect(() => {
    setReservations(reservations => data?.me.reservations || []);
  }, [loading]);

  const timeParser = (
    reservation: {
      __typename?: 'Reservation' | undefined;
    } & Pick<Reservation, 'id' | 'time' | 'status' | 'preemptedAt' | 'seats'>,
  ) => {
    let result: string = reservation.time;
    result = result.replace('T', ' ');
    result = result.substring(0, result.lastIndexOf(':'));
    return result;
  };

  const ReservationModal:React.FC<{reservationID:string, isCancel:boolean}> = ({reservationID,isCancel})=>{
    useEffect(()=>{
      return ()=>{window.scrollTo(0, scrollY.current);}
    }
    ,[])
    return <>
    <ModalLid>
      <Text className="modalLid">공연명</Text>
    </ModalLid>
    <ModalBottom>
      <Text className = 'message'>예약을 {isCancel?"취소":"확정"}하시겠습니까?</Text>
      <Button className='modalYes' onClick={async()=>{
        isCancel? await cancelReservation(reservationID):await reserveSeat(reservationID);
        setClicked('');
        isCancel? setReservations(reservations =>
          reservations.filter(
            reserved => reserved.id !== reservationID,
          ),
        ):setReservations(reservations => {
          let confirmed = Object.assign({}, reservations.find(reserved => reserved.id === reservationID));
          confirmed.status = ReservationStatus.Reserved;
          return [
            ...reservations.filter(
              preempted => preempted.id !== reservationID,
            ),
            confirmed,
          ];
        });
        setModal({isOpen:false, isCancel:false});
        }}>예</Button>
      <Button className='modalNo'onClick={()=>setModal({isOpen:false, isCancel:false})}>아니오</Button>
    </ModalBottom>
    </> 
  }

  const ReservationBlock = (
    reservation: {
      __typename?: 'Reservation' | undefined;
    } & Pick<Reservation, 'id' | 'time' | 'status' | 'preemptedAt' | 'seats'>,
  ) => {
    const result = reservation.__typename === 'Reservation' && (
      <div
        key={reservation.id}
        onClick={() => setClicked(clicked => reservation.id)}
      >
        <BlockLid>
          <Text className="title">공연명</Text>
        </BlockLid>
        <BlockBottom isClicked={clicked === reservation.id}>
          <Text className="location">장소</Text>
          <VerticalLine />
          <Text className="date">
            시각
            <br />
            {timeParser(reservation)}
          </Text>
          {reservation.status === ReservationStatus.Preempted
            ? clicked === reservation.id && (
                <>
                  <Text className="seat">
                    선택 좌석
                    <br />
                    {reservation.seats.join(", ")}
                  </Text>
                  <Button
                    className="reservation"
                    onClick={() => {
                      scrollY.current = window.scrollY;
                      setModal({isOpen:true, isCancel:false});
                    }}
                  >
                    예약 확정
                  </Button>
                  
                  <Button
                    className="cancelPreempted"
                    onClick={() => {
                      scrollY.current= window.scrollY;
                      setModal({isOpen:true, isCancel:true});
                    }}
                  >
                    예약 취소
                  </Button>
                </>
              )
            : clicked === reservation.id && (
                <>
                  <Text className="seat">
                    선택 좌석
                    <br />
                    {reservation.seats.join(", ")}
                  </Text>
                  <Button
                    className="cancelReserved"
                    onClick={() => {
                      scrollY.current= window.scrollY;
                      setModal({isOpen:true, isCancel:true});
                    }}
                  >
                    예약 취소
                  </Button>
                </>
              )}
        </BlockBottom>
      </div>
    );
    return result;
  };

  const loadingScreen = <Spinner />;

  const LoadedScreen = (
      <SContainer>
        {reservations.length === 0 && <ReservationsText>완료된 예약이 없습니다</ReservationsText>}
        {preempted.length !== 0 && <ReservationsText>예약 미완료</ReservationsText>}
        <ReservationsWrapper>{preempted.map(reservation => ReservationBlock(reservation))}</ReservationsWrapper>
        {reserved.length !== 0 && <ReservationsText>예약 완료</ReservationsText>}
        <ReservationsWrapper>{reserved.map(reservation => ReservationBlock(reservation))}</ReservationsWrapper>
      </SContainer>
  );

  return (
    <>
    {modal.isOpen&&(<ReservationModal reservationID={clicked} isCancel={modal.isCancel}/>)}
    <BackgroundBlur isVisible={modal.isOpen}>
      {loading ? loadingScreen : LoadedScreen}
    </BackgroundBlur>
    </>
  );
};

const BlockLid = styled.div`
  width: 304px;
  height: 30px;
  margin-right: 8px;
  border-radius: 6px 6px 0px 0px;
  background: ${colors.primary};
  @media (min-width: 1100px) {
    padding-top: 5px;
    width: 350px;
    height: 40px;
  }
`;

const BlockBottom = styled.div<{ isClicked: boolean }>`
  display: flex;
  box-sizing: content-box;
  width: 304px;
  height: ${props => (props.isClicked ? '123px' : '38px')};
  margin-right: 8px;
  background: ${colors.gray};
  border-radius: 0px 0px 6px 6px;
  @media (min-width: 1100px) {
    width: 350px;
    height: ${props => (props.isClicked ? '164px' : '52px')};
  }
`;

const handleText = (className: string) => {
  switch (className) {
    case 'location':
      return 'line-height: 12px;padding-top: 4px;';
    case 'date':
      return 'padding-top: 2px;line-height: 16px;padding-left:160px;';
    case 'title':
      return `color: ${colors.white};line-height: 14px;margin-top: 8px; font-size:12px;@media (min-width: 1100px) {
        font-size:20px;
      }`;
    case 'seat':
      return `padding-top: 38px;line-height: 16px;`;
    case 'modalLid':
      return `color: ${colors.white};font-size:16px;@media (min-width: 1100px) {
        font-size:24px;
      }`;
    case 'message':
      return `font-size: 15px; color: ${colors.black}; grid-area:message; padding-left:0px;
      @media (min-width: 1100px) {
        font-size:24px;
      }`;
    default:
      return '';
  }
};

const Text = styled.h1<{ className: string }>`
  position: absolute;
  padding-left: 8px;
  font-size: 10px;
  @media (min-width: 1100px) {
    font-size:16px;
  }
  ${props => props.className && handleText(props.className)}
`;

const VerticalLine = styled.div`
  position: absolute;
  height: 24px;
  margin-left: 153px;
  margin-top: 6px;
  border: 1px solid ${colors.primary_light};
`;

const handleButton = (className: string) => {
  switch (className) {
    case 'reservation':
      return `border-color: ${colors.success}; background:${colors.success};
      margin-right:4px;
      width: 100%;`;
    case 'cancelPreempted':
      return `border-color: ${colors.error};background:${colors.error}; 
      float:left;
      margin-left: 4px;
      width: 100%;`;
    case 'cancelReserved':
      return `border-color: ${colors.error};background:${colors.error};
      width:100%;
      `;
    case 'modalYes':
      return `border-color: ${colors.black};background:${colors.white};grid-area:buttonYes;color: ${colors.black};height:100%;margin-top:0px`;
    case 'modalNo':
      return `border-color: ${colors.black};background:${colors.white};grid-area:buttonNo;color: ${colors.black};height:100%;margin-top:0px`;
    default:
      return '';
  }
};

const Button = styled.button<{ className: string }>`
  display: block;
  height: 41px;
  box-sizing: border-box;
  margin-top: 75px;
  width: 100%;
  border-radius: 6px;
  margin-left: 8px;
  margin-right: 8px;
  color: ${colors.white};
  font-weight: bold;
  @media (min-width: 1100px) {
    margin-top: 96px;
    height: 62px;
    font-size:20px;
  }
  ${props => props.className && handleButton(props.className)}
`;

const SContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  row-gap: 8px;
  padding-left: 8px;
  padding-top: 8px;
  align-items: center;
  z-index: -1;
  @media (min-width: 1100px) {
    width: 1100px;
    border-radius: 12px;  
    background-color: ${colors.white};
    box-sizing: border-box;
    row-gap: 20px;
    margin-bottom: 40px;
  }
`;

const BackgroundBlur = styled.div<{isVisible:boolean}>`
    position: absolute;
    width:100%;
    z-index: 0;
    @media (min-width: 1100px) {
      padding-top:80px;
      background-color: ${colors.primary};
      box-sizing: border-box;
      justify-content: center;
      display:flex;
    }
    ${props=>props.isVisible&&`backdrop-filter: blur(8px);opacity:0.2;pointer-events:none;  position:fixed; top:-${window.scrollY}px;`}
`;


const ReservationsText = styled.h1`
  font-size: 16px;
  @media (min-width: 1100px) {
    font-size: 24px;
  }
`
const ModalLid = styled.div`
  display: flex;
  align-items:center;
  position:fixed;
  width:280px;
  height:57px;
  background: ${colors.primary};
  z-index: 30;
  border-radius: 6px 6px 0px 0px;
  top:35%;
  left: calc(50vw - 140px);
  @media (min-width: 1100px) {
    left: calc(50vw - 200px);
    width: 400px;
    height: 100px;
  }
`

const ModalBottom = styled.div`
  position:fixed;
  box-sizing: border-box;
  width:280px;
  height:215px;
  top:35%;
  background: ${colors.white};
  border-radius: 6px;
  z-index: 29;
  left: calc(50vw - 140px);
  outline-width: 1px;
  outline: solid;
  display: grid;
  padding-top: 63px;
  padding-bottom: 6px;
  grid-template:
  "message message" 1fr
  "buttonYes buttonNo" 1fr
  /1fr 1fr; 
  gap: 6px;
  padding-left: 6px;
  padding-right: 6px;
  justify-items:center;
  @media (min-width: 1100px) {
    left: calc(50vw - 200px);
    width: 400px;
    height: 400px;
    padding-top: 108px;
    font-size: 32px;
  }
`
const ReservationsWrapper = styled.div`
  display: flex;
  row-gap: 8px;
  flex-direction: column;
  margin-bottom: 8px;
  @media (min-width: 1100px) {
    display:grid;
    row-gap: 16px;
    grid-template-columns: repeat(3,minmax(350px, auto));
    margin-bottom: 16px;
  }
`