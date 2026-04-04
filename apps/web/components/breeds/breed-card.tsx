import Link from 'next/link';
import Image from 'next/image';
import { Badge, Card } from '@tutorcanino/ui';
import type { Breed } from '@tutorcanino/data';
import { Star } from 'lucide-react';

interface BreedCardProps {
  breed: Breed;
}

export function BreedCard({ breed }: BreedCardProps) {
  // Use fields from the new professional schema
  const { nome, slug, categoria, imagem_principal, sobre, popularidade } = breed;

  const categoryLabel = categoria === 'Pequeno' ? 'Pequeno Porte' : 
                       categoria === 'Médio' ? 'Médio Porte' : 
                       categoria === 'Grande' ? 'Grande Porte' : 
                       categoria;

  // Image validation fallback
  const imagem = imagem_principal || '/images/breeds/placeholder.jpg';

  // Content summary
  const descricao = sobre?.descricao || `${nome} - ${categoryLabel}`;
  const resumo = descricao.length > 100 ? descricao.substring(0, 100) + '...' : descricao;

  // Star rating based on popularity (just for visual representation)
  const stars = Math.min(5, Math.max(1, Math.floor((popularidade || 0) / 2000) + 1));

  return (
    <Link href={`/racas/${slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
          <Image
            src={imagem}
            alt={nome}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-secondary text-white border-none shadow-sm">
              {categoryLabel}
            </Badge>
          </div>
        </div>

        <div className="p-5 flex flex-col h-[calc(100%-75%)]">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {nome}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
            {resumo}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Popularidade</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < stars
                      ? 'text-accent fill-accent'
                      : 'text-gray-200 fill-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
