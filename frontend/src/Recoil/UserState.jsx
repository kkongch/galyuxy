import { atom } from 'recoil';

export const userTypeState = atom({
  key: 'userType',
  default: 1, // 1: teacher, 2: student
});

export const teacherDataState = atom({
  key: 'teacherData',
  default: {
    id: null,
    name: null,
    email: null,
    password: null,
    role: 'TEACHER',
    groupId: null,
    presentationId: null,
    roomId: null,
  },
});

export const studentUserState = atom({
  key: 'studentUser',
  default: {
    groupId: 1,
    id: 5,
    name: '박학생',
    no: 2,
  },
});

export const loginState = atom({
  key: 'login',
  default: false,
});

export const navToggleState = atom({
  key: 'navToggle',
  default: true,
});
