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
export const isQuizScoreState = atom({
  key: 'scoere',
  default: 0,
});
export const userAnswersState = atom({
  key: 'userAnswers',
  default: [],
});

export const userWrongAnswerState = atom({
  key: 'wrongAnswers',
  default: [],
});

export const quizNameState = atom({
  key: 'name',
  default: [],
});
