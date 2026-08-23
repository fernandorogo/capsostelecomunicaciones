import React from 'react';

const ManifestoSection = () => (
  <section className="oc-manifesto">
    <div className="container">
      <div className="oc-manifesto-grid">
        <div>
          <span className="oc-section-label">Tu propio medio</span>
          <h2 className="oc-manifesto-title">
            No es solamente televisión. Es{' '}
            <span>identidad, influencia y conexión.</span>
          </h2>
        </div>

        <p className="oc-manifesto-copy">
          Un canal propio convierte la comunicación en un activo estratégico. Tu
          organización deja de depender únicamente de medios externos y obtiene
          un espacio para informar, formar, inspirar y construir una relación
          permanente con su audiencia.
        </p>
      </div>

      <div className="oc-manifesto-points">
        <article className="oc-manifesto-point">
          <strong>Una voz reconocible</strong>
          <p>
            Lenguaje, estética y enfoque editorial alineados con lo que tu
            organización representa.
          </p>
        </article>

        <article className="oc-manifesto-point">
          <strong>Una audiencia propia</strong>
          <p>
            Contenidos pensados para las personas que realmente necesitas
            informar, acompañar o movilizar.
          </p>
        </article>

        <article className="oc-manifesto-point">
          <strong>Una señal con propósito</strong>
          <p>
            Programación que comunica objetivos, visibiliza resultados y crea
            valor más allá de una emisión.
          </p>
        </article>
      </div>
    </div>
  </section>
);

export default ManifestoSection;
