import React from 'react';

import SectionHeading from './SectionHeading';

const ProjectionSection = ({ heading, items = [] }) => (
  <section
    id="proyeccion"
    data-section="proyeccion"
    className="capsos-section soft-section"
  >
    <SectionHeading {...heading} />

    <div className="projection-grid">
      {items.map((item) => (
        <article className="projection-card" key={item.number}>
          <div className="projection-number">{item.number}</div>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </article>
      ))}
    </div>
  </section>
);

export default ProjectionSection;
