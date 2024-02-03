import { React } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import {
  studentListState,
  studentUserState,
  userTypeState,
} from 'Recoil/ClassState'
import { useNavigate } from 'react-router-dom'

const StudentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 54rem;
  /* max-height: 40.4375rem; */
  width: 100%;
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
  align-items: fle;
  flex-wrap: wrap;
  width: 100%;
  margin: 1.22rem 0;
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
  /* margin-bottom: 1.25rem; */
  margin: 0.8rem 0.75rem 0.8rem 0.75rem;
  cursor: pointer;
`

const StudentList = () => {
  const [studentList, setStudentList] = useRecoilState(studentListState)
  const [studentUser, setStudentUser] = useRecoilState(studentUserState)
  const [userType, setUserType] = useRecoilState(userTypeState)
  const navigate = useNavigate()

  const handleStudentItemClick = (student) => {
    if (userType === 2) {
      const isConfirmed = window.confirm(
        `${student.studentNo}번 ${student.studentName}이 맞나요?`
      )

      if (isConfirmed) {
        navigate('/main')
        setStudentUser({
          groupId: 1,
          studentId: student.studentId,
          studentName: student.studentName,
          studentNo: student.studentNo,
        })
      }
    }
  }

  return (
    <StudentBox>
      <StudentInfoBox>
        {studentList.map((student) => (
          <StudentInfoItem
            key={student.studentNo}
            onClick={() => handleStudentItemClick(student)}
          >
            <span>{student.studentNo}번</span>
            <span>{student.studentName}</span>
          </StudentInfoItem>
        ))}
      </StudentInfoBox>
    </StudentBox>
  )
}

export default StudentList
