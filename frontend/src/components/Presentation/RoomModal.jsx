import { React, useEffect, useState } from 'react';

import styled from 'styled-components';
import { isAddModalOpenState } from 'Recoil/ClassState';
import { useRecoilState } from 'recoil';
import { roomListState } from 'Recoil/PresentationState';
import { createRoom, createRoomSession, getRoomList } from '../../api/RoomApi';
import { teacherDataState } from 'Recoil/UserState';

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
  width: 93.8125rem;
  height: 92.125rem;
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
  width: 13.54169rem;
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

const RoomModal = ({ roomId }) => {
  const [isAddModalOpen, setIsAddModalOpen] =
    useRecoilState(isAddModalOpenState);
  const [roomSubject, setRoomSubject] = useState('');
  const [roomList, setRoomList] = useRecoilState(roomListState);
  const [teacherData, setTeacherData] = useRecoilState(teacherDataState);

  useEffect(() => {
    const roomWithId = roomList.find((item) => item.roomId === roomId);

    if (roomWithId) {
      setRoomSubject(roomWithId.roomSubject);
    } else {
      setRoomSubject('');
    }
  }, []);

  const handleCancel = () => {
    setIsAddModalOpen(false);
  };

  const handleCreateRoomSession = async () => {
    try {
      const createdSession = await createRoomSession();

      await handleCreateRoom(createdSession);
    } catch (error) {
      console.error('Error handleCreatePresentation:', error);
    }
  };

  const handleCreateRoom = async (session) => {
    try {
      const roomData = {
        roomId: session,
        roomSubject: roomSubject,
        presentation: {
          presentationId: teacherData.presentationId,
        },
      };

      await createRoom(roomData);

      const list = await getRoomList(teacherData.presentationId);
      setRoomList(list);
    } catch (error) {
      console.error('Error handleCreateRoom:', error);
    }
  };

  const handleConfirm = () => {
    handleCreateRoomSession();

    setIsAddModalOpen(false);
  };

  return (
    <ModalDiv>
      <ModalBox>
        <ClassNameBox>
          <Title>
            <p>주제 명</p>
          </Title>
          <LargeInput onChange={(e) => setRoomSubject(e.target.value)} />
        </ClassNameBox>
        <ButtonBox>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <ConfirmButton onClick={handleConfirm}>완료</ConfirmButton>
        </ButtonBox>
      </ModalBox>
    </ModalDiv>
  );
};

export default RoomModal;
