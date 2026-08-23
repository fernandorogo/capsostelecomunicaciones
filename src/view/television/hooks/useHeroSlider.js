import { useEffect, useState } from 'react';

export const useHeroSlider = (slides, delay = 7000) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    if (totalSlides <= 1) return undefined;

    const timer = window.setTimeout(() => {
      setCurrentSlide((previousSlide) =>
        (previousSlide + 1) % totalSlides
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [currentSlide, delay, totalSlides]);

  const goToPreviousSlide = () => {
    setCurrentSlide((previousSlide) =>
      (previousSlide - 1 + totalSlides) % totalSlides
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((previousSlide) =>
      (previousSlide + 1) % totalSlides
    );
  };

  return {
    currentSlide,
    setCurrentSlide,
    current: slides[currentSlide],
    goToPreviousSlide,
    goToNextSlide,
  };
};
