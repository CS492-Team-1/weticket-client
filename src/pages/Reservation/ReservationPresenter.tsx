import 'react-datepicker/dist/react-datepicker.css';

import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import { gql } from '@apollo/client';
import { Stage } from '@inlet/react-pixi';

import { colors } from '../../assets/styles/colors';
import { Spinner } from '../../components';
import {
  useCanceledReservationOnTimeSubscription,
  useNewReservationOnTimeSubscription,
  useReservationsLazyQuery,
} from '../../utils/client';
import { Rectangle } from './Rectangle';
import { Viewport } from './Viewport';

gql`
  query reservations($input: ReservationsInput!) {
    reservations(input: $input) {
      ok
      error
      reservations {
        seats
      }
    }
  }

  subscription newReservationOnTime($time: DateTime!) {
    newReservationOnTime(time: $time) {
      id
      seats
    }
  }

  subscription canceledReservationOnTime($time: DateTime!) {
    canceledReservationOnTime(time: $time) {
      id
      seats
    }
  }
`;

type SeatLayout = {
  map: {
    size: {
      width: number;
      height: number;
    };
    background: string;
  };
  seats: {
    color: string;
    rectangles: {
      lefttop: {
        x: number;
        y: number;
      };
      size: {
        width: number;
        height: number;
      };
    }[];
  }[];
};

type ReservationPresenterProps = {
  preemptSeat: (seats: string[], time: string) => Promise<void>;
  loading: boolean;
};

export const ReservationPresenter: React.FC<ReservationPresenterProps> = ({
  preemptSeat,
  loading,
}) => {
  const [windowSize, setWindowSize] = React.useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState<string>('10:00');
  const [seatLayout, setSeatLayout] = React.useState<SeatLayout>();
  const [selectedSeats, setSelectedSeats] = React.useState<string[]>([]);
  const [reservedSeats, setReservedSeats] = React.useState<string[]>([]);

  const [reservationsQuery, { loading: reservationsLoading }] =
    useReservationsLazyQuery({
      onCompleted: data => {
        const {
          reservations: { ok, error, reservations },
        } = data;

        if (ok && reservations) {
          const reservationSeats = [];
          for (const reservation of reservations) {
            reservationSeats.push(...reservation.seats);
          }
          setReservedSeats(reservationSeats);
        } else if (error) {
          window.alert(error);
        }
      },
    });

  const seatCategory = ['B', 'A', 'C'];

  const timeOptions = [
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  const tommorrow = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);

    return today;
  };

  const getHexNumber = (colorHex: string) => {
    const hex = colorHex.replace('#', '');

    return parseInt(`0x${hex}`, 16);
  };

  const onChangeDate = (date: Date | null) => {
    setDate(date);
  };

  const onSelectSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else {
      setSelectedSeats(prev => [...prev, seatId].sort());
    }
  };

  const onSubmit = async () => {
    if (date) {
      await preemptSeat(
        selectedSeats,
        `${date.toISOString().substring(0, 10)} ${time}`,
      );
    }
  };

  useNewReservationOnTimeSubscription({
    variables: {
      time: `${(date || tommorrow()).toISOString().substring(0, 10)} ${time}`,
    },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data?.newReservationOnTime.seats) {
        setReservedSeats(prev => [...prev, ...data.newReservationOnTime.seats]);
      }
    },
  });
  useCanceledReservationOnTimeSubscription({
    variables: {
      time: `${(date || tommorrow()).toISOString().substring(0, 10)} ${time}`,
    },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data?.canceledReservationOnTime.seats) {
        setReservedSeats(prev =>
          prev.filter(
            seat => !data.canceledReservationOnTime.seats.includes(seat),
          ),
        );
      }
    },
  });

  React.useEffect(() => {
    if (date) {
      reservationsQuery({
        variables: {
          input: {
            time: `${date.toISOString().substring(0, 10)} ${time}`,
          },
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time]);

  React.useEffect(() => {
    const getSeatLayout = async () => {
      const response = await fetch(
        'https://weticket-server.herokuapp.com/seats.json',
      );
      const seatLayoutJson = await response.json();

      setSeatLayout(seatLayoutJson as unknown as SeatLayout);
    };

    setDate(tommorrow());
    getSeatLayout();
  }, []);

  React.useLayoutEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  });

  return (
    <Container>
      <InputHeader first>날짜</InputHeader>
      <DatePicker
        selected={date}
        onChange={onChangeDate}
        minDate={tommorrow()}
      />
      <InputHeader>시간</InputHeader>
      <select value={time} onChange={e => setTime(e.target.value)}>
        {timeOptions.map(timeOption => (
          <option value={timeOption}>{timeOption}</option>
        ))}
      </select>
      <InputHeader>좌석선택</InputHeader>
      {seatLayout && !reservationsLoading ? (
        <SeatWrapper>
          <Stage
            width={Math.min(windowSize.width, seatLayout.map.size.width)}
            height={300}
            options={{
              backgroundColor: getHexNumber(seatLayout.map.background),
            }}
          >
            <Viewport
              viewportWidth={Math.min(
                windowSize.width,
                seatLayout.map.size.width,
              )}
              viewportHeight={300}
              worldWidth={seatLayout.map.size.width}
              worldHeight={seatLayout.map.size.height}
            >
              {seatLayout.seats.map((seat, seatIndex) => {
                const rectangleColor = getHexNumber(seat.color);
                return seat.rectangles.map((rectangle, rectangleIndex) => {
                  const seatId = `${seatCategory[seatIndex]}${rectangleIndex}`;

                  return (
                    <Rectangle
                      key={`seat_${seatIndex}_${rectangleIndex}`}
                      color={rectangleColor}
                      {...rectangle}
                      selected={selectedSeats.includes(seatId)}
                      disabled={reservedSeats.includes(seatId)}
                      onClick={() => {
                        onSelectSeat(seatId);
                      }}
                    />
                  );
                });
              })}
            </Viewport>
          </Stage>
        </SeatWrapper>
      ) : (
        <Loader>
          <Spinner />
        </Loader>
      )}
      <InputHeader>선택 좌석</InputHeader>
      <SelectedSeats>{selectedSeats.join(', ')}</SelectedSeats>
      <Submit disabled={loading} onClick={onSubmit}>
        예약
      </Submit>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 10px;
  margin-top: 40px;
`;

const InputHeader = styled.p<{ first?: boolean }>`
  font-weight: 700;
  font-size: 8;
  line-height: 1.6;
  margin-top: ${props => (props.first ? 0 : 15)}px;
  margin-bottom: 5px;
`;

const Loader = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
`;

const SeatWrapper = styled.div`
  margin: 0 -10px;
`;

const SelectedSeats = styled.p`
  font-size: 15px;
  line-height: 1.6;
  font-weight: 400;
`;

const Submit = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: ${colors.primary};
  border-radius: 6px;
  color: ${colors.white};
  font-size: 18px;
  line-height: 1.6;
  font-weight: bold;
  border: none;
  margin-top: 100px;

  &:disabled {
    background-color: ${colors.gray};
  }
`;
