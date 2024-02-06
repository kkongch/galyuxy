import React from 'react'
import styled from 'styled-components'

const StyledQuestionNo = styled.div`
  /* Layout */
  width: 80px;
  height: 80px;
  margin: 10px;
  /* Style */
  border-radius: 10%;
  background: #0f70b7;
  color: #ffffff;
  /* Flex */
  display: flex;
  align-items: center;
  justify-content: center;
`

function QuestionNo({ no }) {
  return <StyledQuestionNo>Q{no}</StyledQuestionNo>
}

export default QuestionNo
