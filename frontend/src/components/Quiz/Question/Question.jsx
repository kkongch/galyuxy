import React from 'react'
import styled from 'styled-components'
import QuestionSection from './QuestionSection'

const StyledQuestion = styled.div`
  flex-grow: 20;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Question({ question }) {
  return (
    <StyledQuestion>
      <QuestionSection question={question}></QuestionSection>
    </StyledQuestion>
  )
}

export default Question
