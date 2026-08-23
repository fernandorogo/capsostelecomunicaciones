import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCheckCircle,
  faHeadset,
  faShieldAlt,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';

import { createWhatsAppUrl } from '../utils/whatsapp';

const WHATSAPP_MESSAGE =
  'Hola, quiero solicitar el servicio de internet y verificar qué planes están disponibles para mi dirección.';

const ServiceRequirementsSection = ({ requirements = [] }) => (
  <section
    className="inet-requirements"
    id="requisitos-internet"
    aria-labelledby="inet-requirements-title"
  >
    <div className="container">
      <div className="inet-requirements-shell">
        <div className="inet-requirements-intro">
          <span className="inet-kicker">Requisitos del servicio</span>

          <h2 id="inet-requirements-title">
            Conectarte es más sencillo de lo que imaginas.
          </h2>

          <p className="inet-requirements-lead">
            Reúne la información básica, valida la cobertura y nuestro equipo te
            acompaña para identificar el plan disponible que mejor se ajuste a tu
            hogar, negocio u organización.
          </p>

          <div className="inet-requirements-highlight">
            <span className="inet-requirements-highlight-icon" aria-hidden="true">
              <FontAwesomeIcon icon={faWifi} />
            </span>

            <div>
              <span className="inet-requirements-highlight-label">
                Antes de contratar
              </span>
              <strong>Primero verificamos tu cobertura.</strong>
              <p>
                La velocidad y disponibilidad del plan dependen de la cobertura y
                de las condiciones técnicas encontradas en la dirección de
                instalación.
              </p>
            </div>
          </div>

          <div className="inet-requirements-trust">
            <FontAwesomeIcon icon={faShieldAlt} />
            <div>
              <strong>Proceso claro y acompañado</strong>
              <span>
                Te orientamos desde la consulta inicial hasta la programación de
                la instalación.
              </span>
            </div>
          </div>

          <div className="inet-requirements-actions">
            <a
              href={createWhatsAppUrl(WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-corporate-primary"
            >
              <FontAwesomeIcon icon={faHeadset} className="me-2" />
              Verificar cobertura
            </a>
          </div>
        </div>

        <div className="inet-requirements-panel">
          <div className="inet-requirements-panel-head">
            <div>
              <span>Antes de solicitar</span>
              <h3>Ten a mano estos datos</h3>
            </div>

            <span className="inet-requirements-total">
              {requirements.length} requisitos
            </span>
          </div>

          <div className="inet-requirements-list">
            {requirements.map((requirement) => (
              <article className="inet-requirement-item" key={requirement.id}>
                <span className="inet-requirement-step" aria-hidden="true">
                  {requirement.step}
                </span>

                <span className="inet-requirement-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={requirement.icon} />
                </span>

                <div className="inet-requirement-copy">
                  <div className="inet-requirement-title-row">
                    <h4>{requirement.title}</h4>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>

                  <p>{requirement.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="inet-requirements-footer-note">
            <FontAwesomeIcon icon={faCheckCircle} />
            <span>
              Nuestro equipo confirmará contigo la disponibilidad del plan y
              cualquier información adicional necesaria para completar la solicitud.
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ServiceRequirementsSection;
