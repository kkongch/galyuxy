import { studentListState } from 'Recoil/ClassState'
import { React, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

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

const Modals = styled.div`
  width: ${(props) => props.width || 'fit-content'};
  height: ${(props) => props.height || 'fit-content'};
  padding: ${(props) => props.padding || 'fit-content'};
  margin: ${(props) => props.margin || 'fit-content'};
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
const StudentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 54rem;
`
const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

export const Modal = () => {
  const [studentList, setStudentList] = useRecoilState(studentListState)

  useEffect(() => {
    setStudentList([
      {
        studentId: 1,
        studentName: '김가영',
        studentNo: '1',
      },
      {
        studentId: 2,
        studentName: '김나영',
        studentNo: '2',
      },
    ])
  }, [])

  return (
    <ModalDiv>
      <Modals width='93.8125rem' height='92.125rem' padding='5rem 9.88rem'>
        <ClassNameBox>
          <Title>
            <p>클래스 명</p>
          </Title>
          <LargeInput />
        </ClassNameBox>
        <AddStudentBox>
          <SmallInput />
          <SmallInput />
          <AddButton>추가</AddButton>
        </AddStudentBox>
        <StudentBox>
          <Flex>
            <Title>
              <p>학생 목록</p>
            </Title>
            <DeleteButton>선택 삭제</DeleteButton>
          </Flex>
          <StudentInfoBox>
            <StudentInfoItem>
              <span>1번</span>
              <span>홍길동</span>
            </StudentInfoItem>
            <StudentInfoItem>
              <span>1번</span>
              <span>홍길동</span>
            </StudentInfoItem>
            <StudentInfoItem>
              <span>1번</span>
              <span>홍길동</span>
            </StudentInfoItem>
            <StudentInfoItem>
              <span>1번</span>
              <span>홍길동</span>
            </StudentInfoItem>
            <StudentInfoItem>
              <span>1번</span>
              <span>홍길동</span>
            </StudentInfoItem>
            <StudentInfoItem>
              <span>1번</span>
              <span>홍길동</span>
            </StudentInfoItem>
          </StudentInfoBox>
        </StudentBox>
        <ButtonBox>
          <CancelButton onClick={() => {}}>취소</CancelButton>
          <ConfirmButton onClick={() => {}}>완료</ConfirmButton>
        </ButtonBox>
      </Modals>
    </ModalDiv>
  )
}
