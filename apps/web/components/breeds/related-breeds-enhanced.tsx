import { getBreedBySlug, getBreedByCategory, type Breed } from '@tutorcanino/data';
import { BreedCard } from './breed-card';
import { PawPrint } from 'lucide-react';

interface RelatedBreedsProps {
  currentBreed: Breed;
}

/**
 * Enhanced RelatedBreeds that uses racas_relacionadas from the schema
 * Falls back to category-based selection if not specified
 */
export function RelatedBreedsEnhanced({ currentBreed }: RelatedBreedsProps) {
  let relatedBreeds: Breed[] = [];

  // Use racas_relacionadas if available
  if (currentBreed.racas_relacionadas && currentBreed.racas_relacionadas.length > 0) {
    // Fetch the explicitly related breeds
    relatedBreeds = currentBreed.racas_relacionadas
      .map((slug) => getBreedBySlug(slug))
      .filter((breed): breed is Breed => breed !== null);
  }

  // Fallback: use category-based logic if no related breeds specified or too few
  if (!relatedBreeds || relatedBreeds.length < 3) {
    const allInCategory = getBreedByCategory(currentBreed.categoria);
    relatedBreeds = allInCategory
      .filter(b => b.id !== currentBreed.id)
      .sort((a, b) => (b.popularidade || 0) - (a.popularidade || 0))
      .slice(0, 4);
  }

  // Ensure we have at least some related breeds
  if (relatedBreeds.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4">
              <PawPrint size={14} />
              <span>Veja Também</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Raças Relacionadas ao {currentBreed.nome}
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl font-medium">
              {currentBreed.racas_relacionadas && currentBreed.racas_relacionadas.length > 0
                ? `Raças frequentemente comparadas ou semelhantes em características e temperamento.`
                : `Outras raças de ${currentBreed.categoria} porte que você pode considerar.`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedBreeds.map((breed) => (
            <BreedCard key={breed.id} breed={breed} />
          ))}
        </div>
      </div>
    </section>
  );
}
