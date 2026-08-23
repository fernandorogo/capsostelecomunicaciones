import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NormativaFilters = ({
  categories,
  searchTerm,
  activeCategory,
  onSearchChange,
  onCategoryChange,
}) => (
  <div className="normativa-filter-panel">
    <label className="normativa-search">
      <span className="visually-hidden">
        Buscar normativas
      </span>

      <FontAwesomeIcon icon={faSearch} />

      <input
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar por nombre, número, año o entidad..."
        autoComplete="off"
      />
    </label>

    <div
      className="normativa-categories"
      role="group"
      aria-label="Filtrar normativas por categoría"
    >
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          className={`normativa-category-button ${
            activeCategory === category.value ? 'is-active' : ''
          }`}
          onClick={() => onCategoryChange(category.value)}
          aria-pressed={activeCategory === category.value}
        >
          {category.label}
        </button>
      ))}
    </div>
  </div>
);

export default NormativaFilters;
