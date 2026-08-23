import React from 'react';

import InstitutionalFact from './InstitutionalFact';

const TermsSidebar = ({
  companyName,
  documentVersion,
  lastUpdated,
  facts,
  sections,
}) => (
  <aside className="pqrsf-sidebar">
    <div className="pqrsf-sidebar__panel">
      <div className="pqrsf-sidebar__intro">
        <span className="pqrsf-sidebar__eyebrow">
          Atención al usuario
        </span>

        <h1>
          Términos y condiciones del canal PQRSF
        </h1>

        <p>
          Este documento establece las condiciones institucionales para
          presentar peticiones, quejas, reclamos, sugerencias y
          felicitaciones relacionadas con los servicios de {companyName}.
        </p>
      </div>

      <div className="pqrsf-sidebar__facts">
        {facts.map((fact) => (
          <InstitutionalFact
            key={fact.title}
            {...fact}
          />
        ))}
      </div>

      <div className="pqrsf-sidebar__security">
        <i
          className="fas fa-shield-halved"
          aria-hidden="true"
        />

        <p>
          La aceptación de estas condiciones no representa una renuncia a
          los derechos del usuario ni constituye una autorización automática
          para recibir publicidad.
        </p>
      </div>

      <div className="pqrsf-sidebar__meta">
        <div>
          <span>Versión del documento</span>
          <strong>Versión {documentVersion}</strong>
        </div>

        <div>
          <span>Última actualización</span>
          <strong>{lastUpdated}</strong>
        </div>
      </div>
    </div>
  </aside>
);

export default TermsSidebar;
