import dayjs from 'dayjs';
import { CircleCheckBig, X } from 'lucide-react';
import type { ReactNode, SyntheticEvent } from 'react';

import { Table as ShadcnTable, TableBody, TableHead, TableHeader, TableRow } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

import { TableExtraKey } from '@typings/commons';

import TableSkeleton from './Skeleton';
import TableCell from './TableCell';

const DATE_KEYS = ['createdAt', 'updatedAt', 'deletedAt', 'startDate', 'endDate'];

interface IProps<T extends Record<string, any>> {
  headers: string[];
  items: T[];
  showItems: Array<keyof T | TableExtraKey>;
  renderItemProps?: Array<{
    itemKey: keyof T | TableExtraKey;
    children: (item: T) => ReactNode;
  }>;
  isLoading?: boolean;
  onClickItem?: (id: T) => () => void;
  emptyDataText?: string;
  className?: string;
  tableHeaderClassName?: string;
  tableRowClassName?: string;
}

const Table = <T extends Record<string, any>>({
  headers,
  items = [],
  showItems,
  renderItemProps,
  isLoading,
  onClickItem,
  emptyDataText,
  className,
  tableHeaderClassName,
  tableRowClassName,
}: IProps<T>) => {
  const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).src = '';
  };

  const renderItemMap = new Map<string, (item: T) => ReactNode>(
    renderItemProps?.map(p => [p.itemKey as string, p.children]) ?? [],
  );

  const renderItem = (rowItem: T, itemKey: string) => {
    const key = String(itemKey);

    const cellValue = rowItem[itemKey];

    if (cellValue === null || cellValue === '') {
      return (
        <TableCell key={key} className='text-slate-500'>
          -
        </TableCell>
      );
    }

    if (renderItemMap.has(itemKey)) {
      return (
        <TableCell key={key} isStopPropagation>
          {renderItemMap.get(itemKey)!(rowItem)}
        </TableCell>
      );
    }

    if (itemKey === 'image' && rowItem?.image) {
      return (
        <TableCell key={key} isStopPropagation>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={rowItem.image}
            alt={rowItem?.name || 'image'}
            className='size-14 object-cover'
            onError={onImageError}
          />
        </TableCell>
      );
    }

    if (typeof cellValue === 'boolean') {
      return (
        <TableCell key={key}>
          <div className='flex items-center justify-center'>
            {cellValue === true ? (
              <CircleCheckBig className='text-green-500' size={16} />
            ) : (
              <X className='text-red-500' size={16} />
            )}
          </div>
        </TableCell>
      );
    }

    if (typeof cellValue === 'number') {
      return <TableCell key={key}>{cellValue.toLocaleString('ko-KR')}</TableCell>;
    }

    if (typeof cellValue === 'string' && (DATE_KEYS.includes(key) || key.endsWith('At'))) {
      const parsedDate = dayjs(cellValue);
      return parsedDate.isValid() ? (
        <TableCell key={key} className='px-4 py-3 text-xs whitespace-nowrap text-gray-500'>
          {parsedDate.format('YY-MM-DD')}
        </TableCell>
      ) : (
        <TableCell key={key} className='text-slate-500'>
          -
        </TableCell>
      );
    }

    return <TableCell key={key}>{String(cellValue)}</TableCell>;
  };

  return (
    <section className='relative min-h-[450px] overflow-auto'>
      {isLoading ? <TableSkeleton /> : null}
      <ShadcnTable
        className={cn(
          className,
          'w-full border-separate border-spacing-0 overflow-hidden rounded-lg shadow-sm',
        )}
      >
        <TableHeader className='sticky top-0 z-[1]'>
          <TableRow className={tableHeaderClassName}>
            {headers.map(header => (
              <TableHead
                key={header}
                className='max-w-20 bg-gray-50 px-6 py-4 text-center text-xs font-semibold tracking-wider break-words whitespace-normal text-gray-600 uppercase'
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow className='hover:bg-transparent'>
              <TableCell
                colSpan={headers.length}
                className='py-10 text-center text-xs text-gray-400'
              >
                {emptyDataText || '데이터가 없습니다.'}
              </TableCell>
            </TableRow>
          ) : (
            items?.map(rowItem => (
              <TableRow
                key={rowItem.id}
                onClick={onClickItem(rowItem)}
                className={cn(onClickItem !== undefined && 'cursor-pointer', tableRowClassName)}
              >
                {Array.from(new Set(showItems)).map(itemKey =>
                  renderItem(rowItem, itemKey as string),
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </ShadcnTable>
    </section>
  );
};

export default Table;
