import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { createWhatsAppUrl } from '../utils/whatsapp';

const ProcessSection = ({ steps }) => (
  <section className="inet-process">
    <div className="container">
      <div className="inet-process-shell">
        <div className="inet-process-copy">
          <span className="inet-kicker">Contratación sencilla</span>
          <h2>De la consulta a la conexión, sin complicaciones.</h2>
          <p>
            Te acompañamos para identificar el plan adecuado, validar las
            condiciones técnicas y coordinar la instalación de manera clara.
          </p>

          <div className="inet-process-actions">
            <a
              href={createWhatsAppUrl(
                'Hola, quiero validar la cobertura del servicio de internet.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-corporate-primary"
            >
              <i className="fab fa-whatsapp me-2"></i>
              Validar cobertura
            </a>
          </div>
        </div>

        <div className="inet-process-steps">
          {steps.map((step, index) => (
            <div className="inet-process-step" key={step.title}>
              <span className="inet-process-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProcessSection;
