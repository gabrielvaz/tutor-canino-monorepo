import type { Breed } from '@tutorcanino/data';

export function generateBreedSchema(breed: Breed) {
  const { nome, slug, sobre, imagem_principal, ficha_tecnica, caracteristicas } = breed;
  const baseUrl = 'https://tutorcanino.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: nome,
    image: imagem_principal?.startsWith('http') 
      ? imagem_principal 
      : `${baseUrl}${imagem_principal}`,
    description: sobre?.descricao || breed.seo?.description,
    brand: {
      '@type': 'Brand',
      name: 'TutorCanino',
    },
    sku: slug,
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/racas/${slug}`,
      priceCurrency: 'BRL',
      price: '0',
      availability: 'https://schema.org/InStock',
    },
    // Aqui injetamos os dados técnicos para o Google entender como atributos do produto
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Origem',
        value: ficha_tecnica?.origem,
      },
      {
        '@type': 'PropertyValue',
        name: 'Expectativa de Vida',
        value: ficha_tecnica?.expectativa_vida,
      },
      {
        '@type': 'PropertyValue',
        name: 'Porte',
        value: breed.categoria,
      },
    ],
    // Habilitar Estrelas de Avaliação (usamos popularidade ou média de características)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ((caracteristicas?.inteligencia || 3) + (caracteristicas?.afeicao_familia || 3)) / 2,
      reviewCount: Math.floor((breed.popularidade || 100) / 10) + 1,
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function generateComparisonSchema(breed1: Breed, breed2: Breed) {
  const baseUrl = 'https://tutorcanino.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Comparação: ${breed1.nome} vs ${breed2.nome}`,
    description: `Diferenças técnicas e de temperamento entre ${breed1.nome} e ${breed2.nome}.`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: generateBreedSchema(breed1)
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: generateBreedSchema(breed2)
      }
    ]
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TutorCanino',
    url: 'https://tutorcanino.com',
    logo: 'https://tutorcanino.com/logo.png',
    sameAs: [
      'https://instagram.com/tutorcanino',
      'https://facebook.com/tutorcanino',
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TutorCanino',
    url: 'https://tutorcanino.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tutorcanino.com/racas?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}
