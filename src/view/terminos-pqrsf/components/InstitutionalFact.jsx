import React from 'react';

const InstitutionalFact = ({
  icon,
  title,
  description,
}) => (
  <article className="pqrsf-fact">
    <span
      className="pqrsf-fact__icon"
      aria-hidden="true"
    >
      <i className={`fas ${icon}`} />
    </span>

    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </article>
);

export default InstitutionalFact;
