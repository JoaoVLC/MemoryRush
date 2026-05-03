# Memory Rush

## Integrantes

- João Vitor Lima Cecilio
- Bárbara Franco

## Explicação do projeto

Memory Rush é um jogo de memória desenvolvido como um projeto integrado para duas disciplinas:

- Web Development: Framework, usando React.
- Web Development: HTML5 Canvas & Games, usando p5.js.

O jogador observa uma sequência de blocos coloridos e precisa repetir a mesma ordem clicando nos blocos. A cada rodada correta, a pontuação aumenta e uma nova cor é adicionada à sequência.

## Integração React + p5.js

A aplicação usa React para organizar as páginas, rotas, componentes e layout geral. O jogo fica na página `Jogo.jsx`, que usa `useEffect` para criar uma instância do p5.js quando a página é carregada.

A lógica do jogo fica separada em `src/game/sketch.js`. Esse arquivo controla o canvas, as telas do jogo, os cliques do mouse, as teclas de início/reinício, a pontuação e a dificuldade progressiva.

## Tecnologias usadas

- React
- p5.js
- JavaScript
- Vite
- React Router DOM
- CSS

## Como rodar o projeto

```bash
npm install
npm run dev
```

Se o PowerShell bloquear o comando `npm`, use:

```bash
npm.cmd install
npm.cmd run dev
```

Depois, acesse o endereço exibido pelo Vite no terminal.

## Estrutura de pastas

```text
src/
├── components/
│   ├── Navbar.jsx
│   └── Layout.jsx
├── pages/
│   ├── Home.jsx
│   ├── Jogo.jsx
│   ├── Instrucoes.jsx
│   └── Sobre.jsx
├── routes/
│   └── AppRoutes.jsx
├── game/
│   └── sketch.js
├── App.jsx
├── main.jsx
└── styles.css
```

## Como jogar

1. Acesse a página Jogo.
2. Pressione espaço para começar.
3. Observe a sequência de blocos coloridos.
4. Clique nos blocos na mesma ordem apresentada.
5. A cada acerto, a sequência aumenta e a pontuação sobe.
6. Se errar, a tela de Game Over mostra a pontuação final.
7. Pressione R para reiniciar.

## O que o projeto não possui

- Backend
- Banco de dados
- Login ou autenticação
- CRUD completo
