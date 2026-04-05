import type { Breed } from '@tutorcanino/data';
import { History, BookOpen } from 'lucide-react';

interface BreedHistoryProps {
  history: Breed['curiosidades_historicas'];
  references: Breed['referencias_externas'];
}

export function BreedHistory({ history, references }: BreedHistoryProps) {
  if (!history && (!references || references.length === 0)) return null;

  return (
    <section className="bg-white rounded-[2.5rem] p-8 md:p-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
          <History size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900">
          História e Curiosidades
        </h2>
      </div>

      {history && (
        <div className="mb-8 p-6 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-gray-700 leading-relaxed">{history}</p>
        </div>
      )}

      {references && references.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-gray-500" />
            Referências Oficiais
          </h3>
          <div className="space-y-3">
            {references.map((ref, index) => (
              <a
                key={index}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {ref.titulo}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{ref.url}</p>
                    {ref.descricao && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{ref.descricao}</p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
