import { USER_PATHS } from '../configs/routes/userPaths';

export const BRAND_TITLE = {
  EN: 'Bread & Sauce',
  KO: '브래드앤소스',
};

export const USER_MENU_LIST = [
  {
    title: 'About',
    href: USER_PATHS.about(),
  },
  {
    title: 'Breads',
    href: USER_PATHS.bread.list(),
  },
  {
    title: 'Sauces',
    href: USER_PATHS.sauce.list(),
  },
];

