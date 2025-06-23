import { ItemShowLabel } from '@shared/typings/commons';
import { create } from 'zustand';

interface IItemShowFilterStore {
  showFilter: ItemShowLabel;
  setShowFilter: (value: ItemShowLabel | ((prev: ItemShowLabel) => ItemShowLabel)) => void;
}

const useItemFilterStore = create<IItemShowFilterStore>(set => ({
  showFilter: '전체',
  setShowFilter: value =>
    set(state => ({
      showFilter: typeof value === 'function' ? value(state.showFilter) : value,
    })),
}));

export default useItemFilterStore;

export const getItemShowType = (showFilter: ItemShowLabel) => {
  switch (showFilter) {
    case '전체':
      return 'all';
    case '공개':
      return 'on';
    case '비공개':
      return 'off';
    default:
      return 'all';
  }
};
