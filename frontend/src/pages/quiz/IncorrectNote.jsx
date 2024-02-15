import React, { useEffect, useState } from 'react';
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png';
import Background from 'components/Basic/Background';
import styled from 'styled-components';
import ListIcon from 'assets/svg/quiz/listicon.svg';
import AnswerListIcon from 'assets/svg/quiz/answerlisticon.svg';
import IncorrectListIcon from 'assets/svg/quiz/incorrectlisticon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailWorkBook } from 'api/QuizApi';
import {
  quizNameState,
  userAnswersState,
  userWrongAnswerState,
} from 'Recoil/QuizState';
import { useRecoilValue } from 'recoil';
const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;
const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const QuizBox = styled.div`
  width: 105rem;
  height: 65.625rem;
  background: rgba(220, 242, 255, 0.9);
  border-radius: 1.25rem;
  top: 11.06rem;
  left: 14rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around;
  align-items: center; */
`;
const OXboxContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-around;
  width: 100%;
  margin-top: 5rem;
`;
const OXbox = styled.div`
  width: 45rem;
  height: 45rem;
  border-radius: 1.25rem;
  /* border: 20px solid var(--sub1, #596FB7); */
  background: #fff;
  position: relative;
  display: flex;
  font-size: 25rem;
  font-style: normal;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  /* transition: border 0.3s; */
  /* &:hover {
    border: 20px solid var(--sub1, #596FB7);
  } */
`;

const QuizNavbar = styled.div`
  width: 26.125rem;
  height: 100%;
  flex-direction: column;
  right: 0;
  background: #fff;
  justify-content: flex-start;
  align-items: center;
  display: flex;
`;
const QuizName = styled.div`
  width: 22.625rem;
  height: 5.9375rem;
  border-radius: 1.25rem;
  background: rgba(220, 242, 255, 1);
  position: absolute;
  display: flex;
  margin-top: 4.38rem;
  color: #000;
  justify-content: center;
  align-items: center;
  color: #000;
  font-family: 'Noto Sans';
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 400;
`;
const SubmitButton = styled.button`
  width: 22.5rem;
  height: 7.5rem;
  border-radius: 1.25rem;
  background: #ff5050;
  bottom: 4.37rem;
  color: #fff;
  text-align: center;
  font-size: 3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: auto;
  position: absolute;
`;
const DirectionButton = styled.button`
  width: 22.5rem;
  height: 7.5rem;
  border-radius: 3.75rem;
  background: #0f70b7;
  position: absolute;
  color: #fff;
  font-size: 2.375rem;
  font-style: normal;
  font-weight: 700;
`;
const BackButton = styled(DirectionButton)`
  margin-left: 4.44rem;
  bottom: 4.37rem;
`;
const NextButton = styled(DirectionButton)`
  position: absolute;
  right: 4.44rem;
  bottom: 4.37rem;
`;
const ChoiceBox = styled.div`
  background: #fff;
  width: 90rem;
  height: 9.6875rem;
  position: relative;
  border-radius: 1.25rem;
  align-items: center;
`;
const QuestionBox = styled.div`
  position: relative;
  width: 100%;
  height: 55.625rem;
  /* margin-top: 10rem; */
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  display: flex;
`;
const Number = styled.div`
  color: #0f70b7;
  font-size: 3rem;
  font-style: normal;
  font-weight: 600;
  width: 7rem;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  display: flex;
`;
const SvgContainer = styled.div`
  width: 4.375rem;
  height: 4.375rem;
  position: absolute;
  display: flex;
  top: 2.12rem;
  left: 2.12rem;
`;
const Selection = styled.div`
  margin-left: 7rem;
  position: absolute;
  width: 83rem;
  height: 100%;
  align-items: center;
  color: #000;
  text-align: center;
  font-family: 'Noto Sans';
  font-size: 2.25rem;
  font-weight: 700;
  display: flex;
`;
const Header = styled.div`
  height: 12rem;
  width: 100%;
  max-width: 105rem;
  align-items: center;
  display: flex;
  position: relative;
  justify-content: space-between;
