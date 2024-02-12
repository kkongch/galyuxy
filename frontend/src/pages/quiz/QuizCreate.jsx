import React from 'react'
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png'
import Background from 'components/Basic/Background'
import styled from 'styled-components'
const QuizContainer = styled.div`
  width: 123.625rem;
  height: 79.875rem;
  position: relative;
  top: 10.06rem;
  left: 18.19rem;
  background: #fff;
`
const ChoiceBox = styled.div`
  width: 96.4375rem;
  height: 44.0625rem;
  left: 13.595rem;
  top: 14.81rem;
  position: absolute;
  justify-content: space-around;
  align-items: center;
  display: flex;
  flex-direction: column;
`
const Choice = styled.div`
  width: 96.4375rem;
  height: 8.25rem;
  border-radius: 2.5rem;
  border: 1px solid #000;
  background: #FFF;
  position: absolute;
  display: flex;
  flex-direction: column;

`
const QuizCreate = () => {
  return (
    <Background backgroundImage={QuizMainImage}>
      <QuizContainer>
        <ChoiceBox>
          <Choice></Choice>
          <Choice></Choice>
          <Choice></Choice>
          <Choice></Choice>
        </ChoiceBox>
      </QuizContainer>
    </Background>
  )
}

export default QuizCreate
