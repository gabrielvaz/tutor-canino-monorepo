import type { Breed } from '@tutorcanino/data';

interface BreedSpecsProps {
  breed: Breed;
}

export function BreedSpecs({ breed }: BreedSpecsProps) {
  const specs = [
    {
      label: 'Porte',
      value: breed.caracteristicas?.fisico?.porte || '-',
    },
    {
      label: 'Peso (Macho)',
      value: breed.informacoes_basicas?.peso?.macho || '-',
    },
    {
      label: 'Peso (Fêmea)',
      value: breed.informacoes_basicas?.peso?.femea || '-',
    },
    {
      label: 'Altura (Macho)',
      value: breed.informacoes_basicas?.altura?.macho || '-',
    },
    {
      label: 'Altura (Fêmea)',
      value: breed.informacoes_basicas?.altura?.femea || '-',
    },
    {
      label: 'Expectativa de Vida',
      value: breed.informacoes_basicas?.expectativa_vida || '-',
    },
    {
      label: 'Origem',
      value: breed.informacoes_basicas?.origem || '-',
    },
    {
      label: 'Tipo de Pelo',
      value: breed.caracteristicas?.fisico?.tipo_pelo || '-',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ficha Técnica</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="border-b pb-3 last:border-0">
            <dt className="text-sm font-medium text-gray-500">{spec.label}</dt>
            <dd className="mt-1 text-lg text-gray-900">{spec.value}</dd>
          </div>
        ))}
      </div>
    </div>
  );
}
