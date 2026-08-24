import React from 'react';

import {
  canalWhatsAppMessages,
  createWhatsAppUrl,
} from '../utils/whatsapp';

const FinalCta = () => (
  <section className="oc-final-cta">
    <div className="container">
      <div className="oc-final-content">
        <span className="oc-eyebrow">Tu señal empieza aquí</span>
        <h2>Tu audiencia ya existe. Ahora dale un canal.</h2>
        <p>
          Cuéntanos qué representa tu organización, a quién quieres llegar y qué
          historias necesitas contar. Diseñaremos una propuesta de canal propio
          construida alrededor de tus objetivos.
        </p>

        <div className="oc-final-actions">
          <a
            href={createWhatsAppUrl(canalWhatsAppMessages.create)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-corporate-primary"
          >
            <i className="fab fa-whatsapp me-2"></i>
            Hablemos de tu canal
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default FinalCta;
