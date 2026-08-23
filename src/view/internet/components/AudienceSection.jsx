import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const AudienceSection = ({ segments }) => (
  <section className="inet-audiences" id="segmentos-internet">
    <div className="container">
      <div className="inet-heading-grid">
        <div>
          <span className="inet-kicker">Soluciones por perfil</span>
          <h2>
            La conexión correcta depende de
            <span> cómo la vas a usar.</span>
          </h2>
        </div>

        <p>
          No recomendamos únicamente por cantidad de megas. Analizamos
          dispositivos, actividades, usuarios y nivel de continuidad para
          encontrar la alternativa más conveniente.
        </p>
      </div>

      <div className="inet-audience-grid">
        {segments.map((segment) => (
          <article className="inet-audience-card" key={segment.title}>
            <img
              src={segment.image}
              alt={segment.imageAlt}
              loading="lazy"
              decoding="async"
            />
            <div className="inet-audience-content">
              <div className="inet-audience-icon">
                <FontAwesomeIcon icon={segment.icon} />
              </div>
              <h3>{segment.title}</h3>
              <p>{segment.description}</p>
              <ul className="inet-audience-list">
                {segment.features.map((feature) => (
                  <li key={feature}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default AudienceSection;
