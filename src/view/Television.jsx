import React, { useEffect } from 'react';

import '../css/HomeRedesign.css';
import './television/styles/Television.css';
import './television/styles/service-requirements.css';

import BenefitsSection from './television/components/BenefitsSection';
import CategoriesSection from './television/components/CategoriesSection';
import ChannelGuide from './television/components/ChannelGuide';
import ExperiencesSection from './television/components/ExperiencesSection';
import FaqSection from './television/components/FaqSection';
import FinalCta from './television/components/FinalCta';
import ServiceRequirementsSection from './television/components/ServiceRequirementsSection';
import TelevisionHero from './television/components/TelevisionHero';
import {
  analogChannels,
  channelGroups,
  contentCategories,
  faqs,
  heroSlides,
  serviceRequirements,
  tvFeatures,
} from './television/data/televisionData';
import { useHeroSlider } from './television/hooks/useHeroSlider';

const Television = () => {
  const {
    currentSlide,
    setCurrentSlide,
    current,
    goToPreviousSlide,
    goToNextSlide,
  } = useHeroSlider(heroSlides);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-corporate tv-premium-page">
      <TelevisionHero
        slides={heroSlides}
        currentSlide={currentSlide}
        current={current}
        onSelectSlide={setCurrentSlide}
        onPreviousSlide={goToPreviousSlide}
        onNextSlide={goToNextSlide}
      />

      <ExperiencesSection slides={heroSlides} />
      <CategoriesSection categories={contentCategories} />
      <BenefitsSection features={tvFeatures} />
      <ServiceRequirementsSection requirements={serviceRequirements} />
      <ChannelGuide groups={channelGroups} analogChannels={analogChannels} />
      <FaqSection faqs={faqs} image={heroSlides[3].image} />
      <FinalCta image={heroSlides[0].image} />
    </div>
  );
};

export default Television;
