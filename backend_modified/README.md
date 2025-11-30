# Achados e Perdidos - Backend (SQLite)

Este backend usa Node.js + Express + Sequelize com **SQLite** — não precisa instalar MySQL.

Como usar:

1. Instale dependências
   ```
   npm install
   ```

2. Crie arquivo `.env` baseado em `.env.example` (opcional).

3. Rode em desenvolvimento:
   ```
   npm run dev
   ```

O servidor criará automaticamente o arquivo `database.sqlite` e sincronizará as tabelas. Também irá popular categorias, locais e status padrão se estiverem vazios.
