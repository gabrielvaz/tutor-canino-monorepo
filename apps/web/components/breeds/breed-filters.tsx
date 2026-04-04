'use client';

import { useState } from 'react';
import { Button } from '@tutorcanino/ui';

interface BreedFiltersProps {
  onFilterChange: (filters: BreedFilters) => void;
}

export interface BreedFilters {
  category: string;
  orderBy: 'popularidade' | 'nome' | 'porte';
}

export function BreedFilters({ onFilterChange }: BreedFiltersProps) {
  const [category, setCategory] = useState<string>('todas');
  const [orderBy, setOrderBy] = useState<'popularidade' | 'nome' | 'porte'>('popularidade');

  const categories = [
    { value: 'todas', label: 'Todas as Raças' },
    { value: 'Pequeno', label: 'Pequeno Porte' },
    { value: 'Médio', label: 'Médio Porte' },
    { value: 'Grande', label: 'Grande Porte' },
    { value: 'Gigante', label: 'Gigantes' },
  ];

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onFilterChange({ category: value, orderBy });
  };

  const handleOrderByChange = (value: 'popularidade' | 'nome' | 'porte') => {
    setOrderBy(value);
    onFilterChange({ category, orderBy: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={category === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="md:w-64">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordenar por
          </label>
          <select
            value={orderBy}
            onChange={(e) => handleOrderByChange(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popularidade">Popularidade</option>
            <option value="nome">Nome (A-Z)</option>
            <option value="porte">Porte</option>
          </select>
        </div>
      </div>
    </div>
  );
}
