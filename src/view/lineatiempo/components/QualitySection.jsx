import React from 'react';

import SectionHeading from './SectionHeading';

const QualitySection = ({ heading, items = [] }) => (
  <section
    id="calidad"
    data-section="calidad"
    className="capsos-section quality-section"
  >
    <SectionHeading {...heading} light />

    <div className="quality-grid">
      {items.map((item, index) => (
        <article className="quality-card" key={item.title}>
          <span className="quality-number">
            {String(index).padStart(2, '0')}
          </span>

          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </article>
      ))}
    </div>
  </section>
);

export default QualitySection;
