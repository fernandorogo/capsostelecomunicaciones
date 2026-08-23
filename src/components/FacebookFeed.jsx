import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import '../css/FacebookFeed.css';

/* =========================================================
   ICONOS
========================================================= */

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M13.6 22v-8.6h2.9l.4-3.3h-3.3V8c0-1 .3-1.7 1.7-1.7H17v-3c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.4H7v3.3h3V22h3.6Z"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M8 5v14l11-7L8 5Z"
      fill="currentColor"
    />
  </svg>
);

const NewsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M8 8h8M8 12h8M8 16h5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const SignalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M4 17a11.5 11.5 0 0 1 16 0M7.5 13.7a6.5 6.5 0 0 1 9 0M10.5 10.5a2.3 2.3 0 0 1 3 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <circle
      cx="12"
      cy="19"
      r="1.4"
      fill="currentColor"
    />
  </svg>
);

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

const FacebookFeed = ({
  pageUrl = 'https://www.facebook.com/capsostv',
  height = 650,
}) => {
  const playerContainerRef = useRef(null);

  const [pluginWidth, setPluginWidth] = useState(500);
  const [isLoading, setIsLoading] = useState(true);

  const normalizedPageUrl = useMemo(() => {
    return pageUrl
      .trim()
      .replace(/facebook\.com\/+/i, 'facebook.com/')
      .replace(/\/+$/, '');
  }, [pageUrl]);

  const facebookVideosUrl = useMemo(() => {
    return `${normalizedPageUrl}/videos`;
  }, [normalizedPageUrl]);

  /* =======================================================
     AJUSTE RESPONSIVE DEL PLUGIN DE FACEBOOK
  ======================================================= */

  useEffect(() => {
    const container = playerContainerRef.current;

    if (!container) {
      return undefined;
    }

    let resizeTimer;
    let animationFrame;

    const calculateWidth = () => {
      const containerWidth =
        container.getBoundingClientRect().width;

      if (!containerWidth || containerWidth < 250) {
        return;
      }

      const horizontalSpace = 32;

      const availableWidth =
        containerWidth - horizontalSpace;

      const newWidth = Math.min(
        500,
        Math.max(
          180,
          Math.floor(availableWidth)
        )
      );

      setPluginWidth((currentWidth) => {
        if (
          Math.abs(
            currentWidth - newWidth
          ) < 3
        ) {
          return currentWidth;
        }

        setIsLoading(true);

        return newWidth;
      });
    };

    const scheduleCalculation = () => {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        animationFrame =
          window.requestAnimationFrame(
            calculateWidth
          );
      }, 120);
    };

    scheduleCalculation();

    let resizeObserver;

    if (
      typeof ResizeObserver !==
      'undefined'
    ) {
      resizeObserver =
        new ResizeObserver(
          scheduleCalculation
        );

      resizeObserver.observe(container);
    }

    window.addEventListener(
      'resize',
      scheduleCalculation
    );

    return () => {
      window.clearTimeout(resizeTimer);

      if (animationFrame) {
        window.cancelAnimationFrame(
          animationFrame
        );
      }

      resizeObserver?.disconnect();

      window.removeEventListener(
        'resize',
        scheduleCalculation
      );
    };
  }, []);

  /* =======================================================
     URL DEL PLUGIN
  ======================================================= */

  const iframeUrl = useMemo(() => {
    const params = new URLSearchParams({
      href: normalizedPageUrl,
      tabs: 'timeline',
      width: String(pluginWidth),
      height: String(height),
      small_header: 'false',
      adapt_container_width: 'false',
      hide_cover: 'false',
      show_facepile: 'false',
    });

    return (
      'https://www.facebook.com/plugins/page.php?' +
      params.toString()
    );
  }, [
    normalizedPageUrl,
    pluginWidth,
    height,
  ]);

  return (
    <section
      className="capsos-facebook-section"
      aria-labelledby="capsos-facebook-main-title"
    >
      {/* ELEMENTOS DECORATIVOS */}

      <div
        className="capsos-facebook-background-grid"
        aria-hidden="true"
      />

      <div
        className="
          capsos-facebook-light
          capsos-facebook-light--one
        "
        aria-hidden="true"
      />

      <div
        className="
          capsos-facebook-light
          capsos-facebook-light--two
        "
        aria-hidden="true"
      />

      <div className="capsos-facebook-container">
        {/* =================================================
            INFORMACIÓN
        ================================================= */}

        <div className="capsos-facebook-information">
          <div className="capsos-facebook-label">
            <span className="capsos-facebook-label__icon">
              <SignalIcon />
            </span>

            Nuestra comunidad digital
          </div>

          {/* TÍTULO AJUSTADO */}

          <h2
            className="capsos-facebook-title"
            id="capsos-facebook-main-title"
          >
            <span className="capsos-facebook-title__main">
              Mantente conectado con
            </span>

            <span className="capsos-facebook-title__brand">
              Capsos Telecomunicaciones
            </span>
          </h2>

          <p className="capsos-facebook-description">
            Consulta nuestras publicaciones, noticias,
            transmisiones y contenidos de interés para Santa
            Rosa de Osos y el Norte de Antioquia.
          </p>

          {/* SERVICIOS */}

          <div className="capsos-facebook-services">
            <article className="capsos-facebook-service">
              <div className="capsos-facebook-service__icon">
                <PlayIcon />
              </div>

              <div>
                <h3>Transmisiones</h3>

                <p>
                  Eventos, celebraciones y contenidos en video.
                </p>
              </div>
            </article>

            <article className="capsos-facebook-service">
              <div className="capsos-facebook-service__icon">
                <NewsIcon />
              </div>

              <div>
                <h3>Noticias y actualidad</h3>

                <p>
                  Información importante para nuestra comunidad.
                </p>
              </div>
            </article>

            <article className="capsos-facebook-service">
              <div className="capsos-facebook-service__icon">
                <SignalIcon />
              </div>

              <div>
                <h3>Conexión permanente</h3>

                <p>
                  Siempre cerca de nuestros usuarios y seguidores.
                </p>
              </div>
            </article>
          </div>

          {/* BOTONES */}

          <div className="capsos-facebook-actions">
            <a
              href={normalizedPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                capsos-facebook-button
                capsos-facebook-button--primary
              "
            >
              <span className="capsos-facebook-button__icon">
                <FacebookIcon />
              </span>

              Seguir página

              <span className="capsos-facebook-button__arrow">
                <ArrowIcon />
              </span>
            </a>

            <a
              href={facebookVideosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                capsos-facebook-button
                capsos-facebook-button--secondary
              "
            >
              <PlayIcon />

              Ver transmisiones
            </a>
          </div>

          {/* ESTADO */}

          <div className="capsos-facebook-status">
            <span className="capsos-facebook-status__animation">
              <i />
              <i />
              <i />
              <i />
            </span>

            <div>
              <strong>
                Contenido actualizado
              </strong>

              <p>
                Información sincronizada con nuestra página
                oficial de Facebook.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            VISUAL DE FACEBOOK
        ================================================= */}

        <div className="capsos-facebook-visual">
          <div
            className="capsos-facebook-halo"
            aria-hidden="true"
          />

          <div
            className="
              capsos-floating-card
              capsos-floating-card--top
            "
          >
            <span className="capsos-floating-card__facebook">
              <FacebookIcon />
            </span>

            <div>
              <strong>
                Comunidad Capsos
              </strong>

              <p>
                Siempre conectados
              </p>
            </div>
          </div>

          <div
            className="
              capsos-floating-card
              capsos-floating-card--bottom
            "
          >
            <span className="capsos-floating-card__live" />

            <div>
              <strong>
                Contenido reciente
              </strong>

              <p>
                Noticias y transmisiones
              </p>
            </div>
          </div>

          <article className="capsos-facebook-window">
            {/* BARRA DEL NAVEGADOR */}

            <header className="capsos-facebook-browser">
              <div className="capsos-browser-controls">
                <span />
                <span />
                <span />
              </div>

              <div className="capsos-browser-address">
                <span className="capsos-browser-security" />

                facebook.com/capsostv
              </div>

              <div className="capsos-browser-menu">
                <span />
                <span />
                <span />
              </div>
            </header>

            {/* PERFIL */}

            <div className="capsos-facebook-profile">
              <div className="capsos-facebook-profile__logo">
                <span>C</span>
              </div>

              <div className="capsos-facebook-profile__information">
                <strong>
                  Capsos Telecomunicaciones
                </strong>

                <span>
                  <i />

                  Página oficial
                </span>
              </div>

              <a
                href={normalizedPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="capsos-facebook-profile__button"
              >
                <FacebookIcon />

                Seguir
              </a>
            </div>

            {/* PLUGIN */}

            <div
              ref={playerContainerRef}
              className="capsos-facebook-player"
            >
              {isLoading && (
                <div className="capsos-facebook-loading">
                  <div className="capsos-loading-header">
                    <div className="capsos-loading-avatar" />

                    <div className="capsos-loading-lines">
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="capsos-loading-text">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="capsos-loading-image">
                    <span>
                      <FacebookIcon />
                    </span>
                  </div>

                  <p>
                    Cargando publicaciones...
                  </p>
                </div>
              )}

              <iframe
                key={`${pluginWidth}-${height}-${normalizedPageUrl}`}
                src={iframeUrl}
                title="Publicaciones de Facebook de Capsos Telecomunicaciones"
                width={pluginWidth}
                height={height}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                onLoad={() =>
                  setIsLoading(false)
                }
                className={
                  isLoading
                    ? 'capsos-facebook-iframe capsos-facebook-iframe--loading'
                    : 'capsos-facebook-iframe'
                }
              />
            </div>

            {/* PIE */}

            <footer className="capsos-facebook-window-footer">
              <div>
                <span />

                Sincronizado con Facebook
              </div>

              <a
                href={normalizedPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir la página de Facebook"
              >
                <ArrowIcon />
              </a>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
};

export default FacebookFeed;