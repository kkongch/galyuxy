import React, {useState,useEffect} from 'react'
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png';
import Background from 'components/Basic/Background';
import styled from 'styled-components';

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
  left : 14rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around;
  align-items: center; */
`
const OXboxContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-around;
  width: 100%;
  margin-top: 5rem;
`
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
    border: 20px solid var(--sub1, #596FB7);
  }
`
const QuestionNumber = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  background: #0f70b7;
  position: relative;
  margin-left: 2rem;
  margin-top: 2rem;
  border-radius: 1.25rem;
`
const QuizNavbar = styled.div`
  width: 26.125rem;
  height: 100%;
  flex-direction: column;
  right: 0;
  background: #fff;
  justify-content: flex-start;
  align-items: center;
  display: flex;
`
const QuizName = styled.div`
  width: 22.625rem;
  height: 5.9375rem;
  border-radius: 1.25rem;
  background: rgba(220, 242, 255, 1);
  position: relative;
  margin-top: 4.38rem;
`
const Timer = styled.div`
  font-size: 2rem;
  color: #000;
  margin: 1rem;
  position: relative;
`
const SubmitButton = styled.button`
  width: 22.5rem;
  height: 7.5rem;
  border-radius: 1.25rem;
  background: #ff5050;
  bottom: 4.37rem;
  color: #FFF;
  text-align: center;
  font-size: 3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: auto;
  position: absolute;
`
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
`
const BackButton = styled(DirectionButton)`
  margin-left: 4.44rem;
  bottom: 4.37rem;
`
const NextButton = styled(DirectionButton)`
  position: absolute;
  right: 4.44rem;
  bottom: 4.37rem;
`
const ChoiceBox = styled.div`
  background: #fff;
  width: 90rem;
  height: 9.6875rem;
  border-radius: 1.25rem;
  align-items: center;
  transition: border 0.3s;
  &:hover {
    border: 20px solid var(--sub1, #596FB7);
  }
`
const QuestionBox = styled.div`
  position: relative;
  width: 100%;
  height: 55.625rem;
  /* margin-top: 10rem; */
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  display: flex;
`
const Number = styled.div`
  color: #0F70B7;
  font-size: 3rem;
  font-style: normal;
  font-weight: 600;
  left: 3.44rem;
  top: 50%;
  transform: translateY(-50%);
  position: relative;;
  width: 1.75rem;
  height: 4.0625rem;
  display: flex;
`
const QuizSolve = () => {
  const [timeLeft, setTimeLeft] = useState(120); // 2분을 초 단위로 환산

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

  // 시간 포맷 변경 (예: 120 -> 02:00)
  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <Background backgroundImage={QuizMainImage}>
      <Layout>
        <MainContent>
          <QuizBox>
            <QuestionNumber />
            <QuestionBox>
              <ChoiceBox>
                <Number>1</Number>
              </ChoiceBox>
              <ChoiceBox>
                <Number>2</Number>
              </ChoiceBox>
              <ChoiceBox>
                <Number>3</Number>
              </ChoiceBox>
              <ChoiceBox>
                <Number>4</Number>
              </ChoiceBox>
            </QuestionBox>
            {/* <OXboxContainer>
              <OXbox style={{color:'#0f70b7'}}>O</OXbox>
              <OXbox style={{color:'#f00'}}>X</OXbox>
            </OXboxContainer> */}
          </QuizBox>
          <BackButton>이전 문제</BackButton>
          <NextButton>다음 문제</NextButton>
        </MainContent>
        <QuizNavbar>
          <QuizName />
          <Timer> 제한시간 : {formatTimeLeft(timeLeft)}</Timer>
          <SubmitButton>제출하기</SubmitButton>
        </QuizNavbar>
      </Layout>
    </Background>
  )
}

export default QuizSolve
