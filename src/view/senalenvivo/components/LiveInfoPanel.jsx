import React from 'react';
import {
  CONTACT_LINKS,
  LIVE_INFO_ITEMS,
} from '../config/senalEnVivo.config';

const LiveInfoPanel = () => (
  <div className="about-card-corporate live-information-panel">
    <div className="about-content-corporate">
      <div className="about-icon-corporate">
        <i className="fas fa-broadcast-tower" />
      </div>

      <div className="live-information-intro">
        <h3>Conexión en tiempo real</h3>
        <p>
          Sigue nuestra señal desde cualquier dispositivo con una experiencia
          clara, estable y adaptable.
        </p>
      </div>

      <div className="live-information-list">
        {LIVE_INFO_ITEMS.map((item) => (
          <div className="live-information-item" key={item.title}>
            <div className="live-information-item-icon">
              <i className={item.icon} />
            </div>

            <div>
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="live-panel-actions">
        <a
          href={CONTACT_LINKS.info}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-corporate-primary"
        >
          <i className="fab fa-whatsapp" />
          Solicitar información
        </a>

        <a
          href={CONTACT_LINKS.support}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-service-corporate btn-blue"
        >
          <i className="fas fa-headset" />
          Solicitar soporte
        </a>
      </div>
    </div>
  </div>
);

export default LiveInfoPanel;
