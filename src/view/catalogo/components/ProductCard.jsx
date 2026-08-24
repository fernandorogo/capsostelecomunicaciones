import React, {
  useState,
} from 'react';

import {
  createWhatsAppUrl,
} from '../utils/whatsapp';

const priceFormatter =
  new Intl.NumberFormat(
    'es-CO',
    {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }
  );

const ProductCard = ({
  product,
}) => {
  const [
    showAllFeatures,
    setShowAllFeatures,
  ] = useState(false);

  if (!product) {
    return null;
  }

  const visibleFeatures =
    showAllFeatures
      ? product.features
      : product.features.slice(0, 3);

  const hiddenFeatureCount =
    Math.max(
      product.features.length - 3,
      0
    );

  const whatsappMessage = [
    `Hola, estoy interesado en el equipo ${product.name}`,
    product.variant
      ? ` (${product.variant})`
      : '',
    `. El precio publicado es ${priceFormatter.format(
      product.price
    )}. Quisiera recibir más información.`,
  ].join('');

  return (
    <article
      className={`catalog-product-card ${
        product.recommended
          ? 'is-recommended'
          : ''
      }`}
    >
      <div className="catalog-product-media">
        <img
          src={product.image}
          alt={`Banner de ${product.name}`}
          loading="lazy"
          decoding="async"
        />

        <div
          className="catalog-product-media-overlay"
          aria-hidden="true"
        />

        <span className="catalog-product-category">
          <i
            className={product.icon}
            aria-hidden="true"
          />

          {product.categoryLabel}
        </span>

        {product.recommended && (
          <span className="catalog-product-recommended">
            <i
              className="fas fa-star"
              aria-hidden="true"
            />

            Recomendado
          </span>
        )}
      </div>

      <div className="catalog-product-body">
        {product.variant && (
          <span className="catalog-product-variant">
            {product.variant}
          </span>
        )}

        <h3>
          {product.name}
        </h3>

        <p className="catalog-product-description">
          {product.description}
        </p>

        <div className="catalog-product-price">
          <span>
            Precio
          </span>

          <strong>
            {priceFormatter.format(
              product.price
            )}
          </strong>
        </div>

        {product.idealFor?.length > 0 && (
          <div className="catalog-product-ideal">
            <span className="catalog-product-label">
              Ideal para
            </span>

            <div className="catalog-product-tags">
              {product.idealFor.map(
                (item) => (
                  <span key={item}>
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        <div className="catalog-product-features">
          <span className="catalog-product-label">
            Características principales
          </span>

          <ul>
            {visibleFeatures.map(
              (feature) => (
                <li key={feature}>
                  <i
                    className="fas fa-check"
                    aria-hidden="true"
                  />

                  <span>
                    {feature}
                  </span>
                </li>
              )
            )}
          </ul>

          {hiddenFeatureCount > 0 && (
            <button
              type="button"
              className="catalog-product-more"
              aria-expanded={
                showAllFeatures
              }
              onClick={() =>
                setShowAllFeatures(
                  (current) =>
                    !current
                )
              }
            >
              {showAllFeatures
                ? 'Ver menos'
                : `Ver ${hiddenFeatureCount} ${
                    hiddenFeatureCount === 1
                      ? 'característica'
                      : 'características'
                  } más`}

              <i
                className={`fas ${
                  showAllFeatures
                    ? 'fa-chevron-up'
                    : 'fa-chevron-down'
                }`}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>

      <div className="catalog-product-footer">
        <a
          href={createWhatsAppUrl(
            whatsappMessage
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="catalog-product-action"
          aria-label={`Consultar ${product.name} por WhatsApp`}
        >
          <i
            className="fab fa-whatsapp"
            aria-hidden="true"
          />

          <span>
            Consultar equipo
          </span>

          <i
            className="fas fa-arrow-right"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
};

export default ProductCard;
