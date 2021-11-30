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
      <Content>
        <Logo to="/reservation">WeTicket</Logo>
        <Tickets
          alt="reservations"
          src={ticketIcon}
          onClick={moveToReservations}
        />
        <Logout onClick={logout}>로그아웃</Logout>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  background-color: ${colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  z-index: 1;
`;

const Content = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0 10px;
  @media (min-width: 1100px) {
    width: 1100px;
    height: 80px;
    margin: 0 auto;
  }
`;

const Logo = styled(Link)`
  font-size: 18px;
  line-height: 1.6;
  color: ${colors.white};
  font-weight: bold;
  text-decoration: none;
  @media (min-width: 1100px) {
    font-size: 32px;
  }
`;

const Tickets = styled.img`
  height: 18px;
  margin-left: auto;
  cursor: pointer;
  @media (min-width: 1100px) {
    height: 30px;
  }
`;

const Logout = styled.button`
  border-radius: 4px;
  padding: 5px 7px;
  background-color: ${colors.white};
  color: ${colors.primary};
  font-size: 6px;
  line-height: 1.6;
  font-weight: bold;
  border: none;
  margin-left: 10px;

  @media (min-width: 1100px) {
    font-size: 18px;
    padding: 10px 20px;
    margin-left: 25px;
  }
`;
