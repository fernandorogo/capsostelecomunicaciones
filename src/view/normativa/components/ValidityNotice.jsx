import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ValidityNotice = ({ items }) => (
  <section
    className="normativa-notice-section"
    id="informacion-vigencia"
    aria-labelledby="vigencia-title"
  >
    <div className="normativa-notice-decoration" aria-hidden="true" />

    <div className="container normativa-notice-layout">
      <div className="normativa-notice-copy">
        <span className="normativa-kicker">
          Información importante
        </span>

        <h2 id="vigencia-title">
          Consulta la vigencia antes de tomar decisiones.
        </h2>

        <p>
          La biblioteca facilita el acceso a normas relevantes, pero
          algunas disposiciones pueden haber sido modificadas, compiladas,
          sustituidas o derogadas. Revisa siempre las notas de vigencia del
          repositorio oficial.
        </p>
      </div>

      <div className="normativa-notice-list">
        {items.map((item) => (
          <article className="normativa-notice-item" key={item.title}>
            <span className="normativa-notice-icon" aria-hidden="true">
              <FontAwesomeIcon icon={item.icon} />
            </span>

            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ValidityNotice;
