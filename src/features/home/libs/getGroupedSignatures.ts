import { ISignatureProduct } from '@entities/home/types';

export const getGroupedSignatures = (signatures: ISignatureProduct[]) => {
  const groupedSignatures = signatures.reduce(
    (acc, cur) => {
      const { type } = cur;
      let key;

      if (type === 'bread' || type === 'sauce') {
        key = 'bread';
      } else if (type === 'drink') {
        key = 'drink';
      } else if (type === 'dish' || type === 'dessert') {
        key = 'dish';
      }

      if (key) {
        acc[key] = acc[key] || [];
        acc[key].push(cur);
      }

      return acc;
    },
    {
      bread: [],
      drink: [],
      dish: [],
    },
  );

  return groupedSignatures;
};
