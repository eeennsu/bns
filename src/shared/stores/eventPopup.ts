import { create } from 'zustand';

interface IEventPopupStore {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

const useEventPopupStore = create<IEventPopupStore>(set => ({
  isShow: false,
  setIsShow: isShow => set({ isShow }),
}));

export default useEventPopupStore;
