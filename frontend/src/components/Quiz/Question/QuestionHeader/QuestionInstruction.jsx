import React from 'react'
import styled from 'styled-components'

const StyledQuestionInstruction = styled.div`
  margin: 10px;
`

function QuestionInstruction({ instruction }) {
  return <StyledQuestionInstruction>{instruction }</StyledQuestionInstruction>
}

export default QuestionInstruction
