import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faHeadset,
  faSignal,
  faTv,
} from '@fortawesome/free-solid-svg-icons';

import { createWhatsappUrl } from '../utils/whatsapp';

const TelevisionHero = ({
  slides,
  currentSlide,
  current,
  onSelectSlide,
  onPreviousSlide,
  onNextSlide,
}) => (
  <section className="tv-cinema-hero">
    <div className="tv-cinema-media" aria-hidden="true">
      <img
        key={current.image}
        src={current.image}
        alt=""
        style={{ objectPosition: current.imagePosition }}
      />
      <div className="tv-cinema-overlay"></div>
      <div className="tv-cinema-vignette"></div>
      <div className="tv-cinema-grid"></div>
    </div>

    <div className="container tv-cinema-content">
      <div key={currentSlide} className="tv-cinema-copy">
        <span className="tv-cinema-eyebrow">{current.eyebrow}</span>
        <h1 className="tv-cinema-title">{current.title}</h1>
        <p className="tv-cinema-description">{current.description}</p>

        <div className="tv-cinema-highlight-row">
          <div className="tv-cinema-highlight">
            <strong>{current.highlight}</strong>
            <span>{current.highlightLabel}</span>
          </div>

          <div className="tv-cinema-plan-summary">
            <small>Servicio integral</small>
            <strong>Televisión, soporte y acompañamiento</strong>
          </div>
        </div>

        <ul className="tv-cinema-features">
          {current.features.map((feature) => (
            <li key={feature}>
              <FontAwesomeIcon icon={faCheckCircle} />
              {feature}
            </li>
          ))}
        </ul>

        <div className="tv-cinema-actions">
          <a
            href={createWhatsappUrl(current.whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-corporate-primary"
          >
            <i className="fab fa-whatsapp me-2"></i>
            {current.ctaText}
          </a>

        </div>
      </div>
    </div>

    <div className="tv-cinema-rail" aria-label="Seleccionar experiencia de televisión">
      {slides.map((slide, index) => (
        <button
          key={slide.title}
          type="button"
          className={`tv-cinema-rail-button ${currentSlide === index ? 'active' : ''}`}
          onClick={() => onSelectSlide(index)}
          aria-label={`Mostrar ${slide.eyebrow}`}
          aria-current={currentSlide === index ? 'true' : undefined}
        >
          <span>{slide.eyebrow}</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </button>
      ))}
    </div>

    <div className="tv-cinema-bottom">
      <div className="container tv-cinema-bottom-inner">
        <div className="tv-cinema-trust">
          <span className="tv-cinema-trust-item">
            <FontAwesomeIcon icon={faTv} />
            Más de 108 canales
          </span>
          <span className="tv-cinema-trust-item">
            <FontAwesomeIcon icon={faSignal} />
            Señal digital
          </span>
          <span className="tv-cinema-trust-item">
            <FontAwesomeIcon icon={faHeadset} />
            Atención técnica
          </span>
        </div>

        <div className="tv-cinema-controls">
          <button
            type="button"
            className="tv-cinema-arrow"
            onClick={onPreviousSlide}
            aria-label="Ver experiencia anterior"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className="tv-cinema-progress" aria-hidden="true">
            <span key={currentSlide}></span>
          </div>

          <button
            type="button"
            className="tv-cinema-arrow"
            onClick={onNextSlide}
            aria-label="Ver siguiente experiencia"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default TelevisionHero;
