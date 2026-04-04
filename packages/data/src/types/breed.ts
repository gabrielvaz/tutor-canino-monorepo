import { z } from 'zod';

// Breed data structure matching the imported JSON files
export const BreedSchema = z.object({
  id: z.string(),
  nome: z.string().optional(),
  name: z.string().optional(),
  subtitulo: z.string().optional(),
  informacoes_basicas: z.object({
    altura: z.object({
      macho: z.string().optional(),
      femea: z.string().optional(),
    }).optional(),
    peso: z.object({
      macho: z.string().optional(),
      femea: z.string().optional(),
    }).optional(),
    expectativa_vida: z.string().optional(),
    origem: z.string().optional(),
    grupo_raca: z.string().optional(),
  }).optional(),
  caracteristicas: z.object({
    familia: z.object({
      afinidade_com_criancas: z.string().optional(),
      afinidade_com_adultos: z.string().optional(),
      afinidade_com_outros_animais: z.string().optional(),
    }).optional(),
    fisico: z.object({
      porte: z.string().optional(),
      tipo_pelo: z.string().optional(),
      frequencia_queda_pelo: z.string().optional(),
    }).optional(),
    social: z.object({
      sociabilidade_com_estranhos: z.string().optional(),
      sociabilidade_com_outros_caes: z.string().optional(),
    }).optional(),
    personalidade: z.array(z.string()).optional(),
  }).optional(),
  sobre: z.object({
    descricao: z.string().optional(),
    historia: z.string().optional(),
  }).optional(),
  cuidados: z.object({
    saude: z.string().optional(),
    higiene: z.string().optional(),
    exercicio: z.string().optional(),
    treinamento: z.string().optional(),
    nutricao: z.string().optional(),
  }).optional(),
  cores_e_marcacoes: z.object({
    cores: z.array(z.string()).optional(),
    marcacoes: z.array(z.string()).optional(),
  }).optional(),
  historico: z.object({
    significado_cultural: z.string().optional(),
  }).optional(),
  racas_relacionadas: z.array(z.string()).optional(),
  links: z.object({
    sites_referencia: z.array(z.object({
      titulo: z.string().optional(),
      url: z.string().optional(),
      descricao: z.string().optional(),
    })).optional(),
    videos_youtube: z.array(z.object({
      titulo: z.string().optional(),
      url: z.string().optional(),
      canal: z.string().optional(),
      descricao: z.string().optional(),
    })).optional(),
  }).optional(),
  imagem_referencia_id: z.string().optional(),
  imagens: z.array(z.string()).optional(),
});

export type Breed = z.infer<typeof BreedSchema>;
