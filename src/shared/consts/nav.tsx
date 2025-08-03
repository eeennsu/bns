import { IAdminMenuRoute } from '@typings/commons';

import { ADMIN_PATHS } from '../configs/routes/adminPaths';
import { MAIN_PATHS } from '../configs/routes/mainPaths';

export const HEADER_PRODUCT_SUB_MENUS = {
  bread: {
    title: '빵',
    path: MAIN_PATHS.product.bread.list(),
  },
  sauce: {
    title: '소스',
    path: MAIN_PATHS.product.sauce.list(),
  },
  dish: {
    title: '디쉬',
    path: MAIN_PATHS.product.dish.list(),
  },
  drink: {
    title: '음료',
    path: MAIN_PATHS.product.drink.list(),
  },
  dessert: {
    title: '디저트',
    path: MAIN_PATHS.product.dessert.list(),
  },
  bundle: {
    title: '세트 구성',
    path: MAIN_PATHS.product.bundle.list(),
  },
};

export const ADMIN_MENUS: IAdminMenuRoute[][] = [
  [
    {
      menuName: '대시보드',
      path: ADMIN_PATHS.dashboard(),
      order: 0,
    },
  ],
  [
    {
      menuName: '메뉴 관리',
      path: ADMIN_PATHS.product.bread.list(),
      order: 0,
    },
    {
      path: ADMIN_PATHS.product.bread.list(),
      menuName: '빵 전체 목록',
      order: 1,
    },
    {
      path: ADMIN_PATHS.product.sauce.list(),
      menuName: '소스 전체 목록',
      order: 1,
    },
    {
      path: ADMIN_PATHS.product.dish.list(),
      menuName: '디쉬 전체 목록',
      order: 1,
    },
    {
      path: ADMIN_PATHS.product.drink.list(),
      menuName: '음료 전체 목록',
      order: 1,
    },
    {
      path: ADMIN_PATHS.product.dessert.list(),
      menuName: '디저트 전체 목록',
      order: 1,
    },
  ],
  [
    {
      path: ADMIN_PATHS.bundle.list(),
      menuName: '세트 구성 관리',
      order: 0,
    },
    {
      path: ADMIN_PATHS.bundle.list(),
      menuName: '세트 구성 전체 목록',
      order: 1,
    },
  ],
  [
    {
      path: ADMIN_PATHS.event.list(),
      menuName: '이벤트 관리',
      order: 0,
    },
    {
      path: ADMIN_PATHS.event.list(),
      menuName: '이벤트 전체 목록',
      order: 1,
    },
  ],
];
