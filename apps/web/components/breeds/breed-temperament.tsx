import type { Breed } from '@tutorcanino/data';
import { Heart, Zap, Brain, Volume2, Shield, Users, Baby, Dog } from 'lucide-react';

interface BreedTemperamentProps {
  breed: Breed;
}

function RatingBar({ rating, label, icon }: { rating: number; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          {icon}
          {label}
        </div>
        <span className="text-gray-400 font-bold">{rating}/5</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-secondary rounded-full transition-all duration-1000" 
          style={{ width: `${(rating / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function BreedTemperament({ breed }: BreedTemperamentProps) {
  const { caracteristicas, sobre } = breed;

  if (!caracteristicas) return null;

  const ratings = [
    { label: 'Nível de Energia', rating: caracteristicas.energia || 3, icon: <Zap size={16} className="text-primary" /> },
    { label: 'Inteligência', rating: caracteristicas.inteligencia || 3, icon: <Brain size={16} className="text-primary" /> },
    { label: 'Afeto com Família', rating: caracteristicas.afeicao_familia || 3, icon: <Heart size={16} className="text-primary" /> },
    { label: 'Bom com Crianças', rating: caracteristicas.bom_com_criancas || 3, icon: <Baby size={16} className="text-primary" /> },
    { label: 'Bom com outros Cães', rating: caracteristicas.bom_com_outros_caes || 3, icon: <Dog size={16} className="text-primary" /> },
    { label: 'Nível de Latido', rating: caracteristicas.latido || 3, icon: <Volume2 size={16} className="text-primary" /> },
    { label: 'Facilidade de Treino', rating: caracteristicas.facilidade_treinamento || 3, icon: <Shield size={16} className="text-primary" /> },
    { label: 'Instinto de Guarda', rating: caracteristicas.instinto_guarda || 3, icon: <Shield size={16} className="text-primary" /> },
  ];

  return (
    <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <div className="w-2 h-8 bg-secondary rounded-full" />
        Temperamento
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
        {ratings.map((rating, index) => (
          <RatingBar key={index} {...rating} />
        ))}
      </div>

      {(sobre?.ideal_para || sobre?.curiosidades) && (
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Ideal para</h3>
          <div className="flex flex-wrap gap-2">
            {sobre?.ideal_para?.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white text-secondary border border-secondary/20 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
