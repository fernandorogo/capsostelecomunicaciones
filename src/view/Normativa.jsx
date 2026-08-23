import React, { useEffect } from 'react';

import '../css/HomeRedesign.css';
import './normativa/styles/Normativa.css';

import {
  LegalHero,
  NormativaLibrary,
  ValidityNotice,
} from './normativa/components';

import {
  CATEGORY_OPTIONS,
  LEGAL_SLIDES,
  NORMATIVAS,
  VALIDITY_NOTICES,
} from './normativa/data';

import {
  useLegalSlider,
  useNormativaFilters,
} from './normativa/hooks/index';

const Normativa = () => {
  const {
    currentSlide,
    current,
    isPaused,
    setIsPaused,
    goToPreviousSlide,
    goToNextSlide,
    selectSlide,
  } = useLegalSlider(LEGAL_SLIDES);

  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredNormativas,
    clearFilters,
    hasActiveFilters,
  } = useNormativaFilters(NORMATIVAS);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="normativa-page">
      <LegalHero
        slides={LEGAL_SLIDES}
        currentSlide={currentSlide}
        current={current}
        isPaused={isPaused}
        onPauseChange={setIsPaused}
        onPrevious={goToPreviousSlide}
        onNext={goToNextSlide}
        onSelect={selectSlide}
      />

      <NormativaLibrary
        normativas={NORMATIVAS}
        filteredNormativas={filteredNormativas}
        categories={CATEGORY_OPTIONS}
        searchTerm={searchTerm}
        activeCategory={activeCategory}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={setSearchTerm}
        onCategoryChange={setActiveCategory}
        onClearFilters={clearFilters}
      />

      <ValidityNotice items={VALIDITY_NOTICES} />
    </main>
  );
};

export default Normativa;
