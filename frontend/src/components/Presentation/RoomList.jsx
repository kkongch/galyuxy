import { userTypeState } from 'Recoil/ClassState';
import { roomListState } from 'Recoil/PresentationState';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

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
  height: 22.75rem;
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
const DeleteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9.53125rem;
  height: 3.75rem;
  border-radius: 1.25rem;
  background: #f00;
  color: #fff;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 1.67rem;
  cursor: pointer;
`;

const RoomList = () => {
  const [roomList, setRoomList] = useRecoilState(roomListState);
  const userType = useRecoilValue(userTypeState);

  const handleDeleteClassClick = (roomId) => {
    const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (shouldDelete) {
      const updatedRoomList = roomList.filter(
        (roomItem) => roomItem.roomId !== roomId
      );
      setRoomList(updatedRoomList);
    }
    // PUT /room/:roomId
  };

  return (
    <>
      {roomList.map((room) => (
        <RoomBox key={room.roomId}>
          <RoomContent>
            <RoomTitle>
              <p>{room.roomSubject}</p>
            </RoomTitle>
            <Participate>
              <p>참가자 : 3명</p>
            </Participate>
            <ButtonBox>
              <EnterButton>
                <p>입장</p>
              </EnterButton>
              {userType === 1 ?? (
                <DeleteButton
                  onClick={() => handleDeleteClassClick(room.roomId)}
                >
                  <p>삭제</p>
                </DeleteButton>
              )}
            </ButtonBox>
          </RoomContent>
        </RoomBox>
      ))}
    </>
  );
};

export default RoomList;
