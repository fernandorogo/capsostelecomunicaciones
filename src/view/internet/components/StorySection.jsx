import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faServer,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';

const getStoryIcon = (index) => {
  if (index < 2) return faWifi;
  if (index === 2) return faBuilding;
  return faServer;
};

const StorySection = ({ slides, metrics }) => (
  <section className="inet-story" id="planes-internet">
    <div className="container">
      <div className="inet-heading-grid">
        <div>
          <span className="inet-kicker">Conectividad para cada realidad</span>
          <h2>
            Internet diseñado para acompañar tu forma de
            <span> vivir, trabajar y crecer.</span>
          </h2>
        </div>

        <p>
          Desde una noche de entretenimiento en casa hasta una operación
          empresarial crítica, cada escenario necesita una conexión distinta.
          Por eso combinamos velocidad, estabilidad y acompañamiento técnico.
        </p>
      </div>

      <div className="inet-story-mosaic">
        {slides.map((slide, index) => (
          <article className="inet-story-card" key={slide.title}>
            <img
              src={slide.image}
              alt={slide.imageAlt}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: slide.imagePosition }}
            />
            <div className="inet-story-overlay"></div>

            <div className="inet-story-content">
              <span className="inet-story-pill">
                <FontAwesomeIcon icon={getStoryIcon(index)} />
                {slide.speed}
              </span>
              <h3>{slide.segment}</h3>
              <p>{slide.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="inet-story-metrics">
        {metrics.map((metric) => (
          <div className="inet-story-metric" key={metric.value}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StorySection;
