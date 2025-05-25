import { create } from 'zustand';

import { IMe } from '@entities/user/types';

interface IMeStore {
  me: IMe;
  setMe: (data: IMe | ((prev: IMe) => IMe)) => void;
}

const useMeStore = create<IMeStore>(set => ({
  me: {
    isLogin: false,
    role: 'user',
  },
  setMe: data => {
    set(prev => ({
      me: typeof data === 'function' ? data(prev.me) : data,
    }));
  },
}));

export default useMeStore;
