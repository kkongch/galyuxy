import { roomListState } from 'Recoil/PresentationState';
import { getRoomList } from 'api/RoomApi';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { activePresentation } from 'api/PresentationApi';
import { studentUserState } from 'Recoil/UserState';

const RoomBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 43.8rem;
  height: 29.625rem;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 2rem;
`;
const RoomContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 28.125rem;
  height: 15.75rem;
`;
const RoomTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 7.625rem;
  font-size: 2.8125rem;
  font-weight: 600;
`;
const Participate = styled.div`
  text-align: center;
  font-size: 1.875rem;
  font-weight: 700;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EnterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9.53125rem;
  height: 3.75rem;
  border-radius: 1.25rem;
  background: #f6eca9;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 1.67rem;
  cursor: pointer;
`;

const StudentRoomList = () => {
  const [roomList, setRoomList] = useRecoilState(roomListState);
  const navigate = useNavigate();
  const studentUser = useRecoilValue(studentUserState);

  const handleEnterRoom = (roomSubject, roomId) => {
    navigate('/VideoPage', {
      state: { roomSubject: roomSubject, roomId: roomId },
    });
  };

  const handleGetRoomList = async (roomId) => {
    try {
      const list = await getRoomList(roomId);
      setRoomList(list);
    } catch (error) {
      console.error('Error handleGetRoomList: ', error);
    }
  };

  useEffect(() => {
    const PresentationIdAndRoomList = async () => {
      const groupId = sessionStorage.getItem('groupId');
      //   테스트용 그룹아이디
      //   const groupId = studentUser.groupId;
      console.log('groupId', groupId);
      if (groupId === null) {
        alert('로그인이 필요합니다');
        navigate('/');
        return;
      }
      const presentationId = await activePresentation(groupId);
      if (presentationId === null) {
        alert('선생님이 아직 발표 활동을 시작하지 않았어요!');
        navigate('/');
      } else {
        handleGetRoomList(presentationId);
      }
    };

    PresentationIdAndRoomList();
  }, []);

  return (
    <>
      {roomList.map((room) => (
        <RoomBox key={room.roomId}>
          <RoomContent>
            <RoomTitle>
              <p>{room.roomSubject}</p>
            </RoomTitle>
            <ButtonBox>
              <EnterButton
                onClick={() => handleEnterRoom(room.roomSubject, room.roomId)}
              >
                <p>입장</p>
              </EnterButton>
            </ButtonBox>
          </RoomContent>
        </RoomBox>
      ))}
    </>
  );
};

export default StudentRoomList;
