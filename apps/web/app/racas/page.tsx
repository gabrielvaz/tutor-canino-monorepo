import { Metadata } from 'next';
import { getAllBreeds } from '@tutorcanino/data';
import { BreedGrid } from '@/components/breeds/breed-grid';

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Guia Completo de Raças Caninas
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Explore mais de {allBreeds.length} raças de cães e descubra qual é a ideal para seu estilo de vida.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <strong className="text-2xl">{allBreeds.length}</strong>
              <span className="ml-2">Raças</span>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <strong className="text-2xl">4</strong>
              <span className="ml-2">Categorias</span>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
              <strong className="text-2xl">100%</strong>
              <span className="ml-2">Conteúdo Original</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <BreedGrid breeds={allBreeds} />
      </main>
    </div>
  );
}
