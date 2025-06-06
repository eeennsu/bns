import { SlidersHorizontal } from 'lucide-react';
import { type Dispatch, type FC, type SetStateAction, useMemo } from 'react';

import { Button, FormLabel } from '@shadcn-ui/ui';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@shadcn-ui/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn-ui/ui/popover';
import { cn } from '@shadcn-ui/utils';

import useDebouncedValue from '@hooks/useDebouncedValue';

import { ICommandGroup, SelectItem } from '@typings/commons';

interface IProps {
  commandGroups: ICommandGroup[];
  setSelectedItems: Dispatch<SetStateAction<ICommandGroup[]>>;
  label?: string;
  isRequired?: boolean;
  triggerLabel?: string;
  inputPlaceholder?: string;
  notFoundResultText?: string;
  popOverContentClassName?: string;
}

const SharedCommand: FC<IProps> = ({
  commandGroups,
  setSelectedItems,
  label,
  isRequired,
  triggerLabel = '추가할 목록을 선택해주세요',
  inputPlaceholder = '검색어를 입력해주세요.',
  notFoundResultText = '검색 결과가 없습니다.',
  popOverContentClassName,
}) => {
  const [debouncedValue, setDebouncedValue] = useDebouncedValue('');

  const filteredGroups = useMemo(() => {
    if (!commandGroups) return [];

    const filteredGroups = commandGroups.filter(group => {
      return group.items.filter(item => {
        return item.label.toLowerCase().includes(debouncedValue.toLowerCase());
      });
    });

    console.log(filteredGroups);

    return filteredGroups;
  }, [debouncedValue, commandGroups]);

  const onSelect = (heading: SelectItem, item: SelectItem) => {
    setSelectedItems(prev => {
      const updatedGroups = [...prev];
      const groupIndex = updatedGroups.findIndex(g => g.heading.value === heading.value);

      if (groupIndex === -1) {
        return [...updatedGroups, { heading, items: [item] }];
      }

      const group = updatedGroups[groupIndex];
      const itemIndex = group.items.findIndex(i => i.value === item.value);

      if (itemIndex > -1) {
        const newItems = group.items.filter(i => i.value !== item.value);
        if (newItems.length === 0) {
          updatedGroups.splice(groupIndex, 1);
        } else {
          updatedGroups[groupIndex] = { ...group, items: newItems };
        }
      } else {
        updatedGroups[groupIndex] = { ...group, items: [...group.items, item] };
      }

      return updatedGroups;
    });
  };

  return (
    <div className='grid gap-2'>
      {label && (
        <FormLabel className='gap-0.5'>
          {label}
          {isRequired && <strong className='required'>*</strong>}
        </FormLabel>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-fit justify-start'>
            <SlidersHorizontal className='h-4 w-4' />
            <span className='text-xs'>{triggerLabel}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn(popOverContentClassName)}>
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={inputPlaceholder}
              value={debouncedValue}
              onValueChange={setDebouncedValue}
            />
            <CommandList>
              <CommandEmpty>{notFoundResultText}</CommandEmpty>
              {filteredGroups.map((group, idx) => (
                <div key={group.heading.value}>
                  <CommandGroup heading={group.heading.label}>
                    {group.items.map(item => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={() => onSelect(group.heading, item)}
                      >
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {idx !== filteredGroups.length - 1 && <CommandSeparator />}
                </div>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SharedCommand;
