'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Badge, Card } from '@tutorcanino/ui';
import type { Breed } from '@tutorcanino/data';
import { PawPrint, Heart } from 'lucide-react';

interface BreedCardProps {
  breed: Breed;
}

export function BreedCard({ breed }: BreedCardProps) {
  // Use fields from the new professional schema
  const { nome, slug, categoria, imagem_principal, sobre, popularidade, caracteristicas } = breed;

  const categoryLabel = categoria === 'Pequeno' ? 'Pequeno Porte' : 
                       categoria === 'Médio' ? 'Médio Porte' : 
                       categoria === 'Grande' ? 'Grande Porte' : 
                       categoria;

  // Image validation fallback
  const imagem = imagem_principal || '/images/breeds/placeholder.jpg';

  // Content summary
  const descricao = sobre?.descricao || `${nome} - ${categoryLabel}`;
  const resumo = descricao.length > 80 ? descricao.substring(0, 80) + '...' : descricao;

  // Personality tags (simplified for the card)
  const personalityTraits = [];
  if (caracteristicas?.inteligencia && caracteristicas.inteligencia >= 4) personalityTraits.push('Inteligente');
  if (caracteristicas?.afeicao_familia && caracteristicas.afeicao_familia >= 4) personalityTraits.push('Afetuoso');
  if (caracteristicas?.bom_com_criancas && caracteristicas.bom_com_criancas >= 4) personalityTraits.push('Dócil');
  if (personalityTraits.length === 0) personalityTraits.push('Leal', 'Companheiro');

  // Paw rating based on popularity
  const paws = Math.min(5, Math.max(1, Math.floor((popularidade || 0) / 2000) + 1));

  return (
    <Link href={`/racas/${slug}`} className="group block h-full active:scale-[0.98] transition-transform animate-reveal">
      <Card className="h-full overflow-hidden border-gray-200 hover:border-primary/40 hover:shadow-xl transition-all duration-500 rounded-3xl">
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
          <Image
            src={imagem}
            alt={nome}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-none shadow-sm font-bold text-xs py-1 px-2.5 rounded-full">
              {categoryLabel}
            </Badge>
          </div>
          <button 
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-primary transition-colors shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              // Placeholder for favorite action
            }}
          >
            <Heart size={16} />
          </button>
        </div>

        <div className="p-6 flex flex-col h-[calc(100%-75%)]">
          <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight">
            {nome}
          </h3>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {personalityTraits.slice(0, 2).map(trait => (
              <span key={trait} className="text-[10px] uppercase tracking-wider font-bold text-secondary-dark bg-secondary/10 px-2 py-0.5 rounded-full">
                {trait}
              </span>
            ))}
          </div>

          <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
            {resumo}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Popularidade</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <PawPrint
                  key={i}
                  size={14}
                  className={`${
                    i < paws
                      ? 'text-primary fill-primary'
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
