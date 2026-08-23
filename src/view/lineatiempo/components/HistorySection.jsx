import React from 'react';

import SectionHeading from './SectionHeading';

const renderParagraph = (paragraph, index) => {
  if (typeof paragraph === 'string') {
    return <p key={index}>{paragraph}</p>;
  }

  return (
    <p key={index}>
      {paragraph.before}
      <strong>{paragraph.strong}</strong>
      {paragraph.after}
    </p>
  );
};

const HistorySection = ({
  heading,
  items = [],
  originHighlight,
}) => (
  <section
    id="historia"
    data-section="historia"
    className="capsos-section"
  >
    <SectionHeading {...heading} />

    <div
      className="history-timeline"
      role="list"
      aria-label="Línea de tiempo de Capsos Telecomunicaciones"
    >
      {items.map((item) => (
        <article
          key={item.id}
          className={`history-item ${
            item.reverse ? 'reverse' : ''
          }`}
          role="listitem"
          aria-labelledby={item.titleId}
        >
          {item.dateTime ? (
            <time
              className="history-marker"
              dateTime={item.dateTime}
            >
              {item.marker}
            </time>
          ) : (
            <span className="history-marker">
              {item.marker}
            </span>
          )}

          <div
            className="history-card"
            data-year={item.marker}
          >
            {item.imagePosition === 'left' && (
              <div className="history-image">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}

            <div className="history-text">
              <span className="history-kicker">
                {item.kicker}
              </span>

              <h3 id={item.titleId}>{item.title}</h3>

              {item.paragraphs.map(renderParagraph)}
            </div>

            {item.imagePosition === 'right' && (
              <div className="history-image">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
          </div>
        </article>
      ))}
    </div>

    {originHighlight && (
      <aside
        className="origin-highlight"
        aria-labelledby="origen-tv-osos-title"
      >
        <span>{originHighlight.label}</span>

        <h3 id="origen-tv-osos-title">
          {originHighlight.title}
        </h3>

        <p>{originHighlight.content}</p>
      </aside>
    )}
  </section>
);

export default HistorySection;
