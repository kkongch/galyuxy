import React from 'react'
import styled from 'styled-components'

const StyledQuizNavButton = styled.button`
  width: 10%;
  height: 50%;
  border: none;
  border-radius: 30px;
  background: #0f70b7;
  color: white;
  margin: 5%;
`

const QuizNavButton = ({buttonName}) => {
  return <StyledQuizNavButton>{buttonName}</StyledQuizNavButton>
}

export default QuizNavButton
