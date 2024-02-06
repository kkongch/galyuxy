import React from 'react'
import styled from 'styled-components'

import Question from './Question/Question'
import QuizNav from './QuizNav'

const StyledQuizMain = styled.main`
  width: 80vw;
  display: flex;
  flex-direction: column;
`

const QuizMain = ({ question }) => {
  return (
    <StyledQuizMain>
      <Question question = {question}></Question>
      <QuizNav></QuizNav>
    </StyledQuizMain>
  )
}

export default QuizMain
