# 🎯 BACKUP - O Que Reaproveitar no TutorCanino

**Data:** 05/04/2026  
**Análise:** 8 projetos em `/backup/`  
**Tempo estimado:** 15-24 horas de integração

---

## 🏆 TOP 3 - O que você TEM que pode usar AGORA

### 1. 📹 VÍDEOS DO YOUTUBE (tutor-diretorio-v1)

**Arquivo:** `backup/tutor-diretorio-v1/breeds-json/*.json`

```json
"links": {
  "videos_youtube": [
    {
      "titulo": "Golden Retriever - Tudo sobre a raça",
      "url": "https://youtube.com/watch?v=xxx",
      "canal": "Canal Pet",
      "descricao": "Vídeo completo sobre a raça"
    }
  ]
}
```

**Como usar:**
1. Adicionar campo `videos_youtube[]` ao schema do Breed
2. Exibir vídeos embutidos na página de raça
3. Adicionar ao Schema.org `VideoObject`

**ROI:** ⭐⭐⭐⭐⭐ (Conteúdo rico, aumenta tempo na página)

---

### 2. 🐕 RAÇAS RELACIONADAS (tutor-diretorio-v1)

```json
"racas_relacionadas": [
  "golden-retriever",
  "labrador-retriever",
  "pastor-alemao"
]
```

**Como usar:**
1. Adicionar campo `racas_relacionadas[]` ao schema
2. Criar seção "Veja também" nas páginas de raça
3. Usar para sugestões no quiz

**ROI:** ⭐⭐⭐⭐⭐ (Aumenta pageviews, melhora UX)

---

### 3. 📝 25 ARTIGOS ESPECIALIZADOS (tutor-canino-v1)

**Estrutura:**
```
/conteudo/
├── bulldog-frances/ (5 artigos)
├── golden-retriever/ (5 artigos)
├── shih-tzu/ (5 artigos)
├── poodle/ (5 artigos)
└── labrador-retriever/ (5 artigos)
```

**Tópicos dos artigos:**
- Adestração
- Alimentação
- Cuidados e saúde
- Dicas específicas
- Exercícios

**Como usar:**
1. Criar `/apps/web/app/artigos/[slug]/page.tsx`
2. Converter MD→MDX com frontmatter
3. Adicionar ao sitemap
4. Linkar das páginas de raça correspondente

**ROI:** ⭐⭐⭐⭐ (SEO, autoridade, conteúdo profundo)

---

## 🔧 CAMPOS ADICIONAIS ÚTEIS

### cores_e_marcacoes (tutor-diretorio-v1)

```json
"cores_e_marcacoes": {
  "cores": ["Preto", "Branco", "Caramelo"],
  "marcacoes": ["Tricolor", "Manchas brancas"]
}
```

**Use:** Seletor de cores, filtros avançados

### historico.significado_cultural (tutor-diretorio-v1)

```json
"historico": {
  "significado_cultural": "Símbolo de lealdade na Inglaterra medieval"
}
```

**Use:** Seção "Curiosidades" na página de raça

---

## 🎨 COMPONENTES UI (v0-tutor-canino-website-2025)

**Caminho:** `backup/v0-tutor-canino-website-2025/components/ui/`

| Componente | Uso | Prioridade |
|-----------|-----|------------|
| `checkbox.tsx` | Quiz de personalidade | 🔴 Alta |
| `dialog.tsx` | Modal de comparação | 🟡 Média |
| `select.tsx` | Filtros avançados | 🟡 Média |
| `radio-group.tsx` | Filtros | 🟢 Baixa |
| `sheet.tsx` | Mobile drawer | 🟢 Baixa |

---

## 📖 DOCUMENTAÇÃO DE REFERÊNCIA (tutor-canino-web-2025-07)

**Arquivos:**
- `PRD-TutorCanino.md` - Especificação completa do produto
- `AUDITORIA-COMPLETA-FINAL.md` - Checklist de qualidade
- `PADROES-DESENVOLVIMENTO.md` - Convenções de código

**Como usar:** Consultar para decisões de produto e arquitetura

---

## 🚀 PLANO DE AÇÃO - 15-24 horas

### Fase 1: Schema + Dados (8-12 horas)

```typescript
// Adicionar ao Breed type
interface Breed {
  // ... campos existentes ...
  
  // Novos campos do backup
  videos_youtube?: Array<{
    titulo: string;
    url: string;
    canal: string;
  }>;
  
  racas_relacionadas?: string[];
  
  cores_e_marcacoes?: {
    cores: string[];
    marcacoes: string[];
  };
  
  significado_cultural?: string;
}
```

### Fase 2: Conteúdo (4-6 horas)

1. Criar estrutura `/apps/web/app/artigos/[slug]/page.tsx`
2. Copiar 25 artigos do backup
3. Adicionar ao sitemap

### Fase 3: Componentes (2-4 horas)

1. Adicionar Checkbox (para quiz)
2. Adicionar Dialog (para comparação)
3. Adicionar Select (para filtros)

---

## ❌ O QUE NÃO USAR

| Projeto | Motivo |
|---------|---------|
| `tutor-canino-web` | Python (stack diferente) |
| `tutor-canino-prod` | Código experimental |
| `tutor-canino-app` | Flutter app (projeto separado) |
| `tutor-canino-directory` | Scripts duplicados |

---

## 📊 VALOR FINAL

**Integrando os backups você ganha:**

✅ **Conteúdo multimídia** (vídeos do YouTube)  
✅ **Sistema de recomendação** (raças relacionadas)  
✅ **25 artigos prontos** (SEO + autoridade)  
✅ **3-5 componentes UI** úteis  
✅ **Dados de cores** (filtros visuais)  

**Investimento:** 15-24 horas  
**Retorno:** Site mais rico, mais engajador, melhor SEO

---

**Relatório criado em:** 05/04/2026  
**Próximo passo:** Começar pela integração de `videos_youtube` e `racas_relacionadas`
