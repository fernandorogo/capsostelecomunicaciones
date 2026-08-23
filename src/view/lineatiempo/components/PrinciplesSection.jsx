import React, { useState } from 'react';

import SectionHeading from './SectionHeading';

const PrinciplesSection = ({ heading, items = [] }) => {
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);

  const togglePrinciple = (index) => {
    setExpandedPrinciple((current) =>
      current === index ? null : index
    );
  };

  return (
    <section
      id="principios"
      data-section="principios"
      className="capsos-section"
    >
      <SectionHeading {...heading} />

      <div className="principles-grid">
        {items.map((item, index) => {
          const expanded = expandedPrinciple === index;
          const contentId = `principio-${index}`;

          return (
            <article
              key={item.title}
              className={`principle-card ${expanded ? 'expanded' : ''}`}
            >
              <button
                type="button"
                className="principle-button"
                onClick={() => togglePrinciple(index)}
                aria-expanded={expanded}
                aria-controls={contentId}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <b aria-hidden="true">{expanded ? '−' : '+'}</b>
              </button>

              <div
                id={contentId}
                className="principle-content"
                aria-hidden={!expanded}
              >
                <p>{item.content}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default PrinciplesSection;
