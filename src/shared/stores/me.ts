import { create } from 'zustand';

import { IMe } from '@entities/user/types';

import { Nullable } from '@typings/commons';

interface MeStore {
  me: Nullable<IMe>;
  setMe: (data: Nullable<IMe> | ((prev: Nullable<IMe>) => Nullable<IMe>)) => void;
}

const useMeStore = create<MeStore>(set => ({
  me: null,
  setMe: data => set(state => ({ me: typeof data === 'function' ? data(state.me) : data })),
}));

export default useMeStore;
