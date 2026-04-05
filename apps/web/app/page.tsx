import Link from 'next/link';
import Image from 'next/image';
import { getPopularBreeds } from '@tutorcanino/data';
import { BreedGrid } from '@/components/breeds/breed-grid';
import { PawPrint, Search, Heart, Shield, Star, Zap, GraduationCap } from 'lucide-react';
import { StructuredData } from '@/components/seo/structured-data';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TutorCanino - Encontre a Raça de Cachorro Ideal para Você',
  description: 'Descubra qual raça de cachorro combina com seu estilo de vida. Guia completo com mais de 200 raças, informações sobre temperamento, cuidados, saúde e muito mais.',
  alternates: {
    canonical: 'https://tutorcanino.com.br',
  },
  openGraph: {
    title: 'TutorCanino - Encontre a Raça de Cachorro Ideal para Você',
    description: 'Descubra qual raça de cachorro combina com seu estilo de vida.',
    url: 'https://tutorcanino.com.br',
    type: 'website',
  },
};

export default function Home() {
  const popularBreeds = getPopularBreeds(8);
  const orgSchema = generateOrganizationSchema();
  const siteSchema = generateWebsiteSchema();

  const categories = [
    { name: 'Pequeno', label: 'Pequeno Porte', desc: 'Ideais para apartamentos e espaços menores.', icon: <Heart className="text-primary" /> },
    { name: 'Médio', label: 'Médio Porte', desc: 'Equilíbrio perfeito entre energia e tamanho.', icon: <Zap className="text-secondary" /> },
    { name: 'Grande', label: 'Grande Porte', desc: 'Companheiros leais que precisam de espaço.', icon: <Shield className="text-primary" /> },
    { name: 'Gigante', label: 'Gigante', desc: 'Gigantes gentis com corações enormes.', icon: <Star className="text-accent" /> },
  ];

  return (
    <div className="flex flex-col w-full">
      <StructuredData data={orgSchema} />
      <StructuredData data={siteSchema} />
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <PawPrint size={16} />
              <span>O Guia Definitivo do Seu Melhor Amigo</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
              Encontre a Raça <span className="text-primary">Ideal</span> para Você
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
              Descubra qual cão combina com seu estilo de vida através do nosso diretório completo com mais de 200 raças catalogadas.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mb-10">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Busque por raça, temperamento ou origem..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg shadow-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-xl font-bold hover:bg-primary-dark transition-colors hidden sm:block">
                Buscar
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/racas" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:-translate-y-1">
                Explorar Raças
              </Link>
              <Link href="/quiz" className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all hover:-translate-y-1">
                Fazer o Quiz
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 hidden lg:block -skew-x-12 translate-x-20" />
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Escolha pelo Porte</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              O tamanho do cão é um fator fundamental para garantir uma convivência harmoniosa no seu ambiente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                href={`/racas?categoria=${cat.name}`}
                className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Breeds */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Raças Populares</h2>
              <p className="text-gray-500 max-w-2xl">
                As raças mais buscadas e queridas pelos tutores brasileiros.
              </p>
            </div>
            <Link href="/racas" className="text-primary font-bold hover:underline flex items-center gap-2">
              Ver todas as raças <Zap size={16} />
            </Link>
          </div>

          <BreedGrid breeds={popularBreeds} />
        </div>
      </section>

      {/* Benefits / Mission */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/breeds/placeholder.svg"
                  alt="Tutor e seu cão"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block border border-gray-100">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <GraduationCap size={20} />
                  </div>
                  <span className="font-bold text-gray-900">Educação Canina</span>
                </div>
                <p className="text-sm text-gray-500">Informações validadas para uma guarda responsável e amorosa.</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                Nossa Missão é Unir <span className="text-secondary">Pessoas</span> e <span className="text-primary">Cães</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Acreditamos que todo cão merece o lar perfeito e todo tutor merece o companheiro ideal. O TutorCanino nasceu para facilitar esse encontro através de dados precisos e dicas de especialistas.
              </p>
              
              <ul className="space-y-4">
                {[
                  'Mais de 200 raças detalhadas',
                  'Informações sobre saúde e temperamento',
                  'Guia completo de cuidados diários',
                  'Foco total no bem-estar animal'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Zap size={12} fill="currentColor" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link href="/sobre" className="inline-flex items-center gap-2 text-lg font-bold text-primary hover:text-primary-dark group">
                  Conheça mais sobre nosso projeto
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Ainda não sabe qual raça escolher?
              </h2>
              <p className="text-primary-light text-xl mb-10 opacity-90">
                Responda algumas perguntas rápidas e nosso algoritmo irá sugerir as raças que mais combinam com você.
              </p>
              <Link href="/quiz" className="inline-block bg-white text-primary px-10 py-5 rounded-2xl font-black text-xl hover:bg-gray-50 transition-all hover:scale-105 shadow-xl">
                Começar o Quiz Agora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
