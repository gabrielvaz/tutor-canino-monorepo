import type { Breed } from '@tutorcanino/data';

interface BreedTemperamentProps {
  breed: Breed;
}

function RatingStars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 w-32">{label}</span>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export function BreedTemperament({ breed }: BreedTemperamentProps) {
  // Extract temperament info from personalidade array
  const personalidade = breed.caracteristicas?.personalidade || [];
  const familia = breed.caracteristicas?.familia || {};

  // Create ratings from available data
  const ratings = [
    {
      label: 'Energia',
      rating: personalidade.includes('Alto') || personalidade.includes('Ativo') ? 5 :
              personalidade.includes('Médio') ? 3 : 2,
    },
    {
      label: 'Inteligência',
      rating: 4, // Default since we don't have specific data
    },
    {
      label: 'Crianças',
      rating: familia.afinidade_com_criancas === 'Alta' ? 5 :
              familia.afinidade_com_criancas === 'Média' ? 3 : 2,
    },
    {
      label: 'Sociabilidade',
      rating: familia.afinidade_com_adultos === 'Alta' ? 5 : 3,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Temperamento</h2>
      <div className="space-y-4">
        {ratings.map((rating, index) => (
          <RatingStars key={index} rating={rating.rating} label={rating.label} />
        ))}
      </div>

      {personalidade.length > 0 && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
          <div className="flex flex-wrap gap-2">
            {personalidade.map((trait, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
