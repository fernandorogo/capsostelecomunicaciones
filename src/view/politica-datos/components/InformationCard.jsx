import React from 'react';

const InformationCard = ({
  icon,
  title,
  description,
}) => (
  <article className="data-policy-information-card">
    {icon && (
      <span
        className="data-policy-information-card__icon"
        aria-hidden="true"
      >
        <i className={`fas ${icon}`} />
      </span>
    )}

    <div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </article>
);

export default InformationCard;
