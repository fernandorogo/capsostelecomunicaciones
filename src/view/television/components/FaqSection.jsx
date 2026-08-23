import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import SectionHeading from './SectionHeading';

const FaqSection = ({ faqs, image }) => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="tv-section tv-faq-section">
      <div className="container">
        <div className="tv-faq-layout">
          <div className="tv-faq-visual">
            <img
              src={image}
              alt="Servicio de televisión en un espacio moderno"
              loading="lazy"
            />
            <div className="tv-faq-visual-content">
              <span>Atención personalizada</span>
              <h3>Te ayudamos a elegir la mejor opción.</h3>
              <p>
                Cuéntanos dónde deseas instalar el servicio y qué tipo de contenido
                buscas para orientarte de manera más precisa.
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              label="Preguntas frecuentes"
              title="Resolvemos tus dudas antes de comenzar."
              description="Conoce los aspectos principales del servicio de televisión digital, su contenido y el acompañamiento disponible."
            />

            <div className="tv-faq-list">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <article
                    className={`tv-faq-item ${isOpen ? 'open' : ''}`}
                    key={faq.question}
                  >
                    <button
                      type="button"
                      className="tv-faq-question"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className="tv-faq-question-icon">
                        <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
                      </span>
                    </button>

                    <div className="tv-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
