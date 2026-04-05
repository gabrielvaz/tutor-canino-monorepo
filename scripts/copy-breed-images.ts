#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

const BREEDS_DIR = path.join(__dirname, '../packages/data/src/data/breeds');
const BACKUP_IMAGES_DIR = '/Users/vaz-mac-mini/dev-apps/tutor-canino/backup/tutor-diretorio-v1/frontend/public/images/dogs';
const TARGET_IMAGES_DIR = path.join(__dirname, '../apps/web/public/images/breeds');

// Slug mapping: Portuguese slug -> English backup name (without hyphens/special chars)
const slugMapping: Record<string, string[]> = {
  'affenpinscher': ['affenpinscher'],
  'afghan-hound': ['afghanhound'],
  'airedale-terrier': ['airedaleterrier'],
  'akita-americano': ['akita'],
  'akita-inu': ['akita-inu', 'akita'],
  'american-staffordshire-terrier': ['americanstaffordshireterrier'],
  'appenzeller': ['appenzellersennenhund'],
  'australian-terrier': ['australianterrier'],
  'azawakh': ['azawakh'],
  'basenji': ['basenji'],
  'basset-azul-da-gasconha': ['bassetbleudegascogne'],
  'basset-hound': ['bassethound'],
  'beagle': ['beagle'],
  'beagle-harrier': ['beagleharrier'],
  'bearded-collie': ['beardedcollie'],
  'bedlington-terrier': ['bedlingtonterrier'],
  'bernese-mountain-dog': ['bernesemountaindog'],
  'bichon-frise': ['bichonfrise'],
  'bloodhound': ['bloodhound'],
  'bluetick-coonhound': ['bluetickcoonhound'],
  'bobtail': ['oldenglishsheepdog'],
  'boerboel': ['boerboel'],
  'border-collie': ['bordercollie'],
  'border-terrier': ['borderterrier'],
  'borzoi': ['borzoi'],
  'boston-terrier': ['bostonterrier'],
  'boxer': ['boxer'],
  'brittany': ['brittany'],
  'bull-terrier': ['bullterrier'],
  'bull-terrier-miniatura': ['bullterrierminiature'],
  'bulldog-frances': ['frenchbulldog'],
  'bulldog-ingles': ['bulldog'],
  'bullmastiff': ['bullmastiff'],
  'cairn-terrier': ['cairnterrier'],
  'cane-corso': ['canecorso'],
  'cao-de-castro-laboreiro': ['caodecastrolaboreiro'],
  'carolina-dog': ['carolinadog'],
  'cavalier-king-charles-spaniel': ['cavalierkingcharlesspaniel'],
  'chesapeake-bay-retriever': ['chesapeakebayretriever'],
  'chihuahua': ['chihuahua'],
  'chinese-crested': ['chinesecrested'],
  'chow-chow': ['chowchow'],
  'clumber-spaniel': ['clumberspaniel'],
  'collie': ['collie', 'roughcollie'],
  'corgi': ['pembrokewelshcorgi', 'cardiganwelshcorgi'],
  'dachshund': ['dachshund'],
  'dalmata': ['dalmatian'],
  'dobermann': ['dobermanpinscher', 'dobermann'],
  'dogue-alemao': ['greatdane', 'germandog'],
  'dogue-de-bordeaux': ['doguedebordeaux'],
  'english-foxhound': ['englishfoxhound'],
  'english-springer-spaniel': ['englishspringerspaniel'],
  'english-toy-spaniel': ['englishtoyspaniel'],
  'entlebucher': ['entlebucher'],
  'field-spaniel': ['fieldspaniel'],
  'fila-brasileiro': ['filabrasileiro'],
  'finnish-lapphund': ['finnishlapphund'],
  'finnish-spitz': ['finnishspitz'],
  'fox-terrier-pelo-duro': ['wirefoxterrier', 'wirehairedfoxterrier'],
  'fox-terrier-pelo-liso': ['smoothfoxterrier'],
  'frise': ['bichonfrise'],
  'golden-retriever': ['goldenretriever'],
  'gordon-setter': ['gordonsetter'],
  'grand-basset-griffon-vendeen': ['grandbassetgriffonvendeen'],
  'great-swiss-mountain-dog': ['grande_sddog', 'great_swiss'],
  'greyhound': ['greyhound'],
  'groenendael': ['belgiangroenendael', 'groenendael'],
  'husky-siberiano': ['siberianhusky'],
  'irish-terrier': ['irishterrier'],
  'irish-water-spaniel': ['irishwaterspaniel'],
  'irish-wolfhound': ['irishwolfhound'],
  'jack-russell-terrier': ['jackrussellterrier'],
  'keeshond': ['keeshond'],
  'kerry-blue-terrier': ['kerryblueterrier'],
  'komondor': ['komondor'],
  'kuvasz': ['kuvasz'],
  'labrador': ['labrador', 'labradorretriever'],
  'lakeland-terrier': ['lakelandterrier'],
  'lapphund': ['finnishlapphund'],
  'leonberger': ['leonberger'],
  'lhasa-apso': ['lhasaapso'],
  'lowchen': ['lowchen'],
  'malinois': ['belgianmalinois', 'malinois'],
  'maltes': ['maltese'],
  'mastiff-ingles': ['englishmastiff', 'mastiff'],
  'mastiff-napolitano': ['neapolitanmastiff'],
  'mastiff-tibetano': ['tibetanmastiff'],
  'mudi': ['mudi'],
  'newfoundland': ['newfoundland'],
  'norfolk-terrier': ['norfolkterrier'],
  'norwich-terrier': ['norwichterrier'],
  'novascotia': ['novascotiaducktollingretriever'],
  'old-english-sheepdog': ['oldenglishsheepdog'],
  'papillon': ['papillon'],
  'parson-russell-terrier': ['parsonrussellterrier'],
  'pastor-alemao': ['germanshepherddog'],
  'pastor-australiano': ['australianshepherd'],
  'pastor-belga-groenendael': ['belgiangroenendael'],
  'pastor-belga-laekenois': ['belgianlaekenois'],
  'pastor-belga-malinois': ['belgianmalinois'],
  'pastor-belga-tervuren': ['belgiantervuren'],
  'pekingese': ['pekingese'],
  'pembroke-welsh-corgi': ['pembrokewelshcorgi'],
  'pinscher-alemao': ['germanpinscher'],
  'pinscher-miniatura': ['miniaturepinscher'],
  'pit-bull': ['americanpitbullterrier'],
  'pointer': ['pointer', 'englishpointer'],
  'poodle': ['poodle', 'standardpoodle'],
  'poodle-toy': ['poodletoy', 'toy poodle'],
  'puli': ['puli'],
  'pumi': ['pumi'],
  'rottweiler': ['rottweiler'],
  'saint-bernard': ['saintbernard', 'stbernard'],
  'saluki': ['saluki'],
  'samoyeda': ['samoyed'],
  'schanuzer-gigante': ['giantschnauzer'],
  'schnauzer-miniatura': ['miniatureschnauzer'],
  'schnauzer-standard': ['standardschnauzer'],
  'scottish-terrier': ['scottishterrier'],
  'sealyham-terrier': ['sealyhamterrier'],
  'setter-escoces': ['englishsetter', 'gordonsetter'],
  'setter-irlandes': ['irishsetter'],
  'shar-pei': ['chinesesharpei', 'sharpei'],
  'shiba-inu': ['shibainu'],
  'shihtzu': ['shihtzu'],
  'shih-tzu': ['shihtzu'],
  'siberian-husky': ['siberianhusky'],
  'silky-terrier': ['silkyterrier'],
  'skye-terrier': ['skyeterrier'],
  'smooth-fox-terrier': ['smoothfoxterrier'],
  'soft-coated-wheaten-terrier': ['softcoatedwheatenterrier'],
  'spitz': ['spitz'],
  'staffordshire-bull-terrier': ['staffordshirebullterrier'],
  'sussex-spaniel': ['sussexspaniel'],
  'tosa': ['tosa'],
  'toy-fox-terrier': ['toyfoxterrier'],
  'toy-manchester-terrier': ['manchesterterrier'],
  'vizsla': ['vizsla', 'wirehairedvizsla'],
  'weimaraner': ['weimaraner'],
  'welsh-corgi': ['pembrokewelshcorgi', 'cardiganwelshcorgi'],
  'welsh-springer-spaniel': ['welshspringerspaniel'],
  'west-highland-white-terrier': ['westhighlandwhiteterrier'],
  'whippet': ['whippet'],
  'wirehaired-pointing-griffon': ['wirehairedpointinggriffon'],
  'yorkshire-terrier': ['yorkshireterrier'],
};

