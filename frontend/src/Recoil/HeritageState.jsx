import { atom } from 'recoil';
export const heritageListState = atom({
  key: 'heritageList',
  default: [],
});
export const heritageState = atom({
  key: 'heritage',
  default: {},
});


export const eraListState = atom({
  key: 'eraList',
  default: [],
}); 