import { authCodeSend, emailVerify, teacherSignUp } from 'api/UserApi';
import Background from 'components/Basic/Background';
import LargeButton from 'components/User/LargeButton';
import StyledInput from 'components/User/StyledInput';
import StyledInputWithButton from 'components/User/StyledInputWithButton';
import useInput from 'hooks/useInput';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
const SignUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 44.4375rem;
  height: 87.3125rem;
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
  align-items: flex-start;
  flex-direction: column;
  height: 56.5625rem;
  width: 100%;
  padding: 0 4.94rem;
  font-size: 1.5625rem;
  font-weight: 600;
`;
const Label = styled.label`
  font-size: 2rem;
  font-weight: 700;
`;

const SignUpPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [authCode, setAuthCode] = useInput('');
  const [password, setPassword] = useInput('');
  const [verifyPassword, setVerifyPassword] = useInput('');
  const [isEmailVerify, setIsEmailVerify] = useState(false);

  const handleAuthCodeSend = async () => {
    try {
      const emailData = {
        email: email,
      };
      const response = await authCodeSend(emailData);
      alert('이메일로 인증번호가 전송되었습니다!');
    } catch (error) {
      console.error('Error handleEmailSend: ', error);
    }
  };

  const handleEmailVerify = async () => {
    try {
      const auth = {
        email: email,
        authCode: authCode,
      };

      const response = await emailVerify(auth);

      alert('이메일로 인증이 완료되었습니다!');
      setIsEmailVerify(true);
    } catch (error) {
      alert('인증번호를 다시 입력해주세요 ㅠㅠ');
      console.error('Error handleEmailVerify: ', error);
    }
  };

  const validateTeacherSignUp = () => {
    if (!name || !email || !isEmailVerify || !password) {
      alert('정보를 모두 입력해 주세요');
      return false;
    }
    if (password !== verifyPassword) {
      alert('비밀번호를 다시 확인해 주세요');
      return false;
    }
    return true;
  };

  const handleTeacherSignUp = async () => {
    if (!validateTeacherSignUp()) {
      return;
    }

    try {
      const signUpData = {
        name: name,
        email: email,
        password: password,
      };
      const response = await teacherSignUp(signUpData);

      alert('회원가입이 완료되었습니다! 로그인 해주세요~~');
      navigate('/login');
    } catch (error) {
      console.error('Error handleTeacherSignUp:', error);
    }
  };

  return (
    <Background
      backgroundImage={require('assets/svg/main/Background.svg').default}
    >
      <FlexBox>
        <MainBox>
          <SignUp>
            <Title>
              <p>회원가입</p>
            </Title>
            <LoginInputBox>
              <Label>이름</Label>
              <StyledInput
                type='text'
                id='name'
                name='name'
                placeholder='이름'
                onChange={setName}
                disabled={isEmailVerify}
              />
              <Label>이메일</Label>
              <StyledInputWithButton
                type='email'
                id='email'
                name='email'
                placeholder='ssafy@ssafy.com'
                onChange={setEmail}
                onClick={handleAuthCodeSend}
                disabled={isEmailVerify}
              />
              <Label>인증번호</Label>
              <StyledInputWithButton
                type='number'
                id='number'
                name='number'
                placeholder='인증번호'
                onChange={setAuthCode}
                onClick={handleEmailVerify}
                disabled={isEmailVerify}
              />
              <Label>비밀번호</Label>
              <StyledInput
                type='password'
                id='password'
                name='password'
                placeholder='8-15 글자, 특수문자(!?@#$%^&*) 포함'
                onChange={setPassword}
              />
              <Label>비밀번호 확인</Label>
              <StyledInput
                type='password'
                id='passwordConfirm'
                name='password'
                placeholder='비밀번호를 다시 입력해주세요'
                onChange={setVerifyPassword}
              />
            </LoginInputBox>
            <LargeButton
              text='확인'
              onClick={handleTeacherSignUp}
            ></LargeButton>
          </SignUp>
        </MainBox>
      </FlexBox>
    </Background>
  );
};

export default SignUpPage;
