import {
  isAddModalOpenState,
  studentListState,
  userTypeState,
} from 'Recoil/ClassState';
import ClassList from 'components/Class/ClassList';
import { ClassModal } from 'components/Class/ClassModal';
import { React, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import mainBackground from 'assets/images/mainBackground.png';
import Background from 'components/Basic/Background';
import StudentList from 'components/Class/StudentList';

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
const AddClassButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20.5625rem;
  height: 5.125rem;
  background-color: #596fb7;
  color: #fff;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 600;
  padding: 0 2.31rem;
  border-radius: 1rem;
  cursor: pointer;
`;
const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90.1875rem;
  height: 5.125rem;
  background-color: #dcab7a;
  color: #fff;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 600;
  padding: 0 2.31rem;
  border-radius: 1rem;
`;
const TopOfBoardBox = styled.div`
  display: flex;
  width: 90.1875rem;
  height: 5.125rem;
  justify-content: flex-end;
  margin-bottom: 1.19rem;
`;
const SvgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoardBackgroundOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90.1875rem;
  height: 62.4375rem;
  background-color: #dcab7a;
  border-radius: 1.2rem;
`;
const BoardBackgroundInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 82.1875rem;
  height: 54.4375rem;
  background-color: #fccb82;
  padding: 0 4.3rem;
`;

const Class = () => {
  const userType = useRecoilValue(userTypeState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isAddModalOpenState);
  const [studentList, setStudentList] = useRecoilState(studentListState);

  const dummy = {
    group: {
      groupId: 1,
      groupName: '2024 1학기',
    },

    student: [
      {
        studentId: 1,
        studentName: '김가인',
        studentNo: 1,
      },
      {
        studentId: 2,
        studentName: '김나인',
        studentNo: 2,
      },
      {
        studentId: 3,
        studentName: '김나인',
        studentNo: 3,
      },
      {
        studentId: 4,
        studentName: '김나인',
        studentNo: 4,
      },
      {
        studentId: 5,
        studentName: '김나인',
        studentNo: 5,
      },
      {
        studentId: 6,
        studentName: '김나인',
        studentNo: 6,
      },
      {
        studentId: 7,
        studentName: '김나인',
        studentNo: 7,
      },
    ],
  };

  useEffect(() => {
    // GET /group/:groupId
    setStudentList(dummy.student);
  }, []);

  const handleAddClassClick = () => {
    setStudentList([]);
    setIsModalOpen(true);
  };

  return (
    <Background backgroundImage={mainBackground}>
      <MainBox>
        {isModalOpen && <ClassModal />}
        <ClassBox>
          {userType === 1 ? (
            <TopOfBoardBox>
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
                <p>클래스 추가하기</p>
              </AddClassButton>
            </TopOfBoardBox>
          ) : (
            <TopOfBoardBox>
              <Text>
                <p>번호와 이름을 선택해주세요.</p>
              </Text>
            </TopOfBoardBox>
          )}

          <BoardBackgroundOuter>
            <BoardBackgroundInner>
              {userType === 1 ? <ClassList /> : <StudentList />}
            </BoardBackgroundInner>
          </BoardBackgroundOuter>
        </ClassBox>
      </MainBox>
    </Background>
  );
};

export default Class;
