import React from 'react';

const SummaryCard = ({
  icon,
  title,
  description,
}) => (
  <article className="pqrsf-summary-card">
    <span
      className="pqrsf-summary-card__icon"
      aria-hidden="true"
    >
      <i className={`fas ${icon}`} />
    </span>

    <div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </article>
);

export default SummaryCard;
