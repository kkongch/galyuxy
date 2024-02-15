import React, { useEffect, useState } from 'react';
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png';
import FinishImage from 'assets/images/Quiz/수고했어요.png';
import Background from 'components/Basic/Background';
import ScoreBalloon from 'assets/images/Quiz/말풍선.png';
import styled from 'styled-components';
import {
  isQuizScoreState,
  userAnswersState,
  userWrongAnswerState,
} from 'Recoil/QuizState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { getDetailWorkBook } from 'api/QuizApi';
const FinishBox = styled.img`
  position: absolute;
  width: 83.625rem;
  height: 40.6875rem;
  top: 19.25rem;
  left: 38.19rem;
`;
const EnterButton = styled.button`
  width: 37.5rem;
  height: 9.375rem;
  border-radius: 2.5rem;
  background: #ff5050;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 3.125rem;
  top: 70.94rem;
  left: 61.25rem;
  font-style: normal;
  font-weight: 700;
  color: #fff;
`;
const ScoreBox = styled.div`
  width: 29.3125rem;
  height: 26.9375rem;
  background: url(${ScoreBalloon});
  position: absolute;
  top: 6rem;
  left: 97.25rem;
`;
const ScoreText = styled.div`
  width: 11.5rem;
  height: 15.375rem;
  position: relative;
  top: 4.69rem;
  left: 8.44rem;
  color: #000;
  text-align: center;
  font-size: 5rem;
  font-style: normal;
  font-weight: 700;
`;
const QuizFinish = () => {
  const score = useRecoilValue(isQuizScoreState);
  const list = useRecoilValue(userAnswersState);
  const [wrongList, setWrongList] = useRecoilState(userWrongAnswerState);
  const [workbook, setWorkbook] = useState([]);
  console.log(list);
  const navigate = useNavigate();
  const handleEnter = () => {
    navigate(`/incorrectnote/${wrongList[0]}`);
  };
  // const fetchWorkbookData = async () => {
  //   try {
  //     const response = await getDetailWorkBook(
  //       sessionStorage.getItem('workbookId')
  //     );
  //     console.log(response.data.dataBody);
  //     setWorkbook(response.data.dataBody);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // workbook.map((data, index) => {
  //   if (workbook[index].questionAnswer === list.index) {
  //     console.log(1);
  //     setWrongList(list[index]);
  //   }
  // });
  console.log(list);
  const fetchWorkbookData = async () => {
    try {
      const response = await getDetailWorkBook(
        sessionStorage.getItem('workbookId')
      );
      const workbookData = response.data.dataBody;
      console.log(workbookData);
      setWorkbook(workbookData);

      // 데이터를 성공적으로 불러온 후, 여기에서 오답 목록 계산
      const newWrongList = workbookData.reduce((acc, data, index) => {
        if (data.questionAnswer !== list[index]) {
          // index + 1로 접근하는 이유는 list 상태가 1부터 시작하는 인덱스를 사용할 수 있기 때문입니다.
          acc.push(index + 1); // 잘못된 답변의 인덱스를 오답 목록에 추가
        }
        return acc;
      }, []);

      setWrongList(newWrongList);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(wrongList);
  useEffect(() => {
    fetchWorkbookData();
  }, []);
  return (
    <Background backgroundImage={QuizMainImage}>
      <FinishBox src={FinishImage} />
      <ScoreBox>
        <ScoreText>
          점수
          {score}/{workbook.length}
        </ScoreText>
      </ScoreBox>
      <EnterButton onClick={handleEnter}>오답노트 확인하기</EnterButton>
    </Background>
  );
};

export default QuizFinish;
