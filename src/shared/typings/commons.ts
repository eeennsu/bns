import { JSX } from 'react';
import { z } from 'zod';

import { SearchFormDtoSchema } from '@contracts/common';
import { FILTER_TYPES } from '@shared/consts/commons';

export type Nullable<T> = T | null;

export interface IMenuRoute {
  parentMenuName: string;
  path: string;
  menuName: string;
  order: number;
  icon?: ({ isActive }: { isActive: boolean }) => JSX.Element;
}
export interface IPathSlug {
  slug: string | number;
}

export interface IMenu {
  title: string;
  path: string;
}

export type SubMenu = Record<string, IMenu>;

export interface IHeaderMenu extends IMenu {
  subMenus?: SubMenu;
}

export type Direction = 'left' | 'right';

export type ItemBase = {
  id: number | string;
};

export interface IList<T extends ItemBase> {
  page: number;
  total: number;
  items: T[];
}

export interface IAdminMenuRoute {
  path: string;
  menuName: string;
  order: number;
}

type TableItemType = string | number | boolean;
export type ITableItem = Record<string, TableItemType>;
export type TableExtraKey = 'delete';

export type SearchFormDto = z.infer<typeof SearchFormDtoSchema>;

interface IAuditDate {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type FilterDate<T> = Omit<T, 'createdAt' | 'updatedAt' | 'deletedAt'> & IAuditDate;
export interface IGetListParams extends Record<string, string | number> {
  page: string | number;
  pageSize: string | number;
  search?: string;
}

export type SelectItem<T = string> = { label: string; value: T };
export interface ICommandGroup<T = Record<string, any>> {
  heading: SelectItem;
  items: Array<
    SelectItem & {
      selected?: boolean;
    } & T
  >;
}

export interface IListResponse {
  ok: boolean;
  data: {
    list: any[];
    totalCount: number;
    page: number;
  };
}
export interface IItemResponse {
  ok: boolean;
  data: any;
}

export type ItemShowValue = typeof FILTER_TYPES[keyof typeof FILTER_TYPES];
export type ItemShowLabel = '전체' | '공개' | '비공개';

