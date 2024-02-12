import { isAddModalOpenState } from 'Recoil/QuizState';
import React, { useState, useEffect } from 'react';
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png';
import Background from 'components/Basic/Background';
import styled from 'styled-components';
import QuizImage from 'assets/images/Quiz/퀴즈풍선.png';
import NumberImage from 'assets/images/Quiz/문제번호풍선.png';
import { useRecoilState } from 'recoil';
import { QuizModal } from 'components/Quiz/QuizModal';

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 84rem;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15.75rem;
  height: 16.3125rem;
  background-image: url(${QuizImage});
  position: relative;
  right: 8rem;
`;
const QuizTitle = styled.div`
  position: relative;
  margin: 0;
  font-family: 'Century Gothic';
  font-size: 5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  right: 5rem;
`;

const StartButton = styled.button`
  width: 22.5rem;
  height: 7.5rem;
  border-radius: 1.25rem;
  background: #ff5050;
  border: 3px solid #ff6a6a;
  position: relative;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 400;
  left: 41rem;
  top: 2rem;
`;

const QuestionsContainer = styled.div`
  overflow-y: auto;
  width: 100%; // Adjust the width as needed
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  height: auto;
`;

const QuestionHeader = styled.div`
  margin: 0 0 10px 0;
`;

const Question = styled.div`
  margin-bottom: 12.25rem;
  border-radius: 3.125rem;
  border: 3px solid #dadada;
  background: #fff;
  color: #000;
  font-family: 'Century Gothic';
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 6rem;
`;

const QuestionMain = styled.div`
  padding-top: 1rem;
  padding-left: 3rem;
`;

const QuestionChoice = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;
const NumberImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 5.09006rem;
  height: 5.25rem;
  background-image: url(${NumberImage});
  background-repeat: no-repeat;
`;

const QuestionFooter = styled.div`
  padding-left: 50rem;
`;

const dataBody = [
  {
    workbookId: '문제집 번호',
    questionType: '문제 유형',
    questionInstruction: '문제 질문',
    questionChoice1: '문제 선지 1번',
    questionChoice2: '문제 선지 2번',
    questionChoice3: '문제 선지 3번',
    questionChoice4: '문제 선지 4번',
    questionAnswer: '3',
  },
  {
    workbookId: '문제집 번호',
    questionType: '문제 유형',
    questionInstruction: '문제 질문',
    questionChoice1: '문제 선지 1번',
    questionChoice2: '문제 선지 2번',
    questionChoice3: '문제 선지 3번',
    questionChoice4: '문제 선지 4번',
    questionAnswer: '4',
  },
];

const QuizDetailTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isAddModalOpenState);

  const handleAddClassClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Background backgroundImage={QuizMainImage}>
      <Layout>
        <QuizContainer>
          <Header>
            <ImageBox></ImageBox>
            <QuizTitle>문제 제목</QuizTitle>
            <StartButton onClick={handleAddClassClick}>시작</StartButton>
          </Header>
          {isModalOpen && <QuizModal />}

          <QuestionsContainer>
            {dataBody.map((question, index) => (
              <Question key={index}>
                <QuestionHeader>
                  <p>
                    Q{index + 1}. {question.questionInstruction}
                  </p>
                </QuestionHeader>
                <QuestionMain>
                  <QuestionChoice>
                    <NumberImageBox>1 </NumberImageBox>
                    {question.questionChoice1}
                  </QuestionChoice>
                  <QuestionChoice>
                    <NumberImageBox>2 </NumberImageBox>
                    {question.questionChoice2}
                  </QuestionChoice>
                  <QuestionChoice>
                    <NumberImageBox>3 </NumberImageBox>
                    {question.questionChoice3}
                  </QuestionChoice>
                  <QuestionChoice>
                    <NumberImageBox>4 </NumberImageBox>
                    {question.questionChoice4}
                  </QuestionChoice>
                </QuestionMain>
                <QuestionFooter>
                  <p>{`정답:${question.questionAnswer}`}</p>
                </QuestionFooter>
              </Question>
            ))}
          </QuestionsContainer>
        </QuizContainer>
      </Layout>
    </Background>
  );
};

export default QuizDetailTeacher;
