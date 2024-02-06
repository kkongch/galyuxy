import React from 'react'
import styled from 'styled-components'

const StyledQuestionChoiceOX = styled.div`
  width: 720px;
  height: 720px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: #fff;
  color: ${(props) => (props.ox === 'o' ? '#ff5050' : '#0F70B7')};
  text-align: center;
  font-family: 'Noto Sans';
  font-size: 400px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

function QuestionChoiceOX({ ox }) {
  return <StyledQuestionChoiceOX ox={ox}>{ox}</StyledQuestionChoiceOX>
}

export default QuestionChoiceOX
