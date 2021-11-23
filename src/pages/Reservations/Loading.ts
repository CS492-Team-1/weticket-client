import styled, { keyframes } from 'styled-components';
import { colors } from '../../assets/styles/colors';

const spinner = keyframes`
0% {transform: rotate(0deg); }
100% {transform: rotate(360deg);}
`;

export const Spinner = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  margin-top: -24px;
  margin-left: -24px;
  border-radius: 50%;
  border: 6px solid transparent;
  border-top-color: ${colors.primary};
  border-bottom-color: ${colors.primary_light};
  border-right-color: ${colors.primary_light};
  border-left-color: ${colors.primary_light};
  animation: ${spinner} 0.8s ease infinite;
`;
