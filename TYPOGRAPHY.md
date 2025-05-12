# Guia de Tipografia - Iara Games

Este guia define o sistema de tipografia usado no projeto Iara Games. Use estas classes para manter a consistência visual em todo o projeto.

## Tamanhos de Texto

Temos uma escala progressiva de tamanhos de texto, cada um com seu propósito específico:

| Classe | Tamanho | Uso Recomendado |
|--------|---------|-----------------|
| `text-size-xs` | 12px | Textos muito pequenos, legendas, notas |
| `text-size-sm` | 14px | Textos secundários, metadados |
| `text-size-regular` | 16px | Texto padrão, parágrafos |
| `text-size-md` | 18px | Textos com destaque leve |
| `text-size-lg` | 20px | Subtítulos pequenos |
| `text-size-xl` | 24px | Subtítulos médios |
| `text-size-2xl` | 32px | Títulos de seção menores |
| `text-size-3xl` | 40px | Títulos de seção médios |
| `text-size-4xl` | 48px | Títulos de seção grandes |
| `text-size-5xl` | 60px | Títulos principais |

## Headings

Para títulos e cabeçalhos, use as classes de heading que já incluem o peso da fonte e espaçamento de letras apropriados:

| Classe | Tamanho | Peso | Uso |
|--------|---------|------|-----|
| `heading-1` | 60px | Bold | Título principal da página |
| `heading-2` | 48px | Bold | Títulos de seções principais |
| `heading-3` | 40px | Semibold | Subtítulos importantes |
| `heading-4` | 32px | Semibold | Títulos de cards grandes |
| `heading-5` | 24px | Semibold | Títulos de cards médios |
| `heading-6` | 20px | Semibold | Títulos de cards pequenos |

## Pesos da Fonte

Para controlar o peso da fonte, use as seguintes classes:

| Classe | Peso | Uso |
|--------|------|-----|
| `font-regular` | 400 | Texto normal |
| `font-medium` | 500 | Ênfase leve |
| `font-semibold` | 600 | Ênfase média |
| `font-bold` | 700 | Ênfase forte |

## Exemplos de Uso

### Texto Básico
```html
<p class="text-size-regular">Texto padrão do parágrafo</p>
<p class="text-size-sm font-medium">Texto secundário com ênfase</p>
<span class="text-size-xs">Nota de rodapé ou legenda</span>
```

### Títulos
```html
<h1 class="heading-1">Título Principal da Página</h1>
<h2 class="heading-2">Seção Importante</h2>
<h3 class="heading-3">Subseção</h3>
```

### Combinações
```html
<div class="text-size-lg font-semibold">Destaque Personalizado</div>
<p class="text-size-md font-medium">Texto médio com peso médio</p>
```

## Boas Práticas

1. **Consistência**: Use as classes de heading para títulos ao invés de combinar classes de tamanho e peso manualmente
2. **Hierarquia**: Mantenha uma hierarquia clara de tamanhos - não pule níveis sem um bom motivo
3. **Legibilidade**: Para textos longos, mantenha o tamanho entre `text-size-regular` e `text-size-md`
4. **Contraste**: Use pesos mais fortes (`font-semibold`, `font-bold`) com moderação e para criar hierarquia

## Observações Técnicas

- Todos os tamanhos são definidos em `rem` para melhor acessibilidade
- Line-heights são otimizados para cada tamanho de fonte
- Headings incluem letter-spacing negativo para melhor legibilidade em tamanhos grandes 