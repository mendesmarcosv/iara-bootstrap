# 🎮 Iara Games - SPA React

Plataforma de e-commerce de jogos desenvolvida em React com TypeScript.

## 🚀 Tecnologias

- **React 18+** - Framework principal
- **TypeScript** - Tipagem estática
- **React Router DOM 6+** - Roteamento
- **Axios** - Cliente HTTP
- **Formik + Yup** - Formulários e validação
- **Reflexbox** - Layout responsivo

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env
```

## ⚙️ Configuração

Edite o arquivo `.env` e adicione suas chaves de API:

```env
# RAWG API Key (obtenha em https://rawg.io/apidocs)
REACT_APP_RAWG_KEY=sua_chave_rawg_aqui

# Stripe Public Key (modo teste)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_aqui

# ReqRes API
REACT_APP_REQRES_BASE_URL=https://reqres.in/api
```

### Obtendo a chave da RAWG API

1. Acesse [https://rawg.io/apidocs](https://rawg.io/apidocs)
2. Crie uma conta gratuita
3. Acesse o dashboard e copie sua API key
4. Cole no arquivo `.env`

## 🎯 Executar

```bash
# Modo desenvolvimento
npm start

# Build para produção
npm run build

# Executar testes
npm test
```

A aplicação estará disponível em `http://localhost:3000`

## 📂 Estrutura do Projeto

```
src/
├── app/                    # Configurações do app
│   ├── routes.tsx         # Rotas
│   └── providers.tsx      # Providers
├── components/            # Componentes
│   ├── Layout/           # Layout (Header, Container)
│   ├── atoms/            # Componentes básicos (Button, Input)
│   ├── molecules/        # Componentes compostos (GameCard)
│   └── RouteGuard.tsx    # Proteção de rotas
├── contexts/             # Contexts React
│   └── AuthContext.tsx   # Context de autenticação
├── design/               # Design system
│   └── tokens.css        # Design tokens
├── hooks/                # Hooks customizados
│   ├── useAuth.ts
│   ├── useCart.ts
│   └── useGames.ts
├── lib/                  # Bibliotecas
│   └── api/              # Configurações de API
│       ├── index.ts      # Axios instance
│       ├── auth.ts       # ReqRes
│       └── games.ts      # RAWG
├── pages/                # Páginas
│   ├── Home/
│   ├── Auth/
│   ├── Catalog/
│   ├── Cart/
│   ├── Checkout/
│   ├── Success/
│   └── Cancel/
└── styles/               # Estilos globais
    └── globals.css
```

## 🔐 Autenticação (ReqRes - Teste)

Para testar o login/cadastro, use e-mails do formato:

```
E-mail: eve.holt@reqres.in
Senha: qualquer senha com 6+ caracteres
```

A API ReqRes aceita qualquer e-mail com domínio `@reqres.in`.

## 🎮 Funcionalidades

### Públicas
- ✅ Home com apresentação
- ✅ Catálogo de jogos (RAWG API)
- ✅ Detalhes do jogo
- ✅ Carrinho de compras
- ✅ Login/Cadastro

### Protegidas (requer login)
- ✅ Checkout
- ✅ Página de sucesso

### Carrinho
- Persistência em `localStorage`
- Contador no header
- Adicionar/remover itens
- Atualizar quantidade

### Catálogo
- Busca por nome
- Ordenação (rating, data, nome, popularidade)
- Paginação
- Detalhes completos do jogo

## 🛒 Fluxo de Compra

1. Navegar pelo catálogo
2. Adicionar jogos ao carrinho
3. Ir para o carrinho
4. Fazer login (se necessário)
5. Finalizar compra (checkout simulado)
6. Página de sucesso com resumo

## 🎨 Design Tokens

Cores principais:
- Primary: `#ccfe2c`
- Background: `#0b0d12`
- Surface: `#141924`
- Text: `#e6eaf2`

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a:
- Desktop (1280px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔧 Scripts Disponíveis

- `npm start` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm test` - Executa testes
- `npm run eject` - Ejeta configurações do CRA

## 🐛 Debug

Se encontrar o erro "RAWG API Key não configurada":
1. Verifique se criou o arquivo `.env`
2. Verifique se a chave está correta
3. Reinicie o servidor (`npm start`)

## 📝 Notas

- O checkout atual é simulado. Na produção, seria integrado com Stripe real.
- Os preços dos jogos são calculados baseados no rating da RAWG.
- O carrinho persiste entre sessões usando `localStorage`.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👨‍💻 Autor

**Marco Antonio Mendes da Silva**  
Projeto: Iara Games - 2025

## 📄 Licença

Este projeto é apenas para fins educacionais.
