import Link from 'next/link';
import { Card } from '@tutorcanino/ui';
import { MapPin, Phone, Star, ArrowRight } from 'lucide-react';
import type { Location } from '@tutorcanino/locations';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  const { name, category, uf, city, slug, address, phone, rating } = location;

  return (
    <Link href={`/${category}/${uf}/${city}/${slug}`} className="group block">
      <Card className="p-8 rounded-[2.5rem] border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-500 bg-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-dark text-[10px] font-black uppercase tracking-widest">
                {category}
              </span>
              {rating && (
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-accent fill-accent" />
                  <span className="text-xs font-black text-gray-900">{rating.score}</span>
                  <span className="text-xs font-medium text-gray-400">({rating.count})</span>
                </div>
              )}
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors leading-tight">
              {name}
            </h3>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 text-sm text-gray-500 font-medium">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="line-clamp-1">{address}</span>
              </div>
              {phone && (
                <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                  <Phone size={16} className="text-primary shrink-0" />
                  {phone}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
        
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </Link>
  );
}
