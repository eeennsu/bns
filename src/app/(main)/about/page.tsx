import type { FC } from 'react';

import BriefHistory from '@features/about/ui/BriefHistory';
import Location from '@features/about/ui/Location';
import NaverMapScript from '@features/about/ui/NaverMap/NaverMapScript';
import Slogan from '@features/about/ui/Slogan';
import Story from '@features/about/ui/Story';

const AboutPage: FC = () => {
  return (
    <>
      <main className='h-full bg-white pb-6 lg:pb-12'>
        <Slogan />
        <div className='container flex flex-col !gap-24 lg:!gap-40 lg:!pt-20'>
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
