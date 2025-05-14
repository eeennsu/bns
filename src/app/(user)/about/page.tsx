import type { FC } from 'react';

import BriefHistory from '@features/user/about/ui/BriefHistory';
import Location from '@features/user/about/ui/Location';
import NaverMapScript from '@features/user/about/ui/NaverMap/NaverMapScript';
import Slogun from '@features/user/about/ui/Slogun';
import Story from '@features/user/about/ui/Story';

import UserPageWrapper from '../UserPageWrapper';

const AboutPage: FC = () => {
  return (
    <>
      <NaverMapScript />

      <UserPageWrapper className='flex flex-col gap-10 lg:gap-20'>
        <Slogun />
        <div className='container flex flex-col gap-10 lg:gap-20'>
          <Story />
          <BriefHistory />
          <Location />
        </div>
      </UserPageWrapper>
    </>
  );
};

export default AboutPage;

// https://composecoffee.com/about
