import { atom } from 'recoil';

export const isAddModalOpenState = atom({
  key: 'isAddModalOpen',
  default: false,
});

export const isQuizStartState = atom({
  key: 'isQuizStart',
  default: false,
});

export const isWorkbookState = atom({
  key: 'isWorkbook',
  default: {
    group_id: null,
    workbook_id: null,
    runtime: null,
    active_workbook_start: '',
    active_workbook_end: '',
  },
});
