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
  key: 'studentListState', // 고유한 키를 지정합니다.
  default: [
    {
      "studentId": 1,
      "studentName": "김가영",
      "studentNo": "1",
      "studentIsDeleted": 0, // 0: 삭제되지 않음
    },
    {
      "studentId": 2,
      "studentName": "김나영",
      "studentNo": "2",
      "studentIsDeleted": 0,
    },
    // ... 나머지 학생 데이터를 추가합니다.
    {
      "studentId": 3,
      "studentName": "박준호",
      "studentNo": "3",
      "studentIsDeleted": 0,
    },
    {
      "studentId": 4,
      "studentName": "이하은",
      "studentNo": "4",
      "studentIsDeleted": 0,
    },
    {
      "studentId": 5,
      "studentName": "최민수",
      "studentNo": "5",
      "studentIsDeleted": 0,
    },
    {
      "studentId": 6,
      "studentName": "한지민",
      "studentNo": "6",
      "studentIsDeleted": 0,
    },
    {
      "studentId": 7,
      "studentName": "김현우",
      "studentNo": "7",
      "studentIsDeleted": 0,
    },
    {
      "studentId": 8,
      "studentName": "나영석",
      "studentNo": "8",
      "studentIsDeleted": 0,
    },
    {
      "studentId": 9,
      "studentName": "유재석",
      "studentNo": "9",
      "studentIsDeleted": 0,
    },
    {
      "studentId": 10,
      "studentName": "강호동",
      "studentNo": "10",
      "studentIsDeleted": 0,
    }
  ], // 배열로 초기값 설정
});