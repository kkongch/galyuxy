import { atom } from 'recoil'

export const classListState = atom({
  key: 'classList',
  default: [],
})

export const studentListState = atom({
  key: 'studentList',
  default: [],
})

export const isModalOpenState = atom({
  key: 'isModalOpen',
  default: false,
})
