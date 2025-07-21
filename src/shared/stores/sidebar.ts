import { Updater } from '@shared/typings/commons';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { STORAGE_KEYS } from '@consts/storage';

interface ISidebarStore {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Updater<boolean>;
}

const useSidebarStore = create<ISidebarStore>()(
  persist(
    set => ({
      isSidebarOpen: true,
      setIsSidebarOpen: data => {
        set(prev => ({
          isSidebarOpen: typeof data === 'boolean' ? data : data(prev.isSidebarOpen),
        }));
      },
    }),
    {
      name: STORAGE_KEYS.SIDEBAR,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useSidebarStore;
