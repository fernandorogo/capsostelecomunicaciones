import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { createWhatsAppUrl } from '../utils/whatsapp';

const FinalCta = ({ image }) => (
  <section className="inet-final">
    <div className="inet-final-media" aria-hidden="true">
      <img src={image} alt="" />
      <div className="inet-final-overlay"></div>
    </div>

    <div className="container">
      <div className="inet-final-content">
        <span className="inet-kicker">Tu próxima conexión empieza aquí</span>
        <h2>Internet que sigue el ritmo de todo lo que haces.</h2>
        <p>
          Cuéntanos dónde necesitas el servicio y cómo piensas utilizarlo.
          Recibirás una recomendación personalizada para tu hogar, negocio o
          proyecto.
        </p>

        <div className="inet-final-actions">
          <a
            href={createWhatsAppUrl(
              'Hola, quiero recibir una recomendación personalizada de internet.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-corporate-primary"
          >
            <i className="fab fa-whatsapp me-2"></i>
            Recibir asesoría
          </a>

        </div>
      </div>
    </div>
  </section>
);

export default FinalCta;
