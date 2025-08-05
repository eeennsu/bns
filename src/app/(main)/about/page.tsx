import type { FC } from 'react';

import BriefHistory from '@features/about/ui/BriefHistory';
import Location from '@features/about/ui/Location';
import NaverMapScript from '@features/about/ui/NaverMap/NaverMapScript';
import Slogan from '@features/about/ui/Slogan';
import Story from '@features/about/ui/Story';

const AboutPage: FC = () => {
  return (
    <>
      <main className='mx-auto h-full bg-white pb-6'>
        <Slogan />
        <div className='container flex flex-col gap-10 lg:gap-30 lg:pt-20'>
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
