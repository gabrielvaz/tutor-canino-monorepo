import type { Breed } from '@tutorcanino/data';

export function generateBreedSchema(breed: Breed) {
  const { nome, slug, sobre, imagem_principal, ficha_tecnica, caracteristicas } = breed;
  const baseUrl = 'https://tutorcanino.com.br';

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
  const baseUrl = 'https://tutorcanino.com.br';
  
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
    url: 'https://tutorcanino.com.br',
    logo: 'https://tutorcanino.com.br/logo.svg',
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
    url: 'https://tutorcanino.com.br',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tutorcanino.com.br/racas?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateFAQSchema(breed: Breed) {
  const { nome, ficha_tecnica, caracteristicas, sobre } = breed;
  const baseUrl = 'https://tutorcanino.com.br';

  // Generate dynamic FAQs based on breed data
  const faqs = [];

  // FAQ 1: Temperamento
  if (caracteristicas?.nivel_energia || caracteristicas.afeicao_familia) {
    faqs.push({
      '@type': 'Question',
      name: `Qual é o temperamento do ${nome}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: sobre?.descricao || `${nome} é uma raça com características únicas de temperamento e personalidade.`,
      },
    });
  }

  // FAQ 2: Tamanho
  if (ficha_tecnica?.porte || breed.categoria) {
    const tamanho = ficha_tecnica?.porte || breed.categoria;
    faqs.push({
      '@type': 'Question',
      name: `Qual é o porte do ${nome}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `O ${nome} é considerado de ${tamanho === 'Pequeno' ? 'pequeno' : tamanho === 'Médio' ? 'médio' : tamanho === 'Grande' ? 'grande' : 'gigante'} porte.`,
      },
    });
  }

  // FAQ 3: Expectativa de vida
  if (ficha_tecnica?.expectativa_vida) {
    faqs.push({
      '@type': 'Question',
      name: `Quanto tempo vive um ${nome}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `A expectativa de vida do ${nome} é de aproximadamente ${ficha_tecnica.expectativa_vida}.`,
      },
    });
  }

  // FAQ 4: Cuidados
  if (sobre?.cuidados || sobre?.exercicio) {
    faqs.push({
      '@type': 'Question',
      name: `Quais cuidados o ${nome} precisa?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: sobre.cuidados || sobre.exercicio || 'Requer cuidados regulares como escovação, banho e exercícios adequados ao seu nível de energia.',
      },
    });
  }

  // FAQ 5: Adaptação a apartamento
  if (caracteristicas?.adaptabilidade) {
    faqs.push({
      '@type': 'Question',
      name: `O ${nome} pode viver em apartamento?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: caracteristicas.adaptabilidade >= 4
          ? `Sim, o ${nome} se adapta bem a vida em apartamento, desde que receba exercícios adequados.`
          : `O ${nome} prefere casas com espaço, mas pode se adaptar a apartamento com exercícios suficientes.`,
      },
    });
  }

  // FAQ 6: Saúde
  if (sobre?.saude) {
    faqs.push({
      '@type': 'Question',
      name: `Quais são os problemas de saúde comuns do ${nome}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: sobre.saude,
      },
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs,
  };
}
