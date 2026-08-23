import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { scroller } from 'react-scroll';

import LogoCapsos from '../assets/logos/logo-capsoshg.png';
import NperfLogo from '../assets/logos/nperf-new-logo.svg';

const HOME_ROUTES = ['/', '/page'];

const ROUTE_SECTION_MAP = {
  '/internet': 'internet',
  '/television': 'television',
  '/canal': 'canal',
  '/envivo': 'envivo',
};

const MENU_ITEMS = [
  {
    id: 'inicio',
    label: 'Inicio',
    type: 'scroll',
    icon: 'fa-house',
  },
  {
    id: 'internet',
    label: 'Internet',
    type: 'route',
    to: '/internet',
    icon: 'fa-wifi',
  },
  {
    id: 'television',
    label: 'Televisión',
    type: 'route',
    to: '/television',
    icon: 'fa-tv',
  },
  {
    id: 'canal',
    label: 'Canal CAPSOS',
    type: 'route',
    to: '/canal',
    icon: 'fa-satellite-dish',
  },
  {
    id: 'servicios',
    label: 'Servicios',
    type: 'scroll',
    icon: 'fa-layer-group',
  },
  {
    id: 'canales',
    label: 'Canales TV',
    type: 'scroll',
    icon: 'fa-list',
  },
  {
    id: 'nosotros',
    label: 'Nosotros',
    type: 'scroll',
    icon: 'fa-building',
  },
  {
    id: 'pqrsf',
    label: 'PQRSF',
    type: 'scroll',
    icon: 'fa-headset',
  },
];

