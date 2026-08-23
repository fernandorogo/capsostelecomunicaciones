import React from 'react';

const getPlayerState = (status) => {
  if (status === 'error') {
    return {
      placeholderClass: 'is-error',
      iconClass: 'fas fa-exclamation-triangle',
      title: 'No se pudo iniciar la transmisión',
      badgeText: 'SEÑAL',
      badgeTitle: 'No fue posible iniciar la transmisión',
    };
  }

  if (status === 'ready') {
    return {
      placeholderClass: 'is-ready',
      iconClass: 'fas fa-circle-notch fa-spin',
      title: 'Señal lista',
      badgeText: 'EN VIVO',
      badgeTitle: 'Transmisión disponible',
    };
  }

  return {
    placeholderClass: '',
    iconClass: 'fas fa-circle-notch fa-spin',
    title: 'Preparando transmisión',
    badgeText: 'EN VIVO',
    badgeTitle: 'Conectando con la transmisión',
  };
};

const LivePlayer = ({ containerRef, status, message }) => {
  const playerState = getPlayerState(status);

  return (
    <div className="live-player-card">
      <div className="live-player-container">
        <div
          className={`live-player-placeholder ${playerState.placeholderClass}`}
          aria-live="polite"
        >
          <i className={playerState.iconClass} />
          <div>
            <strong>{playerState.title}</strong>
            <p>{message}</p>
          </div>
        </div>

        <div
          className="live-player-badge"
          title={playerState.badgeTitle}
        >
          <span />
          {playerState.badgeText}
        </div>

        <div
          id="teveo"
          ref={containerRef}
          aria-label="Reproductor de la señal en vivo de CAPSOS"
        />
      </div>

      <div className="live-player-footer">
        <div className="live-player-footer-main">
          <div className="live-player-footer-icon">
            <i className="fas fa-broadcast-tower" />
          </div>

          <div>
            <strong>CAPSOS en directo</strong>
            <p>
              Activa el sonido para disfrutar completamente la transmisión.
            </p>
          </div>
        </div>

        <span className="live-quality-label">
          <i className="fas fa-wifi" />
          Señal digital
        </span>
      </div>
    </div>
  );
};

export default LivePlayer;
