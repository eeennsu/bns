import { useEffect, useState } from 'react';

import { SelectItem } from '@typings/commons';

interface IParams {
  headings: readonly SelectItem[];
  groupList: SelectItem[][];
  initializer?: (product: SelectItem, heading: SelectItem) => SelectItem;
}

const useCommandGroups = <T>({ headings, groupList, initializer }: IParams) => {
  const [commandGroups, setCommandGroups] = useState<T>([] as T);

  useEffect(() => {
    const groups = headings.map((heading, index) => {
      const products = groupList[index] ?? [];

      return {
        heading,
        items: products.map(product => initializer?.(product, heading) ?? (product as T)),
      };
    }) as T;

    setCommandGroups(groups);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupList, headings]);

  return { commandGroups, setCommandGroups };
};

export default useCommandGroups;
