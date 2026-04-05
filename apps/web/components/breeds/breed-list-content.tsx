'use client';

import { useState, useMemo } from 'react';
import type { Breed } from '@tutorcanino/data';
import { BreedGrid } from './breed-grid';
import { BreedFilters, type BreedFilters as FilterType } from './breed-filters';

interface BreedListContentProps {
  initialBreeds: Breed[];
}

export function BreedListContent({ initialBreeds }: BreedListContentProps) {
  const [filters, setFilters] = useState<FilterType>({
    category: 'todas',
    orderBy: 'popularidade',
  });

  const filteredAndSortedBreeds = useMemo(() => {
    let result = [...initialBreeds];

    // Filter by category
    if (filters.category !== 'todas') {
      result = result.filter((breed) => breed.categoria === filters.category);
    }

    // Sort
    result.sort((a, b) => {
      if (filters.orderBy === 'popularidade') {
        return (b.popularidade || 0) - (a.popularidade || 0);
      }
      if (filters.orderBy === 'nome') {
        return a.nome.localeCompare(b.nome);
      }
      if (filters.orderBy === 'porte') {
        const order = { 'Pequeno': 1, 'Médio': 2, 'Grande': 3, 'Gigante': 4 };
        const aOrder = order[a.categoria as keyof typeof order] || 5;
        const bOrder = order[b.categoria as keyof typeof order] || 5;
        return aOrder - bOrder;
      }
      return 0;
    });

    return result;
  }, [initialBreeds, filters]);

  return (
    <>
      <BreedFilters 
        onFilterChange={setFilters} 
        totalResults={filteredAndSortedBreeds.length} 
      />
      <BreedGrid breeds={filteredAndSortedBreeds} />
    </>
  );
}
