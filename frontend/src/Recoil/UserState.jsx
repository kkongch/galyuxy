import { atom } from 'recoil';
export const teacherDataState = atom({
  key: 'teacherData',
  default: {
    id: 1,
    name: '김싸피',
    email: 'ssafy@ssafy.com',
    password: null,
    role: 'TEACHER',
    groupId: null,
    presentationId: null,
    roomId: null,
  },
});
