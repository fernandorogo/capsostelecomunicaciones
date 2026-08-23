import React from 'react';
import Slider from './Slider';
import { sliderImages } from './homeData';

/* =========================================================
   INFORMACIÓN DESTACADA
========================================================= */

const serviceStats = [
  {
    id: 'experiencia',
    icon: 'fas fa-handshake',
    value: 'Conectando',
    title: ' hogares y empresas',
    
  },
  {
    id: 'disponibilidad',
    icon: 'fas fa-signal',
    value: '99,9%',
    title: 'Disponibilidad del servicio',
    
  },
  {
    id: 'canales',
    icon: 'fas fa-tv',
    value: '108',
    title: 'Canales en alta definición',
 
  },
  {
    id: 'soporte',
    icon: 'fas fa-headset',
    value: 'Atención',
    title: 'Soporte técnico de calidad',
   
  },
];

const HeroSliderSection = () => {
  return (
    <section
      className="hero-slider-section"
      id="inicio"
      aria-label="Servicios destacados de CAPSOS Telecomunicaciones"
    >
      <Slider slides={sliderImages} />

      <div
        className="hero-stats-bar"
        aria-label="Información destacada de nuestros servicios"
      >
        <div className="container">
          <div className="stats-grid">
            {serviceStats.map((stat) => (
              <article
                className="stat-box"
                key={stat.id}
              >
                <div className="stat-icon">
                  <i
                    className={stat.icon}
                    aria-hidden="true"
                  />
                </div>

                <div className="stat-content">
                  <span className="stat-number">
                    {stat.value}
                  </span>

                  <span className="stat-text">
                    {stat.title}
                  </span>

                  <p className="stat-description">
                    {stat.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSliderSection;