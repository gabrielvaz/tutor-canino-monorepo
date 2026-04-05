import { Info } from 'lucide-react';

interface CityEditorialProps {
  city: string;
  category: string;
}

export function CityEditorial({ city, category }: CityEditorialProps) {
  // In a real scenario, this would fetch from a JSON or AI-generated editorial dataset
  return (
    <section className="bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Info size={24} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">O mercado pet em {city}</h2>
      </div>
      
      <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
        <p>
          {city} possui uma infraestrutura crescente para tutores de cães. A categoria de {category} na cidade 
          vem se modernizando, oferecendo serviços cada vez mais especializados e focados no bem-estar animal.
        </p>
        <p className="mt-4">
          Nossa curadoria selecionou os estabelecimentos com melhores avaliações e histórico de atendimento 
          para garantir que seu pet receba o melhor cuidado possível.
        </p>
      </div>
    </section>
  );
}
