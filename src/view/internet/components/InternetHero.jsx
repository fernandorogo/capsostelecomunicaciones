import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faHeadset,
  faNetworkWired,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';

import { iconMap } from '../data/internetData';
import { createWhatsAppUrl } from '../utils/whatsapp';

const InternetHero = ({
  slides,
  currentSlide,
  setCurrentSlide,
  current,
  speedValue,
  speedUnit,
  goToPreviousSlide,
  goToNextSlide,
}) => (
  <section className="internet-cinematic-hero">
    <div
      key={current.image}
      className="internet-cinematic-media"
      aria-hidden="true"
    >
      <img
        src={current.image}
        alt=""
        style={{ objectPosition: current.imagePosition }}
      />
      <div className="internet-cinematic-overlay"></div>
      <div className="internet-cinematic-vignette"></div>
    </div>

    <div className="internet-cinematic-grid" aria-hidden="true"></div>
    <div className="internet-cinematic-glow" aria-hidden="true"></div>

    <div className="container internet-cinematic-content">
      <div className="row w-100">
        <div className="col-xl-7 col-lg-8">
          <div
            key={`${currentSlide}-${current.title}`}
            className={`internet-cinematic-copy ${
              currentSlide === 0 ? 'internet-cinematic-copy-intro' : ''
            }`}
          >
            <div className="internet-cinematic-topline">
              <span className="internet-cinematic-category">
                {current.segment}
              </span>

              <span className="internet-cinematic-plan-name">
                {current.title}
              </span>
            </div>

            <h1 className="internet-cinematic-title">
              <span>{current.headline}</span>
            </h1>

            <p className="internet-cinematic-description">
              {current.description}
            </p>

            {currentSlide !== 0 && (
              <div className="internet-cinematic-offer">
                <div className="internet-cinematic-speed">
                  <strong>{speedValue}</strong>
                  <span>{speedUnit}</span>
                </div>

                <div className="internet-cinematic-price">
                  <small>Valor mensual</small>
                  <strong>{current.price}</strong>
                </div>
              </div>
            )}

            <ul className="internet-cinematic-features">
              {current.features.map((feature) => (
                <li key={feature}>
                  <FontAwesomeIcon
                    icon={iconMap[feature] || faCheckCircle}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="internet-cinematic-actions">
              <a
                href={createWhatsAppUrl(
                  'Hola, quiero información sobre los planes de internet.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-corporate-primary"
              >
                <i className="fab fa-whatsapp me-2"></i>
                Consultar cobertura
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="internet-cinematic-rail" aria-label="Planes disponibles">
      {slides.map((slide, index) => (
        <button
          key={slide.title}
          type="button"
          className={`internet-cinematic-rail-button ${
            currentSlide === index ? 'active' : ''
          }`}
          onClick={() => setCurrentSlide(index)}
          aria-label={`Mostrar ${slide.title}`}
          aria-current={currentSlide === index ? 'true' : undefined}
        >
          <span>{slide.segment}</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </button>
      ))}
    </div>

    <div className="internet-cinematic-bottom">
      <div className="container">
        <div className="internet-cinematic-bottom-inner">
          <div className="internet-cinematic-trust">
            <span className="internet-cinematic-trust-item">
              <FontAwesomeIcon icon={faNetworkWired} />
              Fibra óptica
            </span>

            <span className="internet-cinematic-trust-item">
              <FontAwesomeIcon icon={faHeadset} />
              Soporte especializado
            </span>

            <span className="internet-cinematic-trust-item">
              <FontAwesomeIcon icon={faShieldAlt} />
              Conexión confiable
            </span>
          </div>

          <div className="internet-cinematic-controls">
            <button
              type="button"
              className="internet-cinematic-arrow"
              onClick={goToPreviousSlide}
              aria-label="Ver plan anterior"
            >
              <i className="fas fa-arrow-left"></i>
            </button>

            <div className="internet-cinematic-mobile-dots">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className={`internet-cinematic-mobile-dot ${
                    currentSlide === index ? 'active' : ''
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Mostrar ${slide.title}`}
                ></button>
              ))}
            </div>

            <div className="internet-cinematic-progress" aria-hidden="true">
              <span key={currentSlide}></span>
            </div>

            <button
              type="button"
              className="internet-cinematic-arrow"
              onClick={goToNextSlide}
              aria-label="Ver siguiente plan"
            >
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InternetHero;
