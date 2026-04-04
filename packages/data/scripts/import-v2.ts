import fs from 'fs';
import path from 'path';
import { BreedSchema, type Breed } from '../src/types/breed';

const SOURCE_FILE = '/Users/vaz-mac-mini/dev-apps/tutor-canino/backup/tutor-canino-v1/src/lib/data/racas-completas-300.json';
const OUTPUT_DIR = path.join(__dirname, '../src/data/breeds');

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function cleanOutputDir() {
  if (fs.existsSync(OUTPUT_DIR)) {
    const files = fs.readdirSync(OUTPUT_DIR);
    for (const file of files) {
      if (file !== 'index.ts') {
        fs.unlinkSync(path.join(OUTPUT_DIR, file));
      }
    }
    console.log('🧹 Output directory cleaned.');
  } else {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

async function main() {
  console.log('🐕 Starting professional breed import (v2)...');

  await cleanOutputDir();

  const sourceData = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf-8'));
  const rawBreeds = sourceData.racas || sourceData.breeds || [];

  if (!Array.isArray(rawBreeds)) {
    // If the structure is different, check if it's just an array
    console.error('❌ Could not find breeds array in source file.');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const raw of rawBreeds) {
    try {
      const slug = raw.slug_url || slugify(raw.nome_oficial_pt);
      
      const breed: Breed = {
        id: slug,
        nome: raw.nome_oficial_pt,
        slug: slug,
        nome_en: raw.nome_oficial_en,
        apelidos: raw.apelidos_populares,
        categoria: raw.categoria_tamanho as Breed['categoria'],
        
        ficha_tecnica: {
          origem: raw.pais_de_origem,
          expectativa_vida: raw.expectativa_vida_anos ? `${raw.expectativa_vida_anos[0]} - ${raw.expectativa_vida_anos[1]} anos` : undefined,
          altura_macho: raw.altura_macho_cm_media ? `${raw.altura_macho_cm_media} cm` : undefined,
          altura_femea: raw.altura_femea_cm_media ? `${raw.altura_femea_cm_media} cm` : undefined,
          peso_macho: raw.peso_macho_kg_medio ? `${raw.peso_macho_kg_medio} kg` : undefined,
          peso_femea: raw.peso_femea_kg_medio ? `${raw.peso_femea_kg_medio} kg` : undefined,
          grupo_fci: raw.grupos_fci?.[0],
          ano_reconhecimento_fci: raw.ano_reconhecimento_fci,
        },

        caracteristicas: {
          energia: raw.nivel_energia,
          inteligencia: raw.facilidade_de_treinamento, // Map intelligence to training in this dataset context if needed
          queda_pelo: raw.nivel_de_queda_de_pelos,
          latido: raw.nivel_latido,
          afeicao_familia: raw.nivel_afeicao_com_a_familia,
          bom_com_criancas: raw.bom_com_criancas,
          bom_com_outros_caes: raw.bom_com_outros_caes,
          facilidade_treinamento: raw.facilidade_de_treinamento,
          necessidade_exercicio: raw.necessidade_de_exercicio_diario,
          instinto_guarda: raw.instinto_de_guarda,
        },

        sobre: {
          descricao: raw.descricao_detalhada,
          historia: raw.origem_historica_resumida,
          curiosidades: raw.curiosidades,
          ideal_para: raw.ideal_para,
          nao_recomendado_para: raw.nao_recomendado_para,
        },

        saude: {
          doencas_comuns: raw.doencas_mais_comuns,
          cuidados_veterinarios: raw.necessidade_de_acompanhamento_veterinario,
        },

        cuidados: {
          higiene: raw.pelagem_tipo?.join(', '),
          exercicios: `Necessidade nível ${raw.necessidade_de_exercicio_diario}/5`,
          treinamento: raw.facilidade_de_treinamento >= 4 ? 'Fácil' : raw.facilidade_de_treinamento >= 2 ? 'Moderado' : 'Desafiador',
          alimentacao: 'Consulte um veterinário para dieta balanceada',
        },

        seo: {
          title: raw.meta_title,
          description: raw.meta_description,
          keywords: raw.keywords_seo,
        },

        imagem_principal: raw.imagem_principal_url,
        galeria: raw.galeria_imagens_url,
        video_url: raw.video_principal_url,

        popularidade: raw.buscas_google_br_mensal,
        ranking_brasil: raw.ranking_popularidade_brasil,
        custo_mensal_estimado: raw.custo_mensal_medio_brasil,
      };

      // Validate against schema
      BreedSchema.parse(breed);

      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${slug}.json`),
        JSON.stringify(breed, null, 2),
        'utf-8'
      );
      successCount++;
    } catch (err) {
      errorCount++;
      console.error(`❌ Error importing breed ${raw?.nome_oficial_pt}:`, err instanceof Error ? err.message : err);
    }
  }

  console.log(`\n✅ Import complete: ${successCount} breeds successful.`);
  if (errorCount > 0) console.log(`⚠️ ${errorCount} breeds failed.`);
}

main().catch(console.error);
