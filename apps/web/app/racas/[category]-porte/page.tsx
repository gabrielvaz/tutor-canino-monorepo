import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBreedsByCategory } from '@tutorcanino/data';
import { BreedGrid } from '@/components/breeds/breed-grid';
import { ChevronRight, PawPrint } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const categoryMapping: Record<string, { label: string; description: string; icon: string }> = {
  'pequeno': {
    label: 'Pequeno Porte',
    description: 'Raças compactas, ideais para apartamentos e espaços menores. Geralmente pesam até 10kg e têm menos de 35cm de altura.',
    icon: '🐕',
  },
  'medio': {
    label: 'Médio Porte',
    description: 'O equilíbrio perfeito entre tamanho e energia. Pesar entre 15-30kg e medem 40-55cm, sendo excelentes companheiros para famílias.',
    icon: '🐕‍🦺',
  },
  'grande': {
    label: 'Grande Porte',
    description: 'Cães imponentes e leais, com 30-50kg e altura entre 55-70cm. Excelentes guardiões e companheiros para famílias ativas.',
    icon: '🦮',
  },
  'gigante': {
    label: 'Gigante',
    description: 'Os gigantes gentis do mundo canino, pesando mais de 50kg e com mais de 70cm de altura. Apesar do tamanho, são conhecidos por sua doçura.',
    icon: '🐕',
  },
};

export async function generateStaticParams() {
  return ['pequeno', 'medio', 'grande', 'gigante'].map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const info = categoryMapping[category];

  if (!info) {
    return {
      title: 'Categoria não encontrada | TutorCanino',
    };
  }

  return {
    title: `Raças de ${info.label} - Guia Completo | TutorCanino`,
    description: info.description,
    alternates: {
      canonical: `https://tutorcanino.com.br/racas/${category}-porte`,
    },
    openGraph: {
      title: `Raças de ${info.label}`,
      description: info.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const info = categoryMapping[category];

  if (!info) notFound();

  const categoryLabel = category === 'pequeno' ? 'Pequeno' :
                        category === 'medio' ? 'Médio' :
                        category === 'grande' ? 'Grande' :
                        category === 'gigante' ? 'Gigante' : null;

  if (!categoryLabel) notFound();

  const breeds = getBreedsByCategory(categoryLabel);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-gray-400 text-sm font-bold mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/racas" className="hover:text-primary transition-colors">Raças</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900">{info.label}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6">
              <PawPrint size={14} />
              <span>Categoria: {info.label}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              Raças de {info.label}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              {info.description}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <strong className="block text-3xl font-black text-primary leading-none">{breeds.length}</strong>
              <span className="text-sm text-gray-500 font-medium">Raças nesta categoria</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <strong className="block text-3xl font-black text-secondary leading-none">100%</strong>
              <span className="text-sm text-gray-500 font-medium">Guia completo</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <strong className="block text-3xl font-black text-accent leading-none">✓</strong>
              <span className="text-sm text-gray-500 font-medium">Informações verificadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Breeds Grid */}
      <main className="container mx-auto px-4 py-12">
        <BreedGrid breeds={breeds} />
      </main>

      {/* Other Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-gray-900 mb-8">Outras Categorias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categoryMapping)
            .filter(([key]) => key !== category)
            .map(([key, value]) => (
              <Link
                key={key}
                href={`/racas/${key}-porte`}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{value.label}</h3>
                <p className="text-sm text-gray-500 mt-2">{getBreedsByCategory(
                  key === 'pequeno' ? 'Pequeno' :
                  key === 'medio' ? 'Médio' :
                  key === 'grande' ? 'Grande' : 'Gigante'
                ).length} raças</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
