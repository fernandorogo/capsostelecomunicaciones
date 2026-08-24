import React from 'react';

const SectionHeading = ({
  kicker,
  title,
  description,
  id,
  count,
}) => {
  return (
    <div className="catalog-section-heading">
      <div className="catalog-section-copy">
        <span className="catalog-section-kicker">
          {kicker}
        </span>

        <h2 id={id}>
          {title}
        </h2>

        <p>
          {description}
        </p>
      </div>

      <div
        className="catalog-result-badge"
        aria-live="polite"
      >
        <strong>
          {count}
        </strong>

        <span>
          {count === 1
            ? 'equipo'
            : 'equipos'}
        </span>
      </div>
    </div>
  );
};

export default SectionHeading;
