import { React, useEffect, useState } from 'react';

import styled from 'styled-components';
import {
  isAddModalOpenState,
  isQuizStartState,
  isWorkbookStartState,
} from 'Recoil/QuizState';
import { useRecoilState, useRecoilValue } from 'recoil';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { putQuizStart } from 'api/QuizApi';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import { getDetailWorkBook } from 'api/QuizApi';
import { useParams } from 'react-router-dom';
const ModalDiv = styled.div`
  width: 100vw;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  background-color: rgba(91, 112, 131, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  width: 96rem;
  height: 60rem;
  padding: 5rem 9.88rem;
  background-color: white;
  border-radius: 3.125rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ClassNameBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5.3125rem;
`;
const Title = styled.div`
  text-align: center;
  font-size: 3rem;
  font-weight: 600;
`;
const LargeInput = styled.input`
  width: 59.25rem;
  height: 5.3125rem;
  border-radius: 1.25rem;
  border: 2px solid #c8c8c8;
  font-size: 2rem;
  font-weight: 600;
  padding: 0 2.69rem;
  &:focus {
    outline: 0.1rem solid #596fb7;
  }
`;
const MainBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 30rem;
  color: #000;

  font-family: 'Century Gothic';
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Item = styled.div`
  width: 50%;
  height: 100%;
`;

const ItemTitle = styled.div`
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1.5rem;
  font-family: 'Century Gothic';
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5.125rem;
  width: 100%;
`;
const CancelButton = styled.div`
  width: 13.54169rem;
  height: 5.125rem;
  border-radius: 3.125rem;
  border-radius: 2.5rem;
  background: #c8c8c8;
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2.52rem;
  cursor: pointer;
`;

const ConfirmButton = styled.div`
  width: 12rem;
  height: 5.125rem;
  flex-shrink: 0;
  background: #596fb7;
  border-radius: 2.5rem;
  color: #fff;
  font-size: 2rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2.52rem;
  cursor: pointer;
`;

const CustomDatePicker = styled(DatePicker)`
  width: 13rem;
  height: 3rem;
  position: relative;
  bottom: 0.5rem;
  font-size: 1.5rem;
  border-radius: 0.625rem;
  border: 2px solid #c8c8c8;
  background: #fff;
  text-align: center;
`;

const TimeInput = styled.input`
  width: 5.75rem;
  height: 3.1875rem;
  margin-right: 1rem;
  text-align: center;
  font-size: 1.5rem;
  border-radius: 0.625rem;
  border: 2px solid #c8c8c8;
  background: #fff;
  position: relative;
  bottom: 0.5rem;
`;

export const QuizModal = () => {
  const [isAddModalOpen, setIsAddModalOpen] =
    useRecoilState(isAddModalOpenState);
  const handleCancel = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };
  const params = useParams();
  const navigate = useNavigate();
  const [quizStart, setQuizStart] = useRecoilState(isQuizStartState);
  const [workbook, setWorkbook] = useState({});
  const fetchWorkbookData = async () => {
    try {
      const response = await getDetailWorkBook(params.id);
      setWorkbook(response.data.dataBody);
      console.log(response.data.dataBody);
    } catch (e) {
      console.log(e);
    }
  };
  const handleStart = async () => {
    if (
      selectedDate &&
      startTime.hour.trim() !== '' &&
      startTime.minute.trim() !== '' &&
      endTime.hour.trim() !== '' &&
      endTime.minute.trim() !== ''
    ) {
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);

      startDate.setHours(
        parseInt(startTime.hour, 10),
        parseInt(startTime.minute, 10)
      );
      endDate.setHours(
        parseInt(endTime.hour, 10),
        parseInt(endTime.minute, 10)
      );

      const startDateTime = format(startDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      const endDateTime = format(endDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      console.log(sessionStorage.getItem('workbookId'));
      const updatedWorkbookData = {
        groupId: sessionStorage.getItem('groupId'),
        workbookId: sessionStorage.getItem('workbookId'),
        activeWorkbookStart: startDateTime,
        activeWorkbookEnd: endDateTime,
      };

      const response = await putQuizStart(updatedWorkbookData);
      console.log(response);
      if (response) {
        setWorkbookData(updatedWorkbookData);
        setQuizStart(true);
      }
    } else {
      alert('모든 필드를 올바르게 입력해주세요.');
    }
    navigate('/quizenter');
  };

  const [workbookData, setWorkbookData] = useRecoilState(isWorkbookStartState);
  const [startTime, setStartTime] = useState({ hour: '', minute: '' });
  const [endTime, setEndTime] = useState({ hour: '', minute: '' });
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    fetchWorkbookData();
    console.log(workbookData);
  }, []);
  return (
    <ModalDiv>
      <ModalBox>
        <ClassNameBox>
          <Title>
            <p>퀴즈를 시작하시겠습니까?</p>
          </Title>
        </ClassNameBox>
        <MainBox>
          <Item>
            <ItemTitle>시작 시간</ItemTitle>
            <TimeInput
              type='number'
              value={startTime.hour}
              onChange={(e) =>
                setStartTime({ ...startTime, hour: e.target.value })
              }
            />
            시
            <TimeInput
              type='number'
              value={startTime.minute}
              onChange={(e) =>
                setStartTime({ ...startTime, minute: e.target.value })
              }
            />
            분<div></div>
            <CustomDatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText='날짜를 입력창'
            />
          </Item>
          <Item>
            <ItemTitle>종료 시간</ItemTitle>
            <TimeInput
              type='number'
              value={endTime.hour}
              onChange={(e) => setEndTime({ ...endTime, hour: e.target.value })}
            />
            시
            <TimeInput
              type='number'
              value={endTime.minute}
              onChange={(e) =>
                setEndTime({ ...endTime, minute: e.target.value })
              }
            />
            분
          </Item>
        </MainBox>

        <ButtonBox>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <ConfirmButton onClick={handleStart}>확인</ConfirmButton>
        </ButtonBox>
      </ModalBox>
    </ModalDiv>
  );
};
