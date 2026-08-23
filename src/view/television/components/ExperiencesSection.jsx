import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilm,
  faFutbol,
  faHome,
  faSatelliteDish,
} from '@fortawesome/free-solid-svg-icons';

import SectionHeading from './SectionHeading';

const getExperienceIcon = (index) => {
  if (index === 1) return faFutbol;
  if (index === 2) return faFilm;
  if (index === 3) return faSatelliteDish;
  return faHome;
};

const ExperiencesSection = ({ slides }) => (
  <section className="tv-section tv-experiences">
    <div className="container">
      <SectionHeading
        label="Una experiencia para cada momento"
        title="No es solo televisión. Es lo que sucede alrededor de ella."
        description="Una noche de cine, un partido inolvidable, tiempo en familia o una mejor experiencia para tus clientes. Elige cómo quieres disfrutarla."
      />

      <div className="tv-experience-grid">
        {slides.map((slide, index) => (
          <article className="tv-experience-card" key={slide.title}>
            <img
              src={slide.image}
              alt={slide.imageAlt}
              loading={index === 0 ? 'eager' : 'lazy'}
              style={{ objectPosition: slide.imagePosition }}
            />

            <div className="tv-experience-content">
              <span className="tv-experience-badge">
                <FontAwesomeIcon icon={getExperienceIcon(index)} />
                {slide.eyebrow}
              </span>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ExperiencesSection;
