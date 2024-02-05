import { atom } from 'recoil';

export const presentationListState = atom({
  key: 'presentationList',
  default: [],
});

export const roomListState = atom({
  key: 'roomList',
  default: [],
});
