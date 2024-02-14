import { isAddModalOpenState } from 'Recoil/ClassState';
import { React, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import background from 'assets/images/presentationBackground.png';
import Background from 'components/Basic/Background';
import RoomList from 'components/Presentation/RoomList';
import { roomListState } from 'Recoil/PresentationState';
import RoomModal from 'components/Presentation/RoomModal';
import { teacherDataState, userTypeState } from 'Recoil/UserState';
import {
  activatePresentation,
  deactivatePresentation,
} from 'api/PresentationApi';
import StudentRoomList from 'components/Presentation/StudentRoomList';

const MainBox = styled.main`
  height: 100vh;
  width: 100vw;
`;

const ClassBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const AddClassButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 11.5rem;
  height: 5.125rem;
  background-color: #596fb7;
  color: #fff;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 600;
  padding: 0 2.4rem;
  border-radius: 1rem;
  cursor: pointer;
`;
const StartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.5rem;
  height: 5.125rem;
  font-size: 2rem;
  font-weight: 600;
  background-color: ${({ isRunning }) => (isRunning ? '#f00' : '#c8c8c8')};
  color: ${({ isRunning }) => (isRunning ? '#fff' : '#000')};
  border-radius: 1rem;
  cursor: pointer;
  margin-left: 1.94rem;
`;
const TopOfBoardBox = styled.div`
  display: flex;
  width: 90.1875rem;
  height: 5.125rem;
  justify-content: space-between;
  margin-bottom: 1.19rem;
`;
const Title = styled.div`
  text-align: center;
  font-size: 3.75rem;
  font-weight: 600;
`;
const SvgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoardBackgroundOuter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 92.1875rem;
  height: 62.4375rem;
  /* background-color: #dcab7a; */
  border-radius: 1.2rem;
  flex-wrap: wrap;
  overflow-y: auto;
  padding-right: 1rem;
`;

const RoomPage = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isAddModalOpenState);
  const userType = useRecoilValue(userTypeState);
  const [isRunning, setIsRunning] = useState(false);
  const [teacherData, setTeacherData] = useRecoilState(teacherDataState);

  const presentationId = teacherData.presentationId;

  console.log('presentationId:', presentationId);

  const handleAddClassClick = () => {
    setIsModalOpen(true);
  };

  const handleButtonClick = async () => {
    if (!isRunning) {
      console.log('발표활성화요청');
      try {
        activatePresentation(presentationId);
        setIsRunning(true);
      } catch (error) {
        console.error('발표 활성화 실패:', error);
      }
    } else {
      console.log('발표비활성화');
      try {
        deactivatePresentation(presentationId);
        setIsRunning(false);
      } catch (error) {
        console.error('발표 비활성화 실패:', error);
      }
    }
  };

  return (
    <Background backgroundImage={background}>
      <MainBox>
        {isModalOpen && <RoomModal />}
        <ClassBox>
          <TopOfBoardBox>
            <Title>{/* <p>이순신 인터뷰</p> */}</Title>
            {sessionStorage.getItem('accessToken') && (
              <ButtonBox>
                <AddClassButton onClick={handleAddClassClick}>
                  <SvgBox>
                    <svg
                      width='35'
                      height='35'
                      viewBox='0 0 35 35'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M18.9587 10.2077H16.042V16.041H10.2087V18.9577H16.042V24.791H18.9587V18.9577H24.792V16.041H18.9587V10.2077ZM17.5003 2.91602C9.46491 2.91602 2.91699 9.46393 2.91699 17.4993C2.91699 25.5348 9.46491 32.0827 17.5003 32.0827C25.5357 32.0827 32.0837 25.5348 32.0837 17.4993C32.0837 9.46393 25.5357 2.91602 17.5003 2.91602ZM17.5003 29.166C11.0691 29.166 5.83366 23.9306 5.83366 17.4993C5.83366 11.0681 11.0691 5.83268 17.5003 5.83268C23.9316 5.83268 29.167 11.0681 29.167 17.4993C29.167 23.9306 23.9316 29.166 17.5003 29.166Z'
                        fill='white'
                      />
                    </svg>
                  </SvgBox>
                  <p>추가</p>
                </AddClassButton>
                <StartButton isRunning={isRunning} onClick={handleButtonClick}>
                  <p>{isRunning ? '종료' : '시작'}</p>
                </StartButton>
              </ButtonBox>
            )}
          </TopOfBoardBox>

          {sessionStorage.getItem('accessToken') ? (
            <BoardBackgroundOuter>
              <RoomList />
            </BoardBackgroundOuter>
          ) : (
            <BoardBackgroundOuter>
              <StudentRoomList />
            </BoardBackgroundOuter>
          )}
        </ClassBox>
      </MainBox>
    </Background>
  );
};

export default RoomPage;
