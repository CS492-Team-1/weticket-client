import React from 'react';
import styled from 'styled-components';

//TODO : prop type 정의
type LoginPresenterProps = {
  login: () => void;
};

export const LoginPresenter: React.FC<LoginPresenterProps> = ({ login }) => {
  //TODO : react-hook-form 사용하여 로그인, 회원가입 구현
  //https://react-hook-form.com/get-started#TypeScript
  return (
    <SContainer>
      Login
      <button onClick={login}>로그인</button>
    </SContainer>
  );
};

const SContainer = styled.div`
  flex: 1;
`;
