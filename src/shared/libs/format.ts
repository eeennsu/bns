import { KeyboardEvent } from 'react';

export const inputOnlyNumber = (event: KeyboardEvent<HTMLInputElement>) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '');
};

export const toPlural = (word: string): string => {
  if (!word || typeof word !== 'string') return '';

  const esEndings = ['s', 'x', 'z', 'ch', 'sh'];

  const lower = word.toLowerCase();

  if (esEndings.some(ending => lower.endsWith(ending))) {
    return word + 'es';
  }

  if (lower.endsWith('y') && !/[aeiou]y$/.test(lower)) {
    return word.slice(0, -1) + 'ies';
  }

  return word + 's';
};
