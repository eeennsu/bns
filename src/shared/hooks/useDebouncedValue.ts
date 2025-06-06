import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useDebouncedValue = (
  value: string,
  delay: number = 500,
): [string, Dispatch<SetStateAction<string>>] => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [debouncedValue, setDebouncedValue];
};

export default useDebouncedValue;
