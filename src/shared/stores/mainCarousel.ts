import { Updater } from '@shared/typings/commons';
import { create } from 'zustand';

interface IMainCarousel {
  activeIndex: number;
  setActiveIndex: Updater<number>;
}

const useFullMainCarousel = create<IMainCarousel>(set => ({
  activeIndex: 0,
  setActiveIndex: data =>
    set(state => ({ activeIndex: typeof data === 'function' ? data(state.activeIndex) : data })),
}));

export default useFullMainCarousel;
