import { React, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { useNavigate } from 'react-router-dom';
import { studentListState } from 'Recoil/ClassState';
import { studentUserState, userTypeState } from 'Recoil/UserState';
import { getStudentList } from 'api/ClassApi';

const StudentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 54rem;
  /* max-height: 40.4375rem; */
  width: 100%;
`;

const DeleteButton = styled.div`
  width: 14.625rem;
  height: 5.125rem;
  background-color: #f00;
  border-radius: 1rem;
  color: #fff;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 600;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 2rem;
`;
const StudentInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: fle;
  flex-wrap: wrap;
  width: 100%;
  margin: 1.22rem 0;
`;
const StudentInfoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  background: #f6eca9;
  color: #000;
  font-size: 2.5rem;
  font-weight: 700;
  width: 16.875rem;
  height: 5.625rem;
  /* margin-bottom: 1.25rem; */
  margin: 0.8rem 0.75rem 0.8rem 0.75rem;
  cursor: pointer;
`;

const StudentList = () => {
  const [studentList, setStudentList] = useRecoilState(studentListState);
  const [studentUser, setStudentUser] = useRecoilState(studentUserState);
  const navigate = useNavigate();

  const handleStudentItemClick = (student) => {
    if (!sessionStorage.getItem('accessToken')) {
      const isConfirmed = window.confirm(
        `${student.no}번 ${student.name}이 맞나요?`
      );

      if (isConfirmed) {
        navigate('/');
        sessionStorage.setItem('name', student.name);
        sessionStorage.setItem('no', student.no);
        sessionStorage.setItem('id', student.id);
        setStudentUser({
          groupId: sessionStorage.getItem('groupId'),
          studentId: student.id,
          studentName: student.name,
          studentNo: student.no,
        });
      }
    }
  };

  return (
    <StudentBox>
      <StudentInfoBox>
        {studentList.map((student) => (
          <StudentInfoItem
            key={student.no}
            onClick={() => handleStudentItemClick(student)}
          >
            <span>{student.no}번&nbsp;</span>
            <span>{student.name}</span>
          </StudentInfoItem>
        ))}
      </StudentInfoBox>
    </StudentBox>
  );
};

export default StudentList;
