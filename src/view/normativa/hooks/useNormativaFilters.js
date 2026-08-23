import { useMemo, useState } from 'react';

const normalizeText = (value = '') =>
  value
    .toString()
    .trim()
    .toLocaleLowerCase('es');

const useNormativaFilters = (normativas) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] =
    useState('all');

  const filteredNormativas = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return normativas.filter((norma) => {
      const matchesCategory =
        activeCategory === 'all' ||
        norma.categoryKey === activeCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableText = [
        norma.type,
        norma.number,
        norma.year,
        norma.title,
        norma.authority,
        norma.category,
        norma.summary,
        norma.status,
      ]
        .map(normalizeText)
        .join(' ');

      return searchableText.includes(normalizedSearch);
    });
  }, [
    activeCategory,
    normativas,
    searchTerm,
  ]);

  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
  };

  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredNormativas,
    clearFilters,
    hasActiveFilters:
      Boolean(searchTerm.trim()) ||
      activeCategory !== 'all',
  };
};

export default useNormativaFilters;
