import { useCallback, useEffect, useRef } from 'react';

export const useHeroPointer = () => {
  const heroSectionRef = useRef(null);
  const animationFrameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const updatePointerPosition = useCallback(() => {
    animationFrameRef.current = null;

    const section = heroSectionRef.current;

    if (!section) {
      return;
    }

    const bounds = section.getBoundingClientRect();
    const { x, y } = pointerRef.current;

    section.style.setProperty('--pointer-x', `${x - bounds.left}px`);
    section.style.setProperty('--pointer-y', `${y - bounds.top}px`);
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (animationFrameRef.current !== null) {
        return;
      }

      animationFrameRef.current =
        window.requestAnimationFrame(updatePointerPosition);
    },
    [updatePointerPosition]
  );

  const handlePointerLeave = useCallback(() => {
    const section = heroSectionRef.current;

    if (!section) {
      return;
    }

    section.style.setProperty('--pointer-x', '50%');
    section.style.setProperty('--pointer-y', '50%');
  }, []);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    },
    []
  );

  return {
    heroSectionRef,
    handlePointerMove,
    handlePointerLeave,
  };
};
