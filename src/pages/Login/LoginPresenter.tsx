import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { colors } from '../../assets/styles/colors';
import { Login } from '.';
import { Spinner } from '../../components';

//TODO : prop type 정의
type LoginPresenterProps = {
  loginLoading: boolean;
  registerLoading: boolean;
  login: (username: string, password:string) => void;
  register: (username: string, password:string, togglePage: ()=>void ) => void;
};

type LoginProps = {
  username: string;
  password: string;
};

type RegisterProps = {
  username : string;
  password: string;
  confirmPassword: string;
};

export const LoginPresenter: React.FC<LoginPresenterProps> = ({ login, loginLoading, register, registerLoading}) => {

  const {
    register: loginInputs, 
    handleSubmit:loginSubmit, 
    formState: { errors: loginErrors }, 
    reset: loginReset} = useForm<LoginProps>();

  const {
    register: registerInputs, 
    handleSubmit: registerSubmit, 
    formState: { errors: registerErrors }, 
    reset: registerReset,
    watch: registerWatch} = useForm<RegisterProps>();


  const watchPassword = registerWatch("password", "");

  const [isLogin, setLogin] = useState(true);

  const togglePage = () =>{
    loginReset({username: '', password: ''});
    registerReset({username: '', password: '', confirmPassword: ''});
    setLogin(!isLogin);
  };

  const onSubmit : SubmitHandler<LoginProps> = (data) =>{
    const {username, password} = data;

    login(username, password);
    loginReset({username: '', password: ''});

  };

  const onSubmitRegister : SubmitHandler<RegisterProps> = (data) =>{
    const {username, password} = data;
    register(username, password, togglePage);
    registerReset({username: '', password: '', confirmPassword: ''});
  }

  const LoginPage = (
    <SContainer>
      <Title>WeTicket</Title>
      <LogInContainer>
        <SubTitle>LogIn</SubTitle>
        <HorizonLine/>
        <LoginForm onSubmit= {loginSubmit(onSubmit)}>

          <IDBox {...loginInputs("username", {required: {value: true, message: "ID를 입력해주세요!"}})}></IDBox>
          <ErrorMessages>{loginErrors.username && loginErrors.username?.message}</ErrorMessages>

          <PwBox {...loginInputs("password", {required: {value: true, message: "비밀번호를 입력해주세요!"}})}></PwBox>
          <ErrorMessages>{loginErrors.password && loginErrors.password?.message}</ErrorMessages>

          <SubmitButton>로그인</SubmitButton>

          <Messages>계정이 없으신가요?</Messages>
          <ToggleButton onClick ={togglePage}>회원가입</ToggleButton>

        </LoginForm>
      </LogInContainer>
    </SContainer>
  );

  const Registerpage = (
    <SContainer>
      <Title>WeTicket</Title>
      <LogInContainer>
        <SubTitle>회원가입</SubTitle>
        <HorizonLine/>
        <LoginForm onSubmit= {registerSubmit(onSubmitRegister)}>

          <IDBox {...registerInputs("username", {
                      required: {value: true, message: "ID를 입력해주세요!"},
                      maxLength: {value: 15, message: "ID는 15글자 이하로 설정해주세요"}, 
                      pattern: {value: /^[a-z0-9]+$/, message: "알파벳 소문자, 숫자만 사용해주세요"}}
                      )}>            
          </IDBox> 
          <ErrorMessages>{registerErrors.username && registerErrors.username?.message}</ErrorMessages>

          <PwBox {...registerInputs("password", {
                      required: {value: true, message: "비밀번호를 입력해주세요!"},
                      minLength: {value: 8, message: "비밀번호는 8~15글자로 설정해주세요"},
                      maxLength: {value: 15, message: "비밀번호는 8~15글자로 설정해주세요"},
                      pattern: {value: /^[a-zA-Z0-9]+$/, message: "알파벳, 숫자만 사용해주세요"}}
                      )}>            
          </PwBox>
          <ErrorMessages>{ (!registerErrors.username) && registerErrors.password && registerErrors.password?.message}</ErrorMessages>

          <CPwBox {...registerInputs("confirmPassword", {
                        validate: value => value === watchPassword || "비밀번호를 확인해주세요!"
                        })}>
          </CPwBox>
          <ErrorMessages>{ !(registerErrors.username || registerErrors.password) 
                        && registerErrors.confirmPassword 
                        && registerErrors.confirmPassword?.message}</ErrorMessages>

          <SubmitButton>회원가입</SubmitButton>

          <Messages>계정이 이미 있으신가요?</Messages>
          <ToggleButton onClick ={togglePage} >로그인</ToggleButton>

        </LoginForm>
      </LogInContainer>
    </SContainer>
  );

  const LoadingPage = (<SContainer>
                        <Spinner />
                      </SContainer>);

  return (
    <>
    {(loginLoading || registerLoading) ? LoadingPage : (isLogin ?  LoginPage : Registerpage)}
    </>
  );
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
  margin-bottom: 5px;
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

const SubmitButton = styled(Button)`
  border-color: none;
  color: ${colors.white};
  box-shadow: none;
  background-color: ${colors.primary};
  margin-bottom: 20px;
`;

const ToggleButton = styled(Button).attrs({type:"button"})`
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


const IDBox = styled(InputBox).attrs({placeholder: "ID"})``;
const PwBox = styled(InputBox).attrs({placeholder: "password", type:"password"})``;
const CPwBox = styled(InputBox).attrs({placeholder: "confirm password", type:"password"})``;
