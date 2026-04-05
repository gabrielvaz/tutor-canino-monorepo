import { z } from 'zod';

// Rich Breed data structure for SEO and detailed guides
export const BreedSchema = z.object({
  id: z.string(),
  nome: z.string(),
  slug: z.string(),
  nome_en: z.string().optional(),
  apelidos: z.array(z.string()).optional(),
  categoria: z.enum(['Pequeno', 'Médio', 'Grande', 'Gigante', 'Toy']),
  
  // Ficha Técnica
  ficha_tecnica: z.object({
    origem: z.string().optional(),
    expectativa_vida: z.string().optional(),
    altura_macho: z.string().optional(),
    altura_femea: z.string().optional(),
    peso_macho: z.string().optional(),
    peso_femea: z.string().optional(),
    grupo_fci: z.string().optional(),
    ano_reconhecimento_fci: z.number().optional(),
  }).optional(),

  // Temperamento e Características (Escala 1-5)
  caracteristicas: z.object({
    energia: z.number().min(1).max(5).optional(),
    inteligencia: z.number().min(1).max(5).optional(),
    queda_pelo: z.number().min(1).max(5).optional(),
    latido: z.number().min(1).max(5).optional(),
    afeicao_familia: z.number().min(1).max(5).optional(),
    bom_com_criancas: z.number().min(1).max(5).optional(),
    bom_com_outros_caes: z.number().min(1).max(5).optional(),
    facilidade_treinamento: z.number().min(1).max(5).optional(),
    necessidade_exercicio: z.number().min(1).max(5).optional(),
    instinto_guarda: z.number().min(1).max(5).optional(),
  }).optional(),

  // Conteúdo rico
  sobre: z.object({
    descricao: z.string().optional(),
    historia: z.string().optional(),
    curiosidades: z.array(z.string()).optional(),
    ideal_para: z.array(z.string()).optional(),
    nao_recomendado_para: z.array(z.string()).optional(),
  }).optional(),

  saude: z.object({
    doencas_comuns: z.array(z.string()).optional(),
    cuidados_veterinarios: z.string().optional(),
  }).optional(),

  cuidados: z.object({
    higiene: z.string().optional(),
    exercicios: z.string().optional(),
    treinamento: z.string().optional(),
    alimentacao: z.string().optional(),
  }).optional(),

  // SEO e Imagens
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),

  imagem_principal: z.string().optional(),
  galeria: z.array(z.string()).optional(),
  video_url: z.string().optional(),

  // Conteúdo Multimídia (dos backups)
  videos_youtube: z.array(z.object({
    titulo: z.string(),
    url: z.string(),
    canal: z.string().optional(),
    thumbnail: z.string().optional(),
    duracao: z.string().optional(),
  })).optional(),

  racas_relacionadas: z.array(z.string()).optional(),
  cores_disponiveis: z.array(z.string()).optional(),
  marcacoes: z.array(z.string()).optional(),
  curiosidades_historicas: z.string().optional(),
  referencias_externas: z.array(z.object({
    titulo: z.string(),
    url: z.string(),
    descricao: z.string().optional(),
  })).optional(),

  // Metadados
  popularidade: z.number().optional(),
  ranking_brasil: z.number().optional(),
  custo_mensal_estimado: z.array(z.number()).optional(),
});

export type Breed = z.infer<typeof BreedSchema>;
