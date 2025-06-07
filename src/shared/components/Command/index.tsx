import { Check, SlidersHorizontal } from 'lucide-react';
import { type Dispatch, JSX, type SetStateAction, useMemo } from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Label,
} from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

import useDebouncedValue from '@hooks/useDebouncedValue';

import { ICommandGroup, SelectItem } from '@typings/commons';

interface IProps<T extends ICommandGroup> {
  commandGroups: T[];
  setCommandGroups: Dispatch<SetStateAction<T[]>>;
  label?: string;
  renderSubLabel?: (item: T['items'][number]) => JSX.Element;
  isRequired?: boolean;
  triggerLabel?: string;
  inputPlaceholder?: string;
  notFoundResultText?: string;
  popOverContentClassName?: string;
  formErrorMessage?: string;
}

const SharedCommand = <T extends ICommandGroup>({
  commandGroups,
  setCommandGroups,
  label,
  renderSubLabel,
  isRequired,
  triggerLabel = '추가할 목록을 선택해주세요',
  inputPlaceholder = '검색어를 입력해주세요.',
  notFoundResultText = '검색 결과가 없습니다.',
  popOverContentClassName,
  formErrorMessage,
}: IProps<T>) => {
  const [debouncedValue, setDebouncedValue] = useDebouncedValue('');

  const filteredGroups = useMemo(() => {
    if (!commandGroups) return [];

    const keyword = debouncedValue.trim().toLowerCase();
    if (!keyword) return commandGroups;

    return commandGroups
      .map(group => {
        const filteredItems = group.items.filter(item =>
          item.label.toLowerCase().includes(keyword),
        );

        if (filteredItems.length === 0) return null;

        return {
          ...group,
          items: filteredItems,
        };
      })
      .filter(Boolean);
  }, [debouncedValue, commandGroups]);

  const onSelect = (heading: SelectItem, item: SelectItem) => {
    setCommandGroups(prev =>
      prev.map(group => {
        if (group.heading.value !== heading.value) return group;

        const updatedItems = group.items.map(i =>
          i.value === item.value ? { ...i, selected: !i.selected } : i,
        );

        return {
          ...group,
          items: updatedItems,
        };
      }),
    );
  };

  return (
    <div className='grid gap-2'>
      {label && (
        <Label className={cn('gap-0.5', !!formErrorMessage && 'text-destructive')}>
          {label}
          {isRequired && <strong className='required'>*</strong>}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-fit justify-start'>
            <SlidersHorizontal className='h-4 w-4' />
            <span className='text-xs'>{triggerLabel}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className={popOverContentClassName}>
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
                        className='flex items-center justify-between gap-2'
                      >
                        <div className='flex items-center gap-1'>
                          {item.label}
                          {renderSubLabel?.(item)}
                        </div>
                        {item.selected && <Check />}
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
      {formErrorMessage && <p className='text-destructive text-xs'>{formErrorMessage}</p>}
    </div>
  );
};

export default SharedCommand;
