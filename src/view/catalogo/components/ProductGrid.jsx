import React from 'react';

import ProductCard
  from './ProductCard';

const ProductGrid = ({
  products,
  onClearFilters,
}) => {
  if (!products.length) {
    return (
      <div className="catalog-empty">
        <div className="catalog-empty-icon">
          <i
            className="fas fa-search"
            aria-hidden="true"
          />
        </div>

        <h3>
          No encontramos equipos
        </h3>

        <p>
          Prueba con otro término de
          búsqueda o vuelve a mostrar
          todas las categorías.
        </p>

        <button
          type="button"
          className="btn btn-corporate-primary"
          onClick={onClearFilters}
        >
          Mostrar todos los equipos
        </button>
      </div>
    );
  }

  return (
    <div className="catalog-product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
