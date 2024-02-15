import Background from 'components/Basic/Background';
import React, { useEffect, useState } from 'react';
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png';
import TextImage from 'assets/images/Quiz/textimage.png';
import TimeImage from 'assets/images/Quiz/timeimage1.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom/dist';
import { isWorkbookStartState, quizNameState } from 'Recoil/QuizState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getActiveWorkBook } from 'api/QuizApi';
const TextBox = styled.div`
  top: 10.56rem;
  position: absolute;
  display: flex;
  width: 77.61713rem;
  height: 16.3125rem;
  right: 41.2rem;
  align-items: center;
  justify-content: center;
  background-image: url(${TextImage});
  font-size: 40px;
`;
const TimeBox = styled.div`
  top: 39.06rem;
  position: absolute;
  display: flex;
  width: 84.875rem;
  height: 19.25rem;
  left: 37.56rem;
  align-items: center;
  justify-content: center;
  background-image: url(${TimeImage});
  font-size: 40px;
`;
const Comment = styled.div`
  position: absolute;
  display: flex;
  top: 66.31rem;
  left: 53.75rem;
  width: auto;
  height: auto;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
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
`;

const QuizEnter = () => {
  const navigate = useNavigate();
  const HandelEnterClick = () => {
    navigate(`/quizsolve/${workbookId}/1`);
  };
  const [workbook, setWorkbook] = useState({});
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState(null);
  const [title, setTitle] = useRecoilState(quizNameState);
  const [workbookId, setWorkbookId] = useState();
  const Id = sessionStorage.getItem('groupId');
  const fetchActiveWorkBookData = async () => {
    try {
      console.log(Id);
      const response = await getActiveWorkBook(Id);
      console.log(response);
      setWorkbookId(response.data.dataBody.workbookId);
      const formattedStartTime = response.data.dataBody.activeWorkbookStart
        .replace('T', ' ')
        .split('.')[0];
      const formattedEndTime = response.data.dataBody.activeWorkbookEnd
        .replace('T', ' ')
        .split('.')[0];
      setStartTime(formattedStartTime);
      setEndTime(formattedEndTime);
      setWorkbook(response.data.dataBody);
      setTitle(response.data.dataBody.workbookTitle);
      // console.log(response.data.dataBody.activeWorkbookStart);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchActiveWorkBookData();
  }, []);

  return (
    <Background backgroundImage={QuizMainImage}>
      <TextBox>{title}</TextBox>
      <TimeBox>
        {startTime}~{endTime}
      </TimeBox>
      <Comment>'입장하기' 버튼을 클릭하면 Quiz가 시작됩니다.</Comment>
      <EnterButton onClick={HandelEnterClick}>입장하기</EnterButton>
    </Background>
  );
};

export default QuizEnter;
