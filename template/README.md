# Template Base

Este é um template base para criação de páginas web responsivas, com um sistema de design consistente e classes utilitárias pré-definidas.

## Estrutura do Template

```
template/
├── global.css     # Estilos globais e utilitários
├── template.html  # Estrutura HTML base
└── README.md      # Documentação
```

## Como Usar

1. Copie os arquivos `global.css` e `template.html` para seu projeto
2. Modifique o arquivo `template.html` conforme suas necessidades
3. O arquivo `global.css` já inclui todas as classes utilitárias necessárias

## Classes Utilitárias Disponíveis

### Containers e Layout

- `.container`: Container responsivo com largura máxima
- `.page-wrapper`: Wrapper principal da página
- `.main-wrapper`: Wrapper do conteúdo principal
- `.section`: Seção com padding vertical padrão
- `.aside`: Estilo padrão para sidebars

### Grid e Flexbox

- `.grid`: Sistema de grid básico
- `.d-flex`: Display flex
- `.flex-column`: Flex direction column
- `.justify-content-center`: Centraliza itens horizontalmente
- `.align-items-center`: Centraliza itens verticalmente
- `.flex-wrap`: Permite quebra de linha em flex containers

### Espaçamentos

- `.p-0` até `.p-5`: Padding (0 até 3rem)
- `.m-0` até `.m-5`: Margin (0 até 3rem)

### Tipografia

- `.h1` até `.h6`: Classes para headings
- `.text-center`: Alinhamento de texto centralizado
- `.text-left`: Alinhamento de texto à esquerda
- `.text-right`: Alinhamento de texto à direita

### Botões

- `.btn`: Estilo base de botão
- `.btn-primary`: Botão primário
- `.btn-secondary`: Botão secundário

### Sombras

- `.shadow-sm`: Sombra pequena
- `.shadow`: Sombra média
- `.shadow-lg`: Sombra grande

### Border Radius

- `.rounded`: Border radius padrão
- `.rounded-lg`: Border radius maior
- `.rounded-circle`: Border radius circular

## Breakpoints

O template inclui os seguintes breakpoints para responsividade:

- Mobile: < 576px
- Small: ≥ 576px
- Medium: ≥ 768px
- Large: ≥ 992px
- Extra Large: ≥ 1200px

## Cores

O sistema de cores está definido através de variáveis CSS:

```css
--primary: #007bff
--secondary: #6c757d
--success: #28a745
--danger: #dc3545
--warning: #ffc107
--info: #17a2b8
--light: #f8f9fa
--dark: #343a40
```

Além disso, há uma escala de cinza completa (--gray-100 até --gray-900).

## Exemplo de Uso

```html
<div class="container">
    <div class="section">
        <h1 class="text-center">Título da Página</h1>
        <div class="grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="p-3 shadow rounded">
                <h3>Card 1</h3>
                <p>Conteúdo do card</p>
            </div>
            <div class="p-3 shadow rounded">
                <h3>Card 2</h3>
                <p>Conteúdo do card</p>
            </div>
        </div>
    </div>
</div>
```

## Dicas de Uso

1. Sempre comece com a estrutura base do `template.html`
2. Utilize as classes utilitárias para espaçamento e layout
3. As variáveis CSS podem ser sobrescritas para customização de cores
4. O sistema é mobile-first, então desenvolva pensando primeiro em telas menores
5. Utilize a fonte Inter para manter a consistência tipográfica 