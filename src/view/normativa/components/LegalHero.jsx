import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faGlobe,
  faShieldAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import { SLIDE_DURATION } from '../data';

const LegalHero = ({
  slides,
  currentSlide,
  current,
  isPaused,
  onPauseChange,
  onPrevious,
  onNext,
  onSelect,
}) => (
  <section
    className={`normativa-hero ${isPaused ? 'is-paused' : ''}`}
    aria-roledescription="carousel"
    aria-label="Temas legales y regulatorios"
    style={{ '--normativa-slide-duration': `${SLIDE_DURATION}ms` }}
    onMouseEnter={() => onPauseChange(true)}
    onMouseLeave={() => onPauseChange(false)}
    onFocusCapture={() => onPauseChange(true)}
    onBlurCapture={() => onPauseChange(false)}
  >
    <div
      className="normativa-hero__media"
      key={current.image}
      aria-hidden="true"
    >
      <img
        src={current.image}
        alt=""
        style={{ objectPosition: current.imagePosition }}
      />
      <div className="normativa-hero__overlay" />
      <div className="normativa-hero__vignette" />
    </div>

    <div className="normativa-hero__grid" aria-hidden="true" />
    <div className="normativa-hero__glow" aria-hidden="true" />

    <div className="container normativa-hero__content">
      <div
        className="normativa-hero__copy"
        key={`${current.eyebrow}-${currentSlide}`}
      >
        <div className="normativa-hero__topline">
          <span className="normativa-hero__category">
            {current.eyebrow}
          </span>

          <span className="normativa-hero__counter">
            {String(currentSlide + 1).padStart(2, '0')} /{' '}
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        <h1 className="normativa-hero__title">
          {current.title}
          <span>{current.highlight}</span>
        </h1>

        <p className="normativa-hero__description">
          {current.description}
        </p>

        <div className="normativa-hero__metric-card">
          <span className="normativa-hero__metric-icon" aria-hidden="true">
            <FontAwesomeIcon icon={current.icon} />
          </span>

          <div className="normativa-hero__metric">
            <strong>{current.metric}</strong>
            <span>{current.metricLabel}</span>
          </div>
        </div>

        <ul className="normativa-hero__features">
          {current.features.map((feature) => (
            <li key={feature}>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="normativa-hero__actions">
          <a
            className="normativa-hero__primary"
            href="#biblioteca-normativa"
          >
            Consultar normativas
            <FontAwesomeIcon icon={faArrowRight} />
          </a>

        </div>
      </div>
    </div>

    <div className="normativa-hero__rail" aria-label="Seleccionar tema">
      {slides.map((slide, index) => (
        <button
          className={`normativa-hero__rail-button ${
            index === currentSlide ? 'is-active' : ''
          }`}
          type="button"
          key={slide.eyebrow}
          onClick={() => onSelect(index)}
          aria-label={`Mostrar ${slide.eyebrow}`}
          aria-current={index === currentSlide ? 'true' : undefined}
        >
          <span className="normativa-hero__rail-label">
            {slide.eyebrow}
          </span>

          <span className="normativa-hero__rail-number">
            {String(index + 1).padStart(2, '0')}
          </span>
        </button>
      ))}
    </div>

    <div className="normativa-hero__bottom">
      <div className="container normativa-hero__bottom-inner">
        <div className="normativa-hero__trust">
          <span className="normativa-hero__trust-item">
            <FontAwesomeIcon icon={faShieldAlt} />
            Protección de datos
          </span>

          <span className="normativa-hero__trust-item">
            <FontAwesomeIcon icon={faUsers} />
            Derechos del usuario
          </span>

          <span className="normativa-hero__trust-item">
            <FontAwesomeIcon icon={faGlobe} />
            Fuentes oficiales
          </span>
        </div>

        <div className="normativa-hero__controls">
          <button
            className="normativa-hero__arrow"
            type="button"
            onClick={onPrevious}
            aria-label="Mostrar tema anterior"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className="normativa-hero__progress" aria-hidden="true">
            <span key={currentSlide} />
          </div>

          <button
            className="normativa-hero__arrow"
            type="button"
            onClick={onNext}
            aria-label="Mostrar tema siguiente"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default LegalHero;
