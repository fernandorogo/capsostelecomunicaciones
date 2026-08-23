import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChild,
  faFilm,
  faFutbol,
  faGlobe,
  faHome,
  faMusic,
  faNewspaper,
  faPrayingHands,
  faSearch,
  faSignal,
  faTv,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';

import ChannelLogo from './ChannelLogo';
import SectionHeading from './SectionHeading';

const ANALOG_CATEGORY_CONFIG = [
  { category: 'Nacionales y regionales', icon: faHome },
  { category: 'Infantiles', icon: faChild },
  { category: 'Deportivos', icon: faFutbol },
  { category: 'Documentales y naturaleza', icon: faGlobe },
  { category: 'Cine y entretenimiento', icon: faFilm },
  { category: 'Noticias', icon: faNewspaper },
  { category: 'Música', icon: faMusic },
  { category: 'Religión', icon: faPrayingHands },
  { category: 'Hogar y estilo de vida', icon: faUtensils },
];

const ChannelGuide = ({ groups = [], analogChannels = [] }) => {
  const [guideMode, setGuideMode] = useState('digital');
  const [activeDigitalGroup, setActiveDigitalGroup] = useState(0);
  const [activeAnalogGroup, setActiveAnalogGroup] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const analogGroups = useMemo(
    () =>
      ANALOG_CATEGORY_CONFIG.map(({ category, icon }) => ({
        category,
        icon,
        items: analogChannels
          .filter((channel) => channel.category === category)
          .map((channel) => [String(channel.number), channel.name]),
      })).filter((group) => group.items.length > 0),
    [analogChannels]
  );

  const currentGroups = guideMode === 'digital' ? groups : analogGroups;
  const activeGroupIndex =
    guideMode === 'digital' ? activeDigitalGroup : activeAnalogGroup;
  const selectedGroup = currentGroups[activeGroupIndex] || currentGroups[0];

  const visibleChannels = useMemo(() => {
    if (!selectedGroup) return [];

    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return selectedGroup.items;

    return selectedGroup.items.filter(([number, name]) =>
      `${number} ${name}`.toLowerCase().includes(normalizedSearch)
    );
  }, [searchTerm, selectedGroup]);

  const selectChannelGroup = (index) => {
    if (guideMode === 'digital') {
      setActiveDigitalGroup(index);
    } else {
      setActiveAnalogGroup(index);
    }

    setSearchTerm('');
  };

  const selectGuideMode = (mode) => {
    setGuideMode(mode);
    setSearchTerm('');
  };

  const isDigital = guideMode === 'digital';
  const searchPlaceholder = isDigital
    ? 'Buscar canal digital o número'
    : 'Buscar canal analógico o número';

  return (
    <section className="tv-section tv-guide-section" id="parrilla-canales">
      <div className="container">
        <div className="tv-guide-shell">
          <div className="tv-guide-top">
            <SectionHeading
              label="Parrilla de canales"
              title="Encuentra tu contenido favorito."
              description="Selecciona el tipo de televisión y consulta sus canales por categoría. Cada señal se presenta con su número, identidad visual y nombre."
            />

            <label className="tv-guide-search">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
              />
            </label>
          </div>

          <div
            className="tv-guide-service-switch"
            role="group"
            aria-label="Seleccionar tipo de parrilla de televisión"
          >
            <button
              type="button"
              className={`tv-guide-service-card ${isDigital ? 'active' : ''}`}
              aria-pressed={isDigital}
              onClick={() => selectGuideMode('digital')}
            >
              <span className="tv-guide-service-icon">
                <FontAwesomeIcon icon={faTv} />
              </span>

              <span className="tv-guide-service-copy">
                <small>Televisión</small>
                <strong>Digital</strong>
                <span>Canales digitales organizados por categorías</span>
              </span>

              <span className="tv-guide-service-count">
                <strong>108+</strong>
                <small>canales</small>
              </span>
            </button>

            <button
              type="button"
              className={`tv-guide-service-card ${!isDigital ? 'active' : ''}`}
              aria-pressed={!isDigital}
              onClick={() => selectGuideMode('analog')}
            >
              <span className="tv-guide-service-icon">
                <FontAwesomeIcon icon={faSignal} />
              </span>

              <span className="tv-guide-service-copy">
                <small>Televisión</small>
                <strong>Analógica</strong>
                <span>Canales analógicos organizados por categorías</span>
              </span>

              <span className="tv-guide-service-count">
                <strong>{analogChannels.length}</strong>
                <small>canales</small>
              </span>
            </button>
          </div>

          <div className="tv-guide-body">
            <div
              className="tv-guide-tabs"
              role="tablist"
              aria-label={`Categorías de canales ${
                isDigital ? 'digitales' : 'analógicos'
              }`}
            >
              {currentGroups.map((group, index) => (
                <button
                  key={`${guideMode}-${group.category}`}
                  type="button"
                  role="tab"
                  aria-selected={activeGroupIndex === index}
                  className={`tv-guide-tab ${
                    activeGroupIndex === index ? 'active' : ''
                  }`}
                  onClick={() => selectChannelGroup(index)}
                >
                  <span className="tv-guide-tab-icon">
                    <FontAwesomeIcon icon={group.icon || faTv} />
                  </span>
                  <strong>{group.category}</strong>
                  <small>{group.items.length}</small>
                </button>
              ))}
            </div>

            <div className="tv-guide-results" role="tabpanel">
              {selectedGroup && (
                <div className="tv-guide-results-header">
                  <div className="tv-guide-results-title">
                    <div className="tv-guide-results-icon">
                      <FontAwesomeIcon icon={selectedGroup.icon || faTv} />
                    </div>
                    <div>
                      <h3>{selectedGroup.category}</h3>
                      <span>
                        Canales disponibles en la parrilla{' '}
                        {isDigital ? 'digital' : 'analógica'}
                      </span>
                    </div>
                  </div>

                  <span>{visibleChannels.length} resultados</span>
                </div>
              )}

              {visibleChannels.length > 0 ? (
                <div className="tv-channel-grid">
                  {visibleChannels.map(([number, name]) => (
                    <div
                      className="tv-channel-item"
                      key={`${guideMode}-${selectedGroup?.category}-${number}-${name}`}
                    >
                      <span className="tv-channel-number">CH {number}</span>
                      <ChannelLogo name={name} />
                      <span className="tv-channel-name" title={name}>
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tv-guide-empty">
                  <div>
                    <FontAwesomeIcon icon={faSearch} />
                    <h4>No encontramos ese canal</h4>
                    <p>
                      Prueba con otro nombre o número dentro de esta categoría.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChannelGuide;
