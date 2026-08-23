import { useEffect } from 'react';

const scrollWindowToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  });

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

export const useScrollToTop = () => {
  useEffect(() => {
    scrollWindowToTop();

    const animationFrameId =
      window.requestAnimationFrame(scrollWindowToTop);

    const timeoutId =
      window.setTimeout(scrollWindowToTop, 100);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(timeoutId);
    };
  }, []);
};
