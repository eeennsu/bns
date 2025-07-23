import { IPathSlug } from '@typings/commons';

import { LIST_PAGE_ROUTE } from './consts';

export const ADMIN_PATHS = {
  root: '/admin' as const,
  dashboard() {
    return ADMIN_PATHS.root;
  },
  product: {
    root() {
      return ADMIN_PATHS.root.concat('/product');
    },
    bread: {
      root() {
        return ADMIN_PATHS.product.root().concat('/bread');
      },
      list() {
        return ADMIN_PATHS.product.bread.root().concat(LIST_PAGE_ROUTE);
      },
      detail: ({ slug }: IPathSlug) => {
        return ADMIN_PATHS.product.bread.root().concat(`/${slug}`);
      },
      create: () => {
        return ADMIN_PATHS.product.bread.root().concat('/create');
      },
      modify: () => {
        return ADMIN_PATHS.product.bread.root().concat('/modify');
      },
    },
    sauce: {
      root() {
        return ADMIN_PATHS.product.root().concat('/sauce');
      },
      list() {
        return ADMIN_PATHS.product.sauce.root().concat(LIST_PAGE_ROUTE);
      },
      detail: ({ slug }: IPathSlug) => {
        return ADMIN_PATHS.product.sauce.root().concat(`/${slug}`);
      },
      create: () => {
        return ADMIN_PATHS.product.sauce.root().concat('/create');
      },
      modify: () => {
        return ADMIN_PATHS.product.sauce.root().concat('/modify');
      },
    },
    dish: {
      root() {
        return ADMIN_PATHS.product.root().concat('/dish');
      },
      list() {
        return ADMIN_PATHS.product.dish.root().concat(LIST_PAGE_ROUTE);
      },
      detail: ({ slug }: IPathSlug) => {
        return ADMIN_PATHS.product.dish.root().concat(`/${slug}`);
      },
      create: () => {
        return ADMIN_PATHS.product.dish.root().concat('/create');
      },
      modify: () => {
        return ADMIN_PATHS.product.dish.root().concat('/modify');
      },
    },
    drink: {
      root() {
        return ADMIN_PATHS.product.root().concat('/drink');
      },
      list() {
        return ADMIN_PATHS.product.drink.root().concat(LIST_PAGE_ROUTE);
      },
      detail: ({ slug }: IPathSlug) => {
        return ADMIN_PATHS.product.drink.root().concat(`/${slug}`);
      },
      create: () => {
        return ADMIN_PATHS.product.drink.root().concat('/create');
      },
      modify: () => {
        return ADMIN_PATHS.product.drink.root().concat('/modify');
      },
    },
    dessert: {
      root() {
        return ADMIN_PATHS.product.root().concat('/dessert');
      },
      list() {
        return ADMIN_PATHS.product.dessert.root().concat(LIST_PAGE_ROUTE);
      },
      detail: ({ slug }: IPathSlug) => {
        return ADMIN_PATHS.product.dessert.root().concat(`/${slug}`);
      },
      create: () => {
        return ADMIN_PATHS.product.dessert.root().concat('/create');
      },
      modify: () => {
        return ADMIN_PATHS.product.dessert.root().concat('/modify');
      },
    },
  },
  bundle: {
    root() {
      return ADMIN_PATHS.root.concat('/bundle');
    },
    list() {
      return ADMIN_PATHS.bundle.root().concat(LIST_PAGE_ROUTE);
    },
    detail: ({ slug }: IPathSlug) => {
      return ADMIN_PATHS.bundle.root().concat(`/${slug}`);
    },
    create: () => {
      return ADMIN_PATHS.bundle.root().concat('/create');
    },
    modify: () => {
      return ADMIN_PATHS.bundle.root().concat('/modify');
    },
  },
  event: {
    root() {
      return ADMIN_PATHS.root.concat('/event');
    },
    list() {
      return ADMIN_PATHS.event.root().concat(LIST_PAGE_ROUTE);
    },
    detail: ({ slug }: IPathSlug) => {
      return ADMIN_PATHS.event.root().concat(`/${slug}`);
    },
    create: () => {
      return ADMIN_PATHS.event.root().concat('/create');
    },
    modify: () => {
      return ADMIN_PATHS.event.root().concat('/modify');
    },
  },
};
