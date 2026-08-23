import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCircleCheck,
  faHeadset,
  faShieldHalved,
  faTv,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';

import SectionHeading from './SectionHeading';
import { createWhatsappUrl } from '../utils/whatsapp';

const MONTHLY_PRICE = 35000;

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

const WHATSAPP_MESSAGE =
  'Hola, quiero solicitar información sobre el servicio de televisión de $35.000 mensuales y verificar cobertura para mi dirección.';

const ServiceRequirementsSection = ({ requirements = [] }) => {
  return (
    <section
      className="tv-section tv-requirements-section"
      id="requisitos-television"
      aria-labelledby="tv-requirements-title"
    >
      <div className="container">
        <div className="tv-requirements-shell">
          {/* =====================================================
              COLUMNA IZQUIERDA
          ===================================================== */}
          <div className="tv-requirements-intro">
            <div className="tv-requirements-heading-wrap">
              <SectionHeading
                label="Requisitos del servicio"
                title="Solicitar televisión es más sencillo de lo que imaginas."
                description="Reúne la información básica, verifica la cobertura y nuestro equipo te acompaña durante el proceso de solicitud e instalación."
              />
            </div>

            {/* =====================================================
                PRECIO DEL SERVICIO
            ===================================================== */}
            <div className="tv-requirements-price-card" aria-label="Valor mensual del servicio de televisión">
              
              <div className="tv-requirements-price-main">
                <span className="tv-requirements-price-from">
                  Disfrútalo por
                </span>

                <div className="tv-requirements-price-value">
                  <strong>
                    {formatCurrency(MONTHLY_PRICE)}
                  </strong>

                  <span>/ mes</span>
                </div>

                <p>
                  Entretenimiento para disfrutar en casa con una
                  tarifa mensual clara y accesible.
                </p>
              </div>

              

              
            </div>

            {/* =====================================================
                INFORMACIÓN DE COBERTURA
            ===================================================== */}
            <div
              className="tv-requirements-highlight"
              aria-label="Información importante"
            >
              <span className="tv-requirements-highlight-icon">
                <FontAwesomeIcon icon={faShieldHalved} />
              </span>

              <div>
                <strong>Proceso claro y acompañado</strong>

                <p>
                  La disponibilidad final del servicio depende de
                  la cobertura y de la validación técnica realizada
                  para la dirección de instalación.
                </p>
              </div>
            </div>

            {/* =====================================================
                ACCIONES
            ===================================================== */}
            <div className="tv-requirements-actions">
              <a
                className="tv-requirements-primary"
                href={createWhatsappUrl(WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faHeadset} />

                <span>Solicitar servicio</span>

                <FontAwesomeIcon icon={faArrowRight} />
              </a>

            </div>
          </div>

          {/* =====================================================
              COLUMNA DERECHA - REQUISITOS
          ===================================================== */}
          <div className="tv-requirements-panel">
            <div className="tv-requirements-panel-head">
              <div>
                <span>Antes de solicitar</span>

                <h3 id="tv-requirements-title">
                  Ten a mano estos datos
                </h3>
              </div>

              <span className="tv-requirements-total">
                {requirements.length} requisitos
              </span>
            </div>

            <div className="tv-requirements-list">
              {requirements.map((requirement) => (
                <article
                  className="tv-requirement-item"
                  key={requirement.id}
                >
                  <span
                    className="tv-requirement-step"
                    aria-hidden="true"
                  >
                    {requirement.step}
                  </span>

                  <span
                    className="tv-requirement-icon"
                    aria-hidden="true"
                  >
                    <FontAwesomeIcon icon={requirement.icon} />
                  </span>

                  <div className="tv-requirement-copy">
                    <div className="tv-requirement-title-row">
                      <h4>{requirement.title}</h4>

                      <FontAwesomeIcon icon={faCircleCheck} />
                    </div>

                    <p>{requirement.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="tv-requirements-footer-note">
              <FontAwesomeIcon icon={faCircleCheck} />

              <span>
                Nuestro equipo confirmará contigo cualquier
                información adicional que sea necesaria para
                completar la solicitud.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceRequirementsSection;