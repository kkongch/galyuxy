import React from 'react'
import styled from 'styled-components'

const StyledQuestionChoice = styled.div`
  /* Layout */
  width: 80%;
  height: 15%;
  /* Flex */
  display: flex;
  align-items: center;
  justify-content: flext-start;
  /* margin - border - padding */
  margin: 10px;
  border-radius: 20px;
  border: 1px solid #a2acbd;
  padding: 10px;
  /* Style */
  background: #fff;
`

const StyledQuestionChoiceNo = styled.span`
  color: #0f70b7;
  margin: 10px;
`

function QuestionChoice({ no, statement }) {
  return (
    <StyledQuestionChoice>
      <StyledQuestionChoiceNo>{no}</StyledQuestionChoiceNo> <p>{statement}</p>
    </StyledQuestionChoice>
  )
}

export default QuestionChoice
