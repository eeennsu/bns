import type { FC } from 'react';

import BriefHistory from '@features/about/ui/BriefHistory';
import Location from '@features/about/ui/Location';
import NaverMapScript from '@features/about/ui/NaverMap/NaverMapScript';
import Slogun from '@features/about/ui/Slogun';
import Story from '@features/about/ui/Story';

const AboutPage: FC = () => {
  return (
    <>
      <NaverMapScript />
      <main className='from-ivory mx-auto h-full space-y-5 bg-gradient-to-br to-[#E8D0A9] pt-18 pb-6 sm:space-y-20 lg:py-19'>
        <Slogun />
        <div className='container flex flex-col gap-10 lg:gap-20'>
          <Story />
          <BriefHistory />
          <Location />
        </div>
      </main>
    </>
  );
};

export default AboutPage;