function slugifyForBackup(slug: string): string[] {
  // Direct mapping
  if (slugMapping[slug]) {
    return slugMapping[slug];
  }

  // Fallback: remove hyphens and convert to lowercase
  const fallback = slug.toLowerCase().replace(/-/g, '').replace(/[^a-z]/g, '');
  return [fallback];
}

function findImageInBackup(breedSlug: string): string | null {
  const possibleNames = slugifyForBackup(breedSlug);

  for (const name of possibleNames) {
    // Try with -1.jpg first
    const imagePath1 = path.join(BACKUP_IMAGES_DIR, `${name}-1.jpg`);
    if (fs.existsSync(imagePath1)) {
      return imagePath1;
    }

    // Try with just .jpg
    const imagePath2 = path.join(BACKUP_IMAGES_DIR, `${name}.jpg`);
    if (fs.existsSync(imagePath2)) {
      return imagePath2;
    }

    // Try .png
    const imagePath3 = path.join(BACKUP_IMAGES_DIR, `${name}.png`);
    if (fs.existsSync(imagePath3)) {
      return imagePath3;
    }

    // Try .webp
    const imagePath4 = path.join(BACKUP_IMAGES_DIR, `${name}.webp`);
    if (fs.existsSync(imagePath4)) {
      return imagePath4;
    }
  }

  return null;
}

