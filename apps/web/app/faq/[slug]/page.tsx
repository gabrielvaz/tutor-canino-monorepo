import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, HelpCircle } from 'lucide-react';

const baseUrl = 'https://tutorcanino.com.br';

interface FAQPageProps {
  params: Promise<{ slug: string }>;
}

const faqData: Record<string, {
  title: string;
  description: string;
  questions: Array<{
    q: string;
    a: string;
  }>;
  relatedBreeds?: string[];
}> = {
  'melhor-raza-apartamento': {
    title: 'Melhor Raça de Cachorro para Apartamento',
    description: 'Descubra quais raças de cães se adaptam melhor à vida em apartamento, com dicas sobre exercícios, espaço e cuidados.',
    questions: [
      {
        q: 'Qual é a melhor raça de cachorro para apartamento?',
        a: 'As melhores raças para apartamento incluem Pug, Bulldog Francês, Shih Tzu, Lulu da Pomerânia (Spitz), e Maltês. Essas raças se adaptam bem a espaços menores e exigem menos exercício físico.',
      },
      {
        q: 'Cachorro pequeno é sempre melhor para apartamento?',
        a: 'Não necessariamente. Algumas raças pequenas como o Yorkshire Terrier podem ser muito ativas e barulhentas. O temperamento e nível de energia são mais importantes que o tamanho.',
      },
      {
        q: 'Quanto exercício um cachorro de apartamento precisa?',
        a: 'A maioria dos cães de apartamento precisa de 30 a 60 minutos de exercício diário, podendo ser dividido em 2-3 passeios. Raças com baixa energia podem se contentar com menos.',
      },
      {
        q: 'Posso ter um cachorro grande em apartamento?',
        a: 'Sim, raças como Golden Retriever e Labrador podem viver bem em apartamento se receberem exercícios adequados. O importante é o nível de energia, não o tamanho.',
      },
    ],
    relatedBreeds: ['pug', 'bulldog-frances', 'shih-tzu'],
  },
  'racas-para-criancas': {
    title: 'Melhores Raças de Cachorro para Crianças',
    description: 'Conheça as raças de cães mais dóceis e patientes com crianças, perfeitas para famílias.',
    questions: [
      {
        q: 'Quais as melhores raças de cachorro para crianças?',
        a: 'Golden Retriever, Labrador, Beagle, Boxer, Bulldog Inglês e Pastor Alemão são excelentes com crianças. São conhecidos por serem dóceis, pacientes e protetores.',
      },
      {
        q: 'Qual raça pequena é boa para crianças?',
        a: 'Bulldog Francês, Pug, Cavalier King Charles Spaniel e Beagle são ótimas opções pequenas que se dão bem com crianças.',
      },
      {
        q: 'Cachorro e criança: como fazer a introdução?',
        a: 'Sempre supervise interações, ensine a criança a respeitar o espaço do cachorro, e faça apresentações gradualmente. Nunca deixe crianças pequenas sozinhas com qualquer raça.',
      },
    ],
    relatedBreeds: ['golden-retriever', 'labrador-retriever', 'beagle', 'bulldog-ingles'],
  },
  'racas-hipoalergenicas': {
    title: 'Raças de Cachorro Hipoalergênicas',
    description: 'Raças de cães que soltam menos pelos e são mais adequadas para pessoas com alergias.',
    questions: [
      {
        q: 'O que são raças hipoalergênicas?',
        a: 'Raças hipoalergênicas são cães que soltam menos pelos e menos dândegra, o que reduz reações alérgicas. Nenhuma raça é 100% hipoalergênica, mas algumas causam menos alergias.',
      },
      {
        q: 'Quais as raças mais hipoalergênicas?',
        a: 'Poodle (todas as variantes), Schnauzer, Yorkshire Terrier, Maltez, Shih Tzu, West Highland White Terrier, e Soft Coated Wheaten Terrier estão entre as mais hipoalergênicas.',
      },
      {
        q: 'Cachorro sem pelo existe?',
        a: 'Raças como o Chinese Crested, Perro Xoloitzcuintle (Mexican Hairless) e American Hairless Terrier têm pouco ou nenhum pelo, mas ainda produzem alérgenos na saliva e pele.',
      },
    ],
    relatedBreeds: ['poodle', 'schnauzer-miniatura', 'yorkshire-terrier'],
  },
  'racas-faceis-de-treinar': {
    title: 'Raças de Cachorro Fáceis de Treinar',
    description: 'As raças mais inteligentes e obedientes que aprendem comandos rapidamente.',
    questions: [
      {
        q: 'Qual a raça mais fácil de treinar?',
        a: 'Border Collie, Poodle, Pastor Alemão, Golden Retriever e Dobermann estão entre as raças mais inteligentes e fáceis de treinar, segundo especialistas.',
      },
      {
        q: 'Raças fáceis para iniciantes?',
        a: 'Golden Retriever, Labrador, Poodle, Boxer e Cavalier King Charles são excelentes para primeiro dono devido à sua docilidade e capacidade de aprendizado.',
      },
      {
        q: 'Quanto tempo leva para treinar um cachorro?',
        a: 'Comandos básicos podem ser aprendidos em 2-4 semanas com treino consistente. Treino completo de obediência leva 3-6 meses. Paciência e constância são chave.',
      },
    ],
    relatedBreeds: ['border-collie', 'poodle', 'pastor-alemao', 'golden-retriever'],
  },
  'racas-calmas': {
    title: 'Raças de Cachorro Calmas e Tranquilas',
    description: 'Cães com baixa energia que preferem relaxar a correr, perfeitos para pessoas tranquilas.',
    questions: [
      {
        q: 'Quais raças são mais calmas?',
        a: 'Bulldog Inglês, Pug, Shih Tzu, São Bernardo, Great Dane, Basset Hound e Mastiff Inglês são conhecidos por sua natureza calma e baixa energia.',
      },
      {
        q: 'Cachorro calmo é bom para apartamento?',
        a: 'Sim, raças calmas são ideais para apartamento porque não precisam de muito exercício e geralmente não latem excessivamente.',
      },
      {
        q: 'Raças calmas também precisam de exercício?',
        a: 'Sim, todas as raças precisam de algum exercício, mesmo as mais calmas. 20-30 minutos de passeio diário geralmente é suficiente.',
      },
    ],
    relatedBreeds: ['bulldog-ingles', 'pug', 'sao-bernardo', 'mastiff-ingles'],
  },
  'racas-que-nao-latem-muito': {
    title: 'Raças de Cachorro que Não Latem Muito',
    description: 'Raças silenciosas ideais para apartamento ou para quem prefere ambientes tranquilos.',
    questions: [
      {
        q: 'Quais raças latem menos?',
        a: 'Basenji, Bulldog Francês, Pug, Rhodesian Ridgeback, Whippet e Greyhound estão entre as raças que menos latem.',
      },
      {
        q: 'Existe cachorro que não late?',
        a: 'O Basenji é conhecido por não latir tradicionalmente - emite um som peculiar chamado "yodel". Mas nenhuma raça é completamente silenciosa.',
      },
      {
        q: 'Como ensinar meu cachorro a latir menos?',
        a: 'Ignore latidos desnecessários, recompense silêncio, forneça exercício adequado, e considere treinamento profissional se o latido for excessivo.',
      },
    ],
    relatedBreeds: ['basenji', 'bulldog-frances', 'pug', 'rhodesian-ridgeback'],
  },
  'melhor-cachorro-primeiro-dono': {
    title: 'Melhor Cachorro para Primeiro Dono',
    description: 'Raças ideais para quem está tendo seu primeiro cachorro, fáceis de cuidar e treinar.',
    questions: [
      {
        q: 'Qual a melhor raça para primeiro dono?',
        a: 'Golden Retriever, Labrador, Poodle, Boxer e Cavalier King Charles são excelentes para iniciantes. São dóceis, inteligentes e perdoam erros de treinamento.',
      },
      {
        q: 'Raça pequena para primeiro dono?',
        a: 'Pug, Maltês e Cavalier King Charles são ótimas opções pequenas. Evite Yorkshire ou Chihuahua se for totalmente iniciante.',
      },
      {
        q: 'O que preciso saber antes de ter um cachorro?',
        a: 'Considere: tempo disponível, espaço, custo mensal (r$500-1000), expectativa de vida (10-15 anos), e compromisso de longo prazo.',
      },
    ],
    relatedBreeds: ['golden-retriever', 'labrador', 'poodle', 'boxer'],
  },
  'racas-pequenas-porte': {
    title: 'Raças de Cachorro de Pequeno Porte',
    description: 'Guia completo das raças pequenas: características, cuidados e vantagens.',
    questions: [
      {
        q: 'Quais as principais raças pequenas?',
        a: 'Poodle Toy, Maltês, Yorkshire Terrier, Shih Tzu, Pug, Lulu da Pomerânia, Chihuahua, Papillon, e Pekingês estão entre as mais populares.',
      },
      {
        q: 'Vantagens de raças pequenas?',
        a: 'Ocupam menos espaço, comem menos, fáceis de transportar, vivem mais (geralmente 14-18 anos), e ideais para apartamento.',
      },
      {
        q: 'Raças pequenas são mais fáceis de cuidar?',
        a: 'Em alguns aspectos sim (comida, espaço), mas muitas requerem mais cuidados dentários, podem ser mais difíceis de treinar, e são mais frágeis.',
      },
    ],
    relatedBreeds: ['poodle-toy', 'maltes', 'yorkshire-terrier', 'shih-tzu', 'pug'],
  },
  'racas-media-porte': {
    title: 'Raças de Cachorro de Médio Porte',
    description: 'Conheça as raças médias: o equilíbrio perfeito entre energia e tamanho.',
    questions: [
      {
        q: 'O que é considerado médio porte?',
        a: 'Cães entre 15-30kg e 40-55cm de altura. Exemplos: Beagle, Bulldog Francês, Border Collie, Pointer, e Australian Cattle Dog.',
      },
      {
        q: 'Vantagens do médio porte?',
        a: 'Equilíbrio entre tamanho e resistência, bons para apartamento com exercícios, mais robustos que pequenos, menos comida que grandes.',
      },
      {
        q: 'Quais as melhores raças médias?',
        a: 'Border Collie, Australian Shepherd, Bulldog Francês, Beagle, Pointer, e Vizsla são excelentes opções de médio porte.',
      },
    ],
    relatedBreeds: ['beagle', 'bulldog-frances', 'border-collie', 'pointer'],
  },
  'racas-grande-porte': {
    title: 'Raças de Cachorro de Grande Porte',
    description: 'As raças maiores: imponentes, leais e requiring space and care considerations.',
    questions: [
      {
        q: 'Quais raças são de grande porte?',
        a: 'Golden Retriever, Labrador, Pastor Alemão, Rottweiler, Boxer, Dobermann, São Bernardo, Great Dane, e Mastiff são de grande porte (30-50kg+).',
      },
      {
        q: 'Raças grandes são mais caras?',
        a: 'Sim: comem mais (r$200-400/mês em ração), precisam de maiores medicamentos, e mais espaço. Mas também podem ser mais tranquilos que pequenos.',
      },
      {
        q: 'Raças grandes vivem menos?',
        a: 'Em média, sim: 8-12 anos comparado a 14-18 para pequenos. Mas isso varia por raça e cuidados.',
      },
    ],
    relatedBreeds: ['golden-retriever', 'labrador', 'pastor-alemao', 'rottweiler'],
  },
};

