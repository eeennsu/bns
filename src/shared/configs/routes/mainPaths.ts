import { IPathSlug } from '@typings/commons';

import { LIST_PAGE_ROUTE } from './consts';

export const MAIN_PATHS = {
  root: '/' as const,
  home() {
    return MAIN_PATHS.root;
  },
  about() {
    return MAIN_PATHS.root.concat('about');
  },
  product: {
    root() {
      return MAIN_PATHS.root.concat('product');
    },
    bread: {
      root() {
        return MAIN_PATHS.product.root().concat('/bread');
      },
      list() {
        return MAIN_PATHS.product.bread.root().concat(LIST_PAGE_ROUTE);
      },
      detail({ slug }: IPathSlug) {
        return MAIN_PATHS.product.bread.root().concat(`/${slug}`);
      },
    },
    sauce: {
      root() {
        return MAIN_PATHS.product.root().concat('/sauce');
      },
      list() {
        return MAIN_PATHS.product.sauce.root().concat(LIST_PAGE_ROUTE);
      },
      detail({ slug }: IPathSlug) {
        return MAIN_PATHS.product.sauce.root().concat(`/${slug}`);
      },
    },
    drink: {
      root() {
        return MAIN_PATHS.product.root().concat('/drink');
      },
      list() {
        return MAIN_PATHS.product.drink.root().concat(LIST_PAGE_ROUTE);
      },
      detail({ slug }: IPathSlug) {
        return MAIN_PATHS.product.drink.root().concat(`/${slug}`);
      },
    },
    bundle() {
      return MAIN_PATHS.product.root().concat('/bundle');
    },
  },
} as const;
