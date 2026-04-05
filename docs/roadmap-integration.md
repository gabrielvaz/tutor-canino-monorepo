# 🚀 ROADMAP - Integração de Conteúdo dos Backups

**Data:** 05/04/2026  
**Branch:** `feat/breed-integration`  
**Duração estimada:** 3-4 semanas  
**Objetivo:** Enriquecer o site com 216 raças completas, vídeos, artigos e funcionalidades avançadas

---

## 📋 VISÃO GERAL

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ROADMAP FASES                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  SEMANA 1-2: FUNDAMENTAÇÃO                                         │
│  └── Expandir schema, importar dados, criar infraestrutura         │
│                                                                     │
│  SEMANA 3: CONTEÚDO MULTIMÍDIA                                     │
│  └── Vídeos YouTube, raças relacionadas, cores                     │
│                                                                     │
│  SEMANA 4: ARTIGOS & SEO                                          │
│  └── Criar seção artigos, importar 25 artigos, SEO                 │
│                                                                     │
│  SEMANA 5-6: FUNCIONALIDADES AVANÇADAS                            │
│  └── Quiz completo, busca avançada, wizard de recomendação        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 FASE 1: FUNDAMENTAÇÃO (Semana 1-2)

### Objetivo
Expandir schema de dados, integrar campos úteis dos backups

#### Semana 1: Schema + Dados

**Dia 1-2: Expandir Breed Schema**
```typescript
// packages/data/src/types/breed.ts
interface Breed {
  // ... campos existentes ...
  
  // NOVOS CAMPOS
  videos_youtube?: Array<{
    titulo: string;
    url: string;
    canal: string;
    thumbnail?: string;
  }>;
  
  racas_relacionadas?: string[];
  cores_disponiveis?: string[];
  marcacoes?: string[];
  curiosidades_historicas?: string;
  referencias_externas?: Array<{
    titulo: string;
    url: string;
  }>;
}
```

**Dia 3-4: Script de Migração**
```bash
# Criar script para extrair dados únicos dos backups
/scripts/extract-backup-data.ts
  ├── Extrair videos_youtube de 216 JSONs
  ├── Extrair racas_relacionadas
  ├── Extrair cores_e_marcacoes
  └── Merge com 211 raças atuais
```

**Dia 5-7: Validação e Limpeza**
- Validar 216 raças do backup
- Limpar dados duplicados
- Padronizar formatos
- Testar imports

**Entregáveis:**
- ✅ Schema expandido
- ✅ 216 raças importadas
- ✅ Dados limpos e validados

---

#### Semana 2: Componentes Base

**Dia 8-10: Componentes de Vídeo**
```tsx
// components/breeds/breed-video-gallery.tsx
export function BreedVideoGallery({ videos }: { videos: Breed['videos_youtube'] }) {
  // Galeria de vídeos embedados
  // Lazy loading para performance
}
```

**Dia 11-12: Componentes de Relacionados**
```tsx
// components/breeds/related-breeds.tsx (já existe, expandir)
export function RelatedBreeds({ currentBreed }: { currentBreed: Breed }) {
  // Usar racas_relacionadas[] do schema
  // Fallback para lógica atual de categoria
}
```

**Dia 13-14: Atualizar Páginas de Raça**
- Adicionar seção de vídeos
- Adicionar seção de cores
- Melhorar seção "Veja também"

**Entregáveis:**
- ✅ Componente de galeria de vídeos
- ✅ Componente de raças relacionadas expandido
- ✅ Páginas de raça atualizadas

---

## 🎬 FASE 2: CONTEÚDO MULTIMÍDIA (Semana 3)

### Objetivo
Adicionar vídeos, cores e dados visuais às páginas de raça

#### Semana 3: Enriquecimento Visual

**Dia 15-17: Integração de Vídeos YouTube**
- Exibir 3 vídeos principais por raça
- Sistema de lazy loading
- Schema.org `VideoObject`

**Dia 18-19: Cores e Marcas**
- Seletor visual de cores
- Filtro por cor na listagem
- Badges de cores na página

**Dia 20-21: Dados Históricos**
- Seção "História e Curiosidades"
- Significado cultural
- Fatos históricos interessantes

**Entregáveis:**
- ✅ Vídeos em 50+ raças
- ✅ Seletor de cores funcional
- ✅ Conteúdo histórico enriquecido

---

## 📝 FASE 3: ARTIGOS & SEO (Semana 4)

### Objetivo
Criar seção de artigos e importar conteúdo dos backups

#### Semana 4: Sistema de Artigos

**Dia 22-23: Estrutura de Artigos**
```bash
# Criar estrutura
apps/web/app/artigos/
  ├── page.tsx              # Listagem de artigos
  ├── [slug]/page.tsx        # Artigo individual
  └── categoria/[cat]/page.tsx  # Por categoria
```

**Dia 24-25: Importar 25 Artigos**
```bash
# Fonte: backup/tutor-canino-v1/conteudo/
artigos/
  ├── bulldog-frances/
  │   ├── adestrar-bulldog-frances-guia.md
  │   ├── alimentacao-bulldog-frances-guia.md
  │   ├── cuidados-saude-bulldog-frances.md
  │   ├── dicas-bulldog-frances-latir-menos.md
  │   └── exercicios-bulldog-frances-rotina.md
  ├── golden-retriever/ (5 artigos)
  ├── shih-tzu/ (5 artigos)
  ├── poodle/ (5 artigos)
  └── labrador-retriever/ (5 artigos)
```

