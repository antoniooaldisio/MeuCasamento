# Guia de Deploy na Vercel

## Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Repositório GitHub vinculado

## Método 1: Deploy Automático via GitHub

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New Project"
3. Importe o repositório `antoniooaldisio/MeuCasamento`
4. Configure as seguintes opções:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Adicione as variáveis de ambiente (opcional):
   ```
   PORT=3000
   WEDDING_BRIDE_NAME=Nome da Noiva
   WEDDING_GROOM_NAME=Nome do Noivo
   WEDDING_DATE=2026-12-31
   ```

6. Clique em "Deploy"

## Método 2: Deploy via CLI

### Instalação da CLI Vercel

```bash
npm install -g vercel
```

### Login

```bash
vercel login
```

### Deploy

```bash
# Deploy de teste (preview)
vercel

# Deploy em produção
vercel --prod
```

## Configuração Pós-Deploy

Após o deploy, sua API estará disponível em uma URL como:
```
https://seu-projeto.vercel.app
```

### Endpoints Disponíveis

- `https://seu-projeto.vercel.app/wedding/info`
- `https://seu-projeto.vercel.app/wedding/location`
- `https://seu-projeto.vercel.app/wedding/schedule`
- `https://seu-projeto.vercel.app/confirmation`
- `https://seu-projeto.vercel.app/payments/gifts`

## Verificação

Teste se a API está funcionando:

```bash
curl https://seu-projeto.vercel.app/wedding/info
```

## Domínio Personalizado

Para adicionar um domínio personalizado:

1. Acesse o projeto no dashboard da Vercel
2. Vá em "Settings" > "Domains"
3. Adicione seu domínio personalizado
4. Configure os DNS conforme instruções

## Troubleshooting

### Erro de Build

Se o build falhar, verifique:
- Os logs de build na Vercel
- Se todas as dependências estão no `package.json`
- Se o Node.js está na versão correta (>= 18)

### Erro de Runtime

Se a aplicação não iniciar:
- Verifique os logs de runtime na Vercel
- Confirme que `vercel.json` está configurado corretamente
- Verifique as variáveis de ambiente

### CORS Issues

Se tiver problemas de CORS com frontend:
- A aplicação já está configurada com `app.enableCors()` no `main.ts`
- Para configuração específica, edite o arquivo `src/main.ts`

## Monitoramento

- Acesse o dashboard da Vercel para:
  - Ver logs em tempo real
  - Monitorar métricas de performance
  - Acompanhar uso de recursos

## Atualizações

Commits na branch principal (`main`) farão deploy automático se configurado via GitHub.

Para forçar um novo deploy:
```bash
vercel --prod --force
```
