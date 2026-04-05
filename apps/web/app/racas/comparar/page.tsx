import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBreeds, getPopularBreeds } from '@tutorcanino/data';
import { ComparisonTable } from '@/components/breeds/comparison-table';
import { PawPrint, ChevronRight, Sword, Zap, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Comparar Raças de Cães - Qual escolher? | TutorCanino',
  description: 'Compare o temperamento, porte e cuidados de mais de 200 raças de cães. Encontre a raça ideal comparando-as lado a lado.',
};

export default function CompararHubPage() {
  const breeds = getAllBreeds().sort((a, b) => a.nome.localeCompare(b.nome));
  const popularBreeds = getPopularBreeds(10);

  // Pre-defined popular pairs for the hub
  const popularPairs = [
    { s1: 'golden-retriever', s2: 'labrador-retriever', label: 'Golden vs Labrador' },
    { s1: 'bulldog-frances', s2: 'pug', label: 'Bulldog Francês vs Pug' },
    { s1: 'border-collie', s2: 'pastor-alemao', label: 'Border Collie vs Pastor Alemão' },
    { s1: 'shih-tzu', s2: 'lulu-da-pomerania', label: 'Shih Tzu vs Spitz Alemão' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-8">
            <Sword size={14} />
            <span>Duelo de Raças</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-none mb-8 tracking-tighter">
            Compare e Escolha a <span className="text-primary">Melhor Raça</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Coloque duas raças lado a lado e veja as diferenças técnicas, de temperamento e de cuidados.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Picker (Simplified for v1) */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight flex items-center gap-3">
                <Search className="text-primary" />
                Duelos Populares
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {popularPairs.map((pair) => (
                  <Link 
                    key={pair.label}
                    href={`/racas/comparar/${pair.s1}-vs-${pair.s2}`}
                    className="group p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-primary/20 hover:shadow-lg transition-all duration-300 flex items-center justify-between"
                  >
                    <span className="font-bold text-gray-700 group-hover:text-primary transition-colors">{pair.label}</span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                      <ChevronRight size={16} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Index of all breeds */}
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Todas as Raças para Comparar</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {breeds.map(b => (
                  <Link 
                    key={b.id} 
                    href={`/racas/comparar/${b.slug}-vs-golden-retriever`}
                    className="px-4 py-2 text-sm font-bold text-gray-500 bg-white border border-gray-100 rounded-xl hover:text-primary hover:border-primary/20 transition-all text-center"
                  >
                    {b.nome}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Tips */}
          <div className="space-y-8">
            <div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <Zap size={32} className="mb-6 text-accent" />
                <h3 className="text-xl font-black mb-4">Dica do Tutor</h3>
                <p className="text-primary-light font-medium leading-relaxed opacity-90">
                  Ao comparar raças, foque no **Nível de Energia** e na **Adaptabilidade**. Uma raça linda mas com energia incompatível com seu tempo livre pode causar frustração para ambos.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
