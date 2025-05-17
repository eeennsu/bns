import { IHeaderMenu } from '@typings/typings';

import { USER_PATHS } from '../configs/routes/userPaths';

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
      bundle: {
        title: '세트 구성',
        href: USER_PATHS.product.bundle(),
      },
    } as const,
  },
] as const;
