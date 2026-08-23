import React from 'react';
import { Link } from 'react-router-dom';

const RelatedDocuments = ({
  privacyPolicyPath,
  contactPath,
}) => (
  <section
    className="pqrsf-related"
    aria-labelledby="related-documents-title"
  >
    <header className="pqrsf-related__header">
      <span className="pqrsf-section-heading__eyebrow">
        Recursos complementarios
      </span>

      <h3 id="related-documents-title">
        Información relacionada
      </h3>

      <p>
        Documentos y canales que complementan la información de este
        documento institucional.
      </p>
    </header>

    <div className="pqrsf-related__grid">
      <article className="pqrsf-related-card">
        <span
          className="pqrsf-related-card__icon"
          aria-hidden="true"
        >
          <i className="fas fa-user-shield" />
        </span>

        <div>
          <h4>Política de tratamiento de datos</h4>

          <p>
            Consulta las finalidades, derechos, procedimientos y
            condiciones aplicables al tratamiento de datos personales.
          </p>

          <Link
            to={privacyPolicyPath}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar política
            <i
              className="fas fa-arrow-right"
              aria-hidden="true"
            />
          </Link>
        </div>
      </article>

      <article className="pqrsf-related-card">
        <span
          className="pqrsf-related-card__icon"
          aria-hidden="true"
        >
          <i className="fas fa-headset" />
        </span>

        <div>
          <h4>Canales institucionales de atención</h4>

          <p>
            Consulta los medios disponibles para recibir orientación o
            presentar una solicitud.
          </p>

          <Link
            to={contactPath}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver canales de atención
            <i
              className="fas fa-arrow-right"
              aria-hidden="true"
            />
          </Link>
        </div>
      </article>
    </div>
  </section>
);

export default RelatedDocuments;
