import React from 'react';

const InstitutionalInfo = ({
  companyName,
  companyLegalName,
  companyNit,
  documentVersion,
  lastUpdated,
}) => {
  const items = [
    {
      label: 'Nombre institucional',
      value: companyName,
    },
    companyLegalName
      ? {
          label: 'Razón social',
          value: companyLegalName,
        }
      : null,
    companyNit
      ? {
          label: 'NIT',
          value: companyNit,
        }
      : null,
    {
      label: 'Canal',
      value:
        'Peticiones, quejas, reclamos, sugerencias y felicitaciones',
    },
    {
      label: 'Versión',
      value: documentVersion,
    },
    {
      label: 'Actualización',
      value: lastUpdated,
    },
  ].filter(Boolean);

  return (
    <section
      className="pqrsf-info-section"
      aria-labelledby="pqrsf-institutional-info-title"
    >
      <div className="pqrsf-section-heading">
        <span
          className="pqrsf-section-heading__icon"
          aria-hidden="true"
        >
          <i className="fas fa-building" />
        </span>

        <div>
          <span className="pqrsf-section-heading__eyebrow">
            Identificación
          </span>

          <h3 id="pqrsf-institutional-info-title">
            Información institucional
          </h3>

          <p>
            Identificación del responsable del canal de atención al usuario.
          </p>
        </div>
      </div>

      <div className="pqrsf-info-grid">
        {items.map((item) => (
          <div
            className="pqrsf-info-grid__item"
            key={item.label}
          >
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstitutionalInfo;
