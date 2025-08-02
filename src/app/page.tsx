import { FC } from 'react';

import EventList from '@features/event/ui/list';
import FullPageScroll from '@features/home/ui/FullPageScroll';
// import BrushBackground from '@features/home/ui/BrushBackground';
// import ContactUs from '@features/home/ui/ContactUs';
// import Hero from '@features/home/ui/Hero';
import LoginExpireToast from '@features/home/ui/LoginExpireToast';

// import SignatureProducts from '@features/home/ui/SignatureProducts';

const HomePage: FC = async () => {
  return (
    <main className='relative size-full'>
      <FullPageScroll />

      <LoginExpireToast />
      <EventList />
    </main>
  );
};
export default HomePage;
