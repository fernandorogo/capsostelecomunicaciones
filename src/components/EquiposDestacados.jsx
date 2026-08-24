import React from 'react';
import { Link } from 'react-router-dom';

import '../css/EquiposDestacados.css';

const equipos = [
  {
    id: 1,
    icon: 'fas fa-video',
    categoria: 'Seguridad',
    nombre: 'Cámaras inteligentes',
    descripcion:
      'Protege hogares, negocios y empresas con cámaras de seguridad, monitoreo remoto y funciones inteligentes.',
    etiqueta: 'Desde $106.000',
  },
  {
    id: 2,
    icon: 'fas fa-wifi',
    categoria: 'Conectividad',
    nombre: 'WiFi de mayor cobertura',
    descripcion:
      'Mejora la señal y elimina zonas con baja cobertura mediante extensores, routers y soluciones WiFi Mesh.',
    etiqueta: 'Soluciones para cada espacio',
  },
  {
    id: 3,
    icon: 'fas fa-network-wired',
    categoria: 'Redes',
    nombre: 'Equipos profesionales',
    descripcion:
      'Soluciones de conectividad para oficinas, hoteles, restaurantes, empresas y espacios con múltiples usuarios.',
    etiqueta: 'Alto rendimiento',
  },
];

const EquiposDestacados = () => {
  return (
    <section
      className="equipos-home"
      id="equipos"
      aria-labelledby="equipos-home-title"
    >
      <div className="container">
        <div className="equipos-home-header">
          <div>
            <span className="equipos-home-kicker">
              EQUIPOS Y TECNOLOGÍA
            </span>

            <h2 id="equipos-home-title">
              Tecnología para conectar y proteger
            </h2>

            <p>
              Encuentra soluciones para mejorar tu conexión a internet,
              ampliar la cobertura WiFi y proteger tus espacios con
              equipos confiables y de alto rendimiento.
            </p>
          </div>

          <Link
            to="/catalogo"
            className="equipos-home-header-link"
          >
            Ver catálogo completo

            <i
              className="fas fa-arrow-right"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="equipos-home-grid">
          {equipos.map((equipo) => (
            <article
              className="equipo-home-card"
              key={equipo.id}
            >
              <div className="equipo-home-icon">
                <i
                  className={equipo.icon}
                  aria-hidden="true"
                />
              </div>

              <div className="equipo-home-content">
                <span className="equipo-home-category">
                  {equipo.categoria}
                </span>

                <h3>{equipo.nombre}</h3>

                <p>{equipo.descripcion}</p>

                <div className="equipo-home-footer">
                  <span>{equipo.etiqueta}</span>

                  <Link
                    to="/catalogo"
                    className="equipo-home-arrow"
                    aria-label={`Ver ${equipo.nombre}`}
                  >
                    <i
                      className="fas fa-arrow-right"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="equipos-home-mobile-action">
          <Link
            to="/catalogo"
            className="btn btn-corporate-primary"
          >
            Ver todos los equipos

            <i
              className="fas fa-arrow-right ms-2"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EquiposDestacados;