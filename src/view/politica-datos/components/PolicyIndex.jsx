import React from 'react';

const PolicyIndex = ({
  sections,
  activeSection,
  onSelectSection,
}) => (
  <nav
    className="data-policy-index"
    aria-labelledby="data-policy-index-title"
  >
    <header className="data-policy-index__header">
      <div>
        <span className="data-policy-section-heading__eyebrow">
          Navegación de la política
        </span>

        <h3 id="data-policy-index-title">
          Contenido de la política
        </h3>
      </div>

      <span className="data-policy-index__count">
        {sections.length} secciones
      </span>
    </header>

    <div className="data-policy-index__grid">
      {sections.map((section) => (
        <button
          key={`index-${section.id}`}
          type="button"
          className={`data-policy-index__item ${
            activeSection === section.id ? 'is-active' : ''
          }`}
          onClick={() => onSelectSection(section.id)}
        >
          <span className="data-policy-index__number">
            {section.number}
          </span>

          <span className="data-policy-index__icon" aria-hidden="true">
            <i className={`fas ${section.icon}`} />
          </span>

          <span className="data-policy-index__title">
            {section.title}
          </span>

          <i
            className="fas fa-arrow-right data-policy-index__arrow"
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  </nav>
);

export default PolicyIndex;
