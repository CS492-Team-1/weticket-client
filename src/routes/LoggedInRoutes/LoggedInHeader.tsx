import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import ticketIcon from '../../assets/icons/ticket.png';
import { colors } from '../../assets/styles/colors';
import { accessTokenVar } from '../../utils/cache';

export const LoggedInHeader: React.FC = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    accessTokenVar(null);
  };

  const moveToReservations = () => {
    history.push('/reservations');
  };

  return (
    <Container>
      <Logo to="/reservation">WeTicket</Logo>
      <Tickets
        alt="reservations"
        src={ticketIcon}
        onClick={moveToReservations}
      />
      <Logout onClick={logout}>로그아웃</Logout>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: ${colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
`;

const Logo = styled(Link)`
  font-size: 18px;
  line-height: 21px;
  color: ${colors.white};
  font-weight: bold;
  text-decoration: none;
`;

const Tickets = styled.img`
  height: 18px;
  margin-left: auto;
  cursor: pointer;
`;

const Logout = styled.button`
  border-radius: 4px;
  padding: 5px 7px;
  background-color: ${colors.white};
  color: ${colors.primary};
  font-size: 6px;
  line-height: 10px;
  font-weight: bold;
  border: none;
  margin-left: 10px;
`;
