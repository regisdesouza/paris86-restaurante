# 🗼 Paris86

Aplicação fullstack com tema parisiense, integrando um frontend em **React** com um backend em **Spring Boot** via **Axios**.

---

## 🛠️ Tecnologias

### Frontend
- [React](https://react.dev/) + Vite
- CSS Modules
- [Axios](https://axios-http.com/) — requisições HTTP (GET, POST)

### Backend
- [Spring Boot](https://spring.io/projects/spring-boot) (Java)
- Spring JDBC (`JdbcTemplate`)
- Banco de dados H2 (em memória)
- REST API

---

## 📁 Estrutura do Projeto

```
paris86/
├── frontend/    # Aplicação React
├── java-api/    # Aplicação Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── src/main/resources/schema.sql
├── API.md       # Documentação detalhada dos endpoints
└── README.md
```

> Ajuste os nomes das pastas acima caso sejam diferentes no seu repositório.

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (17+)
- Uma IDE para Java — recomendado: [IntelliJ IDEA](https://www.jetbrains.com/idea/) ou [Eclipse](https://www.eclipse.org/)

---

### 1. Backend — Spring Boot

1. Abra a pasta `java-api/` na sua IDE
2. Aguarde o Maven baixar as dependências
3. Localize a classe `ParisApplication` (contém o método `main`) e clique em **Run**

O servidor vai subir em: `http://localhost:8080`

#### Banco de dados

O projeto usa **H2** em memória — o banco é criado automaticamente ao subir a aplicação, executando o script `src/main/resources/schema.sql`, que cria as tabelas `ingredientes`, `cardapio` e `comanda` e já popula `ingredientes` e `cardapio` com dados iniciais.

Não é necessário nenhum passo manual de configuração de banco. Caso queira inspecionar os dados diretamente, o console do H2 fica disponível em:

```
http://localhost:8080/h2-console
```

Dados de conexão:

| Campo | Valor |
|---|---|
| JDBC URL | `jdbc:h2:mem:meu_banco` |
| User Name | `sa` |
| Password | `1234` |

> Como o banco é em memória, os dados são perdidos e recriados a cada vez que a aplicação é reiniciada.

---

### 2. Frontend — React

Abra um terminal na pasta `frontend/` e rode:

```bash
# Instala as dependências
npm install

# Inicia o servidor de desenvolvimento
npm run dev
```

O frontend vai subir em: `http://localhost:5173`

> ⚠️ **Importante:** suba o backend **antes** do frontend para que as requisições Axios funcionem corretamente.

---

## ✨ Funcionalidades

### 🍽️ Cardápio
Exibe os pratos prontos do restaurante, buscados do backend via Axios (`GET /restaurante/cardapio`). Cada prato pode ser selecionado para preencher automaticamente o formulário de montagem.

### 🧾 Monte seu prato
O cliente escolhe um ingrediente de cada categoria (carboidrato, proteína, vegetal, gordura e tempero), buscados via Axios (`GET /restaurante/ingredientes`), e monta o próprio prato.

### 👁️ Prévia da comanda
Exibe em tempo real o prato que está sendo montado, incluindo o preço total calculado a partir dos ingredientes escolhidos.

### 📋 Comanda da cozinha
Depois de montado, o pedido é enviado ao backend via Axios (`POST /restaurante/comanda`) e passa a aparecer na comanda da cozinha, junto com os demais pedidos já enviados (`GET /restaurante/comanda`).

---

## 🔗 Integração Frontend ↔ Backend

O frontend se comunica com a API do Spring Boot usando **Axios**. Exemplos reais usados no projeto:

```js
// GET — lista o cardápio
const resposta = await axios.get('http://localhost:8080/restaurante/cardapio');

// POST — envia um pedido para a comanda
await axios.post('http://localhost:8080/restaurante/comanda', {
  nomePrato: 'Bowl do Chef',
  carboidratoId: 3,
  proteinaId: 5,
  vegetalId: 9,
  gorduraId: 13,
  temperoId: 17,
  total: 25.00
});
```

O backend está configurado com `@CrossOrigin` em todos os controllers, permitindo requisições vindas de outra origem (o frontend rodando em `localhost:5173`).

Para o contrato completo da API — todos os endpoints, parâmetros, formatos de requisição e resposta, e códigos de status — veja [`API.md`](./API.md).
