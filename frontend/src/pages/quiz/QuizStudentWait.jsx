import React from 'react';
import waitImage from 'assets/images/Quiz/quizready.png';
import Background from 'components/Basic/Background';
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png';
import styled from 'styled-components';
const WaitFlag = styled.div`
  width: 76.8125rem;
  height: 51.1875rem;
  position: absolute;
  background: url(${waitImage});
`;
const QuizStudentWait = () => {
  return (
    <Background backgroundImage={QuizMainImage}>
      <WaitFlag />
    </Background>
  );
};

export default QuizStudentWait;
