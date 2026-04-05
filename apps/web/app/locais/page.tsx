import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ShoppingBag, Stethoscope, Home, Heart, Trees } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Serviços e Locais Pet no Brasil | TutorCanino',
  description: 'Encontre petshops, veterinários, creches e parques em todas as capitais do Brasil. O guia completo para o tutor moderno.',
};

const capitals = [
  { uf: 'ac', city: 'rio-branco', name: 'Rio Branco' },
  { uf: 'al', city: 'maceio', name: 'Maceió' },
  { uf: 'ap', city: 'macapa', name: 'Macapá' },
  { uf: 'am', city: 'manaus', name: 'Manaus' },
  { uf: 'ba', city: 'salvador', name: 'Salvador' },
  { uf: 'ce', city: 'fortaleza', name: 'Fortaleza' },
  { uf: 'df', city: 'brasilia', name: 'Brasília' },
  { uf: 'es', city: 'vitoria', name: 'Vitória' },
  { uf: 'go', city: 'goiania', name: 'Goiânia' },
  { uf: 'ma', city: 'sao-luis', name: 'São Luís' },
  { uf: 'mt', city: 'cuiaba', name: 'Cuiabá' },
  { uf: 'ms', city: 'campo-grande', name: 'Campo Grande' },
  { uf: 'mg', city: 'belo-horizonte', name: 'Belo Horizonte' },
  { uf: 'pa', city: 'belem', name: 'Belém' },
  { uf: 'pb', city: 'joao-pessoa', name: 'João Pessoa' },
  { uf: 'pr', city: 'curitiba', name: 'Curitiba' },
  { uf: 'pe', city: 'recife', name: 'Recife' },
  { uf: 'pi', city: 'teresina', name: 'Teresina' },
  { uf: 'rj', city: 'rio-de-janeiro', name: 'Rio de Janeiro' },
  { uf: 'rn', city: 'natal', name: 'Natal' },
  { uf: 'rs', city: 'porto-alegre', name: 'Porto Alegre' },
  { uf: 'ro', city: 'porto-velho', name: 'Porto Velho' },
  { uf: 'rr', city: 'boa-vista', name: 'Boa Vista' },
  { uf: 'sc', city: 'florianopolis', name: 'Florianópolis' },
  { uf: 'sp', city: 'sao-paulo', name: 'São Paulo' },
  { uf: 'se', city: 'aracaju', name: 'Aracaju' },
  { uf: 'to', city: 'palmas', name: 'Palmas' },
];

const categories = [
  { id: 'petshops', name: 'Petshops', icon: <ShoppingBag />, color: 'bg-primary' },
  { id: 'veterinarios', name: 'Veterinários', icon: <Stethoscope />, color: 'bg-secondary' },
  { id: 'creches', name: 'Creches', icon: <Home />, color: 'bg-accent' },
  { id: 'hoteis', name: 'Hotéis', icon: <Heart />, color: 'bg-primary' },
  { id: 'parques', name: 'Parques e Pet Places', icon: <Trees />, color: 'bg-secondary' },
];

export default function LocaisHubPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-8">
            <MapPin size={14} />
            <span>Guia de Serviços Brasil</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-none mb-8 tracking-tighter">
            Tudo o que seu Pet <span className="text-primary">Precisa</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Encontre os melhores estabelecimentos em todas as capitais do Brasil.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 mt-12 space-y-20">
        {/* Categories Grid */}
        <section>
          <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">O que você procura?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="group p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-gray-200`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{cat.name}</h3>
                <Link href={`/${cat.id}/sp/sao-paulo`} className="text-sm font-bold text-primary hover:underline">
                  Ver em São Paulo →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Cities Grid */}
        <section>
          <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">Explorar por Capital</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {capitals.map((cap) => (
              <Link
                key={`${cap.uf}-${cap.city}`}
                href={`/petshops/${cap.uf}/${cap.city}`}
                className="p-4 rounded-2xl bg-white border border-gray-100 text-center font-bold text-gray-700 hover:text-primary hover:border-primary/20 transition-all shadow-sm"
              >
                <span className="block text-[10px] uppercase text-gray-400 mb-1">{cap.uf.toUpperCase()}</span>
                {cap.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
