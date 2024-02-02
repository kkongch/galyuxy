import { React, useState } from 'react'

import styled from 'styled-components'
import StudentList from './StudentList'
import { isModalOpenState, studentListState } from 'Recoil/ClassState'
import { useRecoilState } from 'recoil'

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
`

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
`

const ClassNameBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5.3125rem;
`
const Title = styled.div`
  text-align: center;
  font-size: 3rem;
  font-weight: 600;
`
const LargeInput = styled.input`
  width: 59.25rem;
  height: 5.3125rem;
  border-radius: 1.25rem;
  border: 2px solid #c8c8c8;
  font-size: 2rem;
  font-weight: 600;
  padding: 0 2.69rem;
`
const AddStudentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 5.3125rem;
`
const SmallInput = styled.input`
  width: 25.75rem;
  height: 5.3125rem;
  border-radius: 1.25rem;
  border: 2px solid #c8c8c8;
  margin-right: 2.27rem;
  font-size: 2rem;
  font-weight: 600;
  padding: 0 2.69rem;
`
const AddButton = styled.div`
  background-color: #596fb7;
  width: 8.3125rem;
  height: 5.125rem;
  color: #fff;
  font-size: 1.875rem;
  font-weight: 600;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5.125rem;
  width: 100%;
`
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
`

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
`

export const ClassModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState)
  const [groupName, setGroupName] = useState('')
  const [studentNo, setStudentNo] = useState('')
  const [studentName, setStudentName] = useState('')
  const [studentList, setStudentList] = useRecoilState(studentListState)

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleConfirm = () => {
    const formattedData = {
      group: {
        teacherId: 1,
        groupName: groupName,
      },
      student: studentList,
    }

    setStudentNo('')
    setStudentName('')
    setStudentList([])

    console.log(formattedData)
    setIsModalOpen(false)
  }

  const handleAddStudent = () => {
    const updatedStudentList = [...studentList]

    updatedStudentList.push({
      studentName: studentName,
      studentNo: studentNo,
    })

    setStudentList(updatedStudentList)
    setStudentNo('')
    setStudentName('')
  }

  return (
    <ModalDiv>
      <ModalBox>
        <ClassNameBox>
          <Title>
            <p>클래스 명</p>
          </Title>
          <LargeInput
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </ClassNameBox>
        <AddStudentBox>
          <SmallInput
            value={studentNo}
            onChange={(e) => setStudentNo(e.target.value)}
          />
          <SmallInput
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <AddButton onClick={handleAddStudent}>추가</AddButton>
        </AddStudentBox>
        <StudentList />
        <ButtonBox>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <ConfirmButton onClick={handleConfirm}>완료</ConfirmButton>
        </ButtonBox>
      </ModalBox>
    </ModalDiv>
  )
}
