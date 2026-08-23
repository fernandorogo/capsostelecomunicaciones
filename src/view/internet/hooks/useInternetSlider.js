import { useEffect, useMemo, useState } from 'react';

export const useInternetSlider = (slides, interval = 7000) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % slides.length);
    }, interval);

    return () => window.clearTimeout(timer);
  }, [currentSlide, interval, slides.length]);

  const current = slides[currentSlide];

  const speed = useMemo(() => {
    const [value, unit = 'Mbps'] = (current?.speed || '').split(' ');
    return { value, unit };
  }, [current]);

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (previousSlide) =>
        (previousSlide - 1 + slides.length) % slides.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((previousSlide) => (previousSlide + 1) % slides.length);
  };

  return {
    currentSlide,
    setCurrentSlide,
    current,
    speedValue: speed.value,
    speedUnit: speed.unit,
    goToPreviousSlide,
    goToNextSlide,
  };
};
