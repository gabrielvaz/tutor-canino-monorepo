# 🚀 ROADMAP - Integração TutorCanino

**Data início:** 05/04/2026  
**Status:** 🔄 EM ANDAMENTO  
 **Deploy Netlify:** ✅ Configurado  
**Deploy Vercel:** ✅ Enviado

---

## 📊 SITUAÇÃO ATUAL

### ✅ CONCLUÍDO
- [x] Deploy Vercel configurado
- [x] Deploy Netlify configurado (netlify.toml criado)
- [x] Erro do Netlify corrigido (Node.js types adicionados)
- [x] Análise de backups completada
- [x] Roadmap documentado

### 🔄 PRÓXIMO PASSO
Aguardando build no Netlify para validar deploy

---

## 🎯 ROADMAP SEMANAL

```
SEMANA 1 (05-11 Abr): Fundação + Schema
  ├── Expadir Breed schema
  ├── Criar branch feat/breed-integration
  ├── Adicionar vídeos YouTube
  ├── Adicionar raças relacionadas
  └── Testar com 5 raças

SEMANA 2 (12-18 Abr): Conteúdo Multimídia
  ├── Galeria de vídeos em 50 raças
  ├── Seletor de cores
  ├── Dados históricos
  └── Páginas de raça enriquecidas

SEMANA 3 (19-25 Abr): Sistema de Artigos
  ├── Criar /artigos/[slug]
  ├── Importar 25 artigos
  ├── Converter MD → MDX
  └── SEO de artigos

SEMANA 4 (26 Abr - 02 Mai): Quiz de Personalidade
  ├── 10-15 perguntas
  ├── Algoritmo de match
  ├── Página de resultados
  └── Lead capture

SEMANA 5 (03-09 Mai): Busca Avançada
  ├── Barra de busca no header
  ├── Autocomplete
  ├── Filtros por porte/temperamento
  └── Página /busca

SEMANA 6 (10-16 Mai): Lançamento
  ├── Testes E2E
  ├── Performance tuning
  ├── Google Search Console
  └── 🚀 GO LIVE
```

---

## 🎬 FASE 1: EXPANDIR SCHEMA (Dia 1-3)

### Passo 1: Atualizar Breed type

```typescript
// packages/data/src/types/breed.ts
interface Breed {
  // Campos existentes...
  id: string;
  nome: string;
  slug: string;
  // ...

  // NOVOS CAMPOS
  videos_youtube?: VideoYouTube[];
  racas_relacionadas?: string[];
  cores_disponiveis?: string[];
  marcacoes?: string[];
  curiosidades_historicas?: string;
  referencias_externas?: ReferenciaExterna[];
}

interface VideoYouTube {
  titulo: string;
  url: string;
  canal: string;
  thumbnail?: string;
  duracao?: string;
}

interface ReferenciaExterna {
  titulo: string;
  url: string;
  descricao?: string;
}
```

### Passo 2: Script de Migração

```bash
# Criar script
touch scripts/extract-backup-videos.ts

# Extrair vídeos dos 216 JSONs do backup
# Gerar array pronto para integração
```

### Passo 3: Testar com 1 raça

```bash
# Manualmente adicionar ao golden-retriever.json
{
  "videos_youtube": [
    {
      "titulo": "Golden Retriever - Tudo sobre a raça",
      "url": "https://www.youtube.com/watch?v=xxx",
      "canal": "Canal Pet Brasil"
    }
  ]
}
```

### Passo 4: Criar componente de vídeo

```tsx
// apps/web/components/breeds/breed-videos.tsx
export function BreedVideos({ videos }: { videos: Breed['videos_youtube'] }) {
  if (!videos || videos.length === 0) return null;
  
  return (
    <section>
      <h2>Vídeos sobre {breed.nome}</h2>
      {videos.map(video => (
        <iframe 
          src={video.url.replace('watch?v=', 'embed/')}
          title={video.titulo}
        />
      ))}
    </section>
  );
}
```

### Passo 5: Integrar na página de raça

```tsx
// apps/web/app/racas/[slug]/page.tsx
import { BreedVideos } from '@/components/breeds/breed-videos';

export default async function BreedPage({ params }) {
  const breed = getBreedBySlug(slug);
  
  return (
    <div>
      {/* ... conteúdo existente ... */}
      <BreedVideos videos={breed.videos_youtube} />
      <RelatedBreeds related={breed.racas_relacionadas} />
    </div>
  );
}
```

---

## 🎨 FASE 2: COMPONENTES DE ARTIGOS (Dia 4-7)

### Passo 1: Criar estrutura

```bash
# Criar diretórios
mkdir -p apps/web/app/artigos/\[slug\]
mkdir -p apps/web/app/artigos/category
mkdir -p apps/web/lib/articles
```

