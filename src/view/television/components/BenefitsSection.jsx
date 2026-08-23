import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SectionHeading from './SectionHeading';

const BenefitsSection = ({ features }) => (
  <section className="tv-section tv-benefits-section">
    <div className="container">
      <SectionHeading
        label="Más que canales"
        title="Un servicio pensado para acompañarte."
        description="La experiencia incluye variedad de contenido, señal digital, soporte técnico y mantenimiento cuando se requiere."
      />

      <div className="tv-benefit-grid">
        {features.map((feature) => (
          <article className="tv-benefit-card" key={feature.title}>
            <div className="tv-benefit-icon">
              <FontAwesomeIcon icon={feature.icon} />
            </div>
            <strong className="tv-benefit-number">{feature.number}</strong>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
