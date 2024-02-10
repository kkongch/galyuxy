import { isAddModalOpenState, userTypeState } from 'Recoil/ClassState';
import { React, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import mainBackground from 'assets/images/mainBackground.png';
import Background from 'components/Basic/Background';
import RoomList from 'components/Presentation/RoomList';
import { roomListState } from 'Recoil/PresentationState';
import { useEffect } from 'react';
import RoomModal from 'components/Presentation/RoomModal';
import VideoRoomComponent from 'components/Presentation/openvidu/components/VideoRoomComponent';
import { useLocation } from 'react-router';

const MainBox = styled.main`
  height: 100vh;
  width: 100vw;
`;

const ClassBox = styled.div`
  display: flex;
  justify-content: center;
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

const VideoPage = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isAddModalOpenState);
  const [roomList, setRoomList] = useRecoilState(roomListState);
  const userType = useRecoilValue(userTypeState);
  const [isRunning, setIsRunning] = useState(false);
  const location = useLocation();
  const { roomSubject, roomId } = location.state || {};
  console.log('roomSubjectroomSubject:', roomSubject);

  useEffect(() => {
    // (student) GET /presentation/:groupId 호출 뒤, active가 1인 presentationId 가져오기

    // (teacher) GET /room/:presentationId
    setRoomList([
      {
        roomScript: '',
        roomId: 1,
        roomSubject: '이순신 장군과 함께하는 명량해전 이야기',
      },
      {
        roomScript: '',
        roomId: 2,
        roomSubject: '이순신과 인터뷰하기',
      },
      {
        roomScript: '',
        roomId: 3,
        roomSubject: '나의 죽음을 알리지 말라',
      },
    ]);
  }, []);

  const handleAddClassClick = () => {
    setIsModalOpen(true);
  };

  const handleButtonClick = () => {
    setIsRunning(!isRunning);
  };

  return (
    <Background backgroundImage={mainBackground}>
      <VideoRoomComponent roomSubject={roomSubject} roomId={roomId} />
      {/* 1. */}
      {/* <VideoRoomComponent /> */}
    </Background>
  );
};

export default VideoPage;
