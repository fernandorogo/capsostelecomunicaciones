import React from 'react';

import SummaryCard from './SummaryCard';

const SummaryGrid = ({ items }) => (
  <section
    className="pqrsf-summary"
    aria-labelledby="pqrsf-summary-title"
  >
    <div className="pqrsf-section-heading">
      <span
        className="pqrsf-section-heading__icon"
        aria-hidden="true"
      >
        <i className="fas fa-circle-info" />
      </span>

      <div>
        <span className="pqrsf-section-heading__eyebrow">
          Resumen ejecutivo
        </span>

        <h3 id="pqrsf-summary-title">
          Aspectos principales
        </h3>

        <p>
          Información esencial antes de utilizar el formulario.
        </p>
      </div>
    </div>

    <div className="pqrsf-summary-grid">
      {items.map((item) => (
        <SummaryCard
          key={item.title}
          {...item}
        />
      ))}
    </div>
  </section>
);

export default SummaryGrid;
