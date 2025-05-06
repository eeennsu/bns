import type { FC } from 'react';

import BriefHistory from '@features/user/about/ui/BriefHistory';
import Info from '@features/user/about/ui/Info';
import Location from '@features/user/about/ui/Location';
import NaverMapScript from '@features/user/about/ui/NaverMap/NaverMapScript';
import Story from '@features/user/about/ui/Story';

const AboutPage: FC = () => {
  return (
    <>
      <NaverMapScript />
      <main className='from-ivory bg-gradient-to-br to-[#E8D0A9]'>
        <div className='container mx-auto space-y-20 px-4 py-24 lg:py-32'>
          <Story />
          <BriefHistory />
          <Location />
          <Info />
        </div>
      </main>
    </>
  );
};

export default AboutPage;
