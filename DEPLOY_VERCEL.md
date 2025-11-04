# Guia de Deploy no Vercel - Iara Games

## 📋 Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Repositório conectado ao GitHub
3. Chaves de API configuradas

## 🚀 Passo a Passo

### 1. Conectar Repositório

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Conecte o repositório `mendesmarcosv/iara-bootstrap`
4. Ou instale o Vercel CLI:
   ```bash
   npm i -g vercel
   vercel login
   ```

### 2. Configurar Variáveis de Ambiente

No painel do Vercel, vá em **Settings > Environment Variables** e adicione:

```
REACT_APP_RAWG_KEY=sua_chave_rawg_aqui
REACT_APP_REQRES_BASE_URL=https://reqres.in/api
```

### 3. Configurações do Projeto

O arquivo `vercel.json` já está configurado com:
- **Build Command:** `cd app && npm ci --legacy-peer-deps && npm run build`
- **Output Directory:** `app/build`
- **Install Command:** `npm install --prefix ./app --legacy-peer-deps`

### 4. Deploy via CLI (Opcional)

```bash
# Na raiz do projeto
vercel

# Para produção
vercel --prod
```

### 5. Configurações Importantes

#### Root Directory
Se o Vercel não detectar automaticamente, configure:
- **Root Directory:** `.` (raiz do projeto)

#### Build Settings
- **Build Command:** `cd app && npm ci --legacy-peer-deps && npm run build`
- **Output Directory:** `app/build`
- **Install Command:** `npm install --prefix ./app --legacy-peer-deps`

### 6. Verificar Deploy

Após o deploy, verifique:
- ✅ A aplicação carrega corretamente
- ✅ As rotas do React Router funcionam
- ✅ As APIs estão sendo chamadas (verifique console do navegador)
- ✅ Os assets (imagens, CSS) carregam corretamente

## 🔧 Troubleshooting

### Erro: "syntax error near unexpected token"
**Causa:** Comando com texto explicativo (como "ou faça isso") no `vercel.json`  
**Solução:** O arquivo `vercel.json` já está corrigido. Certifique-se de que não há comandos com parênteses ou texto explicativo.

**❌ Errado:**
```json
"buildCommand": "cd app && npm run build (ou cd app && npm install)"
```

**✅ Correto:**
```json
"buildCommand": "cd app && npm ci --legacy-peer-deps && npm run build"
```

### Erro: "Module not found"
- Verifique se o `package.json` está na pasta `app/`
- Certifique-se de que o build está sendo executado na pasta correta
- Use `npm ci` ao invés de `npm install` para builds mais confiáveis

### Erro: Vulnerabilidades npm (9 vulnerabilities)
**Solução:** Após o deploy funcionar, execute localmente:
```bash
cd app
npm audit fix --legacy-peer-deps
# Ou para forçar correções (pode quebrar compatibilidade):
# npm audit fix --force --legacy-peer-deps
```

### Erro: "API Key not found"
- Verifique se as variáveis de ambiente foram configuradas no Vercel
- Reinicie o deploy após adicionar variáveis

### Assets não carregam
- Verifique se os caminhos estão corretos (devem ser relativos)
- O Vercel serve os assets da pasta `public/` automaticamente

### Rotas não funcionam
- Certifique-se de que o `vercel.json` tem o rewrite para `index.html`
- Todas as rotas devem redirecionar para o React SPA

## 📝 Notas

- O Vercel faz deploy automático a cada push no GitHub
- As variáveis de ambiente são seguras e não aparecem no código
- O build é feito automaticamente no servidor do Vercel
- Para domínio customizado, configure em **Settings > Domains**

## 🎯 Estrutura Esperada

```
/
├── app/
│   ├── build/          # Output do build React
│   ├── public/         # Arquivos públicos
│   ├── src/            # Código fonte
│   └── package.json    # Dependências
├── assets/             # Assets da landing page
├── js/                 # Scripts da landing page
├── index.html          # Landing page
├── vercel.json         # Configuração Vercel
└── README.md
```

## ✅ Checklist de Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] `vercel.json` criado e configurado
- [ ] Build funciona localmente (`cd app && npm run build`)
- [ ] Repositório conectado ao Vercel
- [ ] Deploy realizado com sucesso
- [ ] Aplicação funcionando em produção

