import { ADMIN_PATHS } from 'src/shared/configs/routes/adminPaths';

import { IAdminMenuRoute } from '@typings/commons';

export const isGroupActive = (group: IAdminMenuRoute[], pathname: string) => {
  if (group[0].path === ADMIN_PATHS.dashboard()) {
    return pathname === group[0].path;
  }
  return group.some(item => pathname === item.path.split('?')[0]);
};
