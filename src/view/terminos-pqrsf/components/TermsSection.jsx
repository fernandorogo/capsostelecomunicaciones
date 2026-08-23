import React from 'react';

const TermsSection = ({
  id,
  number,
  icon,
  title,
  children,
}) => (
  <section
    className="pqrsf-terms-section"
    id={id}
    aria-labelledby={`${id}-title`}
  >
    <header className="pqrsf-terms-section__header">
      <div className="pqrsf-terms-section__identity">
        <span className="pqrsf-terms-section__number">
          {number}
        </span>

        <span
          className="pqrsf-terms-section__icon"
          aria-hidden="true"
        >
          <i className={`fas ${icon}`} />
        </span>

        <h3 id={`${id}-title`}>
          {title}
        </h3>
      </div>

      <a
        href="#terminos-pqrsf"
        className="pqrsf-terms-section__top"
        aria-label="Volver al inicio del documento"
        title="Volver al inicio"
      >
        <i
          className="fas fa-arrow-up"
          aria-hidden="true"
        />
      </a>
    </header>

    <div className="pqrsf-terms-section__content">
      {children}
    </div>
  </section>
);

export default TermsSection;
