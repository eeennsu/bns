import { FC } from 'react';

import BrushBackground from '@features/user/home/ui/BrushBackground';
import ContactUs from '@features/user/home/ui/ContactUs';
import EventPopupList from '@features/user/home/ui/EventPopupList';
import Hero from '@features/user/home/ui/Hero';
import Signature from '@features/user/home/ui/Signature';

const HomePage: FC = () => {
  return (
    <main className='relative size-full'>
      <div className='relative container flex flex-col gap-10 px-4 pt-24'>
        <Hero />
        <Signature />
        <BrushBackground />
      </div>

      <ContactUs />
      <EventPopupList />
    </main>
  );
};
export default HomePage;
