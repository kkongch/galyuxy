import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Background from 'components/Basic/Background'
import quizDetailImage from 'assets/images/Quiz/퀴즈메인화면.png'

import QuizMain from './QuizMain'
import QuizAside from './QuizAside'

const dummyQuestion = {
  questionType: '객관식',
  questionNo: 1,
  questionInstruction: '정조의 업적은?',
  questionChoice1: '영조는 탕평책을 통해 정치를 안정시키고자 했다.',
  questionChoice2: '영조는 세금을 줄여 백성의 생활을 안정시켰다.',
  questionChoice3:
    '정조는 영조의 정책을 이어 받아 인재를 고루 뽑아 정치를 안정시키고자 노력하였다.',
  questionChoice4: '영조는 세금을 줄여 백성의 생활을 안정시켰다.',
  questionAnswer: 3,
}

const StyledQuiz = styled.div`
  display: flex;
  height: 100vh;
`

const Quiz = () => {

  const [question, setQuestion] = useState({})

  useEffect(() => {
    setQuestion(dummyQuestion)
  }, [])

  return (
    <Background backgroundImage = {quizDetailImage}>
      <StyledQuiz>
        <QuizMain question={question}></QuizMain>
        <QuizAside></QuizAside>
      </StyledQuiz>
    </Background>
  )
}

export default Quiz
