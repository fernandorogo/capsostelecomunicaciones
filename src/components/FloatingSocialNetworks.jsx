import React from 'react';

const SOCIAL_NETWORKS = [
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/capsostv',
    icon: 'fab fa-facebook-f',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/capsostelecomunicaciones/',
    icon: 'fab fa-instagram',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/capsostelecomunicaciones',
    icon: 'fab fa-youtube',
  },
];

const FloatingSocialNetworks = () => {
  return (
    <>
      <style>{`
        .capsos-social-minimal {
          position: fixed;
          top: 50%;
          left: 24px;
          z-index: 1020;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.7rem;
          transform: translateY(-50%);
        }

        .capsos-social-minimal::before {
          content: '';
          position: absolute;
          top: -42px;
          bottom: -42px;
          left: 50%;
          z-index: -1;
          width: 1px;
          background:
            linear-gradient(
              180deg,
              transparent 0%,
              rgba(0, 51, 102, 0.28) 22%,
              rgba(204, 0, 0, 0.58) 50%,
              rgba(0, 51, 102, 0.28) 78%,
              transparent 100%
            );
          transform: translateX(-50%);
        }

        .capsos-social-minimal__title {
          position: absolute;
          top: -68px;
          left: 50%;
          color: var(--capsos-blue, #003366);
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
          transform:
            translateX(-50%)
            rotate(-90deg);
          transform-origin: center;
        }

        .capsos-social-minimal__list {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .capsos-social-minimal__item {
          position: relative;
        }

        .capsos-social-minimal__link {
          position: relative;
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          border: 1px solid rgba(0, 51, 102, 0.13);
          border-radius: 50%;
          color: var(--capsos-blue, #003366);
          background: rgba(255, 255, 255, 0.94);
          box-shadow:
            0 10px 24px rgba(0, 34, 68, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          text-decoration: none;
          backdrop-filter: blur(10px);
          transition:
            transform 0.24s ease,
            color 0.24s ease,
            background 0.24s ease,
            border-color 0.24s ease,
            box-shadow 0.24s ease;
        }

        .capsos-social-minimal__link::after {
          content: '';
          position: absolute;
          inset: 5px;
          border: 1px solid transparent;
          border-radius: inherit;
          transition:
            inset 0.24s ease,
            border-color 0.24s ease;
        }

        .capsos-social-minimal__link:hover,
        .capsos-social-minimal__link:focus-visible {
          color: #ffffff;
          border-color: var(--capsos-blue, #003366);
          background: var(--capsos-blue, #003366);
          box-shadow:
            0 14px 28px rgba(0, 51, 102, 0.2),
            0 0 0 4px rgba(0, 51, 102, 0.08);
          transform: translateX(4px);
          outline: none;
        }

        .capsos-social-minimal__link:hover::after,
        .capsos-social-minimal__link:focus-visible::after {
          inset: 3px;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .capsos-social-minimal__label {
          position: absolute;
          top: 50%;
          left: calc(100% + 14px);
          min-width: 98px;
          padding: 0.48rem 0.7rem;
          border: 1px solid rgba(0, 51, 102, 0.09);
          border-radius: 8px;
          color: var(--capsos-blue, #003366);
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 10px 24px rgba(0, 34, 68, 0.13);
          font-size: 0.72rem;
          font-weight: 750;
          text-align: center;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transform: translate(-6px, -50%);
          transition:
            opacity 0.18s ease,
            transform 0.24s ease;
        }

        .capsos-social-minimal__label::before {
          content: '';
          position: absolute;
          top: 50%;
          right: 100%;
          width: 8px;
          height: 8px;
          border-bottom: 1px solid rgba(0, 51, 102, 0.09);
          border-left: 1px solid rgba(0, 51, 102, 0.09);
          background: #ffffff;
          transform:
            translate(4px, -50%)
            rotate(45deg);
        }

        .capsos-social-minimal__link:hover
          .capsos-social-minimal__label,
        .capsos-social-minimal__link:focus-visible
          .capsos-social-minimal__label {
          opacity: 1;
          transform: translate(0, -50%);
        }

        .capsos-social-minimal__footer {
          position: absolute;
          bottom: -58px;
          left: 50%;
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border: 1px solid rgba(204, 0, 0, 0.18);
          border-radius: 50%;
          color: var(--capsos-red, #cc0000);
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 8px 18px rgba(0, 34, 68, 0.1);
          font-size: 0.65rem;
          transform: translateX(-50%);
        }

        @media (max-width: 1199.98px) {
          .capsos-social-minimal {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .capsos-social-minimal__link,
          .capsos-social-minimal__label {
            transition: none;
          }
        }
      `}</style>

      <aside
        className="capsos-social-minimal"
        aria-label="Redes sociales de CAPSOS"
      >
        <span
          className="capsos-social-minimal__title"
          aria-hidden="true"
        >
          Redes
        </span>

        <ul className="capsos-social-minimal__list">
          {SOCIAL_NETWORKS.map((socialNetwork) => (
            <li
              className="capsos-social-minimal__item"
              key={socialNetwork.id}
            >
              <a
                href={socialNetwork.url}
                target="_blank"
                rel="noopener noreferrer"
                className="capsos-social-minimal__link"
                aria-label={`Visitar ${socialNetwork.name} de CAPSOS`}
              >
                <i
                  className={socialNetwork.icon}
                  aria-hidden="true"
                />

                <span
                  className="capsos-social-minimal__label"
                  aria-hidden="true"
                >
                  {socialNetwork.name}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <span
          className="capsos-social-minimal__footer"
          aria-hidden="true"
        >
          <i className="fas fa-share-nodes" />
        </span>
      </aside>
    </>
  );
};

export default FloatingSocialNetworks;