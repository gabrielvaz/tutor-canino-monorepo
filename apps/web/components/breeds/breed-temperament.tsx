import type { Breed } from '@tutorcanino/data';
import { Heart, Zap, Brain, Volume2, Shield, Baby, Dog, CheckCircle2 } from 'lucide-react';

interface BreedTemperamentProps {
  breed: Breed;
}

function RatingBar({ rating, label, icon }: { rating: number; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm font-bold text-gray-700">
          <div className="text-primary">{icon}</div>
          {label}
        </div>
        <span className="text-xs font-black text-gray-400 tabular-nums">{rating}/5</span>
      </div>
      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out" 
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
    { label: 'Energia', rating: caracteristicas.energia || 3, icon: <Zap size={16} /> },
    { label: 'Inteligência', rating: caracteristicas.inteligencia || 3, icon: <Brain size={16} /> },
    { label: 'Afeto', rating: caracteristicas.afeicao_familia || 3, icon: <Heart size={16} /> },
    { label: 'Crianças', rating: caracteristicas.bom_com_criancas || 3, icon: <Baby size={16} /> },
    { label: 'Outros Cães', rating: caracteristicas.bom_com_outros_caes || 3, icon: <Dog size={16} /> },
    { label: 'Latido', rating: caracteristicas.latido || 3, icon: <Volume2 size={16} /> },
    { label: 'Treinamento', rating: caracteristicas.facilidade_treinamento || 3, icon: <CheckCircle2 size={16} /> },
    { label: 'Guarda', rating: caracteristicas.instinto_guarda || 3, icon: <Shield size={16} /> },
  ];

  return (
    <div className="bg-gray-50/50 rounded-[2.5rem] p-10 h-full border border-gray-100">
      <h2 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-4">
        <div className="w-1.5 h-8 bg-secondary rounded-full" />
        Temperamento
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
        {ratings.map((rating, index) => (
          <RatingBar key={index} {...rating} />
        ))}
      </div>

      {(sobre?.ideal_para) && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Ideal para</span>
          <div className="flex flex-wrap gap-2">
            {sobre?.ideal_para?.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center px-5 py-2 rounded-full text-xs font-black bg-secondary/10 text-secondary-dark border border-secondary/5"
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
