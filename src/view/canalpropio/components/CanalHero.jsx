import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

import {
  canalWhatsAppMessages,
  createWhatsAppUrl,
} from '../utils/whatsapp';

const CanalHero = ({
  slides,
  highlights,
  currentSlide,
  current,
  currentIndex,
  totalSlides,
  onSelectSlide,
  onPreviousSlide,
  onNextSlide,
}) => (
  <section className="oc-hero">
    <div className="oc-hero-media" aria-hidden="true">
      <img
        key={current.image}
        src={current.image}
        alt=""
        className="oc-hero-image"
        style={{ objectPosition: current.imagePosition }}
      />
      <div className="oc-hero-overlay"></div>
      <div className="oc-hero-vignette"></div>
      <div className="oc-hero-grid"></div>
    </div>

    <div className="container oc-hero-content">
      <div key={currentSlide} className="oc-hero-copy">
        <span className="oc-eyebrow">{current.eyebrow}</span>
        <h1 className="oc-hero-title">{current.title}</h1>
        <p className="oc-hero-description">{current.description}</p>

        <div className="oc-hero-feature-line">
          <div className="oc-hero-feature-icon">
            <FontAwesomeIcon icon={current.icon} />
          </div>
          <div>
            <strong>{current.feature}</strong>
            <span>{current.supporting}</span>
          </div>
        </div>

        <div className="oc-hero-actions">
          <a
            href={createWhatsAppUrl(canalWhatsAppMessages.create)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-corporate-primary"
          >
            <i className="fab fa-whatsapp me-2"></i>
            Quiero crear mi canal
          </a>
        </div>
      </div>
    </div>

    <div className="oc-hero-rail" aria-label="Navegación del contenido principal">
      {slides.map((slide, index) => (
        <button
          key={slide.title}
          type="button"
          className={`oc-rail-button ${currentSlide === index ? 'active' : ''}`}
          onClick={() => onSelectSlide(index)}
          aria-current={currentSlide === index ? 'true' : undefined}
        >
          <span className="oc-rail-number">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="oc-rail-copy">
            <strong>{slide.feature}</strong>
            <span>{slide.supporting}</span>
          </span>
        </button>
      ))}
    </div>

    <div className="oc-hero-bottom">
      <div className="container oc-hero-bottom-inner">
        <div className="oc-hero-highlights">
          {highlights.map((item) => (
            <div className="oc-hero-highlight" key={item.label}>
              <div className="oc-highlight-icon">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <div>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="oc-hero-controls">
          <button
            type="button"
            className="oc-control-button"
            onClick={onPreviousSlide}
            aria-label="Mostrar contenido anterior"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <div className="oc-progress-wrap">
            <div className="oc-progress-track">
              <span key={currentSlide} className="oc-progress-value"></span>
            </div>
            <small>
              {currentIndex} / {totalSlides}
            </small>
          </div>

          <button
            type="button"
            className="oc-control-button"
            onClick={onNextSlide}
            aria-label="Mostrar contenido siguiente"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default CanalHero;
