import type { Breed } from '@tutorcanino/data';
import { Check, X, Minus } from 'lucide-react';

interface ComparisonTableProps {
  breed1: Breed;
  breed2: Breed;
}

export function ComparisonTable({ breed1, breed2 }: ComparisonTableProps) {
  const rows = [
    { label: 'Porte', val1: breed1.categoria, val2: breed2.categoria },
    { label: 'Origem', val1: breed1.ficha_tecnica?.origem, val2: breed2.ficha_tecnica?.origem },
    { label: 'Expectativa de Vida', val1: breed1.ficha_tecnica?.expectativa_vida, val2: breed2.ficha_tecnica?.expectativa_vida },
    { label: 'Energia', val1: `${breed1.caracteristicas?.energia || 0}/5`, val2: `${breed2.caracteristicas?.energia || 0}/5` },
    { label: 'Inteligência', val1: `${breed1.caracteristicas?.inteligencia || 0}/5`, val2: `${breed2.caracteristicas?.inteligencia || 0}/5` },
    { label: 'Queda de Pelo', val1: `${breed1.caracteristicas?.queda_pelo || 0}/5`, val2: `${breed2.caracteristicas?.queda_pelo || 0}/5` },
    { label: 'Bom com Crianças', val1: `${breed1.caracteristicas?.bom_com_criancas || 0}/5`, val2: `${breed2.caracteristicas?.bom_com_criancas || 0}/5` },
    { label: 'Bom com outros Cães', val1: `${breed1.caracteristicas?.bom_com_outros_caes || 0}/5`, val2: `${breed2.caracteristicas?.bom_com_outros_caes || 0}/5` },
    { label: 'Facilidade de Treino', val1: `${breed1.caracteristicas?.facilidade_treinamento || 0}/5`, val2: `${breed2.caracteristicas?.facilidade_treinamento || 0}/5` },
  ];

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50">
            <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">Característica</th>
            <th className="p-6 text-lg font-black text-gray-900 border-b border-gray-100">{breed1.nome}</th>
            <th className="p-6 text-lg font-black text-gray-900 border-b border-gray-100">{breed2.nome}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className="group hover:bg-primary/5 transition-colors">
              <td className="p-6 text-sm font-bold text-gray-500 border-b border-gray-50">{row.label}</td>
              <td className="p-6 text-base font-black text-gray-900 border-b border-gray-50">{row.val1 || '-'}</td>
              <td className="p-6 text-base font-black text-gray-900 border-b border-gray-50">{row.val2 || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