export async function generateStaticParams() {
  return Object.keys(faqData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { slug } = await params;
  const faq = faqData[slug];

  if (!faq) {
    return {
      title: 'FAQ não encontrado | TutorCanino',
    };
  }

  return {
    title: `${faq.title} | TutorCanino`,
    description: faq.description,
    alternates: {
      canonical: `${baseUrl}/faq/${slug}`,
    },
    openGraph: {
      title: faq.title,
      description: faq.description,
      url: `${baseUrl}/faq/${slug}`,
    },
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { slug } = await params;
  const faq = faqData[slug];

  if (!faq) notFound();

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-gray-400 text-sm font-bold mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900">{faq.title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6">
              <HelpCircle size={14} />
              <span>Perguntas Frequentes</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
              {faq.title}
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              {faq.description}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {faq.questions.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-black text-gray-900 mb-4">{item.q}</h3>
              <p className="text-gray-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        {/* Related Breeds */}
        {faq.relatedBreeds && faq.relatedBreeds.length > 0 && (
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Raças Relacionadas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {faq.relatedBreeds.map((breedSlug) => (
                <Link
                  key={breedSlug}
                  href={`/racas/${breedSlug}`}
                  className="bg-white p-4 rounded-2xl border border-gray-100 text-center font-bold text-gray-700 hover:text-primary hover:border-primary/20 transition-all"
                >
                  {breedSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
