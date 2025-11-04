# 🎮 Iara Games - E-commerce de Jogos Digitais

![image](https://github.com/user-attachments/assets/482ae99f-2fec-43a0-a061-9cb255465f01)

Plataforma completa de e-commerce desenvolvida com React + TypeScript, integrada a uma landing page Bootstrap. O projeto oferece uma experiência completa de compra de jogos digitais com autenticação, catálogo, carrinho e sistema de pagamento.

## 🚀 Tecnologias

### Frontend
- **React 18+** - Framework principal
- **TypeScript** - Tipagem estática
- **React Router DOM 6+** - Roteamento SPA
- **Bootstrap 5** - Landing page e estilos base
- **CSS Modules** - Estilos escopados

### Bibliotecas
- **Axios** - Cliente HTTP
- **Formik + Yup** - Formulários e validação
- **Phosphor Icons** - Biblioteca de ícones
- **react-barcode** - Geração de código de barras
- **qrcode** - Geração de QR codes

### APIs Utilizadas
- **RAWG API** - Catálogo de jogos
- **ReqRes.in** - Autenticação (simulada)
- **ViaCEP** - Busca de endereços brasileiros

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ e npm

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/iara-games.git
cd iara-games
```

2. **Instale as dependências**
```bash
# Na raiz (para a landing page)
npm install

# Na pasta app (para o React SPA)
cd app
npm install --legacy-peer-deps
```

3. **Configure as variáveis de ambiente**
```bash
cd app
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas chaves:
```env
REACT_APP_RAWG_KEY=sua_chave_rawg_aqui
REACT_APP_REQRES_BASE_URL=https://reqres.in/api
```

## ⚙️ Como Obter as Chaves de API

### RAWG API
1. Acesse [https://rawg.io/apidocs](https://rawg.io/apidocs)
2. Crie uma conta gratuita
3. Acesse o dashboard e copie sua API key
4. Cole no arquivo `.env`

### ReqRes.in
- Não requer chave adicional, mas precisa do header `x-api-key: reqres-free-v1`
- Já configurado no código

## 🎯 Executar o Projeto

### Landing Page (Raiz)
```bash
# Servir a landing page (use um servidor HTTP simples)
# Exemplo com Python:
python -m http.server 8000

# Ou com Node:
npx http-server -p 8000
```

Acesse: `http://localhost:8000`

### React SPA (Pasta app)
```bash
cd app
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📂 Estrutura do Projeto

```
iara-games/
├── app/                      # React SPA
│   ├── public/              # Arquivos públicos
│   ├── src/
│   │   ├── app/             # Configurações (rotas, providers)
│   │   ├── components/      # Componentes React
│   │   │   ├── atoms/       # Componentes básicos
│   │   │   ├── molecules/   # Componentes compostos
│   │   │   └── Layout/     # Layout (Header, Container)
│   │   ├── contexts/        # Context API
│   │   ├── hooks/           # Hooks customizados
│   │   ├── lib/             # Bibliotecas e APIs
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── styles/          # Estilos globais
│   │   └── utils/           # Utilitários
│   ├── package.json
│   └── .env.example
│
├── assets/                   # Assets da landing page
│   ├── brand/              # Logos e identidade visual
│   └── ...
│
├── index.html               # Landing page principal
├── styles.css              # Estilos da landing page
├── js/                     # Scripts da landing page
├── package.json
└── README.md               # Este arquivo
```

## 🎮 Funcionalidades

### Landing Page
- ✅ Design responsivo com Bootstrap
- ✅ Hero section com vídeo de fundo
- ✅ Seção de jogos em destaque
- ✅ Cards de jogos indie
- ✅ Integração com React SPA

### React SPA (`/app`)
- ✅ **Catálogo de Jogos** - Busca dinâmica, filtros, paginação
- ✅ **Detalhes do Jogo** - Informações completas e adicionar ao carrinho
- ✅ **Carrinho** - Gerenciamento de itens (jogos digitais)
- ✅ **Autenticação** - Login e cadastro com validação
- ✅ **Checkout** - Formulário completo com múltiplos métodos de pagamento
- ✅ **Pagamentos** - PIX, Boleto e Cartão de Crédito (simulados)
- ✅ **Meus Pedidos** - Histórico de compras
- ✅ **Página de Sucesso** - Confirmação de pedido

## 🛒 Fluxo de Compra

1. **Navegação** - Usuário navega pelo catálogo
2. **Busca** - Busca dinâmica enquanto digita
3. **Detalhes** - Visualiza detalhes do jogo
4. **Carrinho** - Adiciona jogos ao carrinho
5. **Autenticação** - Faz login ou cadastro
6. **Checkout** - Preenche dados e escolhe método de pagamento
7. **Pagamento** - Completa o pagamento (PIX/Boleto/Cartão)
8. **Confirmação** - Recebe confirmação do pedido

## 🔐 Autenticação

O sistema utiliza ReqRes.in para autenticação simulada:

**Para testar:**
- Email: `eve.holt@reqres.in`
- Senha: qualquer senha com 6+ caracteres

Ou cadastre um novo usuário com qualquer email válido.

## 💾 Armazenamento

O projeto utiliza **localStorage** para:
- Tokens de autenticação
- Itens do carrinho
- Histórico de pedidos
- Dados de sessão

## 🎨 Design System

### Cores Principais
- **Primary:** `#ccfe2c` (Verde neon)
- **Background:** `#0b0d12` (Preto)
- **Surface:** `#141924` (Cinza escuro)
- **Text:** `#e6eaf2` (Branco)

### Componentes
- Design atomic (atoms, molecules, organisms)
- CSS Modules para escopo
- Design tokens centralizados

## 📱 Responsividade

A aplicação é totalmente responsiva:
- **Desktop:** 1280px+
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px (menu hambúrguer)

## 🔧 Scripts Disponíveis

### Landing Page (raiz)
```bash
# Servir com servidor HTTP local
python -m http.server 8000
```

### React SPA (pasta app)
```bash
npm start          # Servidor de desenvolvimento
npm run build      # Build de produção
npm test           # Executar testes
```

## 🐛 Troubleshooting

### Erro "RAWG API Key não configurada"
1. Verifique se criou o arquivo `.env` em `app/`
2. Verifique se a chave está correta
3. Reinicie o servidor (`npm start`)

### Erro no login/registro
- Verifique se o header `x-api-key: reqres-free-v1` está sendo enviado
- Já configurado no código em `app/src/lib/api/auth.ts`

### Problemas com dependências
```bash
cd app
npm install --legacy-peer-deps
```

## 📝 Notas Importantes

- ⚠️ O checkout é **simulado** - não processa pagamentos reais
- ⚠️ Preços são calculados baseados no rating da RAWG API
- ⚠️ Todos os dados são armazenados no **localStorage** (não há backend)
- ✅ Carrinho persiste entre sessões
- ✅ Histórico de pedidos é mantido localmente

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das alterações:
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie para o repositório:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request

## 📄 Licença

Este projeto é apenas para fins educacionais.

## 👥 Membros do Projeto

| Profile | Nome | Redes Sociais |
| :---: | :---: | :---: |
| [<img src="https://github.com/DevSaLLein.png" height="90px">](https://github.com/DevSaLLein) | Isaac Andrade | [GitHub](https://github.com/DevSaLLein) \| [LinkedIn](https://www.linkedin.com/in/devsallein) \| [Instagram](https://www.instagram.com/http.zaclimaaxs/) |
| [<img src="https://github.com/matheusnfran.png" height="90px">](https://github.com/matheusnfran) | Matheus Francisco | [GitHub](https://github.com/matheusnfran) |
| [<img src="https://github.com/mendesmarcosv.png" height="90px">](https://github.com/mendesmarcosv) | Marco Mendes | [GitHub](https://github.com/mendesmarcosv) |
| [<img src="https://github.com/HenriquePinheiro8922.png" height="90px">](https://github.com/HenriquePinheiro8922) | Henrique Pinheiro | [GitHub](https://github.com/HenriquePinheiro8922) |
| [<img src="https://github.com/Mylene-Dias.png" height="90px">](https://github.com/Mylene-Dias) | Mylene Dias | [GitHub](https://github.com/Mylene-Dias) \| [LinkedIn](https://www.linkedin.com/in/mylenediasfonseca) |

## 📚 Documentação Adicional

Para mais detalhes sobre implementação, APIs e funcionalidades, consulte:
- Estrutura de componentes e hooks
- Integração com APIs externas
- Sistema de autenticação
- Fluxo de pagamento

---

**Desenvolvido com ❤️ para a cultura brasileira de jogos**
