#!/usr/bin/env tsx
/**
 * Compare breed schemas between current monorepo and backup
 * Identify unique fields that can be integrated
 */

import fs from 'fs';
import path from 'path';

const MONOREPO_BREEDS = path.join(__dirname, '../packages/data/src/data/breeds');
const BACKUP_BREEDS = path.join(__dirname, '../../backup/tutor-diretorio-v1/breeds-json');

interface BreedSchema {
  [key: string]: any;
}

function getBreedSlugs(dir: string): string[] {
  const files = fs.readdirSync(dir);
  return files
    .filter(f => f.endsWith('.json') && f !== '00_template_breed.json')
    .map(f => f.replace('.json', ''));
}

function loadBreed(dir: string, slug: string): BreedSchema | null {
  try {
    const filePath = path.join(dir, `${slug}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function getKeys(obj: any, prefix = ''): string[] {
  if (!obj || typeof obj !== 'object') return [];
  
  const keys: string[] = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    keys.push(fullKey);
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getKeys(obj[key], fullKey));
    }
  }
  return keys;
}

function compareSchemas() {
  const monorepoSlugs = getBreedSlugs(MONOREPO_BREEDS);
  const backupSlugs = getBreedSlugs(BACKUP_BREEDS);
  
  console.log('🔍 Comparando schemas de raças...\n');
  console.log(`Monorepo: ${monorepoSlugs.length} raças`);
  console.log(`Backup: ${backupSlugs.length} raças\n`);
  
  // Find common breeds to compare
  const commonSlugs = monorepoSlugs.filter(slug => backupSlugs.includes(slug));
  console.log(`Raças em comum: ${commonSlugs.length}\n`);
  
  // Sample a few breeds
  const sampleSlugs = commonSlugs.slice(0, 5);
  
  let monorepoKeys = new Set<string>();
  let backupKeys = new Set<string>();
  
  for (const slug of sampleSlugs) {
    const monorepoBreed = loadBreed(MONOREPO_BREEDS, slug);
    const backupBreed = loadBreed(BACKUP_BREEDS, slug);
    
    if (monorepoBreed) {
      getKeys(monorepoBreed).forEach(k => monorepoKeys.add(k));
    }
    if (backupBreed) {
      getKeys(backupBreed).forEach(k => backupKeys.add(k));
    }
  }
  
  // Unique keys in backup (not in monorepo)
  const uniqueBackupKeys = [...backupKeys].filter(k => !monorepoKeys.has(k));
  
  console.log('📊 Campos únicos no BACKUP (não existe no monorepo):\n');
  uniqueBackupKeys.forEach(key => {
    console.log(`   + ${key}`);
  });
  
  // Unique keys in monorepo (not in backup)
  const uniqueMonorepoKeys = [...monorepoKeys].filter(k => !backupKeys.has(k));
  
  console.log('\n📊 Campos únicos no MONOREPO (não existe no backup):\n');
  uniqueMonorepoKeys.forEach(key => {
    console.log(`   + ${key}`);
  });
  
  // Backup template structure
  console.log('\n📋 Estrutura do template backup:\n');
  const template = loadBreed(BACKUP_BREEDS, '00_template_breed');
  if (template) {
    Object.keys(template).forEach(key => {
      console.log(`   ${key}:`);
      if (typeof template[key] === 'object' && !Array.isArray(template[key])) {
        Object.keys(template[key]).forEach(subkey => {
          console.log(`     - ${subkey}`);
        });
      } else {
        console.log(`     (tipo: ${Array.isArray(template[key]) ? 'array' : typeof template[key]})`);
      }
    });
  }
}

compareSchemas();
