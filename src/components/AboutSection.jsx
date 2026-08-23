import React from "react";
import { aboutCards } from "./homeData";
import "../css/AboutSection.css";

const AboutSection = () => {
  const cards = Array.isArray(aboutCards) ? aboutCards : [];

  const mainCard = cards[0];
  const topCards = cards.slice(1, 3);
  const bottomCard = cards[3];

  return (
    <section
      className="about-corporate"
      id="nosotros"
      aria-labelledby="about-section-title"
    >
      {/* =====================================================
          ENCABEZADO A TODO EL ANCHO
      ====================================================== */}
      <header className="about-modern-header">
        <div
          className="about-modern-header-accent"
          aria-hidden="true"
        />

        <div className="about-modern-title-area">
          <span className="about-modern-label">
            <i
              className="fas fa-building"
              aria-hidden="true"
            />
            Nuestra organización
          </span>

          <h2
            className="about-modern-title"
            id="about-section-title"
          >
            Tecnología que conecta, comunica y fortalece
            <span> nuestra región</span>
          </h2>

          <p className="about-modern-subtitle">
            Una organización cercana, comprometida con el desarrollo y la
            transformación de nuestra comunidad.
          </p>
        </div>
      </header>

      <div className="container">
        {/* =====================================================
            CONTENIDO PRINCIPAL
        ====================================================== */}
        <div className="about-modern-grid">
          {/* ===================================================
              TARJETA PRINCIPAL
          =================================================== */}
          {mainCard && (
            <article className="about-main-card">
              <div className="about-main-image">
                <img
                  src={mainCard.image}
                  alt={mainCard.title || "Nuestra organización"}
                  loading="eager"
                  decoding="async"
                />

                <div className="about-image-badge">
                  <i
                    className="fas fa-users"
                    aria-hidden="true"
                  />
                  Comunidad y cercanía
                </div>
              </div>

              <div className="about-main-content">
                <div className="about-main-icon">
                  <i
                    className={`fas ${mainCard.icon || "fa-building"}`}
                    aria-hidden="true"
                  />
                </div>

                <span className="about-card-category">
                  Nuestra identidad
                </span>

                <h3>{mainCard.title}</h3>

                <p>{mainCard.content}</p>

                <div className="about-main-features">
                  <span>
                    <i
                      className="fas fa-check"
                      aria-hidden="true"
                    />
                    Conexión con la comunidad
                  </span>

                  <span>
                    <i
                      className="fas fa-check"
                      aria-hidden="true"
                    />
                    Experiencia y compromiso
                  </span>

                  <span>
                    <i
                      className="fas fa-check"
                      aria-hidden="true"
                    />
                    Desarrollo regional
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* ===================================================
              COLUMNA DERECHA
          =================================================== */}
          <div className="about-right-column">
            {/* Dos tarjetas superiores */}
            <div className="about-top-cards">
              {topCards.map((card, index) => (
                <article
                  className="about-small-card"
                  key={card.id || `${card.title}-${index}`}
                >
                  <div className="about-small-image">
                    <img
                      src={card.image}
                      alt={card.title || `Información institucional ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="about-small-content">
                    <div className="about-small-heading">
                      <div className="about-small-icon">
                        <i
                          className={`fas ${card.icon || "fa-circle-info"}`}
                          aria-hidden="true"
                        />
                      </div>

                      <span>
                        {card.badge || "Nuestra organización"}
                      </span>
                    </div>

                    <h3>{card.title}</h3>

                    <p>{card.content}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Tarjeta inferior horizontal */}
            {bottomCard && (
              <article className="about-horizontal-card">
                <div className="about-horizontal-image">
                  <img
                    src={bottomCard.image}
                    alt={bottomCard.title || "Desarrollo regional"}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="about-horizontal-content">
                  <div className="about-small-heading">
                    <div className="about-small-icon">
                      <i
                        className={`fas ${
                          bottomCard.icon || "fa-chart-line"
                        }`}
                        aria-hidden="true"
                      />
                    </div>

                    <span>
                      {bottomCard.badge || "Impacto regional"}
                    </span>
                  </div>

                  <h3>{bottomCard.title}</h3>

                  <p>{bottomCard.content}</p>

                  {(bottomCard.stat || bottomCard.statLabel) && (
                    <div className="about-horizontal-stat">
                      {bottomCard.stat && (
                        <strong>{bottomCard.stat}</strong>
                      )}

                      {bottomCard.statLabel && (
                        <span>{bottomCard.statLabel}</span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            )}
          </div>
        </div>

        {/* =====================================================
            BARRA DE VALORES
        ====================================================== */}
        <div className="values-bar">
          <div className="value-item-corporate mt-3">
            <i
              className="fas fa-handshake"
              aria-hidden="true"
            />
            <span>Compromiso</span>
          </div>

          <div className="value-item-corporate mt-3">
            <i
              className="fas fa-lightbulb"
              aria-hidden="true"
            />
            <span>Innovación</span>
          </div>

          <div className="value-item-corporate mt-3">
            <i
              className="fas fa-users"
              aria-hidden="true"
            />
            <span>Comunidad</span>
          </div>

          <div className="value-item-corporate mt-3">
            <i
              className="fas fa-award"
              aria-hidden="true"
            />
            <span>Excelencia</span>
          </div>

          <div className="value-item-corporate mt-3">
            <i
              className="fas fa-shield-alt"
              aria-hidden="true"
            />
            <span>Confianza</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;