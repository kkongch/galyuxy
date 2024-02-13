import { atom } from 'recoil';

export const isAddModalOpenState = atom({
  key: 'isAddModalOpen',
  default: false,
});

export const isQuizStartState = atom({
  key: 'isQuizStart',
  default: false,
});

export const isWorkbookStartState = atom({
  key: 'isWorkbook',
  default: {
    groupId: null,
    workbookId: null,
    activeWorkbookStart: '',
    activeWorkbookEnd: '',
  },
});
