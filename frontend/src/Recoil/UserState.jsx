import { atom } from 'recoil';

export const userTypeState = atom({
  key: 'userType',
  default: 1, // 1: teacher, 2: student
});

export const teacherDataState = atom({
  key: 'teacherData',
  default: {
    id: 1,
    name: '김싸피',
    email: 'ssafy@ssafy.com',
    password: null,
    role: 'TEACHER',
    groupId: 1,
    presentationId: null,
    roomId: null,
  },
});

export const studentUserState = atom({
  key: 'studentUser',
  default: {
    groupId: 1,
    studentId: null,
    studentName: null,
    studentNo: null,
  },
});
