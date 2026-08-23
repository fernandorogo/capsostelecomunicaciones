import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BenefitsSection = ({ benefits }) => (
  <section className="oc-benefits">
    <div className="container">
      <div className="oc-section-heading">
        <div>
          <span className="oc-section-label">Valor estratégico</span>
          <h2>
            Un canal propio cambia la forma en que tu organización se comunica.
          </h2>
        </div>
        <p>
          Ganas presencia, control, cercanía y nuevas oportunidades para
          posicionar tu marca y conectar con personas de manera sostenida.
        </p>
      </div>

      <div className="oc-benefits-grid">
        {benefits.map((item) => (
          <article
            className={`oc-benefit-card ${item.accent}`}
            key={item.number}
          >
            <div className="oc-benefit-topline">
              <div className="oc-benefit-icon">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <span className="oc-benefit-number">{item.number}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
