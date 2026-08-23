import {
  useCallback,
  useEffect,
  useState,
} from 'react';

const usePolicyNavigation = (
  sections
) => {
  const [activeSection, setActiveSection] =
    useState(sections[0]?.id ?? '');

  const scrollToSection = useCallback(
    (sectionId) => {
      const element =
        document.getElementById(sectionId);

      if (!element) {
        return;
      }

      setActiveSection(sectionId);

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    []
  );

  useEffect(() => {
    const elements = sections
      .map((section) =>
        document.getElementById(section.id)
      )
      .filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter(
              (entry) =>
                entry.isIntersecting
            )
            .sort(
              (a, b) =>
                b.intersectionRatio -
                a.intersectionRatio
            );

          if (visible[0]?.target?.id) {
            setActiveSection(
              visible[0].target.id
            );
          }
        },
        {
          root: null,
          rootMargin:
            '-18% 0px -68% 0px',
          threshold: [
            0,
            0.1,
            0.25,
            0.5,
          ],
        }
      );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  return {
    activeSection,
    scrollToSection,
  };
};

export default usePolicyNavigation;
