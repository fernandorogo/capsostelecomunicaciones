import React from 'react';

const InstitutionalFact = ({
  icon,
  title,
  description,
}) => (
  <article className="data-policy-fact">
    <span
      className="data-policy-fact__icon"
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
