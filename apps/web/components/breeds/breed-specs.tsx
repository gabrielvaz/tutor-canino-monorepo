import type { Breed } from '@tutorcanino/data';
import { Ruler, Weight, Hourglass, Globe, Dog } from 'lucide-react';

interface BreedSpecsProps {
  breed: Breed;
}

export function BreedSpecs({ breed }: BreedSpecsProps) {
  const { ficha_tecnica, categoria } = breed;

  const specs = [
    {
      label: 'Porte',
      value: categoria || '-',
      icon: <Dog className="w-5 h-5 text-primary" />,
    },
    {
      label: 'Origem',
      value: ficha_tecnica?.origem || '-',
      icon: <Globe className="w-5 h-5 text-primary" />,
    },
    {
      label: 'Expectativa de Vida',
      value: ficha_tecnica?.expectativa_vida || '-',
      icon: <Hourglass className="w-5 h-5 text-primary" />,
    },
    {
      label: 'Altura (Macho)',
      value: ficha_tecnica?.altura_macho || '-',
      icon: <Ruler className="w-5 h-5 text-primary" />,
    },
    {
      label: 'Altura (Fêmea)',
      value: ficha_tecnica?.altura_femea || '-',
      icon: <Ruler className="w-5 h-5 text-primary" />,
    },
    {
      label: 'Peso (Macho)',
      value: ficha_tecnica?.peso_macho || '-',
      icon: <Weight className="w-5 h-5 text-primary" />,
    },
    {
      label: 'Peso (Fêmea)',
      value: ficha_tecnica?.peso_femea || '-',
      icon: <Weight className="w-5 h-5 text-primary" />,
    },
    {
      label: 'Grupo FCI',
      value: ficha_tecnica?.grupo_fci || '-',
      icon: <Dog className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <div className="w-2 h-8 bg-primary rounded-full" />
        Ficha Técnica
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {specs.map((spec, index) => (
          <div key={index} className="flex flex-col gap-1 group">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              {spec.icon}
              {spec.label}
            </div>
            <div className="text-lg font-semibold text-gray-800 pl-7 group-hover:text-primary transition-colors">
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
