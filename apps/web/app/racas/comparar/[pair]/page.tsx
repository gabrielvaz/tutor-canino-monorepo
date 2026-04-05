import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBreedBySlug, getPopularBreeds } from '@tutorcanino/data';
import { ComparisonTable } from '@/components/breeds/comparison-table';
import { ComparisonBadges } from '@/components/breeds/comparison-badges';
import { ComparisonVerdict } from '@/components/breeds/comparison-verdict';
import { StructuredData } from '@/components/seo/structured-data';
import { generateComparisonSchema } from '@/lib/seo';
import { ChevronRight, Sword, ShieldCheck, Zap, Info } from 'lucide-react';
import fs from 'fs';
import path from 'path';

interface ComparisonPageProps {
  params: Promise<{ pair: string }>;
}

const getCache = () => {
  try {
    const cachePath = path.join(process.cwd(), '../../packages/content/src/data/comparison-cache.json');
    if (fs.existsSync(cachePath)) {
      return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    }
  } catch (e) {}
  return {};
};

export async function generateStaticParams() {
  const topBreeds = getPopularBreeds(10);
  const params = [];
  for (let i = 0; i < topBreeds.length; i++) {
    for (let j = i + 1; j < topBreeds.length; j++) {
      params.push({ pair: `${topBreeds[i].slug}-vs-${topBreeds[j].slug}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const { pair } = await params;
  const slugs = pair.split('-vs-');
  if (slugs.length !== 2) return { title: 'Comparação não encontrada' };

  const b1 = getBreedBySlug(slugs[0]);
  const b2 = getBreedBySlug(slugs[1]);

  if (!b1 || !b2) return { title: 'Comparação não encontrada' };

  return {
    title: `${b1.nome} vs ${b2.nome}: Qual escolher? | TutorCanino`,
    description: `Compare ${b1.nome} e ${b2.nome} lado a lado. Veja diferenças de temperamento, porte, saúde e saiba qual é a ideal para você.`,
  };
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { pair } = await params;
  const slugs = pair.split('-vs-');
  
  if (slugs.length !== 2) notFound();

  const breed1 = getBreedBySlug(slugs[0]);
  const breed2 = getBreedBySlug(slugs[1]);

  if (!breed1 || !breed2) notFound();

  const comparisonSchema = generateComparisonSchema(breed1, breed2);
  const cache = getCache();
  const sortedSlugs = [slugs[0], slugs[1]].sort().join('-vs-');
  const verdict = cache[sortedSlugs] || {
    summary: `Comparando o ${breed1.nome} com o ${breed2.nome}, vemos duas raças com personalidades distintas. O ${breed1.nome} é conhecido por ser ${breed1.caracteristicas?.afeicao_familia && breed1.caracteristicas.afeicao_familia >= 4 ? 'muito afetuoso' : 'independente'}, enquanto o ${breed2.nome} destaca-se por sua ${breed2.caracteristicas?.inteligencia && breed2.caracteristicas.inteligencia >= 4 ? 'alta inteligência' : 'lealdade'}.`,
    comparisons: {
      temperament: "Ambas as raças possuem temperamentos equilibrados, mas requerem níveis diferentes de socialização e estímulo mental.",
      maintenance: "A manutenção varia dependendo da pelagem e predisposições genéticas de cada linhagem.",
      suitability: "A escolha ideal depende do seu tempo disponível para exercícios e espaço em casa."
    },
    winnerBadges: {
      apartment: breed1.categoria === 'Pequeno' ? breed1.nome : breed2.categoria === 'Pequeno' ? breed2.nome : 'Both',
      family: 'Both',
      activeOwner: breed1.caracteristicas?.energia && breed1.caracteristicas.energia >= 4 ? breed1.nome : breed2.nome,
      firstTimeOwner: breed1.caracteristicas?.facilidade_treinamento && breed1.caracteristicas.facilidade_treinamento >= 4 ? breed1.nome : breed2.nome
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <StructuredData data={comparisonSchema} />
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-gray-400 text-sm font-bold mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/racas/comparar" className="hover:text-primary transition-colors">Comparar</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900">{breed1.nome} vs {breed2.nome}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="text-center group">
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 mx-auto group-hover:scale-105 transition-transform duration-500">
                <Image src={breed1.imagem_principal || '/images/breeds/placeholder.svg'} alt={breed1.nome} fill className="object-cover" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900">{breed1.nome}</h1>
              <span className="text-xs font-black text-primary uppercase tracking-widest">{breed1.categoria} Porte</span>
            </div>

            <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 rotate-12">
              <Sword size={32} />
            </div>

            <div className="text-center group">
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6 mx-auto group-hover:scale-105 transition-transform duration-500">
                <Image src={breed2.imagem_principal || '/images/breeds/placeholder.svg'} alt={breed2.nome} fill className="object-cover" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">{breed2.nome}</h2>
              <span className="text-xs font-black text-secondary uppercase tracking-widest">{breed2.categoria} Porte</span>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 mt-12 space-y-16">
        {/* Quick Winners */}
        <section className="animate-fade-in-up">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
              <ShieldCheck size={20} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Qual vence em cada categoria?</h2>
          </div>
          <ComparisonBadges verdict={verdict} />
        </section>

        {/* Technical Table */}
        <section className="animate-reveal">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Info size={20} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Ficha Técnica Comparada</h2>
          </div>
          <ComparisonTable breed1={breed1} breed2={breed2} />
        </section>

        {/* AI Verdict */}
        <section className="animate-fade-in-up delay-200">
          <ComparisonVerdict verdict={verdict} />
        </section>

        {/* CTA */}
        <section className="bg-gray-900 rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ainda na dúvida?</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto font-medium">
              Nosso quiz personalizado analisa mais de 20 fatores do seu estilo de vida para sugerir a raça perfeita.
            </p>
            <Link href="/quiz" className="inline-block bg-primary text-white px-10 py-4 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-primary-dark transition-all">
              Fazer o Quiz Completo
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        </section>
      </main>
    </div>
  );
}