const NavBarSection = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const requestedScrollSection = location.state?.scrollTo;

  const isHomeRoute = HOME_ROUTES.includes(location.pathname);

  const closeResponsiveMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleResponsiveMenu = () => {
    setMenuOpen((previousValue) => !previousValue);
  };

  const executeScroll = useCallback((sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 850,
      smooth: 'easeInOutQuart',
      offset: -100,
    });
  }, []);

  const scrollWhenReady = useCallback(
    function tryScroll(sectionId, attempt = 0) {
      const sectionElement = document.getElementById(sectionId);

      if (sectionElement) {
        executeScroll(sectionId);
        return;
      }

      if (attempt >= 20) {
        console.warn(
          `No fue posible encontrar la sección: ${sectionId}`
        );
        return;
      }

      window.setTimeout(() => {
        tryScroll(sectionId, attempt + 1);
      }, 100);
    },
    [executeScroll]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!isHomeRoute) {
        return;
      }

      const scrollSections = [
        'inicio',
        'servicios',
        'canales',
        'nosotros',
        'pqrsf',
      ];

      const referencePosition = 140;

      for (const sectionId of scrollSections) {
        const sectionElement = document.getElementById(sectionId);

        if (!sectionElement) {
          continue;
        }

        const sectionPosition =
          sectionElement.getBoundingClientRect();

        const sectionIsVisible =
          sectionPosition.top <= referencePosition &&
          sectionPosition.bottom >= referencePosition;

        if (sectionIsVisible) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomeRoute]);

  useEffect(() => {
    const routeSection = ROUTE_SECTION_MAP[location.pathname];

    if (routeSection) {
      setActiveSection(routeSection);
    } else if (isHomeRoute && !requestedScrollSection) {
      setActiveSection('inicio');
    }

    closeResponsiveMenu();
  }, [
    location.pathname,
    isHomeRoute,
    requestedScrollSection,
    closeResponsiveMenu,
  ]);

  useEffect(() => {
    if (!isHomeRoute || !requestedScrollSection) {
      return undefined;
    }

    setActiveSection(requestedScrollSection);

    const scrollTimer = window.setTimeout(() => {
      scrollWhenReady(requestedScrollSection);

      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }, 180);

    return () => {
      window.clearTimeout(scrollTimer);
    };
  }, [
    isHomeRoute,
    requestedScrollSection,
    scrollWhenReady,
    navigate,
    location.pathname,
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeResponsiveMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeResponsiveMenu]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (menuOpen && window.innerWidth < 1200) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId) => {
    closeResponsiveMenu();
    setActiveSection(sectionId);

    if (!isHomeRoute) {
      navigate('/', {
        state: {
          scrollTo: sectionId,
        },
      });

      return;
    }

    scrollWhenReady(sectionId);
  };

  const handleRouteClick = (sectionId) => {
    setActiveSection(sectionId);
    closeResponsiveMenu();
  };

  const handleLogoClick = (event) => {
    closeResponsiveMenu();

    if (!isHomeRoute) {
      return;
    }

    event.preventDefault();
    scrollToSection('inicio');
  };

  const getMenuItemClasses = (itemId) => {
    const isActive = activeSection === itemId;

    return [
      'nav-link-btn',
      'd-flex',
      'flex-column',
      'align-items-center',
      'justify-content-center',
      'gap-2',
      'text-center',
      'text-decoration-none',
      isActive ? 'active' : '',
    ]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <header
      className={`
        corporate-navbar
        ${scrolled ? 'scrolled' : ''}
      `}
    >
      <style>{`
        .corporate-navbar .speed-test-logo {
          display: block;
          width: 58px;
          height: 24px;
          flex: 0 0 auto;
          object-fit: contain;
        }

        .corporate-navbar .live-broadcast-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          min-height: 44px;
          padding: 0.72rem 0.95rem;
          border: 1px solid rgba(204, 0, 0, 0.2);
          border-radius: 10px;
          color: #ffffff;
          background: #cc0000;
          font-size: 0.78rem;
          font-weight: 800;
          text-decoration: none;
          white-space: nowrap;
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease;
        }

        .corporate-navbar .live-broadcast-button:hover,
        .corporate-navbar .live-broadcast-button.active {
          color: #ffffff;
          background: #990000;
          box-shadow: 0 10px 24px rgba(204, 0, 0, 0.22);
          transform: translateY(-2px);
        }

        .corporate-navbar .live-broadcast-icon {
          animation: navbarLivePulse 1.8s ease-in-out infinite;
        }

        @keyframes navbarLivePulse {
          0%,
          100% {
            opacity: 0.65;
            transform: scale(0.92);
          }

          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @media (max-width: 1199.98px) {
          .corporate-navbar .navbar-collapse {
            position: fixed;
            top: 78px;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1045;
            display: none;
            width: 100%;
            max-height: calc(100dvh - 78px);
            overflow-x: hidden;
            overflow-y: auto;
            padding: 1rem 1rem 2rem;
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
            backdrop-filter: blur(18px);
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
          }

          .corporate-navbar .navbar-collapse.show {
            display: block;
          }

          .corporate-navbar .navbar-content-row {
            display: flex !important;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            width: 100%;
            gap: 1.25rem;
            margin: 0;
          }

          .corporate-navbar .navbar-nav {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            width: 100%;
            gap: 0.55rem;
            margin: 0 !important;
          }

          .corporate-navbar .nav-item {
            width: 100%;
          }

          .corporate-navbar .nav-link-btn,
          .corporate-navbar .nav-link-route {
            display: grid !important;
            grid-template-columns: 42px minmax(0, 1fr);
            align-items: center !important;
            justify-content: flex-start !important;
            width: 100%;
            min-height: 54px;
            padding: 0.75rem 1rem;
            border: 1px solid rgba(0, 51, 102, 0.08);
            border-radius: 13px;
            color: #495057;
            background: #f8f9fa;
            text-align: left !important;
          }

          .corporate-navbar .nav-link-btn > span,
          .corporate-navbar .nav-link-route > span {
            text-align: left !important;
          }

          .corporate-navbar .nav-link-btn:hover,
          .corporate-navbar .nav-link-route:hover,
          .corporate-navbar .nav-link-btn.active,
          .corporate-navbar .nav-link-route.active {
            color: #ffffff !important;
            border-color: #003366;
            background: #003366;
          }

          .corporate-navbar .nav-link-btn::after,
          .corporate-navbar .nav-link-route::after {
            display: none;
          }

          .corporate-navbar .nav-actions {
            display: grid;
            grid-template-columns: 1fr;
            width: 100%;
            gap: 0.7rem;
            margin: 0;
            padding: 1rem 0 0;
            border-top: 1px solid #e9ecef;
          }

          .corporate-navbar .nav-actions > a,
          .corporate-navbar .live-broadcast-button {
            display: flex !important;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: 54px;
            margin: 0;
          }

          .corporate-navbar .speed-test-logo {
            width: 64px;
            height: 26px;
          }
        }

        @media (max-width: 575.98px) {
          .corporate-navbar .navbar-collapse {
            top: 72px;
            max-height: calc(100dvh - 72px);
            padding-right: 0.75rem;
            padding-left: 0.75rem;
          }

          .corporate-navbar .speed-test-logo {
            width: 58px;
            height: 24px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .corporate-navbar .live-broadcast-icon {
            animation: none !important;
          }
        }
      `}</style>

      <nav
        className="
          navbar
          navbar-expand-xl
          navbar-light
        "
        aria-label="Navegación principal de CAPSOS"
      >
        <div className="container-fluid px-3 px-xl-4">
          <Link
            to="/"
            className="navbar-brand"
            onClick={handleLogoClick}
            aria-label="Ir al inicio de CAPSOS Telecomunicaciones"
          >
            <img
              src={LogoCapsos}
              alt="CAPSOS Telecomunicaciones"
              className="nav-logo"
            />
          </Link>

          <button
            className="
              navbar-toggler
              border
              rounded-3
              shadow-sm
              p-2
            "
            type="button"
            onClick={toggleResponsiveMenu}
            aria-controls="navbarNav"
            aria-expanded={menuOpen}
            aria-label={
              menuOpen
                ? 'Cerrar menú de navegación'
                : 'Abrir menú de navegación'
            }
          >
            <i
              className={`
                fas
                ${menuOpen ? 'fa-xmark' : 'fa-bars'}
                fs-2
                text-dark
              `}
              aria-hidden="true"
            />
          </button>

          <div
            id="navbarNav"
            className={`
              collapse
              navbar-collapse
              ${menuOpen ? 'show' : ''}
            `}
          >
            <div className="navbar-content-row">
              <ul className="navbar-nav mx-auto">
                {MENU_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <li
                      className="nav-item"
                      key={item.id}
                    >
                      {item.type === 'scroll' ? (
                        <button
                          type="button"
                          className={getMenuItemClasses(item.id)}
                          onClick={() => {
                            scrollToSection(item.id);
                          }}
                          aria-current={
                            isActive ? 'page' : undefined
                          }
                        >
                          <span
                            className="
                              d-flex
                              align-items-center
                              justify-content-center
                              lh-1
                            "
                            aria-hidden="true"
                          >
                            <i
                              className={`fas ${item.icon} nav-menu-icon`}
                            />
                          </span>

                          <span
                            className="
                              d-block
                              text-center
                              text-nowrap
                            "
                          >
                            {item.label}
                          </span>
                        </button>
                      ) : (
                        <Link
                          to={item.to}
                          className={`
                            ${getMenuItemClasses(item.id)}
                            nav-link-route
                          `}
                          onClick={() => {
                            handleRouteClick(item.id);
                          }}
                          aria-current={
                            isActive ? 'page' : undefined
                          }
                        >
                          <span
                            className="
                              d-flex
                              align-items-center
                              justify-content-center
                              lh-1
                            "
                            aria-hidden="true"
                          >
                            <i
                              className={`fas ${item.icon} nav-menu-icon`}
                            />
                          </span>

                          <span
                            className="
                              d-block
                              text-center
                              text-nowrap
                            "
                          >
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="nav-actions">
                <Link
                  to="/envivo"
                  className={`live-broadcast-button ${
                    activeSection === 'envivo'
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    handleRouteClick('envivo');
                  }}
                  title="Ver transmisión en vivo"
                  aria-label="Ver transmisión en vivo"
                  aria-current={
                    activeSection === 'envivo'
                      ? 'page'
                      : undefined
                  }
                >
                  <i
                    className="
                      fas
                      fa-tower-broadcast
                      live-broadcast-icon
                    "
                    aria-hidden="true"
                  />

                  <span className="live-broadcast-content">
                    <strong>EN VIVO</strong>
                  </span>
                </Link>

                <a
                  href="https://www.nperf.com/es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-corporate-primary"
                  title="Realizar test de velocidad"
                  aria-label="Realizar test de velocidad de Internet con nPerf"
                  onClick={closeResponsiveMenu}
                >
                  <img
                    src={NperfLogo}
                    alt=""
                    className="speed-test-logo"
                    aria-hidden="true"
                  />

                  <span className="speed-test-content ms-2">
                    <strong>TEST DE VELOCIDAD</strong>
                  </span>
                </a>

                <a
                  href="https://wa.me/573044875527?text=Hola,%20quiero%20información%20sobre%20los%20servicios%20de%20CAPSOS."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-corporate-primary"
                  onClick={closeResponsiveMenu}
                  title="Solicitar información por WhatsApp"
                  aria-label="Solicitar información por WhatsApp"
                >
                  <i
                    className="fab fa-whatsapp"
                    aria-hidden="true"
                  />

                  <span className="ms-2">
                    Más información
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBarSection;