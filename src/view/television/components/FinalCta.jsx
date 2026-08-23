import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { createWhatsappUrl } from '../utils/whatsapp';

const FinalCta = ({ image }) => (
  <section className="tv-final-cta">
    <img
      src={image}
      alt="Familia disfrutando el servicio de televisión digital"
      loading="lazy"
    />

    <div className="container">
      <div className="tv-final-content">
        <span className="tv-section-label">Televisión para disfrutar más</span>
        <h2>Haz que cada momento en casa tenga algo especial.</h2>
        <p>
          Consulta la disponibilidad del servicio y recibe orientación sobre la
          programación, la instalación y las opciones para hogar o negocio.
        </p>

        <div className="tv-final-actions">
          <a
            href={createWhatsappUrl(
              'Hola, quiero recibir asesoría sobre el servicio de televisión digital.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-corporate-primary"
          >
            <i className="fab fa-whatsapp me-2"></i>
            Solicitar asesoría de TV
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default FinalCta;
