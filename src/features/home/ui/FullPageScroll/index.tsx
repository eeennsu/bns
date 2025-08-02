'use client';

import { FullpageContainer, FullpageSection } from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';
import { useState, type FC } from 'react';

import Footer from '@widgets/user/Footer';

import ScrollerNavigation from '../ScrollerNavigation';

const FullPageScroller: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <>
      <FullpageContainer
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        transitionDuration={1000}
      >
        <FullpageSection>
          <div className='w-full'>Section 1</div>
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
