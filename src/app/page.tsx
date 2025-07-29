import { FC } from 'react';

import EventList from '@features/event/ui/list';
import BrushBackground from '@features/home/ui/BrushBackground';
import ContactUs from '@features/home/ui/ContactUs';
import Hero from '@features/home/ui/Hero';
import LoginExpireToast from '@features/home/ui/LoginExpireToast';
import SignatureProducts from '@features/home/ui/SignatureProducts';

const HomePage: FC = async () => {
  return (
    <main className='relative size-full'>
      <div className='relative container flex flex-col gap-10 px-4 pt-24'>
        <Hero />
        <SignatureProducts />
        <BrushBackground />
      </div>

      <ContactUs />
      <LoginExpireToast />
      <EventList />
    </main>
  );
};
export default HomePage;
