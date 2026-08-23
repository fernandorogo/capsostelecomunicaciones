import React from 'react';
import { Link } from 'react-router-dom';

const RelatedDocuments = ({
  termsPath,
  contactPath,
}) => (
  <section
    className="data-policy-related"
    aria-labelledby="data-policy-related-title"
  >
    <header className="data-policy-related__header">
      <span className="data-policy-section-heading__eyebrow">
        Recursos complementarios
      </span>

      <h3 id="data-policy-related-title">
        Información relacionada
      </h3>

      <p>
        Documentos y canales institucionales que complementan esta política.
      </p>
    </header>

    <div className="data-policy-related__grid">
      <article className="data-policy-related-card">
        <span
          className="data-policy-related-card__icon"
          aria-hidden="true"
        >
          <i className="fas fa-file-contract" />
        </span>

        <div>
          <h4>
            Términos y condiciones del canal PQRSF
          </h4>

          <p>
            Consulta las condiciones aplicables al registro y gestión de
            peticiones, quejas, reclamos, solicitudes y felicitaciones.
          </p>

          <Link to={termsPath}>
            Consultar términos y condiciones
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </article>

      <article className="data-policy-related-card">
        <span
          className="data-policy-related-card__icon"
          aria-hidden="true"
        >
          <i className="fas fa-headset" />
        </span>

        <div>
          <h4>Canales institucionales de atención</h4>

          <p>
            Consulta los medios disponibles para presentar solicitudes o
            recibir orientación.
          </p>

          <Link to={contactPath}>
            Ver canales de atención
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </div>
  </section>
);

export default RelatedDocuments;
