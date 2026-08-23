import React from 'react';

const PolicySection = ({
  id,
  number,
  icon,
  title,
  children,
}) => (
  <section
    className="data-policy-section"
    id={id}
    aria-labelledby={`${id}-title`}
  >
    <header className="data-policy-section__header">
      <div className="data-policy-section__identity">
        <span className="data-policy-section__number">
          {number}
        </span>

        <span
          className="data-policy-section__icon"
          aria-hidden="true"
        >
          <i className={`fas ${icon}`} />
        </span>

        <h3 id={`${id}-title`}>
          {title}
        </h3>
      </div>

      <a
        href="#politica-tratamiento-datos"
        className="data-policy-section__top"
        aria-label="Volver al inicio del documento"
        title="Volver al inicio"
      >
        <i className="fas fa-arrow-up" aria-hidden="true" />
      </a>
    </header>

    <div className="data-policy-section__content">
      {children}
    </div>
  </section>
);

export default PolicySection;
