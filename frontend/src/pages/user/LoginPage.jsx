import { teacherLogin } from 'api/UserApi';
import Background from 'components/Basic/Background';
import StyledInput from 'components/User/StyledInput';
import useInput from 'hooks/useInput';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainBox = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const LoginBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 97.75rem;
`;
const UserLogin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 44.4375rem;
  height: 47.125rem;
  border-radius: 1.25rem;
  background: #fff;
  padding: 5.12rem 0;
`;
const Title = styled.div`
  text-align: center;
  font-size: 4rem;
  font-weight: 700;
`;
const LoginInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 15.75rem;
  width: 100%;
`;
const AccountBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 400;
  width: 100%;
  margin-right: 10.06rem;
`;
const AccountButton = styled.div``;
const LargeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35rem;
  height: 5.3125rem;
  border-radius: 1.25rem;
  background-color: #596fb7;
  color: #fff;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 600;
  cursor: pointer;
`;

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginData = {
        email: email,
        password: password,
      };

      const response = await teacherLogin(loginData);

      console.log(response.dataBody.token);

      sessionStorage.setItem(
        'accessToken',
        response.dataBody.token.accessToken
      );
      sessionStorage.setItem(
        'refreshToken',
        response.dataBody.token.refreshToken
      );

      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error handleTeacherLogin:', error);
    }
  };

  const handleConfirm = () => {
    handleLogin();
    if (isLoggedIn) {
      navigate('/class');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handlePwFindClick = () => {
    navigate('/pwFind');
  };

  return (
    <Background
      backgroundImage={require('assets/svg/main/Background.svg').default}
    >
      <FlexBox>
        <MainBox>
          <LoginBox>
            <UserLogin>
              <Title>
                <p>교사 로그인</p>
              </Title>

              <LoginInputBox>
                <StyledInput
                  type='email'
                  id='email'
                  name='email'
                  placeholder='이메일'
                  value={email}
                  onChange={setEmail}
                />
                <StyledInput
                  type='password'
                  id='password'
                  name='password'
                  placeholder='비밀번호'
                  value={password}
                  onChange={setPassword}
                />
                <AccountBox>
                  <AccountButton onClick={handleSignupClick}>
                    회원가입
                  </AccountButton>
                  {/* <span>&nbsp;|&nbsp;</span>
                  <AccountButton onClick={handlePwFindClick}>
                    비밀번호 찾기
                  </AccountButton> */}
                </AccountBox>
              </LoginInputBox>
              <LargeButton onClick={handleConfirm}>로그인</LargeButton>
            </UserLogin>
            <UserLogin>
              <Title>
                <p>학생 로그인</p>
              </Title>
            </UserLogin>
          </LoginBox>
        </MainBox>
      </FlexBox>
    </Background>
  );
};

export default LoginPage;
