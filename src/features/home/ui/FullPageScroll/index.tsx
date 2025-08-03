'use client';

import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import { FullpageContainer, FullpageSection } from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';
import { type FC } from 'react';

import Footer from '@widgets/user/Footer';

import { IEvent } from '@entities/event/types';
import { ISignatureProduct } from '@entities/home/types';

import EventSection from './EventSection';
import LandingSection from './LandingSection';
import ScrollerNavigation from './ScrollerNavigation';
import SignatureSection from './SignatureSection';

interface IProps {
  signatures: ISignatureProduct[];
  events: Partial<IEvent>[];
}

const FullPageScroller: FC<IProps> = ({ signatures, events }) => {
  const { activeIndex, setActiveIndex } = useFullPageScrollStore();

  return (
    <>
      <FullpageContainer
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex as (afterIndex: number) => void}
        transitionDuration={1000}
      >
        <FullpageSection>
          <LandingSection />
        </FullpageSection>
        <FullpageSection>
          <SignatureSection signatures={signatures} />
        </FullpageSection>
        <FullpageSection>
          <EventSection events={events} />
        </FullpageSection>
        <FullpageSection isAutoHeight>
          <Footer />
        </FullpageSection>
      </FullpageContainer>
      <ScrollerNavigation size={3} />
    </>
  );
};

export default FullPageScroller;
