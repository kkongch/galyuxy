import { classListState } from 'Recoil/ClassState'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

const ClassBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 79.1875rem;
  max-height: 40.4375rem;
  overflow-y: auto;
`

const ClassItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 74.5rem;
  min-height: 8.1875rem;
  border-radius: 2.5rem;
  background: #fff;
  margin-bottom: 2.31rem;
  padding: 0 2.12rem;
`
const ClassItemFirst = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const ClassItemSecond = styled.div`
  display: flex;
`

const EnterButton = styled.div`
  display: flex;
  width: 6.075rem;
  height: 2.1875rem;
  justify-content: space-between;
  align-items: center;
  color: #11235a;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 600;
  cursor: pointer;
`
const ClassTitle = styled.div`
  text-align: center;
  font-size: 3.375rem;
  font-weight: 600;
  margin-left: 2.56rem;
`
const DeleteButton = styled.div`
  margin-left: 1rem;
  cursor: pointer;
`
const RefactorButton = styled.div`
  margin-left: 1rem;
  cursor: pointer;
`
const SvgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ClassList = () => {
  const [classList, setClassList] = useRecoilState(classListState)

  useEffect(() => {
    // GET /group/:teacherId
    setClassList([
      {
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
            studentNo: 1,
          },
        ],
      },
      {
        group: {
          groupId: 2,
          groupName: '2024 2학기',
        },

        student: [
          {
            studentId: 1,
            studentName: '이가인',
            studentNo: '1',
          },
          {
            studentId: 2,
            studentName: '이나인',
            studentNo: '2',
          },
        ],
      },
    ])
  }, [])

  return (
    <ClassBox>
      {classList.map((classItem) => (
        <ClassItem key={classItem.group.groupId}>
          <ClassItemFirst>
            <EnterButton>
              <p>입장</p>
              <SvgBox>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='35'
                  height='35'
                  viewBox='0 0 35 35'
                  fill='none'
                >
                  <path
                    d='M32.0837 17.4993C32.0837 9.44935 25.5503 2.91602 17.5003 2.91602C9.45033 2.91602 2.91699 9.44935 2.91699 17.4993C2.91699 25.5493 9.45033 32.0827 17.5003 32.0827C25.5503 32.0827 32.0837 25.5493 32.0837 17.4993ZM5.83366 17.4993C5.83366 11.0535 11.0545 5.83268 17.5003 5.83268C23.9462 5.83268 29.167 11.0535 29.167 17.4993C29.167 23.9452 23.9462 29.166 17.5003 29.166C11.0545 29.166 5.83366 23.9452 5.83366 17.4993ZM23.3337 17.4993L17.5003 23.3327L15.4441 21.2764L17.7482 18.9577H11.667V16.041H17.7482L15.4295 13.7223L17.5003 11.666L23.3337 17.4993Z'
                    fill='#11235A'
                  />
                </svg>
              </SvgBox>
            </EnterButton>
            <ClassTitle>
              <p>{classItem.group.groupName}</p>
            </ClassTitle>
          </ClassItemFirst>
          <ClassItemSecond>
            <RefactorButton>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='55'
                height='55'
                viewBox='0 0 55 55'
                fill='none'
              >
                <path
                  d='M32.2179 20.6708L34.3262 22.7792L13.5637 43.5417H11.4554V41.4333L32.2179 20.6708ZM40.4679 6.875C39.895 6.875 39.2992 7.10417 38.8637 7.53958L34.67 11.7333L43.2637 20.3271L47.4575 16.1333C48.3512 15.2396 48.3512 13.7958 47.4575 12.9021L42.095 7.53958C41.6367 7.08125 41.0637 6.875 40.4679 6.875ZM32.2179 14.1854L6.87207 39.5312V48.125H15.4658L40.8117 22.7792L32.2179 14.1854Z'
                  fill='black'
                />
              </svg>
            </RefactorButton>
            <DeleteButton>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='55'
                height='55'
                viewBox='0 0 99 100'
                fill='none'
              >
                <path
                  d='M78.375 26.709L72.5588 20.834L49.5 44.1257L26.4412 20.834L20.625 26.709L43.6838 50.0007L20.625 73.2923L26.4412 79.1673L49.5 55.8756L72.5588 79.1673L78.375 73.2923L55.3162 50.0007L78.375 26.709Z'
                  fill='black'
                />
              </svg>
            </DeleteButton>
          </ClassItemSecond>
        </ClassItem>
      ))}
    </ClassBox>
  )
}

export default ClassList
