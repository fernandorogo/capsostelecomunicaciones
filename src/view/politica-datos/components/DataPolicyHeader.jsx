import React from 'react';

const DataPolicyHeader = ({
  companyName,
  documentVersion,
  lastUpdated,
}) => (
  <header className="data-policy-header">
    <div className="data-policy-header__copy">
      <span className="data-policy-header__eyebrow">
        Documento institucional
      </span>

      <h2>
        Tratamiento y protección de información
      </h2>

      <p>
        Marco institucional para el tratamiento responsable y seguro de los
        datos personales gestionados por {companyName}.
      </p>
    </div>

    <div className="data-policy-header__badge">
      <span
        className="data-policy-header__badge-icon"
        aria-hidden="true"
      >
        <i className="fas fa-shield-halved" />
      </span>

      <div>
        <strong>Privacidad</strong>
        <small>
          v{documentVersion} · {lastUpdated}
        </small>
      </div>
    </div>
  </header>
);

export default DataPolicyHeader;
