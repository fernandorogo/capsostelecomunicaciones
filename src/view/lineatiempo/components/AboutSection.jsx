import React from 'react';

import SectionHeading from './SectionHeading';

const AboutSection = ({ heading, items = [] }) => (
  <section
    id="nosotros"
    data-section="nosotros"
    className="capsos-section soft-section"
  >
    <SectionHeading {...heading} />

    <div className="about-grid">
      {items.map((item, index) => (
        <article
          key={item.title}
          className={`about-card ${
            index === 0 ? 'about-card-featured' : ''
          }`}
        >
          <span className="about-number">
            {String(index + 1).padStart(2, '0')}
          </span>

          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </article>
      ))}
    </div>
  </section>
);

export default AboutSection;
