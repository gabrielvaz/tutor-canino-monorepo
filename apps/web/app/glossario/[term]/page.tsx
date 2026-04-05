import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';

interface GlossaryPageProps {
  params: Promise<{ term: string }>;
}

const glossaryData: Record<string, {
  title: string;
  definition: string;
  content: string[];
  relatedTerms?: string[];
}> = {
  'porte-cachorro': {
    title: 'Porte de Cachorro',
    definition: 'Classificação dos cães segundo seu tamanho e peso, dividida em quatro categorias principais: Pequeno, Médio, Grande e Gigante.',
    content: [
      'O porte é um dos fatores mais importantes ao escolher uma raça, pois influencia diretamente no espaço necessário, quantidade de alimento, e tipo de exercícios adequados.',
      '**Porte Pequeno:** Até 10kg e até 35cm de altura. Exemplos: Poodle Toy, Maltês, Yorkshire Terrier.',
      '**Porte Médio:** Entre 15-30kg e 40-55cm de altura. Exemplos: Beagle, Bulldog Francês, Border Collie.',
      '**Porte Grande:** Entre 30-50kg e 55-70cm de altura. Exemplos: Golden Retriever, Labrador, Pastor Alemão.',
      '**Porte Gigante:** Acima de 50kg e mais de 70cm de altura. Exemplos: São Bernardo, Great Dane, Mastiff.',
      'Ao escolher o porte, considere também o temperamento. Algumas raças pequenas podem ser muito ativas, enquanto certas raças grandes são surpreendentemente calmas.',
    ],
    relatedTerms: ['temperamento-canino', 'expectativa-vida-cachorro'],
  },
  'temperamento-canino': {
    title: 'Temperamento Canino',
    definition: 'Conjunto de características comportamentais e psicológicas que definem a personalidade de um cachorro, incluindo energia, sociabilidade, agressividade, e inteligência.',
    content: [
      'O temperamento é influenciado tanto pela genética quanto pelo ambiente e treinamento. Conhecer o temperamento de uma raça é fundamental para escolher o cachorro certo para seu estilo de vida.',
      '**Nível de Energia:** Varia de baixo (cães calmos como Pug) a muito alto (Border Collie, Pastor Alemão).',
      '**Afeição à Família:** Algumas raças são muito apegadas (Golden Retriever), enquanto outras são mais independentes (Shar Pei).',
      '**Sociabilidade:** Cães como Beagle e Labrador são geralmente amigáveis, enquanto raças como Rottweiler podem ser mais reservados.',
      '**Guarda:** Raças como Pastor Alemão e Dobermann têm forte instinto de proteção.',
      '**Treinabilidade:** Poodle e Border Collie estão entre os mais inteligentes e fáceis de treinar.',
      'Lembre-se: o treinamento e socialização adequados podem moldar significativamente o temperamento de qualquer cachorro.',
    ],
    relatedTerms: ['treinamento-cachorro', 'socializacao-cachorro'],
  },
  'expectativa-vida-cachorro': {
    title: 'Expectativa de Vida do Cachorro',
    definition: 'Tempo médio de vida de uma raça, influenciado por tamanho, genética e cuidados.',
    content: [
      'A expectativa de vida dos cães varia consideravelmente entre raças: em geral, cães pequenos vivem mais que cães grandes.',
      '**Pequenos (14-18 anos):** Poodle Toy, Maltês, Chihuahua, Yorkshire.',
      '**Médios (12-15 anos):** Beagle, Bulldog Francês, Cocker Spaniel.',
      '**Grandes (10-13 anos):** Golden Retriever, Labrador, Boxer.',
      '**Gigantes (7-10 anos):** São Bernardo, Great Dane, Mastiff.',
      'Fatores que aumentam a longevidade: alimentação adequada, exercícios moderados, check-ups veterinários regulares, controle de peso, e muito amor.',
      'Raças braquicefálicas (focinho achatado como Pug e Bulldog) podem ter vida mais curta devido a problemas respiratórios.',
    ],
    relatedTerms: ['saude-cachorro', 'nutricao-cachorro'],
  },
  'nivel-energia-cachorro': {
    title: 'Nível de Energia do Cachorro',
    definition: 'Quantidade de atividade física e mental que um cachorro necessita diariamente para manter-se saudável e equilibrado.',
    content: [
      'O nível de energia é um dos fatores mais importantes a considerar ao escolher uma raça, pois deve ser compatível com seu estilo de vida.',
      '**Baixa Energia:** 20-30 minutos de exercício diário. Exemplos: Pug, Bulldog Inglês, Shih Tzu, São Bernardo. Ideais para pessoas sedentárias.',
      '**Energia Moderada:** 30-60 minutos de exercício diário. Exemplos: Golden Retriever, Labrador, Cavalier King Charles. Bom equilíbrio.',
      '**Alta Energia:** 60-90 minutos de exercício intenso. Exemplos: Border Collie, Pastor Alemão, Australian Shepherd. Para pessoas ativas.',
      '**Muito Alta Energia:** Mais de 90 minutos de exercício vigoroso. Exemplos: Dálmata, Husky Siberiano, Terrier Irlandês. Para atletas.',
      'Cães com alta energia que não recebem exercícios adequados podem desenvolver comportamentos destrutivos.',
    ],
    relatedTerms: ['temperamento-canino', 'treinamento-cachorro'],
  },
  'inteligencia-cachorro': {
    title: 'Inteligência Canina',
    definition: 'Capacidade do cachorro de aprender, resolver problemas, entender comandos e se adaptar a novas situações.',
    content: [
      'A inteligência dos cães pode ser medida de diferentes formas: inteligência de trabalho/obediência (facilidade de aprender comandos) e instintiva (habilidades naturais).',
      '**Raças Mais Inteligentes (Obediência):** Border Collie, Poodle, Pastor Alemão, Golden Retriever, Dobermann, Shetland Sheepdog, Labrador, Papillon.',
      '**Inteligência Instintiva:** Terriers (caça), Hounds (rastreamento), Pastoreiros (controle de rebanho).',
      'Inteligência não significa fácil de cuidar - cães muito inteligentes podem ficar entediados e destrutivos se não desafiados mentalmente.',
      'Para estimular a inteligência: brinquedos interativos, treinamento de truques, brincadeiras de buscar, e socialização variada.',
    ],
    relatedTerms: ['treinamento-cachorro', 'temperamento-canino'],
  },
  'queda-pelo-cachorro': {
    title: 'Queda de Pelo do Cachorro',
    definition: 'Processo natural de renovação da pelagem canina, que varia entre raças e estações do ano.',
    content: [
      'Todas as raças perdem pelo, mas a quantidade e frequência variam enormemente. Este é um fator importante para pessoas com alergias ou que não querem pelos pela casa.',
      '**Queda Mínima:** Poodle, Schnauzer, Yorkshire Terrier, Maltez (precisam tosa profissional).',
      '**Queda Moderada:** Golden Retriever, Labrador, Boxer (escovação semanal ajuda).',
      '**Queda Intensa:** Husky Siberiano, São Bernardo, Pastor Alemão (escovação diária necessária).',
      'Algumas raças têm "troca de estação" com queda muito intensa 2x ao ano.',
      'Para reduzir pelos: escovação regular, banho a cada 2-3 semanas, alimentação de qualidade, e hidratação adequada.',
    ],
    relatedTerms: ['saude-cachorro', 'raca-hipoalergenica'],
  },
  'treinamento-cachorro': {
    title: 'Treinamento de Cachorro',
    definition: 'Processo de ensinar comandos, comportamentos adequados e normas sociais ao cachorro.',
    content: [
      'O treinamento deve começar assim que o cachorro chega em casa (8-12 semanas idealmente) e continuar por toda a vida.',
      '**Comandos Básicos:** Senta, Deita, Fica, Vem, Juntamente com "Solta" e "Não".',
      '**Técnicas:** Reforço positivo (recompensas) é mais eficaz que punição. Consistência e paciência são essenciais.',
      '**Socialização:** Expor o filhote a diferentes pessoas, animais, sons e ambientes entre 3-6 meses é crucial.',
      'Aulas em grupo são excelentes para socialização. Para problemas comportamentais, considere um treinador profissional.',
      'Duração: 10-15 minutos por sessão para filhotes, aumentando para 20-30 minutos para adultos.',
    ],
    relatedTerms: ['inteligencia-cachorro', 'socializacao-cachorro', 'temperamento-canino'],
  },
  'socializacao-cachorro': {
    title: 'Socialização do Cachorro',
    definition: 'Processo de expor o cachorro a diferentes experiências positivas para desenvolver confiança e comportamento equilibrado.',
    content: [
      'A socialização é mais crítica entre 3 e 16 semanas de idade - é a "janela de ouro" do desenvolvimento canino.',
      '**O que socializar:** Pessoas (diferentes idades, aparências), animais (cães, gatos), ambientes (carros, ruídos), experiências (veterinário, banho).',
      '**Socialização positiva:** Sempre associe experiências novas com algo bom (petiscos, carinho). Nunca force o cachorro em situações de medo.',
      'Cachorros mal socializados podem desenvolver medos, agressividade, e ansiedade.',
      'Continue socializando por toda a vida - não pare após o período crítico.',
    ],
    relatedTerms: ['temperamento-canino', 'treinamento-cachorro'],
  },
  'saude-cachorro': {
    title: 'Saúde do Cachorro',
    definition: 'Conjunto de cuidados veterinários, preventivos e de bem-estar para garantir a longevidade e qualidade de vida do cachorro.',
    content: [
      'A saúde canina depende de cuidados preventivos, alimentação adequada, exercícios, e acompanhamento veterinário regular.',
      '**Vacinação:** V8 ou V10 anual, além de antirrábica. Manter carteira de vacinação em dia.',
      '**Vermifugação:** A cada 3-6 meses, dependendo do ambiente.',
      'Prevenção de pulgas e carrapatos: Mensal, especialmente em climas quentes.',
      'Check-ups veterinários: 2x ao ano para adultos, 3-4x para idosos.',
      '**Sinais de alerta:** Apatia, perda de apetite, dificuldade respiratória, vômitos persistentes, mudanças comportamentais.',
      'Castração: Recomendada para não-reprodutores, reduz risco de vários cânceres.',
    ],
    relatedTerms: ['expectativa-vida-cachorro', 'nutricao-cachorro'],
  },
  'nutricao-cachorro': {
    title: 'Nutrição do Cachorro',
    definition: 'Alimentação balanceada e adequada às necessidades específicas de cada raça, idade e porte.',
    content: [
      'A nutrição adequada é fundamental para a saúde e longevidade do cachorro. Qualidade da ração importa muito.',
      '**Filhotes (até 12 meses):** Ração específica para crescimento, 3-4x ao dia. Alta proteína e calorias.',
      '**Adultos (1-7 anos):** Ração de manutenção, 2x ao dia. Equilíbrio proteína/gordura/carboidrato.',
      '**Seniores (7+ anos):** Ração para idosos, menos calorias, mais proteína de alta qualidade. Suplementos articulares.',
      '**Porte importa:** Raças grandes têm necessidades diferentes de pequenas. Escolha ração específica.',
      'Evite: Chocolate, cebola, alho, uva, xilitol - são tóxicos para cães.',
      'Água fresca sempre disponível. Peso ideal deve ser mantido - obesidade reduz expectativa de vida em até 2 anos.',
    ],
    relatedTerms: ['saude-cachorro', 'expectativa-vida-cachorro'],
  },
};

