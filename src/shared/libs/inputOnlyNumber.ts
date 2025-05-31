import { KeyboardEvent } from 'react';

export const inputOnlyNumber = (event: KeyboardEvent<HTMLInputElement>) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '');
};
