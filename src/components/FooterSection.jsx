import React from 'react';
import { Link } from 'react-router-dom';

import LogoCapsos from '../assets/logos/logo-capsoshg.png';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-corporate">
      <style>{`
        .footer-corporate .footer-title {
          color: var(--capsos-red, #cc0000);
        }

        .footer-corporate .footer-brand-column {
          padding-right: 1.5rem;
        }

        .footer-corporate .footer-desc {
          margin-bottom: 0;
        }

        .footer-corporate .footer-social-corporate {
          margin-top: 1.35rem;
        }

        .footer-corporate .footer-social-corporate a {
          position: relative;
          overflow: hidden;
        }

        .footer-corporate .footer-social-corporate a::after {
          content: '';
          position: absolute;
          right: 8px;
          bottom: 7px;
          left: 8px;
          height: 2px;
          border-radius: 999px;
          background: var(--capsos-red, #cc0000);
          transform: scaleX(0);
          transition: transform 0.25s ease;
        }

        .footer-corporate .footer-social-corporate a:hover::after {
          transform: scaleX(1);
        }

        .footer-corporate .footer-hours-strip {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.025),
              rgba(255, 255, 255, 0.055),
              rgba(255, 255, 255, 0.025)
            );
        }

        .footer-corporate .footer-hours-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          min-height: 72px;
          padding: 1rem 0;
          color: rgba(255, 255, 255, 0.72);
        }

        .footer-corporate .footer-hours-icon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          width: 38px;
          height: 38px;
          border: 1px solid rgba(204, 0, 0, 0.3);
          border-radius: 50%;
          color: var(--capsos-red, #cc0000);
          background: rgba(204, 0, 0, 0.08);
          font-size: 0.85rem;
        }

        .footer-corporate .footer-hours-title {
          color: #ffffff;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .footer-corporate .footer-hours-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.14);
        }

        .footer-corporate .footer-hours-day {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.86rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .footer-corporate .footer-hours-time {
          color: rgba(255, 255, 255, 0.64);
          font-size: 0.84rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .footer-corporate .footer-hours-dot {
          color: var(--capsos-red, #cc0000);
          font-size: 0.42rem;
        }

        @media (max-width: 991.98px) {
          .footer-corporate .footer-brand-column {
            padding-right: 0;
          }

          .footer-corporate .footer-hours-content {
            flex-wrap: wrap;
            gap: 0.75rem 1rem;
            justify-content: flex-start;
          }
        }

        @media (max-width: 575.98px) {
          .footer-corporate .footer-hours-content {
            display: grid;
            grid-template-columns: 38px minmax(0, 1fr);
            align-items: center;
          }

          .footer-corporate .footer-hours-divider,
          .footer-corporate .footer-hours-dot {
            display: none;
          }

          .footer-corporate .footer-hours-title,
          .footer-corporate .footer-hours-day,
          .footer-corporate .footer-hours-time {
            grid-column: 2;
            white-space: normal;
          }

          .footer-corporate .footer-hours-icon {
            grid-row: 1 / span 3;
          }
        }
      `}</style>

      <div className="footer-main">
        <div className="container">
          <div className="row g-4">
            {/* Información principal */}
            <div className="col-12 col-lg-4 footer-brand-column">
              <img
                src={LogoCapsos}
                alt="Logo de CAPSOS Telecomunicaciones"
                className="footer-logo"
              />

              <p className="footer-desc">
                Patrimonio de la comunidad santarrosana. Conectando a Santa
                Rosa de Osos y al Norte de Antioquia desde 1994.
              </p>

              {/* Redes sociales */}
              <div
                className="footer-social-corporate"
                aria-label="Redes sociales de CAPSOS"
              >
                <a
                  href="https://www.facebook.com/capsostv"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar Facebook de CAPSOS"
                  title="Facebook"
                >
                  <i
                    className="fab fa-facebook-f"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://www.instagram.com/capsostelecomunicaciones/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar Instagram de CAPSOS"
                  title="Instagram"
                >
                  <i
                    className="fab fa-instagram"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://www.youtube.com/capsostelecomunicaciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar canal de YouTube de CAPSOS"
                  title="YouTube"
                >
                  <i
                    className="fab fa-youtube"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            {/* Servicios */}
            <div className="col-6 col-md-3 col-lg-2">
              <h4 className="footer-title">Servicios</h4>

              <ul className="footer-links-corporate">
                <li>
                  <Link to="/internet">Internet</Link>
                </li>

                <li>
                  <Link to="/television">Televisión</Link>
                </li>

                <li>
                  <Link to="/canal">Canal</Link>
                </li>
              </ul>
            </div>

            {/* Empresa */}
            <div className="col-6 col-md-3 col-lg-2">
              <h4 className="footer-title">Empresa</h4>

              <ul className="footer-links-corporate">
                <li>
                  <Link to="/historia">Historia Capsos</Link>
                </li>
              </ul>
            </div>

            {/* Soporte */}
            <div className="col-6 col-md-3 col-lg-2">
              <h4 className="footer-title">Soporte</h4>

              <ul className="footer-links-corporate">
                <li>
                  <a
                    href="https://www.nperf.com/es/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Test de velocidad
                  </a>
                </li>
                {/* PAgos en Linea 
                <li>
                  <Link to="/pagos">Pagos en línea</Link>
                </li>*/}
              </ul>
            </div>

            {/* Legal */}
            <div className="col-6 col-md-3 col-lg-2">
              <h4 className="footer-title">Legal</h4>

              <ul className="footer-links-corporate">
                <li>
                  <Link to="/normativa">Normativa</Link>
                </li>

                <li>
                  <Link to="/terminos-y-condiciones">
                    Términos y condiciones
                  </Link>
                </li>

                <li>
                  <Link to="/politica-tratamiento-datos">
                    Tratamiento de datos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Horario de atención horizontal */}
      <div
        className="footer-hours-strip"
        aria-label="Horario de atención de CAPSOS"
      >
        <div className="container">
          <div className="footer-hours-content">
            <span
              className="footer-hours-icon"
              aria-hidden="true"
            >
              <i className="far fa-clock" />
            </span>

            <strong className="footer-hours-title">
              Horario de atención
            </strong>

            <span
              className="footer-hours-divider"
              aria-hidden="true"
            />

            <span className="footer-hours-day">
              Lunes a viernes
            </span>

            <i
              className="fas fa-circle footer-hours-dot"
              aria-hidden="true"
            />

            <span className="footer-hours-time">
              8:00 a. m. – 12:00 m.
            </span>

            <i
              className="fas fa-circle footer-hours-dot"
              aria-hidden="true"
            />

            <span className="footer-hours-time">
              2:00 p. m. – 5:00 p. m.
            </span>
          </div>
        </div>
      </div>

      {/* Parte inferior */}
      <div className="footer-bottom-corporate">
        <div className="container">
          <div className="footer-bottom-content">
            <p>
              © {currentYear} CAPSOS Telecomunicaciones. Todos los derechos
              reservados.
            </p>

            <div className="footer-badges-corporate">
              <span>
                <i
                  className="fas fa-shield-alt"
                  aria-hidden="true"
                />
                Sitio Seguro SSL
              </span>

              <span>
                <i
                  className="fas fa-check-circle"
                  aria-hidden="true"
                />
                ISO 27001
              </span>

              <span>
                <i
                  className="fas fa-award"
                  aria-hidden="true"
                />
                Calidad Certificada
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;