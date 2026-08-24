import React, {
  useEffect,
  useRef,
} from 'react';

import '../css/HomeRedesign.css';
import './catalogo/styles/CatalogoEquipos.css';

import {
  CatalogControls,
  CatalogHero,
  FinalCta,
  ProductGrid,
  SectionHeading,
} from './catalogo/components';

import {
  catalogCategories,
  catalogProducts,
  catalogStats,
  finalCtaContent,
  heroContent,
} from './catalogo/data/catalogoData';

import { useCatalogFilters } from './catalogo/hooks/useCatalogFilters';

const CatalogoEquipos = () => {
  const catalogRef = useRef(null);

  const {
    activeCategory,
    clearFilters,
    filteredProducts,
    resultCount,
    searchTerm,
    setActiveCategory,
    setSearchTerm,
    setSortBy,
    sortBy,
  } = useCatalogFilters(catalogProducts);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="home-corporate catalog-page">
      <CatalogHero
        content={heroContent}
        stats={catalogStats}
        onExplore={scrollToCatalog}
      />

      <main className="catalog-main">
        <section
          ref={catalogRef}
          id="catalogo-equipos"
          className="catalog-library"
          aria-labelledby="catalog-products-title"
        >
          <div className="container">
            <SectionHeading
              id="catalog-products-title"
              kicker="EQUIPOS Y TECNOLOGÍA"
              title="Encuentra la solución adecuada"
              description="Explora equipos de conectividad y seguridad para hogares, negocios y empresas."
              count={resultCount}
            />

            <CatalogControls
              categories={catalogCategories}
              activeCategory={activeCategory}
              searchTerm={searchTerm}
              sortBy={sortBy}
              onCategoryChange={setActiveCategory}
              onSearchChange={setSearchTerm}
              onSortChange={setSortBy}
            />

            <ProductGrid
              products={filteredProducts}
              onClearFilters={clearFilters}
            />
          </div>
        </section>

        <FinalCta content={finalCtaContent} />
      </main>
    </div>
  );
};

export default CatalogoEquipos;
