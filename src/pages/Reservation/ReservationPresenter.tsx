import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ReservationPresenter: React.FC = () => {
  //TODO: Query - reservation status

  return (
    <SContainer>
      <Link to="/reservations">예약목록</Link>
    </SContainer>
  );
};

const SContainer = styled.div`
  flex: 1;
`;
