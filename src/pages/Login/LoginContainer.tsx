import React from 'react';

import { gql } from '@apollo/client';

import { accessTokenVar } from '../../utils/cache';
import { useLoginMutation, useRegisterMutation } from '../../utils/client';
import { LoginPresenter } from './LoginPresenter';

gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      accessToken
    }
  }

  mutation register($input: RegisterInput!) {
    register(input: $input) {
      ok
      error
    }
  }
`;

export const LoginContainer: React.FC = () => {
  const [loginMutation, { loading: loginLoading }] = useLoginMutation();
  const [registerMutation, { loading: registerLoading }] =
    useRegisterMutation();

  /**
   * 로그인
   * 성공시, 예약화면으로 이동합니다.
   * 실패시, 에러메시지를 띄웁니다.
   * @param username 아이디
   * @param password 패스워드
   */

  const login = async (username: string, password: string) => {
    try {
      const { data } = await loginMutation({
        variables: {
          input: {
            username,
            password,
          },
        },
      });

      if (data?.login.ok && data.login.accessToken) {
        localStorage.setItem('token', data.login.accessToken);
        accessTokenVar(data.login.accessToken);
      } else if (data?.login.error) {
        window.alert(data.login.error);
      }
    } catch (err) {
      window.alert(err);
    }
  };

  /**
   * 회원가입
   * 실패시, 에러메시지를 띄웁니다.
   * @param username 아이디
   * @param password 패스워드
   */
  const register = async (
    username: string,
    password: string,
    togglePage: () => void,
  ) => {
    try {
      const { data } = await registerMutation({
        variables: {
          input: {
            username,
            password,
          },
        },
      });

      if (data?.register.ok) {
        togglePage();
        window.alert('회원가입에 성공했습니다!');
      } else if (data?.register.error) {
        window.alert(data.register.error);
      }
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <LoginPresenter
      login={login}
      loginLoading={loginLoading}
      register={register}
      registerLoading={registerLoading}
    />
  );
};
