import React from 'react';

const DocumentIndex = ({ sections }) => (
  <nav
    className="pqrsf-index"
    aria-labelledby="pqrsf-index-title"
  >
    <header className="pqrsf-index__header">
      <div>
        <span className="pqrsf-section-heading__eyebrow">
          Navegación del documento
        </span>

        <h3 id="pqrsf-index-title">
          Contenido del documento
        </h3>
      </div>

      <span className="pqrsf-index__count">
        {sections.length} secciones
      </span>
    </header>

    <div className="pqrsf-index__grid">
      {sections.map((section) => (
        <a
          key={`index-${section.id}`}
          href={`#${section.id}`}
          className="pqrsf-index__item"
        >
          <span className="pqrsf-index__number">
            {section.number}
          </span>

          <span className="pqrsf-index__icon" aria-hidden="true">
            <i className={`fas ${section.icon}`} />
          </span>

          <span className="pqrsf-index__title">
            {section.title}
          </span>

          <i
            className="fas fa-arrow-right pqrsf-index__arrow"
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  </nav>
);

export default DocumentIndex;
