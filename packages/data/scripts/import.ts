import fs from 'fs';
import path from 'path';

const BACKUP_DIR = '/Users/vaz-mac-mini/dev-apps/tutor-canino/backup/tutor-diretorio-v1/breeds-json';
const OUTPUT_DIR = path.join(__dirname, '../src/data/breeds');

// Define Breed type to handle both formats
interface Breed {
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

interface ImportResult {
  total: number;
  successful: number;
  failed: number;
  warnings: number;
  errors: string[];
}

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

function getName(breed: any, filename: string): string {
  // Try different possible name fields
  if (breed.nome && typeof breed.nome === 'string') return breed.nome;
  if (breed.name && typeof breed.name === 'string') return breed.name;
  if (breed.Name && typeof breed.Name === 'string') return breed.Name;
  return filename.replace('.json', '');
}

function getId(breed: any, filename: string): string {
  // Try different possible ID fields
  if (breed.id && typeof breed.id === 'string') return breed.id;
  if (breed.ID && typeof breed.ID === 'string') return breed.ID;
  // Generate from name or filename
  const name = getName(breed, filename);
  return slugify(name);
}

function validateBreed(breed: any, filename: string): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  const name = getName(breed, filename);

  if (!name || name.trim() === '') {
    errors.push('Name is required');
  }

  const id = getId(breed, filename);
  if (!id || id.trim() === '') {
    errors.push('ID is required');
  }

  // Only warn if completely missing data
  const hasData = breed.informacoes_basicas || breed.caracteristicas || breed.sobre || breed.cuidados;
  if (!hasData) {
    warnings.push(`Missing structured data for breed: ${name}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

async function importBreeds(): Promise<ImportResult> {
  const result: ImportResult = {
    total: 0,
    successful: 0,
    failed: 0,
    warnings: 0,
    errors: [],
  };

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read all JSON files
  const files = fs.readdirSync(BACKUP_DIR)
    .filter(file => file.endsWith('.json') && file !== '00_template_breed.json' && !file.startsWith('|'));

  result.total = files.length;

  console.log(`Found ${files.length} breed files to import...\n`);

  for (const file of files) {
    try {
      const filePath = path.join(BACKUP_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const breed: any = JSON.parse(content);

      // Get name and ID
      const name = getName(breed, file);
      const id = getId(breed, file);

      // Add nome field if missing
      if (!breed.nome) {
        breed.nome = name;
      }
      if (!breed.id) {
        breed.id = id;
      }

      // Validate breed
      const validation = validateBreed(breed, file);
      if (!validation.valid) {
        result.failed++;
        result.errors.push(`${file}: ${validation.errors.join(', ')}`);
        console.error(`❌ ${file}: ${validation.errors.join(', ')}`);
        continue;
      }

      if (validation.warnings.length > 0) {
        result.warnings += validation.warnings.length;
        if (result.warnings <= 10) { // Only show first few warnings to avoid spam
          console.warn(`⚠️  ${file}: ${validation.warnings[0]}...`);
        }
      }

      // Save breed data
      const outputPath = path.join(OUTPUT_DIR, `${id}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(breed, null, 2), 'utf-8');

      result.successful++;
      if (result.successful <= 20 || result.successful % 50 === 0) {
        console.log(`✅ ${file} -> ${id}.json (${name})`);
      } else if (result.successful === 21) {
        console.log(`... (processing more files)`);
      }

    } catch (error) {
      result.failed++;
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      result.errors.push(`${file}: ${errorMsg}`);
      console.error(`❌ ${file}: ${errorMsg}`);
    }
  }

  return result;
}

async function main() {
  console.log('🐕 Starting breed data import...\n');

  const result = await importBreeds();

  console.log('\n📊 Import Summary:');
  console.log(`   Total files: ${result.total}`);
  console.log(`   ✅ Successful: ${result.successful}`);
  console.log(`   ❌ Failed: ${result.failed}`);
  console.log(`   ⚠️  Warnings: ${result.warnings}`);

  if (result.errors.length > 0 && result.errors.length <= 10) {
    console.log('\n❌ Errors:');
    result.errors.forEach(error => console.log(`   - ${error}`));
  } else if (result.errors.length > 10) {
    console.log(`\n❌ Errors (showing first 10 of ${result.errors.length}):`);
    result.errors.slice(0, 10).forEach(error => console.log(`   - ${error}`));
  }

  console.log('\n🎉 Import complete!');
}

main().catch(console.error);
