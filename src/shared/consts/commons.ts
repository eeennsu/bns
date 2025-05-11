import { IHeaderMenu } from '@typings/typings';

import { USER_PATHS } from '../configs/routes/userPaths';

export const BRAND_TITLE = {
  EN: 'Bread & Sauce',
  KO: '브래드앤소스',
};

export const USER_MENU_LIST: IHeaderMenu[] = [
  {
    title: '소개',
    href: USER_PATHS.about(),
  },
  {
    title: '제품',
    href: USER_PATHS.product.bread.list(),
    subMenus: {
      bread: {
        title: '빵',
        href: USER_PATHS.product.bread.list(),
      },
      sauce: {
        title: '소스',
        href: USER_PATHS.product.sauce.list(),
      },
      set: {
        title: '세트 메뉴',
        href: USER_PATHS.product.set.list(),
      },
    } as const,
  },
] as const;
