import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getLocationBySlug } from '@tutorcanino/locations';
import { MapPin, Phone, Star, Clock, Globe, ChevronRight } from 'lucide-react';

interface LocationDetailPageProps {
  params: Promise<{
    category: string;
    uf: string;
    city: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: LocationDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) return { title: 'Local não encontrado' };

  return {
    title: `${location.name} - ${location.city}, ${location.uf.toUpperCase()} | TutorCanino`,
    description: `${location.name}: ${location.description || `Confira endereço, telefone e avaliações de ${location.name} em ${location.city}.`}`,
  };
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const { category, uf, city, slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) notFound();

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header / Breadcrumb */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-gray-400 text-sm font-bold mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href={`/${category}/${uf}/${city}`} className="hover:text-primary transition-colors capitalize">{category}</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900">{location.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">{location.name}</h1>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.floor(location.rating?.score || 0) ? 'text-accent fill-accent' : 'text-gray-200 fill-gray-200'} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-black text-gray-900">{location.rating?.score}</span>
                  <span className="text-sm font-medium text-gray-400">({location.rating?.count} avaliações)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                  <MapPin size={16} className="text-primary" />
                  {location.city}, {location.uf.toUpperCase()}
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              {location.phone && (
                <a href={`tel:${location.phone}`} className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                  <Phone size={18} />
                  Ligar Agora
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Sobre este local</h2>
              <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
                {location.description || 'Nenhuma descrição detalhada disponível para este estabelecimento ainda.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <MapPin size={14} className="text-primary" />
                    Endereço
                  </h3>
                  <p className="text-gray-700 font-bold leading-relaxed">{location.address}</p>
                </div>
                {location.website && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Globe size={14} className="text-primary" />
                      Website
                    </h3>
                    <a href={location.website} target="_blank" rel="noopener" className="text-primary font-black break-all hover:underline">{location.website}</a>
                  </div>
                )}
              </div>
            </section>

            {/* Google Maps Placeholder */}
            {location.coordinates && (
              <section className="h-96 w-full rounded-[3rem] overflow-hidden border border-gray-100 shadow-lg relative bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold italic">
                  Mapa Interativo: {location.coordinates.lat}, {location.coordinates.lng}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / Hours */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                <Clock size={20} className="text-primary" />
                Horários
              </h3>
              <div className="space-y-3">
                {location.businessHours?.map((h) => (
                  <div key={h.day} className="flex justify-between items-center text-sm font-bold border-b border-gray-50 pb-2 last:border-0">
                    <span className="text-gray-500">{h.day}</span>
                    <span className="text-gray-900">{h.open} - {h.close}</span>
                  </div>
                )) || (
                  <p className="text-gray-400 italic text-sm">Horários não informados.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
