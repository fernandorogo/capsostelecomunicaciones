import React from 'react';

import {
  createWhatsAppUrl,
} from '../utils/whatsapp';

const FinalCta = ({
  content,
}) => {
  if (!content) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      className="catalog-final"
      aria-labelledby="catalog-final-title"
    >
      <div
        className="catalog-final-pattern"
        aria-hidden="true"
      />

      <div className="container">
        <div className="catalog-final-content">
          <span className="catalog-kicker">
            {content.kicker}
          </span>

          <h2 id="catalog-final-title">
            {content.title}
          </h2>

          <p>
            {content.description}
          </p>

          <div className="catalog-final-actions">
            <a
              href={createWhatsAppUrl(
                content.whatsappMessage
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-corporate-primary"
            >
              <i
                className="fab fa-whatsapp me-2"
                aria-hidden="true"
              />

              {content.primaryActionLabel}
            </a>

            <button
              type="button"
              className="btn catalog-final-glass"
              onClick={scrollToTop}
              aria-label="Volver a la parte superior de la página"
            >
              <i
                className="fas fa-arrow-up me-2"
                aria-hidden="true"
              />

              {content.secondaryActionLabel}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FinalCta;
