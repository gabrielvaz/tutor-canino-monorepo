import type { Breed } from '@tutorcanino/data';
import { Palette, Sparkles } from 'lucide-react';

interface BreedColorsProps {
  colors: Breed['cores_disponiveis'];
  marks: Breed['marcacoes'];
}

export function BreedColors({ colors, marks }: BreedColorsProps) {
  if ((!colors || colors.length === 0) && (!marks || marks.length === 0)) return null;

  return (
    <section className="bg-white rounded-[2.5rem] p-8 md:p-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
          <Palette size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900">
          Cores e Marcações
        </h2>
      </div>

      <div className="space-y-6">
        {colors && colors.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Cores Disponíveis</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <div key={color} className="flex items-center gap-2">
                  <span
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    style={{
                      backgroundColor: getColorHex(color),
                    }}
                  />
                  <span className="text-sm font-medium text-gray-700">{color}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {marks && marks.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Marcações Típicas</h3>
            <div className="flex flex-wrap gap-2">
              {marks.map((mark) => (
                <span
                  key={mark}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700"
                >
                  <Sparkles size={14} className="text-gray-500 mr-1" />
                  {mark}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Helper function para converter nomes de cores para hex
function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    'Dourado': '#D4A537',
    'Creme': '#F5DEB3',
    'Escuro': '#8B4513',
    'Preto': '#1C1917',
    'Branco': '#FAFAFA',
    'Caramelo': '#CD7F32',
    'Chocolate': '#7B3F00',
    'Fogo': '#B22222',
    'Areia': '#C2B280',
    'Cinza': '#808080',
  };

  return colorMap[colorName] || '#D1D5DB';
}
