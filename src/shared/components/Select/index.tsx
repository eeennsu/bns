import { cn } from '@shared/shadcn-ui/utils';
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
  selectList: string[] | SelectItemType[];
  label?: string;
  setValue?: (key: string | ((prev: string) => string)) => void | Dispatch<SetStateAction<string>>;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  triggerClassName?: string;
}

const SharedSelect: FC<IProps> = ({
  label,
  selectList,
  setValue,
  defaultValue = '',
  onValueChange,
  triggerClassName,
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
      <SelectTrigger className={cn('w-[180px]', triggerClassName)} data-testid={`${label}-select`}>
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

            if (typeof select === 'object' || select !== null) {
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
