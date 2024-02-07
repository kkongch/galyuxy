import { userTypeState } from 'Recoil/ClassState';
import { roomListState } from 'Recoil/PresentationState';
import { getRoomList } from 'api/RoomApi';
import React, { useEffect } from 'react';
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

  const handleGetRoomList = async (roomId) => {
    try {
      const list = await getRoomList(roomId);
      setRoomList(list);
    } catch (error) {
      console.error('Error handleGetRoomList: ', error);
    }
  };

  useEffect(() => {
    // (student) GET /presentation/:groupId 호출 뒤, active가 1인 presentationId 가져오기

    // (teacher) GET /room/:presentationId

    // setRoomList([
    //   {
    //     roomScript: '',
    //     roomId: 1,
    //     roomSubject: '이순신 장군과 함께하는 명량해전 이야기',
    //   },
    //   {
    //     roomScript: '',
    //     roomId: 2,
    //     roomSubject: '이순신과 인터뷰하기',
    //   },
    //   {
    //     roomScript: '',
    //     roomId: 3,
    //     roomSubject: '나의 죽음을 알리지 말라',
    //   },
    // ]);

    const presentationId = 1;

    handleGetRoomList(presentationId);
  }, []);

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
              {userType === 1 && (
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
