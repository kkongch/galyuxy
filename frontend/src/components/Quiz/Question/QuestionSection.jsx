import React from 'react'
import styled from 'styled-components'
import QuestionHeader from './QuestionHeader'
import QuestionContent from './QuestionContent'

const StyledQuestionSection = styled.section`
  width: 80%;
  /* height: 80%; */
  padding: 20px;
  background: rgba(220, 242, 255, 0.50);
`

function QuestionSection({ question }) {
  return <StyledQuestionSection>
    <QuestionHeader question={question}></QuestionHeader>
    <QuestionContent question={question}></QuestionContent>
  </StyledQuestionSection>
}

export default QuestionSection
