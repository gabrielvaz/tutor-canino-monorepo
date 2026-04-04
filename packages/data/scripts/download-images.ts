import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const BREEDS_DIR = path.join(__dirname, '../src/data/breeds');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '../../../apps/web/public/images/breeds');

async function downloadImage(url: string, dest: string) {
  try {
    if (url.startsWith('https://youtube.com')) return false;
    // Simple curl to download
    execSync(`curl -L -s -o "${dest}" "${url}"`, { timeout: 10000 });
    return fs.existsSync(dest) && fs.statSync(dest).size > 1000;
  } catch (e) {
    return false;
  }
}

async function main() {
  console.log('🖼️  Checking and downloading breed images...');

  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
  }

  const files = fs.readdirSync(BREEDS_DIR).filter(f => f.endsWith('.json'));
  
  let downloadedCount = 0;
  let alreadyExistsCount = 0;

  for (const file of files) {
    const breed = JSON.parse(fs.readFileSync(path.join(BREEDS_DIR, file), 'utf-8'));
    const slug = breed.slug;
    const localPath = path.join(PUBLIC_IMAGES_DIR, `${slug}.jpg`);

    // Check if image already exists locally
    if (fs.existsSync(localPath)) {
      alreadyExistsCount++;
      continue;
    }

    // Try to download from imagem_principal if it's an external URL
    if (breed.imagem_principal && breed.imagem_principal.startsWith('http')) {
      console.log(`📥 Downloading image for: ${breed.nome}...`);
      const success = await downloadImage(breed.imagem_principal, localPath);
      if (success) {
        // Update breed data to point to local image
        breed.imagem_principal = `/images/breeds/${slug}.jpg`;
        fs.writeFileSync(path.join(BREEDS_DIR, file), JSON.stringify(breed, null, 2));
        downloadedCount++;
      }
    }
  }

  console.log(`\n✅ Finished!`);
  console.log(`   - Already existed: ${alreadyExistsCount}`);
  console.log(`   - Newly downloaded: ${downloadedCount}`);
}

main().catch(console.error);
