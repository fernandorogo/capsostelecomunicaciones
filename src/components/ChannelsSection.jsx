import React from 'react';
import { canales } from './homeData';

const ChannelsSection = () => {
  const allCanales = [...canales, ...canales];

  return (
    <section className="channels-corporate" id="canales">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Programación</span>
          <h2 className="section-title">Canales en Alta Definición</h2>
          <p className="section-desc">
            Disfruta de contenido local, nacional e internacional de la más alta calidad.
          </p>
        </div>
      </div>

      <div className="channels-marquee-corporate">
        <div className="marquee-track-corporate">
          {allCanales.map((img, index) => (
            <div className="channel-item-corporate" key={index}>
              <img src={img} alt={`Canal ${index + 1}`} className="channel-logo-corporate" />
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="channels-grid">
          <div className="channel-category">
            <div className="category-icon">
              <i className="fas fa-film"></i>
            </div>
            <h4>Entretenimiento</h4>
            <p>Películas, series y contenido premium</p>
          </div>

          <div className="channel-category">
            <div className="category-icon">
              <i className="fas fa-futbol"></i>
            </div>
            <h4>Deportes</h4>
            <p>Todos los eventos deportivos en vivo</p>
          </div>

          <div className="channel-category">
            <div className="category-icon">
              <i className="fas fa-newspaper"></i>
            </div>
            <h4>Noticias</h4>
            <p>Información local, nacional e internacional</p>
          </div>

          <div className="channel-category">
            <div className="category-icon">
              <i className="fas fa-child"></i>
            </div>
            <h4>Infantil</h4>
            <p>Contenido educativo y divertido</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChannelsSection;