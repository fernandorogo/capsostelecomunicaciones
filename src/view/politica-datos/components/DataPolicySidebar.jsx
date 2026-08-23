import React from 'react';

import InstitutionalFact from './InstitutionalFact';

const DataPolicySidebar = ({
  companyName,
  documentVersion,
  effectiveDate,
  lastUpdated,
  facts,
  sections,
  activeSection,
  onSelectSection,
}) => (
  <aside className="data-policy-sidebar">
    <div className="data-policy-sidebar__panel">
      <div className="data-policy-sidebar__intro">
        <span className="data-policy-sidebar__eyebrow">
          Privacidad y protección
        </span>

        <h1>
          Política de tratamiento de datos personales
        </h1>

        <p>
          Este documento establece las condiciones institucionales
          aplicables a la recolección, almacenamiento, uso, circulación,
          actualización y supresión de datos personales por parte de{' '}
          {companyName}.
        </p>
      </div>

      <div className="data-policy-sidebar__facts">
        {facts.map((fact) => (
          <InstitutionalFact
            key={fact.title}
            {...fact}
          />
        ))}
      </div>

      <div className="data-policy-sidebar__security">
        <i
          className="fas fa-shield-halved"
          aria-hidden="true"
        />

        <p>
          El titular podrá ejercer sus derechos de acceso, conocimiento,
          actualización, rectificación, supresión y revocatoria cuando
          legalmente corresponda.
        </p>
      </div>

      <div className="data-policy-sidebar__meta">
        <div>
          <span>Versión</span>
          <strong>{documentVersion}</strong>
        </div>

        <div>
          <span>Entrada en vigencia</span>
          <strong>{effectiveDate}</strong>
        </div>

        <div>
          <span>Última actualización</span>
          <strong>{lastUpdated}</strong>
        </div>
      </div>

      
    </div>
  </aside>
);

export default DataPolicySidebar;
