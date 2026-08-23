import React from 'react';

const SummaryGrid = ({ items }) => (
  <section
    className="data-policy-summary"
    aria-labelledby="data-policy-summary-title"
  >
    <div className="data-policy-section-heading">
      <span
        className="data-policy-section-heading__icon"
        aria-hidden="true"
      >
        <i className="fas fa-circle-info" />
      </span>

      <div>
        <span className="data-policy-section-heading__eyebrow">
          Resumen ejecutivo
        </span>

        <h3 id="data-policy-summary-title">
          Aspectos principales
        </h3>

        <p>
          Información esencial sobre el manejo de datos personales.
        </p>
      </div>
    </div>

    <div className="data-policy-summary-grid">
      {items.map((item) => (
        <article
          className="data-policy-summary-card"
          key={item.title}
        >
          <span
            className="data-policy-summary-card__icon"
            aria-hidden="true"
          >
            <i className={`fas ${item.icon}`} />
          </span>

          <div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default SummaryGrid;
