import { useEffect, useState } from 'react';

import { SelectItem } from '@typings/commons';

interface IParams {
  headings: readonly SelectItem[];
  groupList: SelectItem[][];
}

const useCommandGroups = <T>({ headings, groupList }: IParams) => {
  const [commandGroups, setCommandGroups] = useState<T>([] as T);

  useEffect(() => {
    const groups = headings.map((heading, index) => {
      const products = groupList[index] ?? [];

      return {
        heading: {
          label: heading.label,
          value: heading.value,
        },
        items: products.map(product => ({
          ...product,
        })),
      };
    }) as T;

    setCommandGroups(groups);
  }, [groupList, headings]);

  return { commandGroups, setCommandGroups };
};

export default useCommandGroups;