**Dia 26-27: Converter MD → MDX**
- Adicionar frontmatter com SEO
- Otimizar imagens
- Adicionar CTAs

**Dia 28: SEO de Artigos**
- Meta tags otimizadas
- Schema.org `Article`
- Breadcrumbs
- Linkagem interna

**Entregáveis:**
- ✅ 25 artigos publicados
- ✅ Seção `/artigos` funcional
- ✅ SEO otimizado

---

## 🚀 FASE 4-5: FUNCIONALIDADES AVANÇADAS (Semana 5-6)

### Objetivo
Implementar quiz completo, busca avançada e wizard

#### Semana 5: Quiz de Personalidade Canina

**Dia 29-31: Componentes de Quiz**
```tsx
// components/quiz/
  ├── quiz-step.tsx          # Passo individual
  ├── quiz-progress.tsx      # Barra de progresso
  ├── quiz-options.tsx       # Opções de resposta
  └── quiz-result.tsx        # Página de resultado
```

**Dia 32-34: Lógica de Quiz**
- 10-15 perguntas sobre estilo de vida
- Sistema de pontuação
- Algoritmo de match com raças

**Dia 35: Integração**
- Página `/quiz` principal
- Resultados com raças recomendadas
- Lead capture (email)

**Entregáveis:**
- ✅ Quiz completo funcionando
- ✅ Algoritmo de match
- ✅ Página de resultados

---

#### Semana 6: Busca Avançada

**Dia 36-38: Sistema de Busca**
- Barra de busca no header
- Busca fuzzy com Fuse.js
- Autocomplete
- Página `/busca` com filtros

**Dia 39-40: Filtros Avançados**
- Filtro por porte
- Filtro por temperamento
- Filtro por características
- Filtro combinado

**Dia 41-42: Wizard de Recomendação**
- Alternativa ao quiz
- Mais visual e rápido
- 5-6 steps simples

**Entregáveis:**
- ✅ Busca funcional
- ✅ Filtros avançados
- ✅ Wizard de recomendação

---

## 📊 CRONOGRAMA DETALHADO

| Semana | Dias | Entregáveis | Valor |
|--------|------|-------------|-------|
| 1 | 1-7 | Schema expandido, 216 raças | ⭐⭐⭐⭐⭐ |
| 2 | 8-14 | Componentes de vídeo/relacionados | ⭐⭐⭐⭐ |
| 3 | 15-21 | Vídeos YouTube, cores | ⭐⭐⭐⭐⭐ |
| 4 | 22-28 | 25 artigos, SEO | ⭐⭐⭐⭐⭐ |
| 5 | 29-35 | Quiz completo | ⭐⭐⭐⭐ |
| 6 | 36-42 | Busca avançada, wizard | ⭐⭐⭐⭐ |

---

## 🎁 DELIVERABLES FINAIS

Após 6 semanas, o site terá:

### Conteúdo
- ✅ **216 raças** com dados completos
- ✅ **50+ raças** com vídeos YouTube
- ✅ **25 artigos** especializados
- ✅ **Cores e variações** documentadas

### Funcionalidades
- ✅ **Quiz de personalidade** completo
- ✅ **Busca avançada** funcional
- ✅ **Filtros** por múltiplas características
- ✅ **Wizard** de recomendação

### SEO
- ✅ **635+ páginas** indexáveis
- ✅ **Schema.org** completo
- ✅ **Sitemap** dinâmico
- ✅ **Core Web Vitals** verdes

---

## 🚀 COMEÇAR: PRIMEIROS PASSOS

### Imediato (Hoje)

1. **Criar branch de integração**
```bash
git checkout -b feat/breed-integration
```

2. **Expandir Breed schema**
```typescript
// Adicionar campos novos
```

3. **Testar com 1-2 raças**
- Manualmente adicionar dados
- Validar na UI
- Ajustar como necessário

### Esta Semana

4. **Script de migração**
- Automatizar extração dos backups
- Testar com 10 raças
- Validar qualidade

5. **Commit inicial**
```bash
git add .
git commit -m "feat(breeds): expand schema with videos and related breeds"
```

---

## 📈 MÉTRICAS DE SUCESSO

### Ao final da Semana 2
- 216 raças na base de dados
- Schema 100% integrado
- Componentes funcionando

### Ao final da Semana 4
- 25 artigos publicados
- SEO otimizado
- Tráfego orgânico aumentando

### Ao final da Semana 6
- Quiz completo
- Busca funcional
- Site pronto para escalar

---

## 🎯 PRÓXIMA AÇÃO

**O que fazer AGORA:**

1. ✅ Deploy enviado ao Vercel
2. ⏳ Criar branch `feat/breed-integration`
3. ⏳ Começar expansão do schema
4. ⏳ Testar integração com vídeos YouTube

---

**Roadmap criado em:** 05/04/2026  
**Status:** 🚀 PRONTO PARA COMEÇAR  
**Primeira meta:** Semana 2 - Schema expandido + 216 raças
