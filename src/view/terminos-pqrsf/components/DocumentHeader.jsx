import React from 'react';

const DocumentHeader = ({
  companyName,
  documentVersion,
  lastUpdated,
}) => (
  <header className="pqrsf-document-header">
    <div className="pqrsf-document-header__main">
      <span className="pqrsf-document-header__eyebrow">
        Documento institucional
      </span>

      <h2>Condiciones de uso del canal</h2>

      <p>
        Reglas de uso, gestión, protección de información y atención
        aplicables al canal PQRSF de {companyName}.
      </p>
    </div>

    <div className="pqrsf-document-header__badge">
      <span className="pqrsf-document-header__badge-icon">
        <i
          className="fas fa-file-contract"
          aria-hidden="true"
        />
      </span>

      <div>
        <strong>PQRSF</strong>
        <small>
          v{documentVersion} · {lastUpdated}
        </small>
      </div>
    </div>
  </header>
);

export default DocumentHeader;
