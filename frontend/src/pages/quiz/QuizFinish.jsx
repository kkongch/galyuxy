import React from 'react';
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png';
import FinishImage from 'assets/images/Quiz/수고했어요.png';
import Background from 'components/Basic/Background';
import ScoreBalloon from 'assets/images/Quiz/말풍선.png';
import styled from 'styled-components';

const FinishBox = styled.img`
  position: absolute;
  width: 83.625rem;
  height: 40.6875rem;
  top: 19.25rem;
  left: 38.19rem;
`;
const EnterButton = styled.button`
  width: 37.5rem;
  height: 9.375rem;
  border-radius: 2.5rem;
  background: #ff5050;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 3.125rem;
  top: 70.94rem;
  left: 61.25rem;
  font-style: normal;
  font-weight: 700;
  color: #fff;
`;
const ScoreBox = styled.div`
  width: 29.3125rem;
  height: 26.9375rem;
  background: url(${ScoreBalloon});
  position: absolute;
  top: 6rem;
  left: 97.25rem;
`;
const ScoreText = styled.div`
  width: 11.5rem;
  height: 15.375rem;
  position: relative;
  top: 4.69rem;
  left: 8.44rem;
  color: #000;
  text-align: center;
  font-size: 5rem;
  font-style: normal;
  font-weight: 700;
`;
const QuizFinish = () => {
  return (
    <Background backgroundImage={QuizMainImage}>
      <FinishBox src={FinishImage} />
      <ScoreBox>
        <ScoreText>점수4/5</ScoreText>
      </ScoreBox>
      <EnterButton>오답노트 확인하기</EnterButton>
    </Background>
  );
};

export default QuizFinish;