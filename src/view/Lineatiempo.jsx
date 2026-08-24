import React, { useEffect } from 'react';

import './lineatiempo/styles/Lineatiempo.css';

import {
  AboutSection,
  CapsosFooter,
  HistorySection,
  InstitutionalHero,
  InstitutionalNav,
  PrinciplesSection,
  ProjectionSection,
  QualitySection,
} from './lineatiempo/components';

import {
  aboutItems,
  aboutSection,
  footerContent,
  heroContent,
  historyItems,
  historySection,
  navItems,
  originHighlight,
  principles,
  principlesSection,
  projectionSection,
  projections,
  qualityItems,
  qualitySection,
} from './lineatiempo/data';

import { useInstitutionalNavigation } from './lineatiempo/hooks';

const Lineatiempo = () => {
  const {
    pageRef,
    activeSection,
    scrollToSection,
  } = useInstitutionalNavigation(heroContent.targetSection);

  useEffect(() => {
    // Evita que el navegador restaure automáticamente
    // la posición anterior del scroll.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Siempre iniciar en la parte superior.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return (
    <main ref={pageRef} className="capsos-page">
      <InstitutionalHero
        content={heroContent}
        onExplore={() => scrollToSection(heroContent.targetSection)}
      />

      <InstitutionalNav
        items={navItems}
        activeSection={activeSection}
        onSelect={scrollToSection}
      />

      <HistorySection
        heading={historySection}
        items={historyItems}
        originHighlight={originHighlight}
      />

      <AboutSection
        heading={aboutSection}
        items={aboutItems}
      />

      <PrinciplesSection
        heading={principlesSection}
        items={principles}
      />

      <QualitySection
        heading={qualitySection}
        items={qualityItems}
      />

      <ProjectionSection
        heading={projectionSection}
        items={projections}
      />

      <CapsosFooter content={footerContent} />
    </main>
  );
};

export default Lineatiempo;