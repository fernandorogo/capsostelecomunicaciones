import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

import { iconMap } from '../data/internetData';
import { createWhatsAppUrl } from '../utils/whatsapp';

const PlansSection = ({ plans }) => (
  <section className="inet-plans">
    <div className="container">
      <div className="inet-heading-grid">
        <div>
          <span className="inet-kicker">Planes disponibles</span>
          <h2>
            Elige una velocidad que pueda
            <span> crecer contigo.</span>
          </h2>
        </div>

        <p>
          Compara nuestros tres planes de 300, 500 y 600 Mbps. Cada
          alternativa incluye características pensadas para su nivel de uso,
          cantidad de dispositivos y tipo de operación.
        </p>
      </div>

      <div className="inet-plan-grid">
        {plans.map((slide) => (
          <article
            className={`inet-plan-card ${slide.isFeatured ? 'featured' : ''}`}
            key={slide.title}
          >
            <div className="inet-plan-media">
              <img
                src={slide.image}
                alt={slide.imageAlt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: slide.imagePosition }}
              />

              {slide.badge && (
                <span className="inet-plan-badge">{slide.badge}</span>
              )}

              <span className="inet-plan-speed">{slide.speed}</span>
            </div>

            <div className="inet-plan-body">
              <span className="inet-plan-segment">{slide.segment}</span>
              <h3>{slide.planTitle || slide.title}</h3>
              <p>{slide.description}</p>

              <div className="inet-plan-price">
                <small>Valor mensual</small>
                <strong>{slide.price}</strong>
              </div>

              <ul className="inet-plan-features">
                {slide.features.map((feature) => (
                  <li key={feature}>
                    <FontAwesomeIcon
                      icon={iconMap[feature] || faCheckCircle}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={createWhatsAppUrl(
                  `Hola, quiero información sobre ${slide.planTitle || slide.title}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inet-plan-cta"
              >
                Consultar este plan
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default PlansSection;
