import React from 'react'
import styled from 'styled-components'

import QuestionNo from './QuestionHeader/QuestionNo'
import QuestionInstruction from './QuestionHeader/QuestionInstruction'

const StyledQuestionHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
`

function QuestionHeader({ question }) {
  return <StyledQuestionHeader>
    <QuestionNo no={question.questionNo}></QuestionNo>
    <QuestionInstruction instruction={question.questionInstruction}></QuestionInstruction>
  </StyledQuestionHeader>
}

export default QuestionHeader
