'use client';

import useFullPageScrollStore from '@shared/stores/fullPageScroll';
import { FullpageContainer, FullpageSection } from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';
import { type FC } from 'react';

import Footer from '@widgets/user/Footer';

import { ISignatureProduct, ISummaryEvent } from '@entities/home/types';

import EventSection from './EventSection';
import LandingSection from './LandingSection';
import ScrollerNavigation from './ScrollerNavigation';
import SignatureSection from './SignatureSection';

interface IProps {
  signatures: ISignatureProduct[];
  events: ISummaryEvent[];
  eventTotal: number;
}

const FullPageScroller: FC<IProps> = ({ signatures, events, eventTotal }) => {
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
          <EventSection events={events} total={eventTotal} />
        </FullpageSection>
        <FullpageSection isAutoHeight>
          <Footer />
        </FullpageSection>
      </FullpageContainer>
      {/* FullPage count = 3 */}
      <ScrollerNavigation size={3} />
    </>
  );
};

export default FullPageScroller;
