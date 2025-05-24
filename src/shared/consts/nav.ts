import { IHeaderMenu } from '@typings/commons';

import { MAIN_PATHS } from '../configs/routes/mainPaths';

export const USER_MENU_LIST: IHeaderMenu[] = [
  {
    title: '소개',
    href: MAIN_PATHS.about(),
  },
  {
    title: '제품',
    href: MAIN_PATHS.product.bread.list(),
    subMenus: {
      bread: {
        title: '빵',
        href: MAIN_PATHS.product.bread.list(),
      },
      sauce: {
        title: '소스',
        href: MAIN_PATHS.product.sauce.list(),
      },
      bundle: {
        title: '세트 구성',
        href: MAIN_PATHS.product.bundle(),
      },
    } as const,
  },
] as const;
