# Memory Rush

## Integrantes

- João Vitor Lima Cecilio
- Bárbara Franco

## Explicação do projeto

Memory Rush é um jogo de memória desenvolvido com React, Vite e p5.js. O jogador observa uma sequência de blocos coloridos e precisa repetir a mesma ordem clicando nos blocos. A cada rodada correta, a pontuação aumenta e uma nova cor é adicionada à sequência.

A aplicação usa React para organizar páginas, rotas, componentes, formulários, autenticação simulada e ranking. O jogo em canvas fica separado em `src/game/sketch.js`, usando p5.js para desenho, animação e interação.

## Evolução RA1, RA2 e RA3

### RA1

No RA1, o projeto tinha a estrutura inicial:

- React com Vite.
- Componentes reutilizáveis.
- Layout com Navbar.
- Rotas com React Router.
- Páginas Home, Jogo, Instruções e Sobre.
- Jogo Memory Rush integrado com p5.js.

### RA2

No RA2, o projeto evoluiu com:

- Formulário de jogador em `PlayerForm.jsx`.
- Validação de nome e dificuldade.
- Gerenciamento de estado com `useState`.
- Ranking de pontuações.
- `rankingService.js` usando `localStorage`.
- Componente `ScoreCard.jsx` recebendo dados por props.
- Callback entre p5.js e React para salvar a pontuação final.

### RA3

No RA3, o projeto passou a incluir:

- Consumo real de API HTTP usando `fetch()` em `apiService.js`.
- Página `CentralDesafios.jsx` com GET de jogadores/eventos e POST de sugestão.
- Autenticação simulada com `authService.js`.
- `AuthContext.jsx` usando `useContext` para compartilhar usuário logado.
- Rotas protegidas com `ProtectedRoute.jsx`.
- Login, cadastro e perfil.
- Upload de imagem de perfil com conversão para base64.
- Persistência local com `localStorage`.
- Perfil com ferramentas internas para demonstrar props, useState, useEffect e service.
- Refinamento visual e responsividade para as novas telas.

## API HTTP real

A página `Central de Desafios` consome a JSONPlaceholder:

- `GET https://jsonplaceholder.typicode.com/users`
- `GET https://jsonplaceholder.typicode.com/posts`
- `POST https://jsonplaceholder.typicode.com/posts`

O arquivo responsável é:

```text
src/services/apiService.js
```

Ele usa `fetch()`, `async/await` e `try/catch` para tratar erros.

## Autenticação e segurança básica

A autenticação é simulada com `localStorage`.

Arquivos principais:

- `src/services/authService.js`
- `src/contexts/AuthContext.jsx`
- `src/routes/ProtectedRoute.jsx`

O sistema permite:

- cadastrar usuário;
- impedir e-mail duplicado;
- fazer login;
- criar sessão local;
- fazer logout;
- proteger rotas como `/jogo`, `/ranking` e `/perfil`.

Observação: a senha é salva de forma simples apenas por ser um projeto acadêmico local. No próprio código há comentário indicando que, em produção, a senha deveria ser protegida com hash no backend.

## Perfil e ferramentas

A página `Perfil.jsx` concentra dados do jogador, estatísticas, configurações e ferramentas. Ela inclui:

- componente reutilizável `InfoBox`;
- componente `Saudacao` com props;
- validação usando `validationService.js`;
- botão de alternar tema com `useState`;
- exemplo de estado `estaLogado`;
- exemplo de `useEffect`;
- botão de mostrar/esconder conteúdo;
- botão de ajuda.

## Tecnologias usadas

- React
- Vite
- React Router DOM
- p5.js
- JavaScript
- CSS
- localStorage
- fetch API

## Como rodar o projeto

Instale as dependências:

```bash
npm install
```

Rode o projeto em desenvolvimento:

```bash
npm run dev
```

Gere o build de produção:

```bash
npm run build
```

Se o PowerShell bloquear o comando `npm`, use:

```bash
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

Depois, acesse o endereço exibido pelo Vite no terminal.

## Estrutura de pastas

```text
src/
├── components/
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── PlayerForm.jsx
│   ├── ScoreCard.jsx
│   ├── InfoBox.jsx
│   └── Saudacao.jsx
├── contexts/
│   └── AuthContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Jogo.jsx
│   ├── Ranking.jsx
│   ├── CentralDesafios.jsx
│   ├── Login.jsx
│   ├── Cadastro.jsx
│   ├── Perfil.jsx
│   ├── Instrucoes.jsx
│   └── Sobre.jsx
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
├── services/
│   ├── apiService.js
│   ├── authService.js
│   ├── rankingService.js
│   └── validationService.js
├── game/
│   └── sketch.js
├── App.jsx
├── main.jsx
└── styles.css
```

## Como jogar

1. Crie uma conta ou faça login.
2. Acesse a página Jogo.
3. Informe o nome do jogador.
4. Escolha a dificuldade.
5. Clique em Salvar e iniciar.
6. Pressione espaço para começar.
7. Observe a sequência de blocos coloridos.
8. Clique nos blocos na mesma ordem apresentada.
9. Se errar, a pontuação final é salva no ranking.
10. Acesse Ranking para ver as pontuações salvas.

## Observações

O projeto não possui backend próprio nem banco de dados real. A persistência local é feita com `localStorage`, e o consumo HTTP real é demonstrado com a API pública JSONPlaceholder.