`;
const TitleBox = styled.div`
  width: 95.5rem;
  height: 100%;
  align-items: center;
  display: flex;
  padding: 1rem;
  color: #000;

  text-align: left;
  font-family: 'Noto Sans';
  font-size: 4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const QuestionNumber = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  background: #0f70b7;
  /* position: absolute; */
  display: flex;
  border-radius: 1.25rem;
  margin-left: 2rem;
  color: #fff;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Noto Sans';
  font-size: 2.375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const IncorrectNote = () => {
  const [workbook, setWorkbook] = useState([]);
  const params = useParams();
  const [arrayIndex, setArrayIndex] = useState(0);
  const [question, setQuestion] = useState();
  const checkSheet = useRecoilValue(userAnswersState);
  const wrongList = useRecoilValue(userWrongAnswerState);
  const quizName = useRecoilValue(quizNameState);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate('/quizenter');
  };

  const fetchWorkbookData = async () => {
    try {
      const response = await getDetailWorkBook(
        sessionStorage.getItem('workbookId')
      );
      setWorkbook(response.data.dataBody);
      console.log(response.data.dataBody);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchWorkbookData();
  }, []);
  const handleNext = () => {
    if (arrayIndex + 1 > wrongList.length - 1) {
      alert('마지막 문제입니다');
    } else {
      navigate(`/incorrectnote/${wrongList[arrayIndex + 1]}`);
      setArrayIndex(arrayIndex + 1);
    }

    console.log(workbook[wrongList[arrayIndex] - 1]);
  };
  const handleBack = () => {
    if (arrayIndex - 1 < 0) {
      alert('첫번째 문제입니다');
    } else {
      navigate(`/incorrectnote/${wrongList[arrayIndex - 1]}`);
      setArrayIndex(arrayIndex - 1);
    }
  };

  const renderQuestion = () => {
    const questionIndex = wrongList[arrayIndex] - 1;
    const questionData = workbook[questionIndex];
    const userAnswer = checkSheet[questionIndex];
    const isAnswerCorrect = questionData?.questionAnswer === userAnswer;
    if (!questionData) {
      return <p>문제를 불러올 수 없습니다.</p>;
    }

    // questionType에 따라 다른 컴포넌트를 렌더링
    switch (questionData.questionType) {
      case 1:
        return (
          <QuestionBox>
            <OXboxContainer>
              <OXbox style={{ color: '#0f70b7' }}>
                <SvgContainer>
                  {isAnswerCorrect ? (
                    <img src={IncorrectListIcon} alt='Correct' />
                  ) : (
                    <img src={AnswerListIcon} alt='Incorrect' />
                  )}
                </SvgContainer>
                O
              </OXbox>
              <OXbox style={{ color: '#f00' }}>
                <SvgContainer>
                  {!isAnswerCorrect ? (
                    <img src={IncorrectListIcon} alt='Correct' />
                  ) : (
                    <img src={AnswerListIcon} alt='Incorrect' />
                  )}
                </SvgContainer>
                X
              </OXbox>
            </OXboxContainer>
          </QuestionBox>
        );
      case 2:
        const indexArray = [1, 2, 3, 4];
        return (
          <QuestionBox>
            {indexArray.map((number, index) => (
              <ChoiceBox>
                <SvgContainer>
                  {userAnswer === number ? (
                    <img src={IncorrectListIcon} alt='User Answer' />
                  ) : questionData.questionAnswer === number ? (
                    <img src={AnswerListIcon} alt='Correct Answer' />
                  ) : (
                    <img src={ListIcon} alt='User Incorrect Answer' />
                  )}
                  {/* {questionData.questionAnswer === number ? (
                    userAnswer === number ? (
                      <img src={ListIcon} alt='User Correct Answer' />
                    ) : (
                      <img src={AnswerListIcon} alt='Correct Answer' />
                    )
                  ) : userAnswer === number ? (
                    <img src={IncorrectListIcon} alt='User Incorrect Answer' />
                  ) : null} */}
                </SvgContainer>
                <Selection>
                  {workbook[params.id - 1][`questionChoice${number}`]}
                </Selection>
              </ChoiceBox>
            ))}
          </QuestionBox>
        );
      default:
        return <p>지원되지 않는 문제 유형입니다.</p>;
    }
  };

  return (
    <Background backgroundImage={QuizMainImage}>
      <Layout>
        <MainContent>
          <QuizBox>
            <Header>
              <QuestionNumber>Q{wrongList[arrayIndex]}</QuestionNumber>
              <TitleBox>
                {workbook[wrongList[arrayIndex] - 1]?.questionInstruction}
              </TitleBox>
            </Header>
            {renderQuestion()}
          </QuizBox>
          <BackButton onClick={handleBack}>이전 문제</BackButton>
          <NextButton onClick={handleNext}>다음 문제</NextButton>
        </MainContent>
        <QuizNavbar>
          <QuizName>{quizName}</QuizName>
          <SubmitButton onClick={handleClose}>나가기</SubmitButton>
        </QuizNavbar>
      </Layout>
    </Background>
  );
};

export default IncorrectNote;
