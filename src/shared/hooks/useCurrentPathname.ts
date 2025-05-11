import { usePathname } from 'next/navigation';

import { USER_PATHS } from '../configs/routes/userPaths';

const useCurrentPathname = () => {
  const pathname = usePathname();

  const getIsCurPathname = (href: string) => {
    return pathname !== USER_PATHS.home() && href.includes(pathname!);
  };

  return {
    getIsCurPathname,
  };
};

export default useCurrentPathname;
