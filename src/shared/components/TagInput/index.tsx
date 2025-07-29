'use client';

import { Badge, Input } from '@shared/shadcn-ui/ui';
import { cn } from '@shared/shadcn-ui/utils';
import { X as RemoveIcon } from 'lucide-react';
import React, {
  ChangeEvent,
  ClipboardEvent,
  createContext,
  Dispatch,
  FC,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';

/**
 * used for identifying the split char and use will pasting
 */
const SPLITTER_REGEX = /[\n#?=&\t,./-]+/;

/**
 * used for formatting the pasted element for the correct value format to be added
 */

const FORMATTING_REGEX = /^[^a-zA-Z0-9]*|[^a-zA-Z0-9]*$/g;

export interface TagsInputProps extends HTMLAttributes<HTMLDivElement> {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  minItems?: number;
}

interface TagsInputContextProps {
  value: string[];
  onValueChange: (value: any) => void;
  inputValue: string;
  setInputValue: Dispatch<React.SetStateAction<string>>;
  activeIndex: number;
  setActiveIndex: Dispatch<React.SetStateAction<number>>;
}

const TagInputContext = createContext<TagsInputContextProps | null>(null);

const TagsInput: FC<TagsInputProps> = ({
  value,
  onValueChange,
  placeholder,
  maxItems,
  minItems,
  className,
  dir,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string>('');
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [isValueSelected, setIsValueSelected] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const parseMinItems = minItems ?? 0;
  const parseMaxItems = maxItems ?? Infinity;

  const onValueChangeHandler = (val: string) => {
    if (value.includes(val)) {
      toast.warning('이미 존재하는 키워드입니다.');
      return;
    }

    if (value.length >= parseMaxItems) {
      toast.error('최대 키워드 개수를 초과하였습니다.');
      return;
    }

    onValueChange([...value, val]);
  };

  const RemoveValue = (val: string) => {
    if (value.includes(val) && value.length > parseMinItems) {
      onValueChange(value.filter(item => item !== val));
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const tags = e.clipboardData.getData('text').split(SPLITTER_REGEX);
    const newValue = [...value];
    tags.forEach(item => {
      const parsedItem = item.replaceAll(FORMATTING_REGEX, '').trim();
      if (
        parsedItem.length > 0 &&
        !newValue.includes(parsedItem) &&
        newValue.length < parseMaxItems
      ) {
        newValue.push(parsedItem);
      }
    });
    onValueChange(newValue);
    setInputValue('');
  };

  const handleSelect = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const selection = target.value.substring(target.selectionStart ?? 0, target.selectionEnd ?? 0);

    setSelectedValue(selection);
    setIsValueSelected(selection === inputValue);
  };

  // ? suggest : a refactor rather then using a useEffect
  useEffect(() => {
    const VerifyDisable = () => {
      if (value.length - 1 >= parseMinItems) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
      if (value.length + 1 <= parseMaxItems) {
        setDisableInput(false);
      } else {
        setDisableInput(true);
      }
    };
    VerifyDisable();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // ? check: Under build , default option support
  // * support : for the uncontrolled && controlled ui

  // useEffect(() => {
  //   if (!defaultOptions) return;
  //   onValueChange([...value, ...defaultOptions]);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [defaultOptions]);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const moveNext = () => {
      const nextIndex = activeIndex + 1 > value.length - 1 ? -1 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };

    const movePrev = () => {
      const prevIndex = activeIndex - 1 < 0 ? value.length - 1 : activeIndex - 1;
      setActiveIndex(prevIndex);
    };

    const moveCurrent = () => {
      const newIndex = activeIndex - 1 <= 0 ? (value.length - 1 === 0 ? -1 : 0) : activeIndex - 1;
      setActiveIndex(newIndex);
    };
    const target = e.currentTarget;

    switch (e.key) {
      case 'ArrowLeft':
        if (dir === 'rtl') {
          if (value.length > 0 && activeIndex !== -1) {
            moveNext();
          }
        } else {
          if (value.length > 0 && target.selectionStart === 0) {
            movePrev();
          }
        }
        break;

      case 'ArrowRight':
        if (dir === 'rtl') {
          if (value.length > 0 && target.selectionStart === 0) {
            movePrev();
          }
        } else {
          if (value.length > 0 && activeIndex !== -1) {
            moveNext();
          }
        }
        break;

      case 'Delete':
        if (value.length > 0) {
          if (activeIndex !== -1 && activeIndex < value.length) {
            RemoveValue(value[activeIndex]);
            moveCurrent();
          } else {
            if (target.selectionStart === 0) {
              if (selectedValue === inputValue || isValueSelected) {
                RemoveValue(value[value.length - 1]);
              }
            }
          }
        }
        break;

      case 'Escape':
        const newIndex = activeIndex === -1 ? value.length - 1 : -1;
        setActiveIndex(newIndex);
        break;

      case 'Enter':
        if (inputValue.trim() !== '') {
          e.preventDefault();
          onValueChangeHandler(inputValue);
          setInputValue('');
        }
        break;
    }
  };

  const mousePreventDefault = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <TagInputContext.Provider
      value={{
        value,
        onValueChange,
        inputValue,
        setInputValue,
        activeIndex,
        setActiveIndex,
      }}
    >
      <div {...props} dir={dir} className={cn('flex flex-wrap items-center gap-2', className)}>
        <Input
          tabIndex={0}
          aria-label='input tag'
          disabled={disableInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          value={inputValue}
          onSelect={handleSelect}
          onChange={activeIndex === -1 ? handleChange : undefined}
          placeholder={disableInput ? '최대 키워드 개수에 도달하였습니다.' : placeholder}
          onClick={() => setActiveIndex(-1)}
          className={cn(
            'placeholder:text-xs placeholder:text-gray-400',
            activeIndex !== -1 && 'caret-transparent',
            disableInput && 'placeholder:text-gray-800',
          )}
        />

        {value.map((item, index) => (
          <button
            key={item}
            type='button'
            aria-label={`Remove ${item} option`}
            aria-roledescription='button to remove option'
            disabled={disableButton}
            aria-disabled={disableButton}
            data-active={activeIndex === index}
            className='cursor-pointer disabled:cursor-not-allowed'
            onClick={() => RemoveValue(item)}
            onMouseDown={mousePreventDefault}
          >
            <Badge
              tabIndex={activeIndex !== -1 ? 0 : activeIndex}
              aria-disabled={disableButton}
              data-active={activeIndex === index}
              className={cn(
                "data-[active='true']:ring-muted-foreground group relative flex cursor-pointer items-center gap-1 truncate rounded px-1 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 data-[active='true']:ring-2",
              )}
              variant='secondary'
            >
              {item}

              <span className='sr-only'>Remove {item} option</span>
              <RemoveIcon size={12} className='group-hover:stroke-destructive' />
            </Badge>
          </button>
        ))}
      </div>
    </TagInputContext.Provider>
  );
};

export default TagsInput;
