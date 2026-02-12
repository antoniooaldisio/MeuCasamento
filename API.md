# Documentação da API - MeuCasamento

## Visão Geral

API RESTful para site de casamento com funcionalidades de informações do evento, confirmação de presença (RSVP) e lista de presentes.

**Base URL (local):** `http://localhost:3000`  
**Base URL (produção):** `https://seu-projeto.vercel.app`

## Endpoints

### 1. Wedding Module (Informações do Casamento)

#### GET `/wedding/info`

Retorna informações básicas do casamento.

**Resposta de Sucesso:**
```json
{
  "bride": "Nome da Noiva",
  "groom": "Nome do Noivo",
  "date": "2026-12-31",
  "message": "Celebre conosco este momento especial!"
}
```

**Status Code:** `200 OK`

---

#### GET `/wedding/location`

Retorna informações sobre o local do casamento.

**Resposta de Sucesso:**
```json
{
  "venue": "Nome do Local",
  "address": "Endereço do Local",
  "city": "Cidade",
  "state": "Estado",
  "mapUrl": "https://maps.google.com"
}
```

**Status Code:** `200 OK`

---

#### GET `/wedding/schedule`

Retorna a programação do evento.

**Resposta de Sucesso:**
```json
{
  "ceremony": "15:00",
  "reception": "17:00",
  "party": "19:00"
}
```

**Status Code:** `200 OK`

---

### 2. Confirmation Module (Confirmação de Presença)

#### GET `/confirmation`

Lista todas as confirmações de presença.

**Resposta de Sucesso:**
```json
{
  "total": 1,
  "confirmations": [
    {
      "id": 1,
      "name": "João Silva",
      "guests": 2,
      "email": "joao@example.com",
      "createdAt": "2026-02-12T17:32:45.868Z"
    }
  ]
}
```

**Status Code:** `200 OK`

---

#### POST `/confirmation`

Cria uma nova confirmação de presença.

**Request Body:**
```json
{
  "name": "João Silva",
  "guests": 2,
  "email": "joao@example.com",
  "phone": "(11) 99999-9999",
  "message": "Mal posso esperar!"
}
```

**Campos:**
- `name` (string): Nome do convidado
- `guests` (number): Número de acompanhantes
- `email` (string): Email para contato
- `phone` (string, opcional): Telefone
- `message` (string, opcional): Mensagem para os noivos

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Confirmação registrada com sucesso!",
  "data": {
    "id": 1,
    "name": "João Silva",
    "guests": 2,
    "email": "joao@example.com",
    "createdAt": "2026-02-12T17:32:45.868Z"
  }
}
```

**Status Code:** `201 Created`

---

### 3. Payments Module (Pagamentos)

#### GET `/payments/gifts`

Lista os itens da lista de presentes.

**Resposta de Sucesso:**
```json
{
  "gifts": [
    {
      "id": 1,
      "name": "Lista de Presentes - Item 1",
      "value": 100,
      "available": true
    },
    {
      "id": 2,
      "name": "Lista de Presentes - Item 2",
      "value": 200,
      "available": true
    }
  ]
}
```

**Status Code:** `200 OK`

---

#### POST `/payments/process`

Processa um pagamento (estrutura básica para integração futura).

**Request Body:**
```json
{
  "giftId": 1,
  "amount": 100,
  "payerName": "Maria Santos",
  "payerEmail": "maria@example.com",
  "paymentMethod": "credit_card"
}
```

**Campos:**
- `giftId` (number): ID do presente
- `amount` (number): Valor do pagamento
- `payerName` (string): Nome do pagador
- `payerEmail` (string): Email do pagador
- `paymentMethod` (string): Método de pagamento

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Pagamento processado com sucesso!",
  "transactionId": "TXN-1707761565868",
  "data": {
    "giftId": 1,
    "amount": 100,
    "payerName": "Maria Santos",
    "payerEmail": "maria@example.com",
    "paymentMethod": "credit_card"
  }
}
```

**Status Code:** `201 Created`

---

## Exemplos de Uso

### cURL

```bash
# Obter informações do casamento
curl http://localhost:3000/wedding/info

# Criar confirmação
curl -X POST http://localhost:3000/confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "guests": 2,
    "email": "joao@example.com"
  }'

# Listar presentes
curl http://localhost:3000/payments/gifts
```

### JavaScript (Fetch API)

```javascript
// Obter informações do casamento
fetch('http://localhost:3000/wedding/info')
  .then(response => response.json())
  .then(data => console.log(data));

// Criar confirmação
fetch('http://localhost:3000/confirmation', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'João Silva',
    guests: 2,
    email: 'joao@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### Python (Requests)

```python
import requests

# Obter informações do casamento
response = requests.get('http://localhost:3000/wedding/info')
print(response.json())

# Criar confirmação
data = {
    'name': 'João Silva',
    'guests': 2,
    'email': 'joao@example.com'
}
response = requests.post('http://localhost:3000/confirmation', json=data)
print(response.json())
```

## CORS

A API está configurada com CORS habilitado, permitindo requisições de qualquer origem. Para produção, considere restringir as origens permitidas.

## Notas

- **Dados em Memória**: Atualmente, os dados são armazenados em memória e serão perdidos ao reiniciar a aplicação. Para persistência, integre com um banco de dados.
- **Validação**: Implemente validação de dados usando DTOs e class-validator para produção.
- **Autenticação**: Adicione autenticação para endpoints administrativos (ex: listar confirmações).
- **Gateway de Pagamento**: O endpoint de pagamento é uma estrutura básica. Integre com um gateway real como Stripe ou PagSeguro.

## Próximos Passos

1. Integrar banco de dados (MongoDB/PostgreSQL)
2. Adicionar validação com DTOs
3. Implementar autenticação JWT
4. Integrar gateway de pagamento
5. Adicionar documentação Swagger/OpenAPI
6. Implementar rate limiting
7. Adicionar logs estruturados
