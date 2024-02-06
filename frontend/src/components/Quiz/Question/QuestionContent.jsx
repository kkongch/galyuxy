import React from 'react'
import styled from 'styled-components'

import QuestionChoice from './QuestionContent/QuestionChoice'
import QuestionChoiceOX from './QuestionContent/QuestionChoiceOX'

const StyledQuestionContent = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.questionType === '객관식' ? 'column' : 'row'};
  align-items: center;
  justify-content: center;
`

function QuestionContent({ question }) {
  return (
    <StyledQuestionContent questionType={question.questionType}>
      {question.questionType === '객관식' ? (
      <>
        <QuestionChoice
          no={1}
          statement={question.questionChoice1}
        ></QuestionChoice>
        <QuestionChoice
          no={2}
          statement={question.questionChoice2}
        ></QuestionChoice>
        <QuestionChoice
          no={3}
          statement={question.questionChoice3}
        ></QuestionChoice>
        <QuestionChoice
          no={4}
          statement={question.questionChoice4}
        ></QuestionChoice>
      </>
      ) : question.questionType === 'OX' ? (
        <>
          <QuestionChoiceOX ox='O'></QuestionChoiceOX>
          <QuestionChoiceOX ox='X'></QuestionChoiceOX>
        </>
      ) : null}
    </StyledQuestionContent>
  )
}

export default QuestionContent
