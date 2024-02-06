import Background from 'components/Basic/Background';
import LargeButton from 'components/User/LargeButton';
import StyledInput from 'components/User/StyledInput';
import StyledInputWithButton from 'components/User/StyledInputWithButton';
import React from 'react';
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
              />
              <Label>이메일</Label>
              <StyledInputWithButton
                type='email'
                id='email'
                name='email'
                placeholder='ssafy@ssafy.com'
              />
              <Label>인증번호</Label>
              <StyledInputWithButton
                type='number'
                id='number'
                name='number'
                placeholder='인증번호'
              />
              <Label>비밀번호</Label>
              <StyledInput
                type='password'
                id='password'
                name='password'
                placeholder='8-15 글자, 특수문자(!?@#$%^&*) 포함'
              />
              <Label>비밀번호 확인</Label>
              <StyledInput
                type='password'
                id='password'
                name='password'
                placeholder='비밀번호를 다시 입력해주세요'
              />
            </LoginInputBox>
            <LargeButton text='확인'></LargeButton>
          </SignUp>
        </MainBox>
      </FlexBox>
    </Background>
  );
};

export default SignUpPage;
