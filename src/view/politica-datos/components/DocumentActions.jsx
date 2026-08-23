import React from 'react';

const DocumentActions = ({
  onPrint,
  onClose,
}) => (
  <footer className="data-policy-actions">
    <div>
      <span className="data-policy-actions__label">
        Política de tratamiento de datos
      </span>

      <p>
        Puedes imprimir una copia o cerrar esta pestaña al finalizar la
        consulta.
      </p>
    </div>

    <div className="data-policy-actions__buttons">
      <button
        type="button"
        className="data-policy-action-button data-policy-action-button--secondary"
        onClick={onPrint}
      >
        <i className="fas fa-print" aria-hidden="true" />
        <span>Imprimir</span>
      </button>

      <button
        type="button"
        className="data-policy-action-button data-policy-action-button--primary"
        onClick={onClose}
      >
        <span>Cerrar pestaña</span>
        <i className="fas fa-xmark" aria-hidden="true" />
      </button>
    </div>
  </footer>
);

export default DocumentActions;
