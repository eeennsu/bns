import { usePathname } from 'next/navigation';

import { MAIN_PATHS } from '../configs/routes/mainPaths';

const useCurrentPathname = () => {
  const pathname = usePathname();

  const getIsCurPathname = (href: string, isLastPathname = false) => {
    if (isLastPathname) {
      console.log('pathname', pathname.split('/').pop());
      console.log('href', href.split('/').pop().split('?')[0]);
      return pathname.split('/').pop() === href.split('/').pop().split('?')[0];
    }

    return pathname !== MAIN_PATHS.home() && href.includes(pathname!);
  };

  return {
    getIsCurPathname,
  };
};

export default useCurrentPathname;
