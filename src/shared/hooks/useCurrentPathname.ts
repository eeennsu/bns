import { usePathname } from 'next/navigation';

import { MAIN_PATHS } from '../configs/routes/mainPaths';

const useCurrentPathname = () => {
  const pathname = usePathname();

  const getIsCurPathname = (href: string) => {
    return pathname !== MAIN_PATHS.home() && href.includes(pathname!);
  };

  return {
    getIsCurPathname,
  };
};

export default useCurrentPathname;
