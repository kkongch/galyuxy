import Background from 'components/Basic/Background';
import LargeButton from 'components/User/LargeButton';
import StyledInput from 'components/User/StyledInput';
import React from 'react';
import styled from 'styled-components';
import background from 'assets/images/mainBackground.png';

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
const SignUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 44.4375rem;
  height: 61.3125rem;
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
  height: 31.75rem;
  width: 100%;
  padding: 0 4.94rem;
  font-size: 1.5625rem;
  font-weight: 600;
`;
const Label = styled.label`
  font-size: 2rem;
  font-weight: 700;
`;

const FindPasswordPage = () => {
  return (
    <Background backgroundImage={background}>
      <FlexBox>
        <MainBox>
          <SignUp>
            <Title>
              <p>비밀번호 변경</p>
            </Title>
            <LoginInputBox>
              <Label>현재 비밀번호</Label>
              <StyledInput
                type='password'
                id='password'
                name='password'
                placeholder='현재 비밀번호를 입력해주세요'
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

export default FindPasswordPage;
