import React, { useEffect } from 'react';

import '../css/HomeRedesign.css';
import './canalpropio/styles/Canalpropio.css';

import BenefitsSection from './canalpropio/components/BenefitsSection';
import CanalHero from './canalpropio/components/CanalHero';
import FinalCta from './canalpropio/components/FinalCta';
import FormatsSection from './canalpropio/components/FormatsSection';
import JourneySection from './canalpropio/components/JourneySection';
import ManifestoSection from './canalpropio/components/ManifestoSection';
import TechnologySection from './canalpropio/components/TechnologySection';
import UseCasesSection from './canalpropio/components/UseCasesSection';

import {
  benefits,
  canalEstudioControl,
  formats,
  heroHighlights,
  journey,
  slides,
  techItems,
  useCases,
} from './canalpropio/data/canalPropioData';

import { useCanalSlider } from './canalpropio/hooks/useCanalSlider';

const Canalpropio = () => {
  const slider = useCanalSlider(slides);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-corporate own-channel-page">
      <CanalHero
        slides={slides}
        highlights={heroHighlights}
        {...slider}
        onSelectSlide={slider.setCurrentSlide}
        onPreviousSlide={slider.goToPreviousSlide}
        onNextSlide={slider.goToNextSlide}
      />

      <ManifestoSection />
      <JourneySection items={journey} />
      <UseCasesSection cases={useCases} />
      <BenefitsSection benefits={benefits} />
      <FormatsSection formats={formats} />
      <TechnologySection image={canalEstudioControl} items={techItems} />
      <FinalCta />
    </div>
  );
};

export default Canalpropio;
