import { useEffect, useMemo, useState } from 'react';

export const useCanalSlider = (slides, interval = 6500) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, interval);

    return () => window.clearTimeout(timer);
  }, [currentSlide, interval, slides.length]);

  const current = slides[currentSlide];

  const currentIndex = useMemo(
    () => String(currentSlide + 1).padStart(2, '0'),
    [currentSlide]
  );

  const totalSlides = useMemo(
    () => String(slides.length).padStart(2, '0'),
    [slides.length]
  );

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (previous) => (previous - 1 + slides.length) % slides.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((previous) => (previous + 1) % slides.length);
  };

  return {
    currentSlide,
    setCurrentSlide,
    current,
    currentIndex,
    totalSlides,
    goToPreviousSlide,
    goToNextSlide,
  };
};
