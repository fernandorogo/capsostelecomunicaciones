import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UseCasesSection = ({ cases }) => (
  <section className="oc-cases" id="casos-canal">
    <div className="container">
      <div className="oc-section-heading">
        <div>
          <span className="oc-section-label">Aplicaciones reales</span>
          <h2>Una señal diferente para cada tipo de organización.</h2>
        </div>
        <p>
          Ajustamos la narrativa, la parrilla y los formatos a la naturaleza de
          cada institución, marca, proyecto educativo o comunidad.
        </p>
      </div>

      <div className="oc-cases-grid">
        {cases.map((item) => (
          <article className="oc-case-card" key={item.title}>
            <div className="oc-case-media">
              <img
                src={item.image}
                alt={item.imageAlt}
                loading="lazy"
                decoding="async"
              />
              <div className="oc-case-overlay"></div>
            </div>

            <div className="oc-case-content">
              <span className="oc-case-tag">
                <FontAwesomeIcon icon={item.icon} />
                {item.tag}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
