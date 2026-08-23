import React, { useEffect } from 'react';

import '../css/HomeRedesign.css';
import './internet/styles/Internet.css';

import AudienceSection from './internet/components/AudienceSection';
import ExperienceSection from './internet/components/ExperienceSection';
import FinalCta from './internet/components/FinalCta';
import InternetHero from './internet/components/InternetHero';
import PlansSection from './internet/components/PlansSection';
import ProcessSection from './internet/components/ProcessSection';
import ServiceRequirementsSection from './internet/components/ServiceRequirementsSection';
import StorySection from './internet/components/StorySection';

import {
  audienceSegments,
  experienceBenefits,
  internetPlans,
  processSteps,
  serviceRequirements,
  storyMetrics,
  textSlides,
} from './internet/data/internetData';

import { useInternetSlider } from './internet/hooks/useInternetSlider';

const Internet = () => {
  const slider = useInternetSlider(textSlides);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-corporate">
      <InternetHero slides={textSlides} {...slider} />

      <main className="inet-next">
        <StorySection slides={textSlides} metrics={storyMetrics} />
        <PlansSection plans={internetPlans} />
        <ServiceRequirementsSection requirements={serviceRequirements} />
        <ExperienceSection benefits={experienceBenefits} />
        <AudienceSection segments={audienceSegments} />
        <ProcessSection steps={processSteps} />
        <FinalCta image={textSlides[1].image} />
      </main>
    </div>
  );
};

export default Internet;
