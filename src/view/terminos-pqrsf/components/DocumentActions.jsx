import React from 'react';

const DocumentActions = ({
  onPrint,
  onClose,
}) => (
  <footer className="pqrsf-document-actions">
    <div>
      <span className="pqrsf-document-actions__label">
        Documento institucional PQRSF
      </span>

      <p>
        Puedes imprimir una copia o cerrar esta pestaña al finalizar la
        consulta.
      </p>
    </div>

    <div className="pqrsf-document-actions__buttons">
      <button
        type="button"
        className="pqrsf-action-button pqrsf-action-button--secondary"
        onClick={onPrint}
      >
        <i
          className="fas fa-print"
          aria-hidden="true"
        />

        <span>Imprimir</span>
      </button>

      <button
        type="button"
        className="pqrsf-action-button pqrsf-action-button--primary"
        onClick={onClose}
        aria-label="Cerrar esta pestaña"
      >
        <span>Cerrar pestaña</span>

        <i
          className="fas fa-xmark"
          aria-hidden="true"
        />
      </button>
    </div>
  </footer>
);

export default DocumentActions;
