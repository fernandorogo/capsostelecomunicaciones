import React from 'react';

const RequestTypeCard = ({
  icon,
  title,
  description,
}) => (
  <article className="pqrsf-request-card">
    <span
      className="pqrsf-request-card__icon"
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

export default RequestTypeCard;
