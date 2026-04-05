'use client';

import { useState } from 'react';
import { Button, cn } from '@tutorcanino/ui';
import { Heart, Zap, Shield, Star, Filter, ArrowUpDown } from 'lucide-react';

interface BreedFiltersProps {
  onFilterChange: (filters: BreedFilters) => void;
  totalResults: number;
}

export interface BreedFilters {
  category: string;
  orderBy: 'popularidade' | 'nome' | 'porte';
}

export function BreedFilters({ onFilterChange, totalResults }: BreedFiltersProps) {
  const [category, setCategory] = useState<string>('todas');
  const [orderBy, setOrderBy] = useState<'popularidade' | 'nome' | 'porte'>('popularidade');

  const categories = [
    { value: 'todas', label: 'Todas', icon: <Filter size={14} /> },
    { value: 'Pequeno', label: 'Pequeno', icon: <Heart size={14} /> },
    { value: 'Médio', label: 'Médio', icon: <Zap size={14} /> },
    { value: 'Grande', label: 'Grande', icon: <Shield size={14} /> },
    { value: 'Gigante', label: 'Gigante', icon: <Star size={14} /> },
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
    <div className="space-y-6 mb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Filtrar por Porte</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2",
                  category === cat.value
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-105"
                    : "bg-white border-gray-100 text-gray-500 hover:border-primary/20 hover:text-primary"
                )}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-72">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Ordenar</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors">
              <ArrowUpDown size={16} />
            </div>
            <select
              value={orderBy}
              onChange={(e) => handleOrderByChange(e.target.value as any)}
              className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-bold text-gray-700 appearance-none cursor-pointer"
            >
              <option value="popularidade">Mais Populares</option>
              <option value="nome">Nome (A-Z)</option>
              <option value="porte">Porte (Crescente)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 border-y border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-sm font-bold text-gray-600">
            Mostrando <span className="text-gray-900">{totalResults}</span> raças encontradas
          </span>
        </div>
      </div>
    </div>
  );
}
