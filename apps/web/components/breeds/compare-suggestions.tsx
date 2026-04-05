import { getBreedsByCategory, type Breed } from '@tutorcanino/data';
import Link from 'next/link';
import Image from 'next/image';
import { Sword, ChevronRight } from 'lucide-react';

interface CompareSuggestionsProps {
  currentBreed: Breed;
}

export function CompareSuggestions({ currentBreed }: CompareSuggestionsProps) {
  const allInCategory = getBreedsByCategory(currentBreed.categoria);
  const competitors = allInCategory
    .filter(b => b.id !== currentBreed.id)
    .sort((a, b) => (b.popularidade || 0) - (a.popularidade || 0))
    .slice(0, 3);

  if (competitors.length === 0) return null;

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4">
              <Sword size={14} />
              <span>Duelo Técnico</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Compare o {currentBreed.nome}
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl font-medium">
              Veja como o {currentBreed.nome} se sai contra outras raças populares de {currentBreed.categoria} porte.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {competitors.map((comp) => (
            <Link 
              key={comp.id}
              href={`/racas/comparar/${currentBreed.slug}-vs-${comp.slug}`}
              className="group p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <Image src={currentBreed.imagem_principal || '/images/breeds/placeholder.jpg'} alt={currentBreed.nome} fill className="object-cover" />
                </div>
                <Sword size={20} className="text-primary animate-pulse" />
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <Image src={comp.imagem_principal || '/images/breeds/placeholder.jpg'} alt={comp.nome} fill className="object-cover" />
                </div>
              </div>
              <h3 className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors">
                {currentBreed.nome} vs {comp.nome}
              </h3>
              <div className="mt-6 flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                Ver Comparação <ChevronRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
