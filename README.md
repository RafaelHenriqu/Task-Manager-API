

# TaskFlow API

API RESTful para gerenciamento de projetos e tarefas, construída com Node.js, Express e MySQL.

## 🚀 Funcionalidades

- Autenticação com JWT (Login, Registro, Refresh Token)
- Gerenciamento de Workspaces (criar e listar)
- Gerenciamento de Projetos (criar e listar por workspace)
- Gerenciamento de Tarefas (criar, listar, status e prioridade)
- Comentários em Tarefas
- Validação de permissões (cada usuário só acessa seus próprios recursos)
- Documentação automática (Swagger)
- Testes automatizados (Jest + Supertest)

## 🛠️ Tecnologias

- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL
- **ORM:** Knex.js (Migrations e Seeds)
- **Autenticação:** JWT, Bcrypt
- **Validação:** Zod
- **Documentação:** Swagger
- **Testes:** Jest, Supertest

## ⚙️ Configuração Local

### Pré-requisitos

- Node.js (v16+)
- MySQL (v8+)
- Git

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/RafaelHenriqu/taskflow-api.git
cd taskflow-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
   - Crie um banco de dados MySQL chamado `taskflow`
   - No arquivo `.env.example`, preencha suas credenciais:
```text
DB_HOST=localhost
DB_USER=root
DB_PASS=suasenha
DB_NAME=taskflow
JWT_SECRET=umasegredoaqui
PORT=3333
```

4. Renomeie o arquivo de ambiente:
```bash
cp .env.example .env
```

5. Execute as migrations do banco:
```bash
npx knex migrate:latest
```

6. (Opcional) Execute os seeds para dados de teste:
```bash
npx knex seed:run
```

7. Inicie o servidor:
```bash
node src/server.js
```

A API estará disponível em `http://localhost:3333`

## 📚 Documentação da API

A documentação interativa está disponível em:
```
http://localhost:3333/docs
```

## 🧪 Testes

Execute os testes automatizados:
```bash
npm test
```

## 📁 Estrutura do Projeto

```
src/
├── config/        # Configurações gerais
├── middlewares/   # Middlewares (auth, validate)
├── modules/       # Módulos do projeto
│   ├── auth/      # Autenticação
│   ├── workspaces/
│   ├── projects/
│   ├── tasks/
│   └── comments/
├── database/
│   ├── migrations/
│   └── seeds/
└── utils/         # Funções utilitárias
```

## 🔐 Segurança

A API implementa diversas medidas de segurança:

- **Autenticação JWT:** Tokens para controle de sessão
- **Criptografia de Senhas:** Bcrypt para hash de senhas
- **Validação de Dados:** Zod para validação de entrada
- **Filtro de Autorização:** Usuários só acessam seus próprios dados
- **Headers HTTP:** Respostas seguras com headers apropriados

## 📝 Rotas Principais

### Auth
- `POST /auth/register` - Criar nova conta
- `POST /auth/login` - Realizar login
- `POST /auth/refresh` - Renovar token de acesso
- `POST /auth/logout` - Encerrar sessão

### Workspaces
- `GET /workspaces` - Listar workspaces do usuário
- `POST /workspaces` - Criar novo workspace

### Projects
- `GET /projects?workspace_id=X` - Listar projetos de um workspace
- `POST /projects` - Criar novo projeto

### Tasks
- `GET /tasks?project_id=X` - Listar tarefas de um projeto
- `POST /tasks` - Criar nova tarefa
- `PATCH /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Remover tarefa

### Comments
- `GET /tasks/:taskId/comments` - Listar comentários de uma tarefa
- `POST /tasks/:taskId/comments` - Adicionar comentário

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

Desenvolvido por [Rafael Henrique](https://github.com/RafaelHenriqu)
