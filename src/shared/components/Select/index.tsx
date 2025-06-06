import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shadcn-ui/ui';

import { SelectItem as SelectItemType } from '@typings/commons';

interface IProps {
  label: string;
  selectList: string[] | SelectItemType[];
  setValue?: (key: string) => void | Dispatch<SetStateAction<string>>;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const SharedSelect: FC<IProps> = ({
  label,
  selectList,
  setValue,
  defaultValue = '',
  onValueChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const onChangeSelect = (value: string) => {
    setSelectedValue(value);
    setValue?.(value);
    onValueChange?.(value);
  };

  return (
    <Select onValueChange={onChangeSelect} value={selectedValue}>
      <SelectTrigger className='w-[180px]' data-testid={`${label}-select`}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectList.map((select, index) => {
            if (typeof select === 'string') {
              return (
                <SelectItem key={index} value={select}>
                  {select}
                </SelectItem>
              );
            }

            if (typeof select === 'object') {
              return (
                <SelectItem key={index} value={select.value}>
                  {select.label}
                </SelectItem>
              );
            }
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SharedSelect;
