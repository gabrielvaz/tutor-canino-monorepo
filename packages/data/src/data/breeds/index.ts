// Export types for breed data
export interface Breed {
  id: string;
  nome?: string;
  name?: string;
  subtitulo?: string;
  informacoes_basicas?: {
    altura?: {
      macho?: string;
      femea?: string;
    };
    peso?: {
      macho?: string;
      femea?: string;
    };
    expectativa_vida?: string;
    origem?: string;
    grupo_raca?: string;
  };
  caracteristicas?: {
    familia?: {
      afinidade_com_criancas?: string;
      afinidade_com_adultos?: string;
      afinidade_com_outros_animais?: string;
    };
    fisico?: {
      porte?: string;
      tipo_pelo?: string;
      frequencia_queda_pelo?: string;
    };
    social?: {
      sociabilidade_com_estranhos?: string;
      sociabilidade_com_outros_caes?: string;
    };
    personalidade?: string[];
  };
  sobre?: {
    descricao?: string;
    historia?: string;
  };
  cuidados?: {
    saude?: string;
    higiene?: string;
    exercicio?: string;
    treinamento?: string;
    nutricao?: string;
  };
  cores_e_marcacoes?: {
    cores?: string[];
    marcacoes?: string[];
  };
  historico?: {
    significado_cultural?: string;
  };
  racas_relacionadas?: string[];
  links?: {
    sites_referencia?: Array<{
      titulo?: string;
      url?: string;
      descricao?: string;
    }>;
    videos_youtube?: Array<{
      titulo?: string;
      url?: string;
      canal?: string;
      descricao?: string;
    }>;
  };
  imagem_referencia_id?: string;
  imagens?: string[];
}
