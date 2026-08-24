import React from 'react';

const CatalogHero = ({
  content,
  stats,
  onExplore,
}) => {
  return (
    <header
      className="catalog-hero"
      aria-labelledby="catalog-hero-title"
    >
      <div
        className="catalog-hero-background"
        style={{
          backgroundImage: `url("${content.image}")`,
        }}
        aria-hidden="true"
      />

      <div
        className="catalog-hero-overlay"
        aria-hidden="true"
      />

      <div
        className="catalog-hero-grid"
        aria-hidden="true"
      />

      <div className="container catalog-hero-container">
        <div className="catalog-hero-copy">
          <span className="catalog-kicker">
            {content.kicker}
          </span>

          <h1 id="catalog-hero-title">
            {content.title}
            <span>{content.highlight}</span>
          </h1>

          <p>
            {content.description}
          </p>

          <div className="catalog-hero-actions">
            <button
              type="button"
              className="btn btn-corporate-primary"
              onClick={onExplore}
            >
              {content.primaryActionLabel}

              <i
                className="fas fa-arrow-down ms-2"
                aria-hidden="true"
              />
            </button>

            <a
              href={content.secondaryActionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn catalog-hero-glass"
            >
              <i
                className="fab fa-whatsapp me-2"
                aria-hidden="true"
              />

              {content.secondaryActionLabel}
            </a>
          </div>

          <div className="catalog-hero-stats">
            {stats.map((stat) => (
              <div
                className="catalog-hero-stat"
                key={`${stat.value}-${stat.label}`}
              >
                <strong>
                  {stat.value}
                </strong>

                <span>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default CatalogHero;
