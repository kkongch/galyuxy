import React from 'react'
import styled from 'styled-components'
import QuizNavButton from './QuizNavButton'

const StyledQuizNav = styled.nav`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
`

const QuizNav = () => {
  return <StyledQuizNav>
    <QuizNavButton buttonName="이전 문제"></QuizNavButton>
    <QuizNavButton buttonName="다음 문제"></QuizNavButton>
  </StyledQuizNav>
}

export default QuizNav
