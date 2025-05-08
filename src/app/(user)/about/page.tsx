import type { FC } from 'react';

import BriefHistory from '@features/user/about/ui/BriefHistory';
import Info from '@features/user/about/ui/Info';
import Location from '@features/user/about/ui/Location';
import NaverMapScript from '@features/user/about/ui/NaverMap/NaverMapScript';
import Story from '@features/user/about/ui/Story';

import UserPageWrapper from '../UserPageWrapper';

const AboutPage: FC = () => {
  return (
    <>
      <NaverMapScript />

      <UserPageWrapper className='flex flex-col gap-10 lg:gap-20'>
        <Story />
        <BriefHistory />
        <Location />
        <Info />
      </UserPageWrapper>
    </>
  );
};

export default AboutPage;