function copyImage(source: string, targetSlug: string) {
  const ext = path.extname(source);
  const targetPath = path.join(TARGET_IMAGES_DIR, `${targetSlug}${ext}`);

  // Check if target already exists
  if (fs.existsSync(targetPath)) {
    return false; // Already exists
  }

  try {
    fs.copyFileSync(source, targetPath);
    console.log(`✓ Copied: ${path.basename(source)} -> ${targetSlug}${ext}`);
    return true;
  } catch (error) {
    console.error(`✗ Error copying ${source}:`, error);
    return false;
  }
}

async function main() {
  console.log('🔍 Looking for missing breed images in backup...\n');

  const breedFiles = fs.readdirSync(BREEDS_DIR).filter(f => f.endsWith('.json'));
  let copied = 0;
  let alreadyExists = 0;
  let notFound = 0;

  for (const file of breedFiles) {
    const slug = path.basename(file, '.json');

    // Check if image already exists
    const existingExtensions = ['.jpg', '.png', '.webp'];
    let alreadyHasImage = false;
    for (const ext of existingExtensions) {
      if (fs.existsSync(path.join(TARGET_IMAGES_DIR, `${slug}${ext}`))) {
        alreadyHasImage = true;
        break;
      }
    }

    if (alreadyHasImage) {
      alreadyExists++;
      continue;
    }

    // Try to find in backup
    const backupImage = findImageInBackup(slug);
    if (backupImage) {
      if (copyImage(backupImage, slug)) {
        copied++;
      }
    } else {
      notFound++;
      console.log(`? Not found in backup: ${slug}`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  ✓ Copied: ${copied} new images`);
  console.log(`  • Already existed: ${alreadyExists} images`);
  console.log(`  ✗ Not found: ${notFound} breeds`);
  console.log(`  📁 Total breeds: ${breedFiles.length}`);
}

main().catch(console.error);
