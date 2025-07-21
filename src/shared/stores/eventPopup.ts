import { Updater } from '@shared/typings/commons';
import { create } from 'zustand';

interface IEventPopupStore {
  isShow: boolean;
  setIsShow: Updater<boolean>;
}

const useEventPopupStore = create<IEventPopupStore>(set => ({
  isShow: false,
  setIsShow: isShow =>
    set(state => ({
      isShow: typeof isShow === 'function' ? isShow(state.isShow) : isShow,
    })),
}));

export default useEventPopupStore;
