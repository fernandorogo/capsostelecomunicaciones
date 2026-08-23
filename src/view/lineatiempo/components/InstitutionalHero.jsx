import React from 'react';

const InstitutionalHero = ({ content, onExplore }) => {
  if (!content) {
    return null;
  }

  return (
    <section className="capsos-hero">
      <div className="capsos-hero-overlay" aria-hidden="true" />

      <div className="capsos-hero-content">
        <span className="capsos-eyebrow">{content.eyebrow}</span>

        <h1>{content.title}</h1>
        <p>{content.description}</p>

        <button
          type="button"
          className="capsos-primary-button"
          onClick={onExplore}
        >
          {content.ctaLabel}
        </button>
      </div>
    </section>
  );
};

export default InstitutionalHero;
