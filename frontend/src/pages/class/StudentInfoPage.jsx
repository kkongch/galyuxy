import { studentListState } from 'Recoil/ClassState';
import { React, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import mainBackground from 'assets/images/mainBackground.png';
import Background from 'components/Basic/Background';
import StudentList from 'components/Class/StudentList';
import { useParams } from 'react-router-dom';
import { getStudentList } from 'api/ClassApi';

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
  justify-content: space-between;
  margin-bottom: 1.19rem;
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

const StudentInfoPage = () => {
  const { id } = useParams();
  const [studentList, setStudentList] = useRecoilState(studentListState);
  const handleGetStudentList = async (groupId) => {
    try {
      const list = await getStudentList(groupId);

      setStudentList(list);
    } catch (error) {
      console.error('Error handleGetStudentList: ', error);
    }
  };

  useEffect(() => {
    sessionStorage.setItem('groupId', id);

    handleGetStudentList(id);
  }, []);

  return (
    <Background backgroundImage={mainBackground}>
      <MainBox>
        <ClassBox>
          <TopOfBoardBox>
            <Text>
              <p>번호와 이름을 선택해주세요.</p>
            </Text>
          </TopOfBoardBox>
          <BoardBackgroundOuter>
            <BoardBackgroundInner>
              <StudentList />
            </BoardBackgroundInner>
          </BoardBackgroundOuter>
        </ClassBox>
      </MainBox>
    </Background>
  );
};

export default StudentInfoPage;
