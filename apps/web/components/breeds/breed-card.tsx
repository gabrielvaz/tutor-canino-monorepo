import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@tutorcanino/ui';
import type { Breed } from '@tutorcanino/data';

interface BreedCardProps {
  breed: Breed;
}

// Helper to validate and get image URL
function getValidImageUrl(breed: Breed): string {
  const imagem = breed.imagens?.[0] || breed.imagem_referencia_id;

  // If no image or invalid image, use placeholder
  if (!imagem || imagem === 'h' || imagem.length < 5) {
    return '/images/breeds/placeholder.jpg';
  }

  // Ensure image starts with / or is a full URL
  if (imagem.startsWith('/') || imagem.startsWith('http://') || imagem.startsWith('https://')) {
    return imagem;
  }

  // Relative path needs leading slash
  return '/' + imagem;
}

export function BreedCard({ breed }: BreedCardProps) {
  // Generate a slug from the breed name/id
  const slug = breed.nome?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || breed.id;

  // Get category from characteristics
  const porte = breed.caracteristicas?.fisico?.porte || 'Médio';

  const categoryLabel = {
    'Pequeno': 'Pequeno Porte',
    'Médio': 'Médio Porte',
    'Grande': 'Grande Porte',
    'Gigante': 'Gigante',
  }[porte] || 'Médio Porte';

  // Get image with validation
  const imagem = getValidImageUrl(breed);

  // Get description
  const descricao = breed.sobre?.descricao || `${breed.nome || 'Raça'} - ${categoryLabel}`;
  const resumo = descricao.length > 120 ? descricao.substring(0, 120) + '...' : descricao;

  return (
    <Link href={`/racas/${slug}`} className="group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 bg-gray-200">
          <Image
            src={imagem}
            alt={breed.nome || 'Raça'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-3 right-3 bg-blue-600">
            {categoryLabel}
          </Badge>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {breed.nome || 'Raça'}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {resumo}
          </p>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Popularidade</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 fill-current'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
