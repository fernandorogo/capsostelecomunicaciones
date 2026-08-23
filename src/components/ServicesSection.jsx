import React from 'react';
import { Link } from 'react-router-dom';
import { services } from './homeData';

const ServicesSection = () => {
  return (
    <section
      className="services-corporate section section-soft"
      id="servicios"
      aria-labelledby="services-section-title"
    >
      <div className="container services-corporate-container">
        {/* ENCABEZADO */}
        <header className="section-header services-section-header">
          <span className="services-section-label">
            Nuestros servicios
          </span>

          <h2
            className="section-title"
            id="services-section-title"
          >
            Soluciones de conectividad para todos
          </h2>

          <p className="section-desc">
            Servicios pensados para conectar hogares, negocios,
            empresas y proyectos de nuestra comunidad con tecnología,
            estabilidad y atención cercana.
          </p>
        </header>

        {/* TRES TARJETAS POR FILA EN ESCRITORIO */}
        <div className="row g-4 align-items-stretch services-grid">
          {services.map((service, index) => {
            const serviceId =
              service.id || `service-${index + 1}`;

            const serviceColor =
              service.color || 'primary';

            const serviceIcon =
              service.icon || 'fa-wifi';

            const highlight = service.highlight || {
              icon: 'fa-circle-info',
              label: 'Información destacada',
              values: [],
            };

            const highlightValues = Array.isArray(
              highlight.values
            )
              ? highlight.values
              : [];

            const features = Array.isArray(service.features)
              ? service.features
              : [];

            return (
              <div
                className="col-12 col-md-6 col-lg-4 d-flex"
                key={serviceId}
              >
                <article
                  className={`
                    service-card-corporate
                    service-${serviceColor}
                    w-100
                    h-100
                  `}
                  aria-labelledby={`service-title-${serviceId}`}
                >
                  {/* ENCABEZADO DE LA TARJETA */}
                  <div className="service-header-corporate">
                    <div
                      className="service-icon-corporate"
                      aria-hidden="true"
                    >
                      <i className={`fas ${serviceIcon}`} />
                    </div>

                    {service.badge && (
                      <span
                        className={`
                          service-badge-corporate
                          badge-${serviceColor}
                        `}
                      >
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* CONTENIDO */}
                  <div className="service-card-content">
                    <h3
                      className="service-title-corporate"
                      id={`service-title-${serviceId}`}
                    >
                      {service.title}
                    </h3>

                    {service.description && (
                      <p className="service-desc-corporate">
                        {service.description}
                      </p>
                    )}

                    {/* INFORMACIÓN DESTACADA */}
                    {highlightValues.length > 0 && (
                      <div className="service-highlight-corporate">
                        <div className="service-highlight-header">
                          <i
                            className={`fas ${
                              highlight.icon || 'fa-circle-info'
                            }`}
                            aria-hidden="true"
                          />

                          <span>
                            {highlight.label ||
                              'Información destacada'}
                          </span>
                        </div>

                        <div className="service-highlight-values">
                          {highlightValues.map(
                            (value, valueIndex) => (
                              <span
                                className="service-highlight-value"
                                key={`${serviceId}-highlight-${valueIndex}`}
                              >
                                {value}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* CARACTERÍSTICAS */}
                    {features.length > 0 && (
                      <ul className="service-features-corporate">
                        {features.map(
                          (feature, featureIndex) => (
                            <li
                              key={`${serviceId}-feature-${featureIndex}`}
                            >
                              <i
                                className="fas fa-check-circle"
                                aria-hidden="true"
                              />

                              <span>{feature}</span>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>

                  {/* BOTÓN */}
                  {service.link && (
                    <Link
                      to={service.link}
                      className={`
                        btn
                        btn-service-corporate
                        btn-${serviceColor}
                      `}
                      aria-label={`${
                        service.buttonText || 'Conocer más'
                      }: ${service.title}`}
                    >
                      <span>
                        {service.buttonText || 'Conocer más'}
                      </span>

                      <i
                        className="fas fa-arrow-right"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;