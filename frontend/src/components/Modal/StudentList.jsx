import { React, useEffect } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { studentListState } from 'Recoil/ClassState'

const StudentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 54rem;
  width: 100%;
`
const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`
const Title = styled.div`
  text-align: center;
  font-size: 3rem;
  font-weight: 600;
`
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
`
const StudentInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2.44rem;
`
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
  margin-bottom: 1.25rem;
  margin-right: 1.5rem;
`

const StudentList = () => {
  const [studentList, setStudentList] = useRecoilState(studentListState)

  return (
    <StudentBox>
      <Flex>
        <Title>
          <p>학생 목록</p>
        </Title>
        <DeleteButton>선택 삭제</DeleteButton>
      </Flex>
      <StudentInfoBox>
        <StudentInfoBox>
          {studentList.map((student) => (
            <StudentInfoItem key={student.studentNo}>
              <span>{student.studentNo}번</span>
              <span>{student.studentName}</span>
            </StudentInfoItem>
          ))}
        </StudentInfoBox>
      </StudentInfoBox>
    </StudentBox>
  )
}

export default StudentList
