import { FC } from 'react';

import getEventList from '@features/event/queries/getList';
import getSignatureList from '@features/home/queries/getSignatureList';
import FullPageScroller from '@features/home/ui/FullPageScroll';
import LoginExpireToast from '@features/home/ui/LoginExpireToast';

const HomePage: FC = async () => {
  const [signatureResponse, eventResponse] = await Promise.all([
    getSignatureList(),
    getEventList({ page: 1, pageSize: 3 }),
  ]);

  const [, signatures] = signatureResponse;
  const [, events] = eventResponse;

  return (
    <main className='relative size-full'>
      <FullPageScroller
        signatures={signatures ?? []}
        events={events?.list || []}
        eventTotal={events?.total || 0}
      />

      <LoginExpireToast />
    </main>
  );
};
export default HomePage;

// export const revalidate = 600; // 10분 마다 새로고침
export const dynamic = 'force-dynamic';
