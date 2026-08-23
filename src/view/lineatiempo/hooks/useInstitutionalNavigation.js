import { useEffect, useRef, useState } from 'react';

export const useInstitutionalNavigation = (
  initialSection = 'historia'
) => {
  const pageRef = useRef(null);
  const [activeSection, setActiveSection] =
    useState(initialSection);

  useEffect(() => {
    const sections =
      pageRef.current?.querySelectorAll('[data-section]');

    if (!sections?.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length > 0) {
          setActiveSection(
            visible[0].target.dataset.section
          );
        }
      },
      {
        rootMargin: '-25% 0px -60% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return {
    pageRef,
    activeSection,
    scrollToSection,
  };
};
