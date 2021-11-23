import styled from 'styled-components';
import { colors } from '../assets/styles/colors';

/*Reseravation Header를 위해 임시로 만든 버튼입니다*/
const LogOutButton = styled.button`
  position: fixed;
  width: 56px;
  height: 24px;
  background: ${colors.white};
  border-radius: 4px;
  top: 8px;
  right: 8px;
  z-index: 7;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 6px;
  line-height: 8px;
  border-color: ${colors.primary};
`;

export default LogOutButton;
