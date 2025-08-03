import { PageIndex } from '@shared/consts/commons';
import { Updater } from '@shared/typings/commons';
import { create } from 'zustand';

interface IFullPageScrollStore {
  activeIndex: PageIndex;
  setActiveIndex: Updater<PageIndex>;
}

const useFullPageScrollStore = create<IFullPageScrollStore>(set => ({
  activeIndex: 0,
  setActiveIndex: data =>
    set(state => ({ activeIndex: typeof data === 'function' ? data(state.activeIndex) : data })),
}));

export default useFullPageScrollStore;
