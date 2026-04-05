import { getBreedsByCategory, type Breed } from '@tutorcanino/data';
import { BreedCard } from './breed-card';
import { PawPrint } from 'lucide-react';

interface RelatedBreedsProps {
  currentBreed: Breed;
}

export function RelatedBreeds({ currentBreed }: RelatedBreedsProps) {
  const allRelated = getBreedsByCategory(currentBreed.categoria);
  
  // Filter out the current breed and take 4 random/top ones
  const related = allRelated
    .filter(b => b.id !== currentBreed.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50/50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-black uppercase tracking-widest mb-4">
              <PawPrint size={14} />
              <span>Exploração</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Outras Raças de <span className="text-secondary">{currentBreed.categoria} Porte</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl font-medium">
              Se você gostou do {currentBreed.nome}, também pode se interessar por estas outras raças com características semelhantes de porte.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {related.map((breed) => (
            <BreedCard key={breed.id} breed={breed} />
          ))}
        </div>
      </div>
    </section>
  );
}
