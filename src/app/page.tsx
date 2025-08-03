import { FC } from 'react';

import getEventList from '@features/event/queries/getList';
import getSignatureList from '@features/home/queries/getSignatureList';
import FullPageScroller from '@features/home/ui/FullPageScroll';
// import BrushBackground from '@features/home/ui/BrushBackground';
// import ContactUs from '@features/home/ui/ContactUs';
// import Hero from '@features/home/ui/Hero';
import LoginExpireToast from '@features/home/ui/LoginExpireToast';

// import SignatureProducts from '@features/home/ui/SignatureProducts';

const HomePage: FC = async () => {
  const [signatureResponse, eventResponse] = await Promise.all([
    getSignatureList(),
    getEventList(),
  ]);

  const [, signatures] = signatureResponse;
  const [, events] = eventResponse;

  return (
    <main className='relative size-full'>
      <FullPageScroller signatures={signatures} events={events?.list || []} />

      <LoginExpireToast />
      {/* <EventList /> */}
    </main>
  );
};
export default HomePage;
