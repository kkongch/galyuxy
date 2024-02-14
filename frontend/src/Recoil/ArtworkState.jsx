import { atom } from 'recoil';

export const artworkListState = atom({
  key: 'artworkList',
  default: [],
}); 

export const artworkState = atom({
  key: 'artworkOne',
  default: {},
}); 

export const artworkARState = atom({
  key: 'artworkAR',
  default: {},
}); 

