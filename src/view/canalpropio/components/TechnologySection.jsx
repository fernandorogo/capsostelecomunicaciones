import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

import {
  canalWhatsAppMessages,
  createWhatsAppUrl,
} from '../utils/whatsapp';

const TechnologySection = ({ image, items }) => (
  <section className="oc-tech">
    <div className="container">
      <div className="oc-tech-shell">
        <div className="oc-tech-image">
          <img
            src={image}
            alt="Sala de control y producción para televisión digital"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="oc-tech-content">
          <span className="oc-eyebrow">Tecnología y acompañamiento</span>
          <h2>La creatividad necesita una operación confiable.</h2>
          <p>
            Te acompañamos para que la propuesta editorial también funcione en lo
            técnico: desde la estructura de programación hasta la distribución y
            continuidad de la señal.
          </p>

          <ul className="oc-tech-list">
            {items.map((item) => (
              <li key={item}>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="oc-tech-actions">
            <a
              href={createWhatsAppUrl(canalWhatsAppMessages.technical)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-corporate-primary"
            >
              <i className="fab fa-whatsapp me-2"></i>
              Solicitar asesoría
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TechnologySection;
