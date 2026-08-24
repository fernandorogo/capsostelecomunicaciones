import React from 'react';

const CatalogControls = ({
  categories,
  activeCategory,
  searchTerm,
  sortBy,
  onCategoryChange,
  onSearchChange,
  onSortChange,
}) => {
  return (
    <div className="catalog-controls">
      <div className="catalog-search-row">
        <label className="catalog-search">
          <span className="visually-hidden">
            Buscar equipos
          </span>

          <i
            className="fas fa-search"
            aria-hidden="true"
          />

          <input
            type="search"
            value={searchTerm}
            placeholder="Buscar cámaras, routers, WiFi..."
            autoComplete="off"
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
          />

          {searchTerm && (
            <button
              type="button"
              className="catalog-search-clear"
              onClick={() =>
                onSearchChange('')
              }
              aria-label="Limpiar búsqueda"
            >
              <i
                className="fas fa-times"
                aria-hidden="true"
              />
            </button>
          )}
        </label>

        <label className="catalog-sort">
          <span>
            Ordenar
          </span>

          <select
            value={sortBy}
            onChange={(event) =>
              onSortChange(event.target.value)
            }
          >
            <option value="order">
              Recomendados
            </option>

            <option value="price-asc">
              Precio: menor a mayor
            </option>

            <option value="price-desc">
              Precio: mayor a menor
            </option>

            <option value="name">
              Nombre A-Z
            </option>
          </select>
        </label>
      </div>

      <div
        className="catalog-category-list"
        aria-label="Categorías del catálogo"
      >
        {categories.map((category) => {
          const isActive =
            activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              className={`catalog-category-button ${
                isActive
                  ? 'is-active'
                  : ''
              }`}
              aria-pressed={isActive}
              onClick={() =>
                onCategoryChange(category.id)
              }
            >
              <i
                className={category.icon}
                aria-hidden="true"
              />

              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CatalogControls;
