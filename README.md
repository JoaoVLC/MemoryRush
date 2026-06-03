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

## Evolução para o RA2

No RA2, o projeto evoluiu sem refazer a base do RA1. A aplicação continua usando React, rotas e p5.js, mas agora também demonstra interatividade com formulários, gerenciamento de estado e simulação de serviço.

Principais recursos adicionados:

- Formulário de jogador em `PlayerForm.jsx`, com validação de nome e dificuldade.
- Estado com `useState` na página `Jogo.jsx` para controlar jogador, dificuldade e pontuação final.
- Serviço fake em `rankingService.js`, usando `localStorage` para salvar, listar, ordenar e limpar pontuações.
- Página `Ranking.jsx`, com listagem das pontuações salvas e botão para limpar o ranking.
- Componente `ScoreCard.jsx`, que recebe `nome`, `pontos`, `dificuldade` e `data` por props.
- Configuração de dificuldade no `sketch.js`, alterando a velocidade de exibição da sequência.

As dificuldades disponíveis são:

- Fácil: velocidade normal.
- Médio: sequência um pouco mais rápida.
- Difícil: sequência mais rápida.

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
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── PlayerForm.jsx
│   └── ScoreCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Jogo.jsx
│   ├── Instrucoes.jsx
│   ├── Sobre.jsx
│   └── Ranking.jsx
├── routes/
│   └── AppRoutes.jsx
├── services/
│   └── rankingService.js
├── game/
│   └── sketch.js
├── App.jsx
├── main.jsx
└── styles.css
```

## Como jogar

1. Acesse a página Jogo.
2. Informe o nome do jogador.
3. Escolha a dificuldade.
4. Clique em Salvar e iniciar.
5. Pressione espaço para começar.
6. Observe a sequência de blocos coloridos.
7. Clique nos blocos na mesma ordem apresentada.
8. Se errar, a pontuação final é salva no ranking local.
9. Pressione R para jogar novamente com o mesmo jogador.

## O que o projeto não possui

- Backend
- Banco de dados
- Login ou autenticação
- CRUD completo

O ranking usa `localStorage`, então os dados ficam disponíveis no próprio navegador em que o jogo foi executado.
