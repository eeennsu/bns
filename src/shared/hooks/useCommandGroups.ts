import { useEffect, useState } from 'react';

import { ICommandGroup, SelectItem } from '@typings/commons';

interface IParams {
  headings: SelectItem[];
  groupList: SelectItem[][];
}

const useCommandGroups = ({ headings, groupList }: IParams) => {
  const [commandGroups, setCommandGroups] = useState<ICommandGroup[]>([]);
  const [selectedCommandGroups, setSelectedCommandGroups] = useState<ICommandGroup[]>([]);

  useEffect(() => {
    const groups: ICommandGroup[] = headings.map((heading, index) => {
      const products = groupList[index] ?? [];

      return {
        heading: {
          label: heading.label,
          value: heading.value,
        },
        items: products.map(product => ({
          label: product.label,
          value: product.value,
        })),
      };
    });

    setCommandGroups(groups);
    setSelectedCommandGroups([]);
  }, [groupList, headings]);

  return { commandGroups, selectedCommandGroups, setSelectedCommandGroups };
};

export default useCommandGroups;
