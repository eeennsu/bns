import type { FC } from 'react';

import BriefHistory from '@features/about/ui/BriefHistory';
import Location from '@features/about/ui/Location';
import NaverMapScript from '@features/about/ui/NaverMap/NaverMapScript';
import Story from '@features/about/ui/Story';

const AboutPage: FC = () => {
  return (
    <>
      <main className='mx-auto h-full space-y-5 bg-white pb-6 sm:space-y-20'>
        <div className='container flex flex-col gap-10 lg:gap-20 lg:pt-30'>
          <Story />
          <BriefHistory />
          <Location />
        </div>
      </main>
      <NaverMapScript />
    </>
  );
};

export default AboutPage;
