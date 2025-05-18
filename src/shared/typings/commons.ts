export type Nullable<T> = T | null;
export interface IPathSlug {
  slug: string | number;
}

export interface IMenu {
  title: string;
  href: string;
}

export type SubMenu = Record<string, IMenu>;

export interface IHeaderMenu extends IMenu {
  subMenus?: SubMenu;
}

export type Direction = 'left' | 'right';
