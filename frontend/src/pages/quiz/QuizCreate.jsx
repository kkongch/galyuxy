import React, { useState,useEffect } from 'react'
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png'
import Background from 'components/Basic/Background'
import styled from 'styled-components'
import CheckBox from 'assets/svg/quiz/checkbox.svg'
import SelectCheckBox from 'assets/svg/quiz/selectcheckbox.svg'
import AnswerCheckBox from 'assets/svg/quiz/answercheckbox.svg'
import SelectAnswerCheckBox from 'assets/svg/quiz/selectedanswercheckbox.svg'
const QuizContainer = styled.div`
  width: 123.625rem;
  height: 79.875rem;
  position: relative;
  top: 10.06rem;
  left: 18.19rem;
  background: #fff;
`
const ChoiceBox = styled.div`
  width: 96.4375rem;
  height: 44.0625rem;
  left: 13.595rem;
  top: 14.81rem;
  position: absolute;
  justify-content: space-around;
  align-items: center;
  display: flex;
  flex-direction: column;
`
const Choice = styled.div`
  width: 96.4375rem;
  height: 8.25rem;
  border-radius: 2.5rem;
  border: 1px solid #000;
  background: #FFF;
  display: flex;
  align-items: center;
`
const ChoiceColor = styled.div`
  width: 3.1245rem;
  height: 100%;
  border-radius: 2.5rem 0 0 2.5rem;
  background: ${props => props.fill};
`
const QuestionNumber = styled.div`
  width: 3.6875rem;
  height: 5.375rem;
  color: #000;
  font-size: 4.375rem;
  font-style: normal;
  font-weight: 700;
  left: 8.19rem;
  position: absolute;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`
const SelectBox = styled.div`
  width: 34.75rem;
  height: 4.625rem;
  position: absolute;
  top: 1.62rem;
  right: 3.56rem;
  display: flex;
  justify-content: space-between;
`
const OXcheckBox = styled.div`
  width: 13.8125rem;
  height: 4.625rem;
  position: relative;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 700;
  display: flex;
`
const MultipleCheckBox = styled.div`
  width: 17.8125rem;
  height: 4.625rem;
  position: relative;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 700;
  display: flex;
`
const AnswerCheck = styled.div`
  width: 5rem;
  height: 4rem;
  right: 2.69rem;
  position: absolute;
  justify-content: center;
  align-items: center;
`
const QuestionInput = styled.div`
  margin-left: 10rem;
  width: 75.2475rem;
  height: 5.375rem;
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  cursor: text;
  white-space: nowrap; // 줄 바꿈 없이 텍스트를 옆으로 이어지게 합니다.
  overflow-x: auto; // 내용이 넘칠 때 가로 스크롤을 허용합니다.
  overflow-y: hidden; // 세로 스크롤은 숨깁니다.
`
const QuizCreate = () => {
  const [isOXChecked, setIsOXChecked] = useState(true);
  const [isMultipleChecked, setIsMultipleChecked] = useState(false);
  const [answersChecked, setAnswersChecked] = useState([false, false, false, false]);
  const [choiceTexts, setChoiceTexts] = useState(Array(4).fill("보기를 입력하세요"));
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(Array(4).fill(true));
  const toggleOXCheckBox = () => {
    setIsOXChecked(!isOXChecked);
    setIsMultipleChecked(isOXChecked);
  };
  const toggleMultipleCheckBox = () => {
    setIsMultipleChecked(!isMultipleChecked);
    setIsOXChecked(isMultipleChecked);
  };
  const toggleAnswerCheckBox = (index) => {
    // 모든 선택지의 상태를 false로 설정하고, 클릭된 선택지만 true로 설정
    const updatedAnswers = answersChecked.map((item, idx) => idx === index ? !item : false);
    setAnswersChecked(updatedAnswers);
  }
  const handleChoiceTextChange = (index, e) => {
    const newText = e.currentTarget.textContent;
    setChoiceTexts((prev) => prev.map((item, idx) => (idx === index ? newText : item)));
    setIsPlaceholderVisible((prev) => 
        prev.map((visible, idx) => idx === index ? newText.trim().length === 0 : visible)
    );
  };

  const handleFocus = (index) => {
    if (choiceTexts[index] === "보기를 입력하세요") {
      setChoiceTexts((prev) => prev.map((item, idx) => (idx === index ? '' : item)));
      setIsPlaceholderVisible((prev) => prev.map((item, idx) => (idx === index ? false : item)));
    }
  };

  const handleBlur = (index) => {
    if (!choiceTexts[index].trim()) {
      setChoiceTexts((prev) => prev.map((item, idx) => (idx === index ? "보기를 입력하세요" : item)));
      setIsPlaceholderVisible((prev) => prev.map((item, idx) => (idx === index ? true : item)));
    }
  };

  return (
    <Background backgroundImage={QuizMainImage}>
      <QuizContainer>
        <SelectBox>
          <OXcheckBox>
            OX
            <img src={isOXChecked ? SelectCheckBox : CheckBox} alt="box" onClick={toggleOXCheckBox}/>
          </OXcheckBox>
          <MultipleCheckBox>
            객관식
            <img src={isMultipleChecked ? SelectCheckBox : CheckBox} alt="box" onClick={toggleMultipleCheckBox}/>
          </MultipleCheckBox>
        </SelectBox>
        <ChoiceBox>
          {answersChecked.map((isChecked, index) => (
            <Choice key={index}>
              <ChoiceColor fill={getColor(index)} />
              <QuestionNumber>
                {index + 1}.
              </QuestionNumber >              
              <QuestionInput 
                contentEditable={true}
                suppressContentEditableWarning={true} // React에서 contentEditable 사용 시 경고를 억제
                onInput={(e) => handleChoiceTextChange(index, e)}
                onFocus={()=> handleFocus(index)}
                onBlur={() => handleBlur(index)}
                style={{ color: isPlaceholderVisible[index] ? '#ccc' : '#000' }}>
                  {isPlaceholderVisible[index] && "보기를 입력하세요"}
              </QuestionInput>
              <AnswerCheck>
                <img
                  src={isChecked ? SelectAnswerCheckBox : AnswerCheckBox}
                  alt="box"
                  onClick={() => toggleAnswerCheckBox(index)}
                />
              </AnswerCheck>
            </Choice>
          ))}
        </ChoiceBox>
      </QuizContainer>
    </Background>
  )
}
const getColor = (index) => {
  const colors = ['#f00', '#FF7F00', '#FFD400', '#009630'];
  return colors[index] || '#FFF';
};

export default QuizCreate
