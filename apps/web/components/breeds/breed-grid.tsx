import { BreedCard } from './breed-card';
import type { Breed } from '@tutorcanino/data';

interface BreedGridProps {
  breeds: Breed[];
}

export function BreedGrid({ breeds }: BreedGridProps) {
  if (breeds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nenhuma raça encontrada.</p>
        <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros de busca.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {breeds.map((breed) => (
        <BreedCard key={breed.id} breed={breed} />
      ))}
    </div>
  );
}
