// atoms.js
import { atom } from 'recoil'

export const presentationListState = atom({
  key: 'presentationListState', // 고유한 key
  default: [
    {
      presentationId: 1,
      presentationTitle: '활동 제목입니다',
      presentationCreateDate: '2024-01-28T03:00:00.000+00:00',
      presentation_is_active: 1,
    },
    {
      presentationId: 2,
      presentationTitle: '이순신 장군',
      presentationCreateDate: '2024-01-28T04:30:00.000+00:00',
      presentation_is_active: 0,
    },
    {
      presentationId: 3,
      presentationTitle: '장보고 신화',
      presentationCreateDate: '2024-01-28T03:00:00.000+00:00',
      presentation_is_active: 1,
    },
    {
      presentationId: 4,
      presentationTitle: '무렝이',
      presentationCreateDate: '2024-01-28T03:00:00.000+00:00',
      presentation_is_active: 1,
    },
  ], // 초기값은 빈 배열
})

// 방 목록을 저장할 atom

export const roomListState = atom({
  key: 'roomListState',
  default: [
    {
      roomScript: '',
      roomId: 1,
      roomSubject: '방주제1',
    },
    {
      roomScript: '',
      roomId: 2,
      roomSubject: '방주제2',
    },
    {
      roomScript: '',
      roomId: 1,
      roomSubject: '방주제1',
    },
    {
      roomScript: '',
      roomId: 2,
      roomSubject: '방주제2',
    },
  ],
})
