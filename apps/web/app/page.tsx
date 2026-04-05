import Link from 'next/link';
import Image from 'next/image';
import { getPopularBreeds, getAllBreeds } from '@tutorcanino/data';
import { BreedGrid } from '@/components/breeds/breed-grid';
import { PawPrint, Search, Heart, Shield, Star, Zap, GraduationCap, CheckCircle2, TrendingUp } from 'lucide-react';
import { StructuredData } from '@/components/seo/structured-data';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo';

export default function Home() {
  const popularBreeds = getPopularBreeds(8);
  const allBreedsCount = getAllBreeds().length;
  const orgSchema = generateOrganizationSchema();
  const siteSchema = generateWebsiteSchema();

  const categories = [
    { name: 'Pequeno', label: 'Pequeno Porte', desc: 'Ideais para apartamentos e espaços menores.', icon: <Heart className="text-primary" />, delay: 'delay-100' },
    { name: 'Médio', label: 'Médio Porte', desc: 'Equilíbrio perfeito entre energia e tamanho.', icon: <Zap className="text-secondary" />, delay: 'delay-200' },
    { name: 'Grande', label: 'Grande Porte', desc: 'Companheiros leais que precisam de espaço.', icon: <Shield className="text-primary" />, delay: 'delay-300' },
    { name: 'Gigante', label: 'Gigante', desc: 'Gigantes gentis com corações enormes.', icon: <Star className="text-accent" />, delay: 'delay-400' },
  ];

  const suggestedSearches = ['Golden Retriever', 'Pastor Alemão', 'Shih Tzu', 'Border Collie'];

  return (
    <div className="flex flex-col w-full">
      <StructuredData data={orgSchema} />
      <StructuredData data={siteSchema} />
      
      {/* Hero Section */}
      <section className="relative bg-white py-20 md:py-32 overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-8">
              <PawPrint size={14} />
              <span>O Guia Definitivo do Seu Melhor Amigo</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-[0.9] mb-8 tracking-tighter">
              Encontre a Raça <span className="text-primary">Ideal</span> para Você
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-2xl font-medium">
              Descubra qual cão combina com seu estilo de vida através do nosso diretório completo com mais de {allBreedsCount} raças catalogadas.
            </p>
            
            {/* Search Bar Refinement */}
            <div className="relative max-w-2xl mb-6 group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <Search size={24} />
              </div>
              <input
                type="text"
                placeholder="Busque por raça, temperamento ou origem..."
                className="w-full pl-14 pr-4 py-5 rounded-[2rem] border-2 border-gray-100 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all text-xl font-bold text-gray-700 shadow-sm"
              />
              <button className="absolute right-3 top-3 bottom-3 bg-primary text-white px-8 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hidden sm:block active:scale-95">
                Buscar
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-12">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={14} />
                Popular agora:
              </span>
              {suggestedSearches.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/racas?q=${tag}`}
                  className="text-xs font-bold text-gray-500 bg-gray-50 hover:bg-primary/10 hover:text-primary px-3 py-1.5 rounded-full transition-all border border-gray-100"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/racas" className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/25 hover:-translate-y-1 active:scale-95">
                Explorar Raças
              </Link>
              <Link href="/quiz" className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-gray-50 transition-all hover:-translate-y-1 active:scale-95">
                Fazer o Quiz
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 hidden lg:block -skew-x-12 translate-x-20" />
      </section>

      {/* Stats Ribbon - Social Proof */}
      <div className="bg-gray-900 py-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="text-4xl font-black text-primary leading-none">{allBreedsCount}+</div>
              <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Raças Catalogadas</div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0 md:px-8">
              <div className="text-4xl font-black text-secondary leading-none">10k+</div>
              <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Consultas Mensais</div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2 md:pl-8">
              <div className="text-4xl font-black text-accent leading-none">100%</div>
              <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Dados Validados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Escolha pelo Porte</h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">
                O tamanho do cão é um fator fundamental para garantir uma convivência harmoniosa no seu ambiente e estilo de vida.
              </p>
            </div>
            <Link href="/racas" className="text-primary font-black uppercase tracking-widest text-sm hover:underline flex items-center gap-2">
              Ver todos <Zap size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                href={`/racas?categoria=${cat.name}`}
                className={`group p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 opacity-0 animate-fade-in-up ${cat.delay}`}
              >
                <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">{cat.label}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Breeds */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-4">
                <TrendingUp size={14} />
                <span>Em Destaque</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Raças Populares</h2>
              <p className="text-xl text-gray-500 font-medium">
                As raças mais buscadas e queridas pelos tutores brasileiros neste mês.
              </p>
            </div>
            <Link href="/racas" className="bg-gray-50 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2 border border-gray-100">
              Ver todas as raças <ChevronRight size={16} />
            </Link>
          </div>

          <div className="opacity-0 animate-reveal">
            <BreedGrid breeds={popularBreeds} />
          </div>
        </div>
      </section>

      {/* Benefits / Mission */}
      <section className="py-32 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <Image 
                  src="/images/home-about.jpg" 
                  alt="Tutor e seu cão" 
                  width={600} 
                  height={600}
                  className="w-full h-auto"
                  fallback-src="/images/breeds/placeholder.jpg"
                />
              </div>
              <div className="absolute -bottom-10 -right-6 bg-white p-8 rounded-[2rem] shadow-2xl max-w-xs hidden sm:block border border-gray-100 animate-fade-in-up delay-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <GraduationCap size={24} />
                  </div>
                  <span className="font-black text-gray-900 uppercase tracking-widest text-xs">Educação Canina</span>
                </div>
                <p className="text-gray-500 font-medium leading-relaxed">Informações validadas por especialistas para uma guarda responsável.</p>
              </div>
            </div>

            <div className="space-y-10 animate-reveal">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter">
                Nossa Missão é Unir <span className="text-secondary">Pessoas</span> e <span className="text-primary">Cães</span>
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed font-medium">
                Acreditamos que todo cão merece o lar perfeito e todo tutor merece o companheiro ideal. O TutorCanino nasceu para facilitar esse encontro através de dados precisos e dicas de especialistas.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  '217+ raças detalhadas',
                  'Foco em bem-estar animal',
                  'Guia de cuidados diários',
                  'Dados técnicos da FCI'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-700 font-bold group">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <CheckCircle2 size={18} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <Link href="/sobre" className="inline-flex items-center gap-3 text-lg font-black text-primary hover:text-primary-dark group uppercase tracking-widest">
                  Conheça nosso projeto
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_30px_100px_rgba(224,122,95,0.3)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                Ainda não sabe qual raça escolher?
              </h2>
              <p className="text-primary-light text-xl md:text-2xl mb-12 opacity-90 font-medium">
                Responda algumas perguntas rápidas e nosso algoritmo irá sugerir as raças que mais combinam com seu estilo de vida.
              </p>
              <Link href="/quiz" className="inline-block bg-white text-primary px-12 py-6 rounded-[2rem] font-black text-xl uppercase tracking-widest hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/10">
                Começar o Quiz Agora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
