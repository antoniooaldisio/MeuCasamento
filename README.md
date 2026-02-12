# MeuCasamento 💒

Site de casamento com API de pagamento e lista de confirmação construído com Nest.js.

## Descrição

API backend para site de casamento com:
- Informações do casamento (data, local, programação)
- Sistema de confirmação de presença (RSVP)
- API de pagamentos para lista de presentes

## Tecnologias

- [Nest.js](https://nestjs.com/) - Framework backend
- TypeScript
- Vercel - Deploy

## Instalação

```bash
# Instalar dependências
npm install
```

## Executar a aplicação

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod
```

## Endpoints da API

### Wedding (Informações do Casamento)
- `GET /wedding/info` - Informações básicas do casamento
- `GET /wedding/location` - Informações do local
- `GET /wedding/schedule` - Programação do evento

### Confirmation (Confirmação de Presença)
- `GET /confirmation` - Listar confirmações
- `POST /confirmation` - Criar confirmação

### Payments (Pagamentos)
- `GET /payments/gifts` - Lista de presentes
- `POST /payments/process` - Processar pagamento

## Deploy na Vercel

1. Faça login na Vercel:
```bash
npm i -g vercel
vercel login
```

2. Faça deploy:
```bash
vercel
```

3. Para deploy em produção:
```bash
vercel --prod
```

Ou conecte o repositório GitHub diretamente na plataforma Vercel para deploy automático.

## Estrutura do Projeto

```
src/
├── wedding/          # Módulo de informações do casamento
├── confirmation/     # Módulo de confirmação de presença
├── payments/         # Módulo de pagamentos
├── app.module.ts     # Módulo principal
└── main.ts          # Entry point da aplicação
```

## Próximos Passos

- [ ] Integrar com banco de dados (ex: MongoDB, PostgreSQL)
- [ ] Implementar autenticação para painel administrativo
- [ ] Integrar com gateway de pagamento real (ex: Stripe, PagSeguro)
- [ ] Adicionar validação de dados com class-validator
- [ ] Criar frontend com Next.js ou React
- [ ] Adicionar testes unitários e e2e

## Licença

UNLICENSED
