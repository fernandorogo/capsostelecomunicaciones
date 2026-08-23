import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const FormatsSection = ({ formats }) => (
  <section className="oc-formats">
    <div className="container oc-formats-layout">
      <div className="oc-formats-copy">
        <span className="oc-section-label">Contenido que conecta</span>
        <h2>Tu parrilla puede informar, enseñar, conversar y emocionar.</h2>
        <p>
          Diseñamos formatos que responden a objetivos concretos y hacen que cada
          contenido tenga una razón para existir dentro de la programación.
        </p>
      </div>

      <div className="oc-formats-list">
        {formats.map((item) => (
          <article className="oc-format-row" key={item.title}>
            <div className="oc-format-icon">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <FontAwesomeIcon icon={faArrowRight} className="oc-format-arrow" />
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default FormatsSection;
