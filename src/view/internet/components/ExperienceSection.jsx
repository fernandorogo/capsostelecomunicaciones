import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ExperienceSection = ({ benefits }) => (
  <section className="inet-experience">
    <div className="container inet-experience-layout">
      <div className="inet-experience-copy">
        <span className="inet-kicker">Más que velocidad</span>
        <h2>Una conexión confiable cambia toda la experiencia.</h2>
        <p>
          Diseñamos el servicio pensando en lo que sucede después de la
          instalación: estabilidad, respuesta técnica y una red preparada
          para tus actividades cotidianas o empresariales.
        </p>

        <div className="inet-experience-stats">
          <div className="inet-experience-stat">
            <strong>24/7</strong>
            <span>Canales de soporte</span>
          </div>
          <div className="inet-experience-stat">
            <strong>4K</strong>
            <span>Streaming fluido</span>
          </div>
          <div className="inet-experience-stat">
            <strong>Cloud</strong>
            <span>Trabajo en línea</span>
          </div>
        </div>
      </div>

      <div className="inet-benefit-list">
        {benefits.map((item, index) => (
          <article className="inet-benefit-item" key={item.title}>
            <span className="inet-benefit-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="inet-benefit-icon">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
