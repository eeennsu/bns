import { create } from 'zustand';

import { IMe } from '@entities/auth/types';

import { Nullable, Updater } from '@typings/commons';

interface MeStore {
  me: Nullable<IMe>;
  setMe: Updater<Nullable<IMe>>;
}

const useMeStore = create<MeStore>(set => ({
  me: null,
  setMe: data => set(state => ({ me: typeof data === 'function' ? data(state.me) : data })),
}));

export default useMeStore;
