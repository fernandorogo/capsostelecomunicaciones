import React from 'react';

import { createWhatsAppUrl } from '../utils';

const CapsosFooter = ({ content }) => {
  if (!content) {
    return null;
  }

  return (
    <footer className="inet-final" aria-labelledby="capsos-footer-title">
      <div className="inet-final-media" aria-hidden="true">
        <img
          src={content.image}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="inet-final-overlay" />
      </div>

      <div className="container">
        <div className="inet-final-content">
          <span className="inet-kicker">{content.kicker}</span>

          <h2 id="capsos-footer-title">{content.title}</h2>
          <p>{content.description}</p>

          <div className="inet-final-actions">
            <a
              href={createWhatsAppUrl(content.whatsappMessage)}
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CapsosFooter;