import { isAddModalOpenState } from 'Recoil/QuizState';
import React, { useState, useEffect } from 'react';
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png';
import Background from 'components/Basic/Background';
import styled from 'styled-components';
import QuizImage from 'assets/images/Quiz/퀴즈풍선.png';
import NumberImage from 'assets/images/Quiz/문제번호풍선.png';
import { useRecoilState } from 'recoil';
import { QuizModal } from 'components/Quiz/QuizModal';
import { getDetailWorkBook } from 'api/QuizApi';
import { useParams } from 'react-router-dom';
import { classListState } from './../../../Recoil/ClassState';
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
  width: 101rem;
  max-width: 101rem;
  height: 100vh;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 101rem;
  height: 16.3125rem;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15.75rem;
  height: 16.3125rem;
  background-image: url(${QuizImage});
  position: relative;
  left: 2.38rem;
`;
const QuizTitle = styled.div`
  position: absolute;
  display: flex;
  margin: 0;
  font-family: 'Century Gothic';
  font-size: 5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  left: 20.31rem;
`;

const StartButton = styled.button`
  width: 22.5rem;
  height: 7.5rem;
  border-radius: 1.25rem;
  background: #ff5050;
  border: 3px solid #ff6a6a;
  position: absolute;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 400;
  right: 5.44rem;
  top: 6.81rem;
`;

const QuestionsContainer = styled.div`
  overflow-y: auto;
  width: 100%; // Adjust the width as needed
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  padding: 20px;
  height: auto;
`;

const QuestionHeader = styled.div`
  margin: 0 0 10px 0;
  color: #000;
  font-family: 'Century Gothic';
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Question = styled.div`
  margin-bottom: 12.25rem;
  border-radius: 3.125rem;
  border: 3px solid #dadada;
  background: #fff;
  max-width: 100%;
  width: 101rem;
  height: auto;
`;

const QuestionMain = styled.div`
  padding-top: 1rem;
  padding-left: 3rem;
  color: #000;
  font-family: 'Century Gothic';
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
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
  color: #000;
  margin-right: 2rem;
  font-family: 'Century Gothic';
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: 5.09006rem;
  height: 5.25rem;
  background-image: url(${NumberImage});
  background-repeat: no-repeat;
`;

const QuestionFooter = styled.div`
  display: flex;
  align-items: center;
  padding-left: 78rem;
  color: #000;
  font-family: 'Century Gothic';
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const SelectQuizContainer = styled.div`
  width: 101rem;
  margin-top: 3rem;
  overflow-y: auto;
  max-height: 70vh;
  justify-content: space-around;
  /* align-items: center; */
  /* display: flex; */
  flex-direction: column;
  position: relative;
`;
const QuizDetailTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isAddModalOpenState);
  const [workbook, setWorkbook] = useState([]);
  const params = useParams();
  const handleAddClassClick = () => {
    setIsModalOpen(true);
  };
  const fetchWorkbookData = async () => {
    try {
      const response = await getDetailWorkBook(params.id);
      setWorkbook(response.data.dataBody);
      console.log(response.data.dataBody);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchWorkbookData();
  }, []);
  const ModalContainer = styled.div`
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const renderQuestion = (data, index) => {
    switch (data.questionType) {
      case 1:
        return (
          <Question key={index}>
            <QuestionHeader>
              <p>
                Q{index + 1}. {data.questionInstruction}
              </p>
            </QuestionHeader>
            <QuestionFooter>
              {`정답: ${data.questionAnswer === 1 ? 'O' : 'X'}`}
            </QuestionFooter>
          </Question>
        );
      case 2:
        const indexArray = [1, 2, 3, 4];
        return (
          <Question key={index}>
            <QuestionHeader>
              <p>
                Q{index + 1}. {data.questionInstruction}
              </p>
            </QuestionHeader>
            <QuestionMain>
              {indexArray.map((number, index) => (
                <QuestionChoice>
                  <NumberImageBox>{number}</NumberImageBox>
                  {data[`questionChoice${number}`]}
                </QuestionChoice>
              ))}
            </QuestionMain>
            <QuestionFooter>
              <div>{`정답: ${data.questionAnswer}`}</div>
            </QuestionFooter>
          </Question>
        );
      default:
        return <p>지원되지 않는 문제 유형입니다.</p>;
    }
  };

  return (
    <Background backgroundImage={QuizMainImage}>
      <Layout>
        <StartButton onClick={handleAddClassClick}>시작</StartButton>
        {isModalOpen && (
          <ModalContainer>
            <QuizModal />
          </ModalContainer>
        )}
        <QuizContainer>
          <Header>
            <ImageBox></ImageBox>
            <QuizTitle>문제 제목</QuizTitle>
          </Header>

          <SelectQuizContainer>
            {workbook.map((data, index) => renderQuestion(data, index))}
          </SelectQuizContainer>
        </QuizContainer>
      </Layout>
    </Background>
  );
};

export default QuizDetailTeacher;
