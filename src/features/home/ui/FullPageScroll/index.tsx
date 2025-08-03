'use client';

import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import { FullpageContainer, FullpageSection } from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';
import { type FC } from 'react';

import Footer from '@widgets/user/Footer';

import ScrollerNavigation from '../ScrollerNavigation';
import Section1 from './Section1';

const FullPageScroller: FC = () => {
  const { activeIndex, setActiveIndex } = useFullPageScrollStore();

  return (
    <>
      <FullpageContainer
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        transitionDuration={1000}
      >
        <FullpageSection>
          <Section1 />
        </FullpageSection>
        <FullpageSection>
          <div className='w-full'>Section 2</div>
        </FullpageSection>
        <FullpageSection>
          <div className='w-full'>Section 3</div>
        </FullpageSection>
        <FullpageSection isAutoHeight>
          <Footer />
        </FullpageSection>
      </FullpageContainer>
      <ScrollerNavigation activeIndex={activeIndex} size={3} />
    </>
  );
};

export default FullPageScroller;
