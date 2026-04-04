import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBreedBySlug, getAllBreeds } from '@tutorcanino/data';
import { BreedDetail } from '@/components/breeds/breed-detail';
import { Badge } from '@tutorcanino/ui';

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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] min-h-[300px] w-full overflow-hidden">
        <Image
          src={breed.imagem_principal || '/images/breeds/placeholder.jpg'}
          alt={breed.nome}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto">
            <Badge className="bg-secondary text-white border-none mb-4 px-4 py-1.5 text-sm">
              {breed.categoria} Porte
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              {breed.nome}
            </h1>
            {breed.nome_en && (
              <p className="text-xl text-gray-300 mt-2 italic">
                {breed.nome_en}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12">
          <BreedDetail breed={breed} />
        </div>
      </div>
    </div>
  );
}
