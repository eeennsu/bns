import { FC } from 'react';

import BrushBackground from '@features/home/ui/BrushBackground';
import ContactUs from '@features/home/ui/ContactUs';
import EventListPopup from '@features/home/ui/EventListPopup';
import Hero from '@features/home/ui/Hero';
import Signature from '@features/home/ui/Signature';

const HomePage: FC = () => {
  return (
    <main className='relative size-full'>
      <div className='relative container flex flex-col gap-10 px-4 pt-24'>
        <Hero />
        <Signature />
        <BrushBackground />
      </div>

      <ContactUs />
      <EventListPopup />
    </main>
  );
};
export default HomePage;
