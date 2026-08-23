import React from 'react';

const InstitutionalInfo = ({
  companyName,
  companyLegalName,
  companyNit,
  companyAddress,
  companyPhone,
  companyEmail,
  privacyEmail,
  companyWebsite,
  responsibleArea,
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
      label: 'Domicilio',
      value: companyAddress,
    },
    {
      label: 'Correo electrónico',
      value: companyEmail,
    },
    {
      label: 'Canal de privacidad',
      value: privacyEmail,
    },
    {
      label: 'Teléfono',
      value: companyPhone,
    },
    {
      label: 'Sitio web',
      value: companyWebsite,
    },
    {
      label: 'Área responsable',
      value: responsibleArea,
    },
  ].filter(Boolean);

  return (
    <section
      className="data-policy-info"
      aria-labelledby="data-policy-institutional-title"
    >
      <div className="data-policy-section-heading">
        <span
          className="data-policy-section-heading__icon"
          aria-hidden="true"
        >
          <i className="fas fa-building-shield" />
        </span>

        <div>
          <span className="data-policy-section-heading__eyebrow">
            Responsable del tratamiento
          </span>

          <h3 id="data-policy-institutional-title">
            Información institucional
          </h3>

          <p>
            Identificación y canales del responsable del tratamiento de
            datos personales.
          </p>
        </div>
      </div>

      <div className="data-policy-info-grid">
        {items.map((item) => (
          <div
            className="data-policy-info-grid__item"
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
