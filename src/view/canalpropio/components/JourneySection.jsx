import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const JourneySection = ({ items }) => (
  <section className="oc-journey" id="ecosistema-canal">
    <div className="container">
      <div className="oc-section-heading light">
        <div>
          <span className="oc-section-label">Ecosistema completo</span>
          <h2>Construimos tu canal desde la estrategia hasta la señal.</h2>
        </div>
        <p>
          No entregamos piezas aisladas. Diseñamos un sistema de comunicación
          coherente que integra propósito, programación, producción y
          distribución.
        </p>
      </div>

      <div className="oc-journey-track">
        {items.map((item) => (
          <article className="oc-journey-card" key={item.number}>
            <span className="oc-journey-number">{item.number}</span>
            <div className="oc-journey-icon">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default JourneySection;
