import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocationsByCity, LocationCategory } from '@tutorcanino/locations';
import { LocationCard } from '@/components/locations/location-card';
import { MapPin, Phone, Star, ShieldCheck } from 'lucide-react';

interface CityHubPageProps {
  params: Promise<{
    category: string;
    uf: string;
    city: string;
  }>;
}

export async function generateMetadata({ params }: CityHubPageProps): Promise<Metadata> {
  const { category, uf, city } = await params;
  const cityName = city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const catName = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${catName} em ${cityName} - ${uf.toUpperCase()} | TutorCanino`,
    description: `Encontre os melhores ${category} em ${cityName}, ${uf.toUpperCase()}. Veja endereços, telefones e avaliações.`,
  };
}

export default async function CityHubPage({ params }: CityHubPageProps) {
  const { category, uf, city } = await params;
  
  const locations = getLocationsByCity(uf, city, category as LocationCategory);
  const cityName = city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const catName = category.charAt(0).toUpperCase() + category.slice(1);

  if (locations.length === 0) {
    // For programmatic SEO, we might want to still show an editorial page even if listings are zero
    // But for now, let's 404 if no data exists to avoid empty pages.
    // In production, we'd have a list of all 27 capitals pre-populated.
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6">
              <MapPin size={14} />
              <span>Guia Local: {uf.toUpperCase()}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              {catName} em <span className="text-primary">{cityName}</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed font-medium">
              Confira nossa seleção curada de {category} em {cityName}. Informações verificadas para garantir o melhor para seu pet.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Listings */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                {locations.length} Estabelecimentos encontrados
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {locations.map((loc) => (
                <LocationCard key={loc.id} location={loc} />
              ))}
              
              {locations.length === 0 && (
                <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 text-center">
                  <p className="text-gray-400 font-bold italic">Nenhum estabelecimento cadastrado nesta categoria em {cityName} ainda.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <ShieldCheck size={32} className="mb-6 text-secondary" />
                <h3 className="text-xl font-black mb-4">Dados Verificados</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  Trabalhamos para manter os dados sempre atualizados. Se encontrar alguma divergência, por favor nos avise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
