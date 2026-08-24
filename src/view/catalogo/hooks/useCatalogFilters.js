import {
  useMemo,
  useState,
} from 'react';

const normalizeText = (
  value = ''
) =>
  value
    .normalize('NFD')
    .replace(
      /[\u0300-\u036f]/g,
      ''
    )
    .toLowerCase()
    .trim();

const getSearchableText = (
  product
) =>
  normalizeText(
    [
      product.name,
      product.variant,
      product.categoryLabel,
      product.description,
      ...(product.idealFor || []),
      ...(product.features || []),
    ]
      .filter(Boolean)
      .join(' ')
  );

export const useCatalogFilters = (
  products = []
) => {
  const [
    activeCategory,
    setActiveCategory,
  ] = useState('todos');

  const [
    searchTerm,
    setSearchTerm,
  ] = useState('');

  const [
    sortBy,
    setSortBy,
  ] = useState('order');

  const filteredProducts =
    useMemo(() => {
      const normalizedSearch =
        normalizeText(
          searchTerm
        );

      const result =
        products.filter(
          (product) => {
            const categoryMatches =
              activeCategory ===
                'todos' ||
              product.category ===
                activeCategory;

            const searchMatches =
              !normalizedSearch ||
              getSearchableText(
                product
              ).includes(
                normalizedSearch
              );

            return (
              categoryMatches &&
              searchMatches
            );
          }
        );

      return [
        ...result,
      ].sort(
        (a, b) => {
          switch (sortBy) {
            case 'price-asc':
              return (
                a.price -
                b.price
              );

            case 'price-desc':
              return (
                b.price -
                a.price
              );

            case 'name':
              return a.name.localeCompare(
                b.name,
                'es',
                {
                  sensitivity:
                    'base',
                }
              );

            case 'order':
            default:
              if (
                Boolean(
                  a.recommended
                ) !==
                Boolean(
                  b.recommended
                )
              ) {
                return a.recommended
                  ? -1
                  : 1;
              }

              return (
                a.order -
                b.order
              );
          }
        }
      );
    }, [
      activeCategory,
      products,
      searchTerm,
      sortBy,
    ]);

  const clearFilters = () => {
    setActiveCategory(
      'todos'
    );
    setSearchTerm('');
    setSortBy(
      'order'
    );
  };

  return {
    activeCategory,
    clearFilters,
    filteredProducts,
    resultCount:
      filteredProducts.length,
    searchTerm,
    setActiveCategory,
    setSearchTerm,
    setSortBy,
    sortBy,
  };
};
