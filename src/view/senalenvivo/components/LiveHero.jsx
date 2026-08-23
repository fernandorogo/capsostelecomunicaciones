import React from 'react';
import LiveInfoPanel from './LiveInfoPanel';
import LivePlayer from './LivePlayer';
import LiveTechBackground from './LiveTechBackground';

const LiveHero = ({
  heroSectionRef,
  onPointerMove,
  onPointerLeave,
  player,
}) => (
  <section
    ref={heroSectionRef}
    className="services-corporate live-hero-section"
    onPointerMove={onPointerMove}
    onPointerLeave={onPointerLeave}
  >
    <LiveTechBackground />

    <div className="container live-hero-content">
      <div className="live-page-heading">
        <div className="live-title-line">
          <h1 className="section-title">Señal en vivo de CAPSOS</h1>
        </div>
      </div>

      <div className="row align-items-stretch g-4">
        <div className="col-lg-8">
          <LivePlayer
            containerRef={player.containerRef}
            status={player.status}
            message={player.message}
          />
        </div>

        <div className="col-lg-4">
          <LiveInfoPanel />
        </div>
      </div>
    </div>
  </section>
);

export default LiveHero;
