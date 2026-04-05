import { Metadata } from 'next';
import { getAllBreeds } from '@tutorcanino/data';
import { BreedListContent } from '@/components/breeds/breed-list-content';
import { PawPrint, LayoutGrid, Zap, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Raças de Cães - Guia Completo | TutorCanino',
  description: 'Descubra mais de 100 raças de cães com informações completas sobre características, temperamento, cuidados e saúde. Encontre o cão ideal para você.',
  keywords: ['raças de cães', 'cães', 'racas caninas', 'guia de raças'],
  openGraph: {
    title: 'Raças de Cães - Guia Completo | TutorCanino',
    description: 'Descubra mais de 100 raças de cães com informações completas.',
    type: 'website',
  },
};

export default function RacasPage() {
  const allBreeds = getAllBreeds();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <PawPrint size={16} />
              <span>Exploração Completa</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              Guia Completo de <span className="text-primary">Raças Caninas</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
              Explore nosso diretório atualizado com {allBreeds.length} raças de cães e descubra qual é o companheiro ideal para seu estilo de vida.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4 opacity-0 animate-reveal delay-100">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <LayoutGrid size={24} />
              </div>
              <div>
                <strong className="block text-2xl font-black text-gray-900 leading-none">{allBreeds.length}</strong>
                <span className="text-sm text-gray-500 font-medium">Raças Catalogadas</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4 opacity-0 animate-reveal delay-200">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <ShieldCheck size={24} />
              </div>
              <div>
                <strong className="block text-2xl font-black text-gray-900 leading-none">4</strong>
                <span className="text-sm text-gray-500 font-medium">Categorias de Porte</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4 opacity-0 animate-reveal delay-300">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent-dark">
                <Zap size={24} />
              </div>
              <div>
                <strong className="block text-2xl font-black text-gray-900 leading-none">100%</strong>
                <span className="text-sm text-gray-500 font-medium">Conteúdo Original</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <BreedListContent initialBreeds={allBreeds} />
      </main>
    </div>
  );
}
