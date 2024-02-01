import React, { useState } from 'react'
import styled from 'styled-components';
import photoflame from 'assets/images/Class/액자사진.png'
import ClassModal from './ClassModal';






const Frame = styled.div`
  border: 1px solid #000;
  padding: 16px;
  margin: 16px;
  width: 101.125rem;
  height: 84.3125rem;
  flex-shrink: 0;
  background-image: url(${photoflame});
`;


// 데이터 담는틀 (플렉스 설정해서 열배열하였은)
const ContentFrame = styled.div`
    margin: 22rem 6.19rem 7.44rem 6.3rem;
    padding-top: 3rem;
    border: 1px solid #000;
    width: 82.125rem;
    height: 55.625rem;
    flex-shrink: 0;
    display: flex ;
    flex-direction: column;

`


// 액자안 컨텐츠 내용 다루는 곳
const ClassFrame  = styled.div`
    width: 74.5rem;
    height: 8.1875rem;
    flex-shrink: 0;
    border-radius: 2.5rem;
    background: #FFF;
    margin-left: 3.5rem;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;

`
//입장 css
const EnterLayout = styled.div`
  display: flex;
  width: 4.375rem;
  height: 2.25rem;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: var(--logo, #11235A);
  text-align: center;
  font-family: "Noto Sans";
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;


const Group = styled.div`
  margin-bottom: 1rem;
  
`;

const GroupTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const SemesterTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 3.375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ModalTriggerButton = styled.button`
  width: 3.4375rem;
  height: 3.4375rem;
  flex-shrink: 0;
  background: #ccc; // Placeholder color, adjust as needed
  border: none;
  cursor: pointer;
`;

const GroupInfo = styled.p`
  font-size: 1rem;
  color: #666;
`;


// 클래스 목록 나타내는 그룹
const GroupItem = ({ groupData }) => {

    //모달 여는 부분
  const handleModalOpen = () => {
    
  };

    return (
      <Group>
        <ClassFrame>
            <EnterLayout>입장</EnterLayout>
            <SemesterTitle>{groupData.groupName}</SemesterTitle>
            <ModalTriggerButton onClick={handleModalOpen}>⚙️</ModalTriggerButton>
        </ClassFrame>
      </Group>
    );
};






// 더미데이터 연습
const dummyGroups = [
    {
    groupId: 1,
    teacherEmail: "ssafy@ssafy.com",
    groupName: "2023 1학기",
    groupIsDeleted: 0,
    },
    {
    groupId: 2,
    teacherEmail: "hello@ssafy.com",
    groupName: "2023 2학기",
    groupIsDeleted: 0,
    },
    {
    groupId: 3,
    teacherEmail: "bye@ssafy.com",
    groupName: "2023 3학기",
    groupIsDeleted: 1, // This group is marked as deleted and will not be rendered
    },
    // ...add as many groups as you need for practice
];


function PhotoFlame() {

    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (newClass) => {
    // API 호출로 새 클래스를 추가하는 로직을 구현합니다.
    };

    const handleModalClose = () => {
    setIsModalOpen(false);
    };

  return (




    <Frame>
      <button onClick={() => setIsModalOpen(true)}>클래스 생성</button>
      {isModalOpen && <ClassModal onClose={handleModalClose} onSubmit={handleSubmit} />}
        <ContentFrame>
            {dummyGroups.map(group => 
            !group.groupIsDeleted && <GroupItem key={group.groupId} groupData={group} />
            )}
        </ContentFrame>
    </Frame>
  )
}




export default PhotoFlame