### Passo 2: Criar página de listagem

```tsx
// apps/web/app/artigos/page.tsx
export default async function ArticlesPage() {
  const articles = getAllArticles();
  
  return (
    <div>
      <h1>Artigos sobre Cães</h1>
      <ArticleGrid articles={articles} />
    </div>
  );
}
```

### Passo 3: Criar página individual

```tsx
// apps/web/app/artigos/[slug]/page.tsx
export default async function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug);
  
  return (
    <article>
      <h1>{article.titulo}</h1>
      <MDXRemote source={article.conteudo} />
      <RelatedArticles categoryId={article.categoria} />
    </article>
  );
}
```

### Passo 4: Importar 25 artigos

```bash
# Copiar artigos do backup
cp -r backup/tutor-canino-v1/conteudo/* apps/web/lib/articles/
```

### Passo 5: Adicionar frontmatter MDX

```markdown
---
slug: adestrar-bulldog-frances
titulo: Adestrar Bulldog Francês: Guia Completo
descricao: Aprenda a adestrar seu Bulldog Francês com técnicas eficazes...
categoria: treinamento
breed: bulldog-frances
---

# Adestrar Bulldog Francês: Guia Completo
...
```

---

## 🧩 FASE 3: QUIZ COMPLETO (Dia 8-12)

### Perguntas do Quiz

1. **Espaço disponível**
   - Apartamento
   - Casa com quintal pequeno
   - Casa com quintal grande
   - Sítio rural

2. **Experiência com cães**
   - Primeira vez
   - Já teve cães antes
   - Experiente

3. **Composição familiar**
   - Moro sozinho/a
   - Casal sem filhos
   - Casal com filhos pequenos
   - Casal com filhos grandes
   - Idosos em casa

4. **Nível de atividade**
   - Sedentário (poucos passeios)
   - Moderado (passeios diários)
   - Ativo (correr, caminhar muito)
   - Muito ativo (corridas, esportes)

5. **Tempo disponível**
   - Menos de 1h/dia
   - 1-2h/dia
   - 2-4h/dia
   - 4+h/dia

6. **Tolerância a pelo**
   - Não tolero
   - Pouco tolera
   - Tolerável
   - Adoro pets

7. **Tamanho preferido**
   - Pequeno (até 10kg)
   - Médio (10-25kg)
   - Grande (25-45kg)
   - Gigante (45kg+)
   - Não tenho preferência

8. **Objetivo principal**
   - Companhia
   - Guarda/Segurança
   - Esportes/Atividades
   - Exposição/Shows

9. **Outros animais**
   - Tenho gatos
   - Tenho outros cães
   - Não tenho outros animais

10. **Clima**
    - Quente
    - Ameno
    - Frio
    - Não importa

---

## 📋 CHECKLIST SEMANAL

### Semana 1
- [ ] Branch `feat/breed-integration` criada
- [ ] Schema expandido com 5 novos campos
- [ ] Script de migração funcionando
- [ ] 5 raças testadas com novos dados
- [ ] Componente de vídeos criado
- [ ] Componente de relacionados expandido

### Semana 2
- [ ] 50 raças com vídeos
- [ ] Seletor de cores funcionando
- [ ] Seção histórica nas páginas
- [ ] Schema.org atualizado

### Semana 3
- [ ] Estrutura /artigos criada
- [ ] 25 artigos importados
- [ ] MDX configurado
- [ ] SEO de artigos pronto
- [ ] Sitemap atualizado

### Semana 4
- [ ] Quiz component criado
- [ ] 10 perguntas definidas
- [ ] Algoritmo de match
- [ ] Página de resultados

### Semana 5
- [ ] Busca implementada
- [ ] Filtros criados
- [ ] Autocomplete
- [ ] Página /busca

### Semana 6
- [ ] Testes completos
- [ ] Performance ok
- [ ] Google Search Console
- [ ] 🚀 LANCEMENTO

---

## 🎯 PRÓXIMAS AÇÕES (IMMEDIATO)

1. **Aguardar Netlify build** ✅ (em progresso)
2. **Validar deploy Netlify**
3. **Criar branch de integração**
4. **Começar expansão do schema**

---

## 📊 MÉTRICAS ESPERADAS

### Após Semana 2
- 216 raças na base
- Schema completo
- Componentes funcionando

### Após Semana 4
- 25 artigos publicados
- Tráfego orgânico +30%

### Após Semana 6
- Quiz completo
- Busca funcional
- 1000+ visitantes/semana

---

**Roadmap criado:** 05/04/2026  
**Próximo passo:** Validar deploy Netlify e começar integração
