# Letiva

Backend da plataforma **Letiva**, um SaaS criado para **professores autônomos**.

O projeto foi desenvolvido durante o **Hackathon da GrowthWay 2026**.

A plataforma resolve um problema comum de professores particulares que precisam administrar historico de aulas, tarefas, progresso por metas, organizaçao de agenda, acompanhamento pedagogico.

Tudo isso normalmente é feito com **planilhas, WhatsApp e memória**, o que gera desorganização e perda de alunos.  
O Letiva centraliza todo esse fluxo em um único sistema.

---

# 🚀 Começando

Estas instruções permitem executar o backend do Letiva localmente para desenvolvimento.

---

# 📋 Pré-requisitos

Antes de iniciar, você precisa ter instalado:

```
Node.js
NPM
PostgreSQL
Docker
Docker compose
```

---

# 🔧 Instalação

Clone o repositório e siga os passos abaixo.

### 1. Instalar dependências

```
npm install
```

### 2. Configurar variáveis de ambiente

Renomeie o arquivo de exemplo:

```
.env.example
```

para:

```
.env
```

Depois preencha as variáveis necessárias com as configurações do seu ambiente.

---

### 3. Gerar os artefatos do Prisma

```
npx prisma generate
```

---

### 4. Executar as migrations do banco

```
npx prisma migrate dev
```

---

### 5. Iniciar o servidor

```
npm run dev
```

O servidor estará disponível em:

```
[http://localhost:3333](http://localhost:3333)
```

---

# 🛠️ Construído com

- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [PostgreSQL](https://www.postgresql.org/)

---

# 📦 Arquitetura

A API segue uma estrutura baseada em **RESTful APIs com validação tipada**. O banco de dados utiliza **PostgreSQL com Prisma ORM**, garantindo migrations versionadas e tipagem completa.

---

# 👥 Time

Projeto desenvolvido durante o hackathon por:

- **João Victor Silva de Oliveira**
- **Deivid Moura Vieira**
- **Matheus Borges Guedes**
- **Tiago Tavares Contador**
