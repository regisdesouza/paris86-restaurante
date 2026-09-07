# Documentação da API - Paris 86

Base URL: `http://localhost:8080`

Todos os endpoints estão sob o prefixo `/restaurante`. A API não exige autenticação. CORS está habilitado em todos os controllers via `@CrossOrigin`.

---

## Recurso: Cardápio

Representa os pratos prontos oferecidos pela casa. É um recurso somente leitura - não possui endpoint de cadastro.

### GET /restaurante/cardapio

Retorna todos os pratos do cardápio.

**Parâmetros:** nenhum.

**Resposta de sucesso - 200 OK**

```json
[
  {
    "id": 1,
    "prato": "Bowl do Chef",
    "descricao": "Quinoa, frango grelhado e brócolis no azeite.",
    "preco": 25.00,
    "carboidratoId": 3,
    "proteinaId": 5,
    "vegetalId": 9,
    "gorduraId": 13,
    "temperoId": 17
  },
  {
    "id": 2,
    "prato": "Prato Fitness",
    "descricao": "Batata doce, tofu e espinafre com abacate.",
    "preco": 23.50,
    "carboidratoId": 2,
    "proteinaId": 6,
    "vegetalId": 12,
    "gorduraId": 14,
    "temperoId": 18
  }
]
```

Os campos `carboidratoId`, `proteinaId`, `vegetalId`, `gorduraId` e `temperoId` são chaves estrangeiras que referenciam a tabela `ingredientes`. O cliente utiliza esses ids para preencher automaticamente o formulário de montagem quando um prato do cardápio é selecionado.

---

## Recurso: Ingredientes

Representa os ingredientes disponíveis para a montagem de um prato personalizado, organizados por categoria (`carboidrato`, `proteina`, `vegetal`, `gordura`, `tempero`). É um recurso somente leitura.

### GET /restaurante/ingredientes

Retorna todos os ingredientes cadastrados.

**Parâmetros:** nenhum.

**Resposta de sucesso - 200 OK**

```json
[
  {
    "id": 1,
    "nome": "Arroz integral",
    "categoria": "carboidrato",
    "preco": 4.50
  },
  {
    "id": 5,
    "nome": "Frango grelhado",
    "categoria": "proteina",
    "preco": 12.00
  }
]
```

O cliente utiliza o campo `categoria` para separar os ingredientes entre os cinco seletores do formulário de montagem.

---

## Recurso: Comanda

Representa os pedidos montados e enviados à cozinha. Cada comanda referencia obrigatoriamente um ingrediente de cada uma das cinco categorias.

### GET /restaurante/comanda

Retorna todos os pedidos já enviados.

**Parâmetros:** nenhum.

**Resposta de sucesso - 200 OK**

```json
[
  {
    "id": 1,
    "nomePrato": "Bowl do Chef",
    "carboidratoId": 3,
    "proteinaId": 5,
    "vegetalId": 9,
    "gorduraId": 13,
    "temperoId": 17,
    "total": 25.00,
    "status": "FINALIZADO"
  }
]
```

### POST /restaurante/comanda

Cadastra um novo pedido.

**Formato da requisição**

Content-Type: `application/json`

```json
{
  "nomePrato": "Bowl do Chef",
  "carboidratoId": 3,
  "proteinaId": 5,
  "vegetalId": 9,
  "gorduraId": 13,
  "temperoId": 17,
  "total": 25.00
}
```

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| nomePrato | string | sim | não pode ser vazio ou em branco |
| carboidratoId | number | sim | id existente na tabela `ingredientes` |
| proteinaId | number | sim | id existente na tabela `ingredientes` |
| vegetalId | number | sim | id existente na tabela `ingredientes` |
| gorduraId | number | sim | id existente na tabela `ingredientes` |
| temperoId | number | sim | id existente na tabela `ingredientes` |
| total | number | sim | calculado pelo cliente a partir do preço de cada ingrediente escolhido |

O campo `status` é preenchido automaticamente pelo banco com o valor `FINALIZADO` e não deve ser enviado na requisição.

**Resposta de sucesso - 201 Created**

```json
{
  "id": 8,
  "nomePrato": "Bowl do Chef",
  "carboidratoId": 3,
  "proteinaId": 5,
  "vegetalId": 9,
  "gorduraId": 13,
  "temperoId": 17,
  "total": 25.00,
  "status": null
}
```

Observação: o campo `status` aparece como `null` na resposta do POST porque o valor padrão é aplicado pelo banco de dados e não é refletido de volta no objeto retornado. Ao consultar o pedido via GET, o campo aparece corretamente preenchido com `FINALIZADO`.

**Resposta de erro - 400 Bad Request**

Retornada quando `nomePrato` está ausente ou em branco, ou quando qualquer um dos cinco ids de ingrediente está ausente.

```json
{}
```

A resposta de erro não possui corpo, apenas o código de status.

**Exemplo de requisição inválida**

```json
{
  "nomePrato": "",
  "carboidratoId": 3,
  "proteinaId": 5,
  "vegetalId": 9,
  "gorduraId": 13,
  "temperoId": 17,
  "total": 25.00
}
```

Resultado: `400 Bad Request`, pois `nomePrato` está em branco.

---

## Resumo dos endpoints

| Método | Endpoint | Descrição | Status de sucesso | Status de erro |
|---|---|---|---|---|
| GET | /restaurante/cardapio | Lista os pratos do cardápio | 200 | - |
| GET | /restaurante/ingredientes | Lista os ingredientes disponíveis | 200 | - |
| GET | /restaurante/comanda | Lista os pedidos enviados | 200 | - |
| POST | /restaurante/comanda | Cadastra um novo pedido | 201 | 400 |
