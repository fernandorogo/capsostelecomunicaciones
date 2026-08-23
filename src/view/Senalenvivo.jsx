import React from 'react';
import '../css/HomeRedesign.css';
import './senalenvivo/css/Senalenvivo.css';

import LiveHero from './senalenvivo/components/LiveHero';
import LiveSupportSection from './senalenvivo/components/LiveSupportSection';
import { useHeroPointer } from './senalenvivo/hooks/useHeroPointer';
import { useScrollToTop } from './senalenvivo/hooks/useScrollToTop';
import { useTeveoPlayer } from './senalenvivo/hooks/useTeveoPlayer';

const Senalenvivo = () => {
  useScrollToTop();

  const player = useTeveoPlayer();

  const {
    heroSectionRef,
    handlePointerMove,
    handlePointerLeave,
  } = useHeroPointer();

  return (
    <div className="home-corporate">
      <LiveHero
        heroSectionRef={heroSectionRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        player={player}
      />

      <LiveSupportSection />
    </div>
  );
};

export default Senalenvivo;
