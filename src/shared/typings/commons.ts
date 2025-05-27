import { JSX } from 'react';
import { z } from 'zod';

import { SearchFormDtoSchema } from '@contracts/common';

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

export interface IList<T> {
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

export interface ITableDefaultItem {
  id: string | number;
  name?: string;
  type?: string;
  rank?: string | number;
  image?: string;
}

export type SearchFormDto = z.infer<typeof SearchFormDtoSchema>;
