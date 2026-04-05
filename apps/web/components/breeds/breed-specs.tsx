import type { Breed } from '@tutorcanino/data';
import { Ruler, Weight, Hourglass, Globe, Dog, FileText } from 'lucide-react';

interface BreedSpecsProps {
  breed: Breed;
}

export function BreedSpecs({ breed }: BreedSpecsProps) {
  const { ficha_tecnica, categoria } = breed;

  const specs = [
    {
      label: 'Porte',
      value: categoria || '-',
      icon: <Dog className="w-4 h-4" />,
    },
    {
      label: 'Origem',
      value: ficha_tecnica?.origem || '-',
      icon: <Globe className="w-4 h-4" />,
    },
    {
      label: 'Expectativa de Vida',
      value: ficha_tecnica?.expectativa_vida || '-',
      icon: <Hourglass className="w-4 h-4" />,
    },
    {
      label: 'Altura (Macho)',
      value: ficha_tecnica?.altura_macho || '-',
      icon: <Ruler className="w-4 h-4" />,
    },
    {
      label: 'Altura (Fêmea)',
      value: ficha_tecnica?.altura_femea || '-',
      icon: <Ruler className="w-4 h-4" />,
    },
    {
      label: 'Peso (Macho)',
      value: ficha_tecnica?.peso_macho || '-',
      icon: <Weight className="w-4 h-4" />,
    },
    {
      label: 'Peso (Fêmea)',
      value: ficha_tecnica?.peso_femea || '-',
      icon: <Weight className="w-4 h-4" />,
    },
    {
      label: 'Grupo FCI',
      value: ficha_tecnica?.grupo_fci || '-',
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-gray-50/50 rounded-[2.5rem] p-10 h-full border border-gray-100">
      <h2 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-4">
        <div className="w-1.5 h-8 bg-primary rounded-full" />
        Ficha Técnica
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
        {specs.map((spec, index) => (
          <div key={index} className="flex flex-col gap-1.5 group">
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              <div className="text-primary">{spec.icon}</div>
              {spec.label}
            </div>
            <div className="text-lg font-bold text-gray-800 transition-colors group-hover:text-primary">
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
