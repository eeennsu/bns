import { FILTER_TYPES, ITEM_SHOW_TYPE } from '@shared/consts/commons';
import { ItemShowLabel } from '@shared/typings/commons';
import { create } from 'zustand';

interface IItemShowFilterStore {
  showFilter: ItemShowLabel;
  setShowFilter: (value: ItemShowLabel | ((prev: ItemShowLabel) => ItemShowLabel)) => void;
}

const useItemShowFilterStore = create<IItemShowFilterStore>(set => ({
  showFilter: ITEM_SHOW_TYPE[0],
  setShowFilter: value =>
    set(state => ({
      showFilter: typeof value === 'function' ? value(state.showFilter) : value,
    })),
}));

export default useItemShowFilterStore;

export const getItemShowType = (showFilter: ItemShowLabel) => {
  switch (showFilter) {
    case '전체':
      return FILTER_TYPES.ALL;
    case '공개':
      return FILTER_TYPES.ON;
    case '비공개':
      return FILTER_TYPES.OFF;
    default:
      return FILTER_TYPES.ALL;
  }
};
