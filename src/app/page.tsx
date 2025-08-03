import { FC } from 'react';

import EventList from '@features/event/ui/list';
import getSignatureList from '@features/home/queries/getSignatureList';
import FullPageScroll from '@features/home/ui/FullPageScroll';
// import BrushBackground from '@features/home/ui/BrushBackground';
// import ContactUs from '@features/home/ui/ContactUs';
// import Hero from '@features/home/ui/Hero';
import LoginExpireToast from '@features/home/ui/LoginExpireToast';

// import SignatureProducts from '@features/home/ui/SignatureProducts';

const HomePage: FC = async () => {
  const [error, signatures] = await getSignatureList();

  if (error) {
    console.log(error);
  }

  return (
    <main className='relative size-full'>
      <FullPageScroll signatures={signatures} />

      <LoginExpireToast />
      <EventList />
    </main>
  );
};
export default HomePage;
