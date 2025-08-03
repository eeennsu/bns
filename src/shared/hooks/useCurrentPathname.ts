import { usePathname } from 'next/navigation';

import { MAIN_PATHS } from '../configs/routes/mainPaths';

const useCurrentPathname = () => {
  const pathname = usePathname();

  const getIsCurPathname = (href: string, isLastPathname = false) => {
    if (isLastPathname) {
      const pathnameArr = pathname.split('/').pop();
      const hrefArr = href.split('/').pop().split('?')[0];

      return pathnameArr === hrefArr;
    }

    return pathname !== MAIN_PATHS.home() && href.includes(pathname!);
  };

  return {
    getIsCurPathname,
  };
};

export default useCurrentPathname;
