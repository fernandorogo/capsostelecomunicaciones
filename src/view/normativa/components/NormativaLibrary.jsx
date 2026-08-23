import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import NormativaCard from './NormativaCard';
import NormativaFilters from './NormativaFilters';

const NormativaLibrary = ({
  normativas,
  filteredNormativas,
  categories,
  searchTerm,
  activeCategory,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onClearFilters,
}) => (
  <section
    className="normativa-library"
    id="biblioteca-normativa"
    aria-labelledby="normativa-library-title"
  >
    <div className="container">
      <header className="normativa-library__heading">
        <div>
          <span className="normativa-kicker">
            Biblioteca normativa
          </span>

          <h2 id="normativa-library-title">
            Documentos esenciales para una
            <span> operación informada.</span>
          </h2>
        </div>

        <p>
          Consulta disposiciones relacionadas con el sector TIC,
          protección de datos, derechos de usuarios, vigilancia
          preventiva y seguridad en Internet.
        </p>
      </header>

      <NormativaFilters
        categories={categories}
        searchTerm={searchTerm}
        activeCategory={activeCategory}
        onSearchChange={onSearchChange}
        onCategoryChange={onCategoryChange}
      />

      <div className="normativa-results" aria-live="polite">
        <span>
          Mostrando <strong>{filteredNormativas.length}</strong> de{' '}
          <strong>{normativas.length}</strong> disposiciones
        </span>

        {hasActiveFilters && (
          <button type="button" onClick={onClearFilters}>
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="normativa-grid">
        {filteredNormativas.map((norma, index) => (
          <NormativaCard
            key={norma.id}
            norma={norma}
            index={index}
          />
        ))}

        {filteredNormativas.length === 0 && (
          <div className="normativa-empty">
            <span className="normativa-empty__icon" aria-hidden="true">
              <FontAwesomeIcon icon={faSearch} />
            </span>

            <h3>No encontramos coincidencias</h3>

            <p>
              Prueba con otro número, palabra clave o categoría.
            </p>

            <button type="button" onClick={onClearFilters}>
              Mostrar todas las normativas
            </button>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default NormativaLibrary;
