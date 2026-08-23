import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBolt,
  faCheckCircle,
  faDesktop,
  faDownload,
  faMobileScreenButton,
  faShareNodes,
  faShieldAlt,
  faWifi,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const DISMISS_STORAGE_KEY = 'capsos-pwa-install-dismissed';
const DISMISS_TIME = 24 * 60 * 60 * 1000;

const InstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const navigatorStandalone =
      window.navigator.standalone === true;

    const displayModeStandalone =
      window.matchMedia('(display-mode: standalone)').matches;

    const installed =
      navigatorStandalone || displayModeStandalone;

    setIsInstalled(installed);

    if (installed) {
      return undefined;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();

    const iosDevice =
      /iphone|ipad|ipod/.test(userAgent);

    setIsIos(iosDevice);

    const dismissedAt = Number(
      localStorage.getItem(DISMISS_STORAGE_KEY)
    );

    const dismissalIsActive =
      dismissedAt &&
      Date.now() - dismissedAt < DISMISS_TIME;

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      setInstallPrompt(event);

      if (!dismissalIsActive) {
        setShowBanner(true);
      }
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setShowBanner(false);
      setIsInstalled(true);
      setIsInstalling(false);

      localStorage.removeItem(DISMISS_STORAGE_KEY);
    };

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      'appinstalled',
      handleAppInstalled
    );

    /*
     * Safari en iPhone y iPad no dispara
     * beforeinstallprompt. Se muestran instrucciones.
     */
    let iosTimer;

    if (iosDevice && !dismissalIsActive) {
      iosTimer = window.setTimeout(() => {
        setShowBanner(true);
      }, 1800);
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        'appinstalled',
        handleAppInstalled
      );

      if (iosTimer) {
        window.clearTimeout(iosTimer);
      }
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      return;
    }

    try {
      setIsInstalling(true);

      await installPrompt.prompt();

      const choiceResult =
        await installPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        localStorage.removeItem(
          DISMISS_STORAGE_KEY
        );
      } else {
        localStorage.setItem(
          DISMISS_STORAGE_KEY,
          Date.now().toString()
        );
      }
    } catch (error) {
      console.error(
        'No fue posible abrir la instalación de Capsos:',
        error
      );
    } finally {
      setInstallPrompt(null);
      setShowBanner(false);
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(
      DISMISS_STORAGE_KEY,
      Date.now().toString()
    );

    setShowBanner(false);
  };

  if (
    isInstalled ||
    !showBanner ||
    (!installPrompt && !isIos)
  ) {
    return null;
  }

  return (
    <aside
      className="capsos-pwa"
      aria-label="Instalar aplicación Capsos"
      aria-live="polite"
    >
      <div className="capsos-pwa__card">
        <div className="capsos-pwa__decoration capsos-pwa__decoration--one" />
        <div className="capsos-pwa__decoration capsos-pwa__decoration--two" />

        <button
          type="button"
          className="capsos-pwa__close"
          onClick={handleDismiss}
          aria-label="Cerrar mensaje de instalación"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <header className="capsos-pwa__header">
          <div className="capsos-pwa__logo-container">
            <img
              src={`${process.env.PUBLIC_URL}/icon-192.png`}
              alt="Capsos Telecomunicaciones"
              className="capsos-pwa__logo"
            />

            <span className="capsos-pwa__status">
              <FontAwesomeIcon icon={faCheckCircle} />
            </span>
          </div>

          <div className="capsos-pwa__heading">
            <span className="capsos-pwa__eyebrow">
              Aplicación oficial
            </span>

            <h2>
              Capsos Telecomunicaciones
            </h2>

            <p>
              Lleva nuestros servicios siempre contigo.
            </p>
          </div>
        </header>

        <div className="capsos-pwa__content">
          {isIos ? (
            <>
              <div className="capsos-pwa__platform">
                <FontAwesomeIcon
                  icon={faMobileScreenButton}
                />

                <div>
                  <span>Instalación en iPhone o iPad</span>

                  <strong>
                    Agrega Capsos a tu pantalla de inicio
                  </strong>
                </div>
              </div>

              <div className="capsos-pwa__ios-steps">
                <div className="capsos-pwa__ios-step">
                  <span>1</span>

                  <p>
                    Presiona el botón{' '}
                    <strong>Compartir</strong>
                    <FontAwesomeIcon icon={faShareNodes} />
                  </p>
                </div>

                <div className="capsos-pwa__ios-step">
                  <span>2</span>

                  <p>
                    Selecciona{' '}
                    <strong>
                      Agregar a pantalla de inicio
                    </strong>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="capsos-pwa__platform">
                <FontAwesomeIcon icon={faDesktop} />

                <div>
                  <span>Disponible para instalar</span>

                  <strong>
                    Una experiencia más rápida y directa
                  </strong>
                </div>
              </div>

              <div className="capsos-pwa__benefits">
                <div className="capsos-pwa__benefit">
                  <FontAwesomeIcon icon={faBolt} />

                  <span>
                    Acceso rápido
                  </span>
                </div>

                <div className="capsos-pwa__benefit">
                  <FontAwesomeIcon icon={faWifi} />

                  <span>
                    Mejor experiencia
                  </span>
                </div>

                <div className="capsos-pwa__benefit">
                  <FontAwesomeIcon icon={faShieldAlt} />

                  <span>
                    Instalación segura
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <footer className="capsos-pwa__footer">
          {!isIos && (
            <button
              type="button"
              className="capsos-pwa__install"
              onClick={handleInstall}
              disabled={isInstalling}
            >
              <FontAwesomeIcon icon={faDownload} />

              {isInstalling
                ? 'Preparando instalación...'
                : 'Instalar aplicación'}
            </button>
          )}

          <button
            type="button"
            className="capsos-pwa__later"
            onClick={handleDismiss}
          >
            {isIos ? 'Entendido' : 'Ahora no'}
          </button>
        </footer>

        <div className="capsos-pwa__security">
          <FontAwesomeIcon icon={faShieldAlt} />

          <span>
            Instalación gratuita. No ocupa una descarga
            convencional desde una tienda.
          </span>
        </div>
      </div>

      <style>{`
        .capsos-pwa {
          position: fixed;
          right: 26px;
          bottom: 26px;
          z-index: 99999;
          width: min(460px, calc(100vw - 52px));
          font-family: inherit;
        }

        .capsos-pwa__card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 1.45rem;
          border: 1px solid rgba(255, 255, 255, 0.17);
          border-radius: 26px;
          color: #ffffff;
          background:
            radial-gradient(
              circle at 90% 5%,
              rgba(48, 199, 255, 0.22),
              transparent 32%
            ),
            linear-gradient(
              145deg,
              #041522 0%,
              #072b49 52%,
              #07598c 100%
            );
          box-shadow:
            0 30px 80px rgba(0, 17, 31, 0.34),
            0 12px 32px rgba(0, 17, 31, 0.24);
          backdrop-filter: blur(20px);
          animation:
            capsosPwaEnter 0.55s
            cubic-bezier(0.2, 0.75, 0.25, 1)
            both;
        }

        .capsos-pwa__card::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -2;
          opacity: 0.09;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.15) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.15) 1px,
              transparent 1px
            );
          background-size: 34px 34px;
          mask-image:
            linear-gradient(
              135deg,
              #000,
              transparent 75%
            );
        }

        .capsos-pwa__decoration {
          position: absolute;
          z-index: -1;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          pointer-events: none;
        }

        .capsos-pwa__decoration--one {
          top: -95px;
          right: -75px;
          width: 230px;
          height: 230px;
        }

        .capsos-pwa__decoration--two {
          right: 35px;
          bottom: -115px;
          width: 190px;
          height: 190px;
        }

        .capsos-pwa__close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 5;
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.76);
          background: rgba(255, 255, 255, 0.07);
          cursor: pointer;
          transition:
            transform 0.22s ease,
            color 0.22s ease,
            background 0.22s ease;
        }

        .capsos-pwa__close:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.15);
          transform: rotate(8deg);
        }

        .capsos-pwa__header {
          display: grid;
          grid-template-columns: 66px minmax(0, 1fr);
          align-items: center;
          gap: 1rem;
          padding-right: 2rem;
        }

        .capsos-pwa__logo-container {
          position: relative;
          width: 66px;
          height: 66px;
        }

        .capsos-pwa__logo {
          display: block;
          width: 66px;
          height: 66px;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 19px;
          background: #ffffff;
          box-shadow:
            0 14px 30px rgba(0, 0, 0, 0.24);
        }

        .capsos-pwa__status {
          position: absolute;
          right: -5px;
          bottom: -5px;
          display: grid;
          place-items: center;
          width: 24px;
          height: 24px;
          border: 3px solid #082b48;
          border-radius: 50%;
          color: #ffffff;
          background: #18c987;
          font-size: 0.66rem;
        }

        .capsos-pwa__heading {
          min-width: 0;
        }

        .capsos-pwa__eyebrow {
          display: block;
          margin-bottom: 0.3rem;
          color: #64dcff;
          font-size: 0.65rem;
          font-weight: 850;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .capsos-pwa__heading h2 {
          margin: 0 0 0.3rem;
          color: #ffffff;
          font-size: 1.18rem;
          font-weight: 820;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }

        .capsos-pwa__heading p {
          margin: 0;
          color: rgba(255, 255, 255, 0.63);
          font-size: 0.8rem;
          line-height: 1.45;
        }

        .capsos-pwa__content {
          margin-top: 1.25rem;
          padding-top: 1.15rem;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .capsos-pwa__platform {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding: 0.9rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.065);
        }

        .capsos-pwa__platform > svg {
          flex: 0 0 auto;
          color: #64dcff;
          font-size: 1.35rem;
          filter:
            drop-shadow(
              0 0 12px rgba(100, 220, 255, 0.35)
            );
        }

        .capsos-pwa__platform span,
        .capsos-pwa__platform strong {
          display: block;
        }

        .capsos-pwa__platform span {
          margin-bottom: 0.18rem;
          color: rgba(255, 255, 255, 0.53);
          font-size: 0.65rem;
          font-weight: 760;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .capsos-pwa__platform strong {
          color: #ffffff;
          font-size: 0.86rem;
          line-height: 1.35;
        }

        .capsos-pwa__benefits {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.6rem;
          margin-top: 0.8rem;
        }

        .capsos-pwa__benefit {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          min-height: 76px;
          padding: 0.65rem 0.45rem;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 14px;
          color: rgba(255, 255, 255, 0.78);
          background: rgba(255, 255, 255, 0.04);
          text-align: center;
        }

        .capsos-pwa__benefit svg {
          color: #64dcff;
          font-size: 0.95rem;
        }

        .capsos-pwa__benefit span {
          font-size: 0.68rem;
          font-weight: 680;
          line-height: 1.3;
        }

        .capsos-pwa__ios-steps {
          display: grid;
          gap: 0.65rem;
          margin-top: 0.8rem;
        }

        .capsos-pwa__ios-step {
          display: grid;
          grid-template-columns: 32px minmax(0, 1fr);
          align-items: center;
          gap: 0.7rem;
          padding: 0.75rem;
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.045);
        }

        .capsos-pwa__ios-step > span {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          color: #06213a;
          background: #64dcff;
          font-size: 0.75rem;
          font-weight: 850;
        }

        .capsos-pwa__ios-step p {
          margin: 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 0.78rem;
          line-height: 1.5;
        }

        .capsos-pwa__ios-step p svg {
          margin-left: 0.4rem;
          color: #64dcff;
        }

        .capsos-pwa__footer {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 0.65rem;
          margin-top: 1rem;
        }

        .capsos-pwa__install,
        .capsos-pwa__later {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          min-height: 48px;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
          transition:
            transform 0.24s ease,
            box-shadow 0.24s ease,
            background 0.24s ease;
        }

        .capsos-pwa__install {
          border: 0;
          color: #05243d;
          background:
            linear-gradient(
              135deg,
              #ffffff,
              #d8f6ff
            );
          box-shadow:
            0 12px 25px rgba(0, 0, 0, 0.17);
        }

        .capsos-pwa__install:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 16px 32px rgba(0, 0, 0, 0.22);
        }

        .capsos-pwa__install:disabled {
          opacity: 0.68;
          cursor: wait;
        }

        .capsos-pwa__later {
          border: 1px solid rgba(255, 255, 255, 0.17);
          color: rgba(255, 255, 255, 0.82);
          background: rgba(255, 255, 255, 0.055);
        }

        .capsos-pwa__later:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.11);
        }

        .capsos-pwa__security {
          display: flex;
          align-items: flex-start;
          gap: 0.48rem;
          margin-top: 0.8rem;
          color: rgba(255, 255, 255, 0.45);
          font-size: 0.62rem;
          line-height: 1.45;
        }

        .capsos-pwa__security svg {
          flex: 0 0 auto;
          margin-top: 0.12rem;
          color: #64dcff;
        }

        @keyframes capsosPwaEnter {
          from {
            opacity: 0;
            transform:
              translateY(28px)
              scale(0.96);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @media (max-width: 575.98px) {
          .capsos-pwa {
            right: 10px;
            bottom: 10px;
            left: 10px;
            width: auto;
          }

          .capsos-pwa__card {
            padding: 1.1rem;
            border-radius: 22px;
          }

          .capsos-pwa__header {
            grid-template-columns: 55px minmax(0, 1fr);
            gap: 0.8rem;
          }

          .capsos-pwa__logo-container,
          .capsos-pwa__logo {
            width: 55px;
            height: 55px;
          }

          .capsos-pwa__logo {
            border-radius: 16px;
          }

          .capsos-pwa__heading h2 {
            font-size: 1rem;
          }

          .capsos-pwa__heading p {
            font-size: 0.73rem;
          }

          .capsos-pwa__benefit {
            min-height: 68px;
          }

          .capsos-pwa__benefit span {
            font-size: 0.61rem;
          }

          .capsos-pwa__footer {
            grid-template-columns: 1fr;
          }

          .capsos-pwa__install,
          .capsos-pwa__later {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .capsos-pwa__card {
            animation: none;
          }

          .capsos-pwa__close,
          .capsos-pwa__install,
          .capsos-pwa__later {
            transition: none;
          }
        }
      `}</style>
    </aside>
  );
};

export default InstallPWA;