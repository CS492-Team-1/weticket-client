import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { colors } from '../../assets/styles/colors';
import { Login } from '.';
import { Spinner } from '../../components';

//TODO : prop type 정의
type LoginPresenterProps = {
  loginLoading: boolean;
  login: (username: string, password: string) => void;
};

type LoginProps = {
  username: string;
  password: string;
};

export const LoginPresenter: React.FC<LoginPresenterProps> = ({
  login,
  loginLoading,
}) => {
  //TODO : react-hook-form 사용하여 로그인, 회원가입 구현
  //https://react-hook-form.com/get-started#TypeScript
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginProps>();

  const onSubmit: SubmitHandler<LoginProps> = data => {
    const { username, password } = data;
    login(username, password);
    reset({ username: '', password: '' });
  };

  const LoginPage = (
    <SContainer>
      <Title>WeTicket</Title>
      <LogInContainer>
        <SubTitle>LogIn</SubTitle>
        <HorizonLine />
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <IDBox {...register('username', { required: true })}></IDBox>
          <ErrorMessages>
            {errors.username && 'ID를 입력해주세요!'}
          </ErrorMessages>

          <PwBox {...register('password', { required: true })}></PwBox>
          <ErrorMessages>
            {errors.password && '비밀번호를 입력해주세요!'}
          </ErrorMessages>

          <LoginButton>로그인</LoginButton>

          <Messages>계정이 없으신가요?</Messages>
          <RegisterButton>회원가입</RegisterButton>
        </LoginForm>
      </LogInContainer>
    </SContainer>
  );

  const loadingPage = (
    <SContainer>
      <Spinner />
    </SContainer>
  );

  return <>{loginLoading ? loadingPage : LoginPage}</>;
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${colors.primary};
  a {
    display: content;
  }
  height: 100vh;
  width: 100vw;
`;

const Title = styled.h1`
  display: flex;
  color: ${colors.white};
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  display: flex;
  color: ${colors.black};
  font-size: 18px;
  font-weight: 500;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  width: 280px;
  height: 350px;
  border-radius: 15px;
  background-color: ${colors.white};
`;

const HorizonLine = styled.hr`
  width: 220px;
  display: flex;
  border-top: 1px solid ${colors.black};
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  border-radius: 15px;
  border-color: none;
  border-style: none;
  width: 230px;
`;

const Button = styled.button`
  font-weight: 700;
  border-radius: 15px;
  border-style: none;
  width: 230px;
  height: 30px;
  margin: 6px;
`;

const LoginButton = styled(Button)`
  border-color: none;
  color: ${colors.white};
  box-shadow: none;
  background-color: ${colors.primary};
  margin-bottom: 20px;
`;

const RegisterButton = styled(Button).attrs({ type: 'button' })`
  color: ${colors.black};
  border-color: ${colors.black};
  border-style: solid;
  border-width: thin;
  box-shadow: none;
  background-color: ${colors.white};
`;

const Messages = styled.span`
  color: ${colors.black};
  font-size: 15px;
  font-weight: 500;
  margin: 6px;
`;

const ErrorMessages = styled(Messages)`
  color: ${colors.error};
  margin: 3px;
`;

const InputBox = styled.input`
  border-radius: 15px;
  border-color: none;
  border-style: none;
  width: 230px;
  text-align: center;
  height: 30px;
  margin: 3px;
  border-style: solid;
  border-width: thin;
`;

const IDBox = styled(InputBox).attrs({ placeholder: 'ID' })``;
const PwBox = styled(InputBox).attrs({
  placeholder: 'password',
  type: 'password',
})``;
