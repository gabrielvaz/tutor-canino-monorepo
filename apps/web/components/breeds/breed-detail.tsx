import type { Breed } from '@tutorcanino/data';
import { BreedSpecs } from './breed-specs';
import { BreedTemperament } from './breed-temperament';

interface BreedDetailProps {
  breed: Breed;
}

export function BreedDetail({ breed }: BreedDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>{breed.informacoes_basicas?.origem || 'Origem desconhecida'}</span>
          <span>•</span>
          <span>{breed.informacoes_basicas?.expectativa_vida || 'Vida média: -'}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {breed.nome || breed.name || 'Raça'}
        </h1>
        {breed.subtitulo && (
          <p className="text-xl text-gray-600 italic">{breed.subtitulo}</p>
        )}
      </header>

      {/* Description */}
      {breed.sobre?.descricao && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre a Raça</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            {breed.sobre.descricao.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <BreedSpecs breed={breed} />
        </div>
        <div>
          <BreedTemperament breed={breed} />
        </div>
      </div>

      {/* History */}
      {breed.sobre?.historia && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">História</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            {breed.sobre.historia.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* Care */}
      {breed.cuidados && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cuidados</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {breed.cuidados.exercicio && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Exercício</dt>
                  <dd className="mt-1 text-gray-900">{breed.cuidados.exercicio}</dd>
                </div>
              )}
              {breed.cuidados.saude && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Saúde</dt>
                  <dd className="mt-1 text-gray-900">{breed.cuidados.saude}</dd>
                </div>
              )}
              {breed.cuidados.higiene && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Higiene</dt>
                  <dd className="mt-1 text-gray-900">{breed.cuidados.higiene}</dd>
                </div>
              )}
              {breed.cuidados.treinamento && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Treinamento</dt>
                  <dd className="mt-1 text-gray-900">{breed.cuidados.treinamento}</dd>
                </div>
              )}
            </dl>
          </div>
        </section>
      )}

      {/* Cultural Significance */}
      {breed.historico?.significado_cultural && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Significado Cultural</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            {breed.historico.significado_cultural.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* Related Breeds */}
      {breed.racas_relacionadas && breed.racas_relacionadas.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Raças Relacionadas</h2>
          <div className="flex flex-wrap gap-2">
            {breed.racas_relacionadas.map((related, index) => (
              <span
                key={index}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
              >
                {related}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
