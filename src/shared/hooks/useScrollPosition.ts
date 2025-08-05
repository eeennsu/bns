import { useEffect, useState } from 'react';

interface IParams {
  threshold?: number;
  disabled?: boolean;
}

const useScrollPosition = (
  { threshold, disabled }: IParams = { threshold: 10, disabled: false },
) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (disabled) return;

    const onScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, disabled]);

  return { isScrolled };
};

export default useScrollPosition;
