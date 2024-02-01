import { atom } from 'recoil'

export const classListState = atom({
  key: 'classListState',
  default: [
    {
      groupId: 1,
      teacherEmail: 'ssafy@ssafy.com',
      groupName: '2023 1학기',
      groupIsDeleted: 0,
    },
    {
      groupId: 2,
      teacherEmail: 'hello@ssafy.com',
      groupName: '2023 2학기',
      groupIsDeleted: 0,
    },
    {
      groupId: 3,
      teacherEmail: 'bye@ssafy.com',
      groupName: '2023 3학기',
      groupIsDeleted: 1, // This group is marked as deleted and will not be rendered
    },
  ],
})

export const studentListState = atom({
  key: 'studentListState',
  default: {}, // 학생 목록을 클래스 ID에 매핑하기 위해 객체 사용
})