export async function generateStaticParams() {
  return Object.keys(glossaryData).map((term) => ({ term }));
}

export async function generateMetadata({ params }: GlossaryPageProps): Promise<Metadata> {
  const { term } = await params;
  const entry = glossaryData[term];

  if (!entry) {
    return {
      title: 'Termo não encontrado | Glossário TutorCanino',
    };
  }

  return {
    title: `${entry.title} | Glossário | TutorCanino`,
    description: entry.definition,
    alternates: {
      canonical: `${baseUrl}/glossario/${term}`,
    },
    openGraph: {
      title: entry.title,
      description: entry.definition,
      url: `${baseUrl}/glossario/${term}`,
    },
  };
}

export default async function GlossaryPage({ params }: GlossaryPageProps) {
  const { term } = await params;
  const entry = glossaryData[term];

  if (!entry) notFound();

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-gray-400 text-sm font-bold mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/glossario" className="hover:text-primary transition-colors">Glossário</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900">{entry.title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-black uppercase tracking-widest mb-6">
              <BookOpen size={14} />
              <span>Glossário</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              {entry.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {entry.definition}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
            <div className="prose prose-lg max-w-none">
              {entry.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </div>
          </div>

          {/* Related Terms */}
          {entry.relatedTerms && entry.relatedTerms.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-black text-gray-900 mb-6">Termos Relacionados</h2>
              <div className="flex flex-wrap gap-3">
                {entry.relatedTerms.map((relatedTerm) => (
                  <Link
                    key={relatedTerm}
                    href={`/glossario/${relatedTerm}`}
                    className="px-5 py-2 rounded-full bg-gray-100 text-gray-700 font-bold hover:bg-secondary hover:text-white transition-all"
                  >
                    {relatedTerm.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
