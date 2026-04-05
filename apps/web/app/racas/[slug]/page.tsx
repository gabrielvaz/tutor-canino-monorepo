import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBreedBySlug, getAllBreeds } from '@tutorcanino/data';
import { BreedDetail } from '@/components/breeds/breed-detail';
import { RelatedBreeds } from '@/components/breeds/related-breeds';
import { Badge } from '@tutorcanino/ui';
import { StructuredData } from '@/components/seo/structured-data';
import { generateBreedSchema } from '@/lib/seo';
import { ChevronRight, Globe, Hourglass, Weight, PawPrint } from 'lucide-react';

interface BreedPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const breeds = getAllBreeds();
  return breeds.map((breed) => ({
    slug: breed.slug,
  }));
}

export async function generateMetadata({ params }: BreedPageProps): Promise<Metadata> {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);

  if (!breed) {
    return {
      title: 'Raça não encontrada | TutorCanino',
    };
  }

  return {
    title: breed.seo?.title || `${breed.nome} - Tudo sobre a raça | TutorCanino`,
    description: breed.seo?.description || `Saiba tudo sobre o ${breed.nome}: temperamento, saúde, cuidados e características da raça.`,
    keywords: breed.seo?.keywords,
    openGraph: {
      title: breed.nome,
      description: breed.seo?.description,
      images: breed.imagem_principal ? [breed.imagem_principal] : [],
    },
  };
}

export default async function BreedPage({ params }: BreedPageProps) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);

  if (!breed) {
    notFound();
  }

  const breedSchema = generateBreedSchema(breed);
  const { ficha_tecnica } = breed;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <StructuredData data={breedSchema} />
      
      {/* Hero Banner Section */}
      <section className="relative h-[50vh] md:h-[60vh] min-h-[400px] w-full overflow-hidden bg-gray-900">
        <Image
          src={breed.imagem_principal || '/images/breeds/placeholder.jpg'}
          alt={breed.nome}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {/* Navigation Breadcrumb over Hero */}
        <div className="absolute top-8 left-0 w-full z-20">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-white/80 text-sm font-bold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} className="opacity-50" />
              <Link href="/racas" className="hover:text-white transition-colors">Raças</Link>
              <ChevronRight size={14} className="opacity-50" />
              <span className="text-primary-light font-black">{breed.nome}</span>
            </nav>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 pb-20 md:pb-24">
          <div className="container mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-primary/20">
                <PawPrint size={14} />
                <span>{breed.categoria} Porte</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
                {breed.nome}
              </h1>
              {breed.nome_en && (
                <p className="text-xl md:text-2xl text-white/60 mt-3 font-medium italic">
                  {breed.nome_en}
                </p>
              )}
            </div>

            {/* Floating Quick Info Bar - Glassmorphism */}
            <div className="flex flex-wrap items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-3xl shadow-2xl">
              <div className="flex flex-col gap-1 px-4 border-r border-white/10 last:border-0">
                <div className="flex items-center gap-2 text-xs font-black text-white/50 uppercase tracking-widest">
                  <Globe size={14} className="text-primary-light" />
                  <span>Origem</span>
                </div>
                <span className="text-base font-bold text-white leading-tight">{ficha_tecnica?.origem || '-'}</span>
              </div>
              <div className="flex flex-col gap-1 px-4 border-r border-white/10 last:border-0">
                <div className="flex items-center gap-2 text-xs font-black text-white/50 uppercase tracking-widest">
                  <Hourglass size={14} className="text-secondary-light" />
                  <span>Vida</span>
                </div>
                <span className="text-base font-bold text-white leading-tight">{ficha_tecnica?.expectativa_vida || '-'}</span>
              </div>
              <div className="flex flex-col gap-1 px-4 last:border-0">
                <div className="flex items-center gap-2 text-xs font-black text-white/50 uppercase tracking-widest">
                  <Weight size={14} className="text-accent" />
                  <span>Peso</span>
                </div>
                <span className="text-base font-bold text-white leading-tight">{ficha_tecnica?.peso_macho || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-16 relative z-10 mb-20">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 p-8 md:p-16 border border-gray-100">
          <BreedDetail breed={breed} />
        </div>
      </div>

      {/* Related Breeds */}
      <RelatedBreeds currentBreed={breed} />
    </div>
  );
}
