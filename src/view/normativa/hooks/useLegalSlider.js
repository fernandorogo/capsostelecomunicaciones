import { useEffect, useMemo, useState } from 'react';

import { SLIDE_DURATION } from '../data';

const useLegalSlider = (
  slides,
  duration = SLIDE_DURATION
) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const current = useMemo(
    () => slides[currentSlide] ?? slides[0],
    [slides, currentSlide]
  );

  useEffect(() => {
    if (isPaused || slides.length <= 1) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setCurrentSlide(
        (previousSlide) =>
          (previousSlide + 1) % slides.length
      );
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    currentSlide,
    duration,
    isPaused,
    slides.length,
  ]);

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (previousSlide) =>
        (previousSlide - 1 + slides.length) %
        slides.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide(
      (previousSlide) =>
        (previousSlide + 1) % slides.length
    );
  };

  const selectSlide = (index) => {
    if (
      Number.isInteger(index) &&
      index >= 0 &&
      index < slides.length
    ) {
      setCurrentSlide(index);
    }
  };

  return {
    currentSlide,
    current,
    isPaused,
    setIsPaused,
    goToPreviousSlide,
    goToNextSlide,
    selectSlide,
  };
};

export default useLegalSlider;
