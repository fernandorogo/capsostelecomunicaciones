import React from 'react';
import {
  CONTACT_LINKS,
  LIVE_SUPPORT_CARDS,
} from '../config/senalEnVivo.config';

const LiveSupportSection = () => (
  <section
    className="contact-corporate live-support-section"
    id="informacion-transmision"
  >
    <div className="container">
      <div className="section-header">
        <span className="section-label">Siempre conectados</span>
        <h2 className="section-title">
          Una señal creada para informar y conectar
        </h2>
        <p className="section-desc">
          Accede a contenidos, eventos y programación desde la web con una
          experiencia adaptable y sencilla.
        </p>
      </div>

      <div className="row g-4">
        {LIVE_SUPPORT_CARDS.map((card) => (
          <div className="col-md-4" key={card.title}>
            <div className="about-card-corporate live-support-card">
              <div className="about-content-corporate text-center">
                <div className="about-icon-corporate live-support-icon mx-auto">
                  <i className={card.icon} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <a
          href={CONTACT_LINKS.support}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-corporate-primary"
        >
          <i className="fab fa-whatsapp me-2" />
          Solicitar soporte
        </a>
      </div>
    </div>
  </section>
);

export default LiveSupportSection;
