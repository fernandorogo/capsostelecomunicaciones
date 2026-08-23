import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faFileContract,
  faGlobe,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

const FORMAT_ICONS = {
  web: faGlobe,
  historical: faFileContract,
  replacement: faArrowRight,
};

const NormativaCard = ({ norma, index }) => (
  <article
    className={`normativa-card normativa-card--${norma.accent}`}
    aria-labelledby={`${norma.id}-title`}
  >
    <div className="normativa-card__top">
      <span className="normativa-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span
        className={`normativa-card__status normativa-card__status--${norma.statusType}`}
      >
        {norma.status}
      </span>
    </div>

    <div className="normativa-card__identity">
      <span className="normativa-card__icon" aria-hidden="true">
        <FontAwesomeIcon icon={norma.icon} />
      </span>

      <div>
        <small>{norma.type}</small>
        <strong>
          {norma.number} de {norma.year}
        </strong>
      </div>
    </div>

    <h3 id={`${norma.id}-title`}>
      {norma.title}
    </h3>

    <p className="normativa-card__summary">
      {norma.summary}
    </p>

    {norma.notice && (
      <div className="normativa-card__notice">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>{norma.notice}</span>
      </div>
    )}

    <dl className="normativa-card__meta">
      <div>
        <dt>Entidad</dt>
        <dd>{norma.authority}</dd>
      </div>

      <div>
        <dt>Categoría</dt>
        <dd>{norma.category}</dd>
      </div>
    </dl>

    <div className="normativa-card__actions">
      {norma.links.map((link) => (
        <a
          className="normativa-card__action"
          href={link.url}
          key={`${norma.id}-${link.label}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${link.label}: ${norma.type} ${norma.number} de ${norma.year}`}
        >
          <span className="normativa-card__action-icon" aria-hidden="true">
            <FontAwesomeIcon
              icon={FORMAT_ICONS[link.format] || faGlobe}
            />
          </span>

          <span className="normativa-card__action-label">
            {link.label}
          </span>

          <span className="normativa-card__action-arrow" aria-hidden="true">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </a>
      ))}
    </div>
  </article>
);

export default NormativaCard;
