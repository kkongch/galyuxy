import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { classListState, studentListState } from 'store/ClassStates'
import photoflame from 'assets/images/Class/액자사진.png'
import ClassModal from './ClassModal'

const Frame = styled.div`
  border: 1px solid #000;
  padding: 16px;
  margin: 16px;
  width: 101.125rem;
  height: 84.3125rem;
  flex-shrink: 0;
  background-image: url(${photoflame});
`

// 데이터 담는틀 (플렉스 설정해서 열배열하였은)
const ContentFrame = styled.div`
  margin: 22rem 6.19rem 7.44rem 6.3rem;
  padding-top: 3rem;
  border: 1px solid #000;
  width: 82.125rem;
  height: 55.625rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`

// 액자안 컨텐츠 내용 다루는 곳
const ClassFrame = styled.div`
  width: 74.5rem;
  height: 8.1875rem;
  flex-shrink: 0;
  border-radius: 2.5rem;
  background: #fff;
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
  color: var(--logo, #11235a);
  text-align: center;
  font-family: 'Noto Sans';
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

const Group = styled.div`
  margin-bottom: 1rem;
`

const GroupTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
`

const SemesterTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: 'Noto Sans';
  font-size: 3.375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

const ModalTriggerButton = styled.button`
  width: 3.4375rem;
  height: 3.4375rem;
  flex-shrink: 0;
  background: #ccc; // Placeholder color, adjust as needed
  border: none;
  cursor: pointer;
`

const GroupInfo = styled.p`
  font-size: 1rem;
  color: #666;
`

// 클래스 목록 나타내는 그룹
const GroupItem = ({ groupData, onEdit }) => {
  return (
    <Group>
      <ClassFrame>
        <EnterLayout>입장</EnterLayout>
        <SemesterTitle>{groupData.groupName}</SemesterTitle>
        <ModalTriggerButton onClick={() => onEdit(groupData.groupId)}>
          ⚙️
        </ModalTriggerButton>
      </ClassFrame>
    </Group>
  )
}

function PhotoFlame() {
  const [classList, setClassList] = useRecoilState(classListState)
  const [studentList, setStudentList] = useRecoilState(studentListState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeGroupId, setActiveGroupId] = useState(null)
  const [initialModalData, setInitialModalData] = useState(null)

  useEffect(() => {
    // 클래스 데이터 가져오기
    const fetchClassData = async () => {
      try {
        const response = await axios.get('/api/classes')
        setClassList(response.data)
      } catch (error) {
        console.error('클래스 데이터 가져오기 오류:', error)
      }
    }

    fetchClassData()
  }, [setClassList])

  // 새로운 클래스 추가 요청시 로직
  const handleSubmit = async (newClass) => {
    try {
      // 새로운 클래스를 서버에 추가하는 POST 요청
      const response = await axios.post('/api/classes', newClass)
      // 응답 처리
      if (response.status === 200 || response.status === 201) {
        // 성공적으로 추가된 경우, 클래스 리스트 상태 업데이트
        setClassList((prevClassList) => [...prevClassList, response.data])
      } else {
        // 오류 메시지 처리
        console.error('Failed to add class:', response.data)
      }
    } catch (error) {
      // 네트워크 오류 처리
      console.error('Error adding new class:', error)
    }
    // 모달 닫기
    handleModalClose()
  }
  //학생만 추가시 사용하는 로직(추가예정)
  const addStudentsToClass = async (groupId, studentsToAdd) => {
    try {
      // 특정 클래스에 학생을 추가하는 POST 요청
      const response = await axios.post(`/api/classes/${groupId}/students`, {
        students: studentsToAdd,
      })
      // 응답 처리
      if (response.status === 200 || response.status === 201) {
        // 성공적으로 추가된 경우, 학생 목록 상태 업데이트
        setStudentList((prevStudentList) => ({
          ...prevStudentList,
          [groupId]: [...(prevStudentList[groupId] || []), ...studentsToAdd],
        }))
      } else {
        // 오류 메시지 처리
        console.error('Failed to add students:', response.data)
      }
    } catch (error) {
      // 네트워크 오류 처리
      console.error('Error adding students to class:', error)
    }
  }

  const handleModalOpen = async (groupId) => {
    setActiveGroupId(groupId)
    if (groupId) {
      // 기존 클래스 편집
      try {
        const response = await axios.get(`/api/classes/${groupId}`)
        if (response.data) {
          setInitialModalData({
            className: response.data.groupName,
            students: response.data.students,
          })
        }
      } catch (error) {
        console.error('Error fetching class data:', error)
      }
    } else {
      // 새 클래스 생성
      setInitialModalData(null)
    }
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <Frame>
      <button onClick={() => setIsModalOpen(true)}>클래스 생성</button>
      {isModalOpen && (
        <ClassModal
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          isEditing={activeGroupId != null}
          initialData={initialModalData}
        />
      )}
      <ContentFrame>
        {classList.map(
          (group) =>
            !group.groupIsDeleted && (
              <GroupItem
                key={group.groupId}
                groupData={group}
                onEdit={handleModalOpen}
              />
            )
        )}
      </ContentFrame>
    </Frame>
  )
}

export default PhotoFlame
