import React, { useState, useEffect } from 'react';
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png';
import Background from 'components/Basic/Background';
import styled from 'styled-components';
import { getDetailWorkBook, getActiveWorkBook } from 'api/QuizApi';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist';
import { isQuizScoreState, userAnswersState } from 'Recoil/QuizState';
import { useRecoilState, useRecoilValue } from 'recoil';
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
  transition: border 0.3s;
  &:hover {
    border: 20px solid var(--sub1, #596fb7);
  }
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
const QuizNavbar = styled.div`
  width: 26.125rem;
  height: 100%;
  flex-direction: column;
  right: 0;
  background: #fff;
  /* justify-content: flex-start; */
  align-items: center;
  display: flex;
  position: relative;
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
const Timer = styled.div`
  top: 10rem;
  font-size: 2rem;
  color: #000;
  margin: 1rem;
  position: absolute;
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
  border-radius: 1.25rem;
  align-items: center;
  position: relative;
  transition: border 0.3s;
  &:hover {
    border: 20px solid var(--sub1, #596fb7);
  }
`;
const QuestionBox = styled.div`
  position: relative;
  width: 100%;
  height: 53.625rem;
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
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 7rem;
  height: 100%;
  display: flex;
`;
const Selection = styled.div`
  position: relative;
  margin-left: 7rem;
  width: 83rem;
  height: 100%;
  align-items: center;
  display: flex;
  color: #000;
  text-align: left;
  font-family: 'Noto Sans';
  font-size: 2.25rem;
  font-weight: 700;
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
const QuizSolve = () => {
  const [timeLeft, setTimeLeft] = useState(120); // 2분을 초 단위로 환산
  const [workbook, setWorkbook] = useState([]);
  const [question, setQuestion] = useState();
  const [title, setTitle] = useState();
  const params = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useRecoilState(userAnswersState);
  const userPick = useRecoilValue(userAnswersState);
  const [quizScore, setQuizScore] = useRecoilState(isQuizScoreState);
  const handleAnswerSelect = (questionNumber, selectedAnswer) => {
    console.log(selectedAnswer);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionNumber]: selectedAnswer,
    }));
  };

  const calculateScore = () => {
    const correctAnswers = workbook.map(
      (question, index) => question.questionAnswer
    );
    let score = 0;
    console.log(userAnswers);
    correctAnswers.forEach((answer, index) => {
      const userAnswer = userAnswers[index]; // userAnswers는 1부터 시작하는 문제 번호를 키로 사용
      if (answer === userAnswer) {
        score += 1; // 정답을 맞힌 경우 점수 증가
      }
    });

    // 최종 점수 상태 업데이트
    setQuizScore(score);
    navigate('/quizfinish');
  };
  const fetchWorkbookData = async () => {
    try {
      const response = await getDetailWorkBook(params.id);
      console.log(response.data.dataBody);
      setWorkbook(response.data.dataBody);
      setQuestion(response.data.dataBody[questionNumber].questionInstruction);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchActivWorkbookData = async () => {
    try {
      const response = await getActiveWorkBook(
        sessionStorage.getItem('groupId')
      );
      setTitle(response.data.dataBody.workbookTitle);
      console.log(response.data.dataBody);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    // 타이머가 0이 되면 중지
    if (timeLeft === 0) return;

    // 매초마다 timeLeft 감소
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // 컴포넌트 언마운트 또는 업데이트 시 타이머 정리
    return () => clearInterval(timerId);
  }, [timeLeft]); // timeLeft가 변경될 때마다 useEffect 실행
  useEffect(() => {
    fetchWorkbookData();
    fetchActivWorkbookData();
  }, [questionNumber]);
  // 시간 포맷 변경 (예: 120 -> 02:00)
  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const questionIndex = parseInt(params.number, 10) - 1;
  const renderQuestion = () => {
    // 현재 문제 번호에 해당하는 문제 데이터를 가져옵니다.
    // params.number는 문자열이므로 정수로 변환
    const questionData = workbook[questionIndex]; // 문제 데이터

    // questionData가 유효한지 확인
    if (!questionData) {
      return <p>문제를 불러올 수 없습니다.</p>;
    }

    // questionType에 따라 다른 컴포넌트를 렌더링
    switch (questionData.questionType) {
      case 1:
        return (
          <QuestionBox>
            <OXboxContainer>
              <OXbox
                onClick={() => handleAnswerSelect(questionNumber, 1)}
                style={{ color: '#0f70b7' }}
              >
                O
              </OXbox>
              <OXbox
                onClick={() => handleAnswerSelect(questionNumber, 2)}
                style={{ color: '#f00' }}
              >
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
              <ChoiceBox
                onClick={() => handleAnswerSelect(questionNumber, number)}
              >
                <Number>{number}</Number>
                <Selection>
                  {workbook[params.number - 1][`questionChoice${number}`]}
                </Selection>
              </ChoiceBox>
            ))}
          </QuestionBox>
        );
      default:
        return <p>지원되지 않는 문제 유형입니다.</p>;
    }
  };
  const HandelNext = () => {
    if (parseInt(params.number, 10) + 1 > workbook.length) {
      alert('마지막 문제입니다');
    } else {
      navigate(`/quizsolve/${params.id}/${parseInt(params.number, 10) + 1}`);
      setQuestionNumber(questionNumber + 1);
    }
  };
  const HandelBack = () => {
    if (parseInt(params.number, 10) - 1 < 1) {
      alert('첫 번째 문제입니다');
    } else {
      navigate(`/quizsolve/${params.id}/${parseInt(params.number, 10) - 1}`);
      setQuestionNumber(questionNumber - 1);
    }
  };
  return (
    <Background backgroundImage={QuizMainImage}>
      <Layout>
        <MainContent>
          <QuizBox>
            <Header>
              <QuestionNumber>Q{params.number}</QuestionNumber>
              <TitleBox>{question}</TitleBox>
            </Header>
            {renderQuestion()}
          </QuizBox>
          <BackButton onClick={HandelBack}>이전 문제</BackButton>
          <NextButton onClick={HandelNext}>다음 문제</NextButton>
        </MainContent>
        <QuizNavbar>
          <QuizName>{title}</QuizName>
          <Timer> 제한시간 : {formatTimeLeft(timeLeft)}</Timer>
          <SubmitButton onClick={calculateScore}>제출하기</SubmitButton>
        </QuizNavbar>
      </Layout>
    </Background>
  );
};

export default QuizSolve;
